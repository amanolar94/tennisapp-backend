import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../instances/sequelize";
import Player from "./player";

export type UserAttributes = {
  email: string;
  name: string;
  password: string;
};

export type UserCreationAttributes = Optional<UserAttributes, "name">;

export type UserLoginAttributes = Omit<UserAttributes, "name">;

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt: string;
  updatedAt: string;
}

const User = sequelize.define<UserInstance>(
  "user",
  {
    email: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.TEXT,
      unique: true,
    },
    name: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true, //Stops auto-pluralization to table names
  }
);

User.hasMany(Player, {
  sourceKey: "email",
  foreignKey: "userEmail",
  as: "player",
});

Player.belongsTo(User, {
  foreignKey: "userEmail",
  as: "user",
});

export default User;
