import { matchedData, validationResult } from "express-validator";
import { Router } from "express";
import { userRules } from "../rules/user";
import { UserService } from "../services/user";
import { UserCreationAttributes } from "../models/user";

export const userRouter = Router();
const userService = new UserService();

userRouter.post("/register", userRules["forRegister"], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json(errors.array());

  const payload = matchedData(req) as UserCreationAttributes;
  const user = userService.register(payload);

  return user.then((u) => res.json(u));
});

userRouter.post("/login", userRules["forLogin"], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(422).json(errors.array());

  const payload = matchedData(req) as UserCreationAttributes;
  const token = userService.login(payload);
  return token.then((token) => res.json({ token }));
});
