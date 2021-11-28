import admin from "./init";
import {
  createUser,
  setRole,
  generateEmailVerificationLink,
  verifyToken,
  getUser,
} from "./User";

export { admin as FirebaseAdmin };
export { createUser };
export { setRole as setUserRole };
export { generateEmailVerificationLink as getEmailVerificationLink };
export { verifyToken as verifyFirebaseToken };
export { getUser as getFirebaseUser };
