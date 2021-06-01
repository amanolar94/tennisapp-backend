import { Sequelize } from "sequelize";

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config();
}

const db = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const port = parseInt(process.env.DB_PORT);

export const sequelize = new Sequelize(db, username, password, {
  dialect: "mariadb",
  host: "localhost",
  port,
});

sequelize.authenticate();
