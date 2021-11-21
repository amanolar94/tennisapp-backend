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
