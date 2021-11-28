import { Roles } from "../../models/user";
import { FirebaseAdmin } from ".";
import { CreateUserParams } from "models/user";

export const createUser = async (params: CreateUserParams) => {
  const { email, password, photoUrl, name } = params;

  const user = await FirebaseAdmin.auth().createUser({
    email,
    password,
    displayName: name,
    photoURL: photoUrl,
  });

  return user;
};

export const setRole = async (userId: string, role: Roles) => {
  const roleSet = await FirebaseAdmin.auth().setCustomUserClaims(userId, {
    [role]: true,
  });
  return roleSet;
};

export const generateEmailVerificationLink = async (email: string) => {
  const link = await FirebaseAdmin.auth().generateEmailVerificationLink(email);
  return link;
};

export const verifyToken = async (idToken: string) => {
  const decoded = await FirebaseAdmin.auth().verifyIdToken(idToken);
  return decoded;
};

export const getUser = async (uid: string) => {
  const user = await FirebaseAdmin.auth().getUser(uid);
  return user;
};
