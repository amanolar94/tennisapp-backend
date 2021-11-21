import User from "models/user";
import { check } from "express-validator";

export const userRules = {
  forRegister: [
    check("email")
      .isEmail()
      .withMessage("Invalid email format")
      .custom((email) =>
        User.findOne({ where: { email } }).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        })
      ),

    check("password").isLength({ min: 8 }).withMessage("Invalid password"),
    check("confirmPassword")
      .custom(
        (confirmPassword, { req }) => req.body.password === confirmPassword
      )
      .withMessage("Passwords are different"),
    check("name").optional(),
    check("role")
      .custom((role) => role === "player" || role === "sec")
      .withMessage(
        (role) =>
          `The available roles are 'player' or 'sec' and you provided '${role}'`
      ),
  ],
};
