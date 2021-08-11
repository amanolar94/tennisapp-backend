import { sequelize } from "./../instances/sequelize";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as Bluebird from "bluebird";
import User, { UserCreationAttributes, UserInstance } from "../models/user";
import Player from "../models/player";
import PasswordReset from "../models/passwordReset";
import mailer from "../utils/mailer";

// const Promise = Bluebird;

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config();
}

const _jwtSecret = process.env.JWT_SECRET;
const _saltRounds = Number(process.env.SALT_ROUNDS); //bcrypt requires the saltRound to be a number

type LoginResponse = { token: string; refreshToken: string };

export class AuthService {
  static get userAttributes() {
    return ["email", "name"];
  }
  private static _user;

  static get user() {
    return AuthService._user;
  }

  register({ email, password, name }: UserCreationAttributes) {
    return bcrypt.hash(password, _saltRounds).then((hash) => {
      return sequelize
        .transaction((transaction) => {
          return User.create(
            { email, password: hash, name },
            { transaction }
          ).then(() => {
            return Player.create(
              {
                userEmail: email,
                points: 0,
                commendmentsCount: 0,
              },
              { transaction }
            );
          });
        })
        .then(() => {
          return this.getUserByEmail(email);
        });
    });
  }

  login(email: string): Bluebird<LoginResponse> {
    return this.getUserByEmail(email).then((user) => {
      return {
        token: jwt.sign({ user }, _jwtSecret, {
          expiresIn: "5m",
        }),
        refreshToken: jwt.sign({ user }, _jwtSecret, {
          expiresIn: "5 days",
        }),
      };
    });
  }

  refreshToken({
    refreshToken,
  }: {
    refreshToken: string;
  }): Bluebird<{ err: jwt.VerifyErrors } | LoginResponse> {
    return new Bluebird((resolve) => {
      jwt.verify(refreshToken, _jwtSecret, (err, decoded) => {
        if (err) {
          resolve({ err });
        } else {
          resolve(this.login(decoded["user"]["email"]));
        }
      });
    });
  }

  async sendResetEmail(userEmail: string) {
    const t = await sequelize.transaction();
    const token = jwt.sign({ userEmail }, _jwtSecret, { expiresIn: "2 days" });
    try {
      await PasswordReset.create(
        {
          userEmail,
          token,
        },
        { transaction: t }
      );

      const mail = await mailer({ userEmail, token });

      await t.commit();
      return mail;
    } catch (err) {
      await t.rollback();

      return err;
    }
  }

  requestPasswordReset(email: string): Bluebird<any> {
    return new Bluebird((resolve) => {
      this.sendResetEmail(email)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          resolve(err);
        });
    });
  }

  verifyToken(token: string) {
    return new Promise((resolve) => {
      jwt.verify(token, _jwtSecret, (err, decoded) => {
        if (err) {
          resolve(false);
          return;
        }

        AuthService._user = User.findByPk(decoded["email"]);
        resolve(true);
        return;
      });
    }) as Promise<boolean>;
  }

  getUserByEmail(email: string) {
    return User.findByPk(email, {
      include: [
        {
          model: Player,
          as: "player",
          attributes: [
            "profilePhoto",
            "points",
            "commendmentsCount",
            "penaltyExpiration",
            "penaltyReason",
          ],
        },
      ],
      attributes: AuthService.userAttributes,
    }) as Bluebird<UserInstance>;
  }
}
