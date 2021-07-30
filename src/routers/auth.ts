import { matchedData, validationResult } from "express-validator";
import { Router } from "express";
import { userRules } from "../rules/user";
import { AuthService } from "../services/auth";
import { UserCreationAttributes } from "../models/user";

export const authRouter = Router();
const authService = new AuthService();

authRouter.post("/register", userRules["forRegister"], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json(errors.array());

  const payload = matchedData(req) as UserCreationAttributes;
  const user = authService.register(payload);

  return user.then((u) => res.json(u));
});

authRouter.post("/login", userRules["forLogin"], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(422).json(errors.array());

  const payload = matchedData(req) as UserCreationAttributes;
  const token = authService.login(payload);
  return token.then((token) => res.json({ token }));
});
