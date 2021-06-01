import { sequelize } from "./../instances/sequelize";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as Bluebird from "bluebird";
import User, { UserCreationAttributes, UserInstance } from "../models/user";
import Player from "../models/player";

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config();
}

const _jwtSecret = process.env.JWT_SECRET;
const _saltRounds = process.env.SALT_ROUNDS;

export class UserService {
  static get userAttributes() {
    return ["email", "name"];
  }
  private static _user;

  static get user() {
    return UserService._user;
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

  login({ email }: UserCreationAttributes) {
    return this.getUserByEmail(email).then((user) => {
      return jwt.sign({ user }, _jwtSecret);
    });
  }

  verifyToken(token: string) {
    return new Promise((resolve) => {
      jwt.verify(token, _jwtSecret, (err, decoded) => {
        if (err) {
          resolve(false);
          return;
        }

        UserService._user = User.findByPk(decoded["email"]);
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
      attributes: UserService.userAttributes,
    }) as Bluebird<UserInstance>;
  }
}
