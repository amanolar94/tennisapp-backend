import Player from "models/player";
import * as Bluebird from "bluebird";
import { GenericError } from "types/requests";
import { FirebaseError } from "firebase-admin";
import { sequelize } from "instances/sequelize";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import User, { CreateUserRequest, UserInstance } from "models/user";
import { createUser, setUserRole } from "./firebase";

// const Promise = Bluebird;

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config();
}

export class AuthService {
  static get userAttributes() {
    return ["email", "name"];
  }

  private static _user: UserRecord;

  static get user() {
    return AuthService._user;
  }

  async register(params: CreateUserRequest): Promise<UserRecord> {
    const { role, ...details } = params;
    const transaction = await sequelize.transaction();
    try {
      const user = await createUser(details);
      await setUserRole(user.uid, role);
      await User.create({ email: params.email }, { transaction });
      await Player.create(
        { userEmail: params.email, points: 0, commendmentsCount: 0 },
        { transaction }
      );
      await transaction.commit();
      return user;
    } catch (err: FirebaseError | GenericError) {
      await transaction.rollback();
      throw err;
    }
  }

  verifyToken(token: string) {
    return true;
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
