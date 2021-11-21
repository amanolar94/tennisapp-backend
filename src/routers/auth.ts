import { userRules } from "rules/user";
import { AuthService } from "services/auth";
import { GenericError } from "types/requests";
import { CreateUserParams } from "models/user";
import { FirebaseError } from "firebase-admin";
import { Router, Request, Response } from "express";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import {
  matchedData,
  ValidationError,
  validationResult,
} from "express-validator";

export const authRouter = Router();
const authService = new AuthService();

authRouter.post(
  "/register",
  userRules["forRegister"],
  async (
    req: Request<CreateUserParams>,
    res: Response<
      | { response: UserRecord }
      | ValidationError[]
      | FirebaseError
      | GenericError
    >
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const payload = matchedData(req) as CreateUserParams;
    // const user = authService.register(payload);

    await authService
      .register(payload)
      .then((response) => {
        return res.json({ response });
      })
      .catch((err) => {
        return res.json({ err });
      });
  }
);
