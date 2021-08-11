import { matchedData, validationResult } from "express-validator";
import { Router } from "express";
import { userRules } from "../rules/user";
import { AuthService } from "../services/auth";
import { UserCreationAttributes, UserLoginAttributes } from "../models/user";
import { resetPasswordPayload } from "../models/passwordReset";

export const authRouter = Router();
const authService = new AuthService();

authRouter.post("/register", userRules["forRegister"], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json(errors.array());

  const payload = matchedData(req) as UserCreationAttributes;
  const user = authService.register(payload);

  return user.then((response) => res.json({ response }));
});

authRouter.post("/refreshToken", userRules["forTokenRefresh"], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json(errors.array());

  const payload = matchedData(req) as { refreshToken: string };
  const token = authService.refreshToken(payload);

  return token.then((response) => res.json({ response }));
});

authRouter.post("/login", userRules["forLogin"], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(422).json(errors.array());

  const payload = matchedData(req) as UserLoginAttributes;
  const token = authService.login(payload.email);
  return token.then((response) => res.json({ response }));
});

authRouter.post(
  "/requestPasswordReset",
  userRules["forPasswordReset"],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const payload = matchedData(req) as resetPasswordPayload;

    const response = authService.requestPasswordReset(payload.email);
    return response.then((response) => res.json({ response }));
  }
);
