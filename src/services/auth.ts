import Player from "models/player";
import { GenericError } from "types/requests";
import { FirebaseError } from "firebase-admin";
import { sequelize } from "instances/sequelize";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import User, { CreateUserRequest } from "models/user";
import { createUser, setUserRole, getEmailVerificationLink } from "./firebase";
import requestEmailVerification from "./mailer";

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config();
}

export class AuthService {
  async register(params: CreateUserRequest): Promise<UserRecord> {
    const { role, ...details } = params;
    const transaction = await sequelize.transaction();
    try {
      const user = await createUser(details);
      await setUserRole(user.uid, role);
      const link = await getEmailVerificationLink(user.email);

      await User.create({ email: params.email }, { transaction });
      await Player.create(
        { userEmail: params.email, points: 0, commendmentsCount: 0 },
        { transaction }
      );
      await transaction.commit();
      requestEmailVerification({ userEmail: user.email, link });
      return user;
    } catch (err: FirebaseError | GenericError) {
      await transaction.rollback();
      throw err;
    }
  }
}
