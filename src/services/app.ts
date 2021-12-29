import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { getFirebaseUser } from "./firebase";

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config();
}

export class AppService {
  async getUserDetails(uid: string): Promise<UserRecord> {
    const user = await getFirebaseUser(uid);
    return user;
  }
}
