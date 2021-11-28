import { AppService } from "services/app";
import { GenericError } from "types/requests";
import { FirebaseError } from "firebase-admin";
import { ValidationError } from "express-validator";
import { Router, Request, Response } from "express";
import { tokenGuard } from "./../middlewares/tokenGuard";

export const appRouter = Router();
const appService = new AppService();

appRouter.get(
  "/user-info",
  tokenGuard,
  async (
    //TODO: these kind of requests should be done only with the token not with the user id
    req: Request<{ uid: string }>,
    res: Response<
      | { response: Record<string, any> }
      | ValidationError[]
      | FirebaseError
      | GenericError
    >
  ) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) return res.status(422).json(errors.array());

    // const payload = matchedData(req) as CreateUserRequest;
    // const user = authService.register(payload);
    const uid = req.body.uid;
    await appService
      .getUserDetails(uid)
      .then((user) => {
        return res.json({ user });
      })
      .catch((err) => {
        return res.json({ err });
      });
  }
);
