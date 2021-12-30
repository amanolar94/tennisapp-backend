import Player from "models/player";
import Secretary from "models/secretary";
import { GenericError } from "types/requests";
import { FirebaseError } from "firebase-admin";
import requestEmailVerification from "./mailer";
import { sequelize } from "instances/sequelize";
import User, { CreateUserRequest } from "models/user";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { createUser, setUserRole, getEmailVerificationLink } from "./firebase";

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config();
}

export class AuthService {
  async register(params: CreateUserRequest): Promise<UserRecord> {
    const { role, ...details } = params;
    const transaction = await sequelize.transaction();
    try {
      await User.create({ email: params.email }, { transaction });
      if (role === "player") {
        await Player.create(
          { userEmail: params.email, points: 0, commendmentsCount: 0 },
          { transaction }
        );
      } else {
        await Secretary.create(
          { secretaryEmail: params.email, clubId: params.clubId },
          { transaction }
        );
      }
      await transaction.commit();
      const user = await createUser(details);
      await setUserRole(user.uid, role);
      const link = await getEmailVerificationLink(user.email);
      requestEmailVerification({ userEmail: user.email, link });
      return user;
    } catch (err: FirebaseError | GenericError) {
      await transaction.rollback();
      throw err;
    }
  }
}
