import { DataTypes, Model } from "sequelize";
import { sequelize } from "instances/sequelize";
import Player from "./player";

export type CreateUserParams = {
  email: string;
  password: string;
  name?: string;
  photoUrl?: string;
};

export type UserAttributes = {
  email: string;
  password: string;
};

export type UserCreationAttributes = Omit<
  CreateUserParams,
  "password" | "name" | "photoUrl"
>;

export type UserLoginAttributes = UserAttributes;

export interface UserInstance
  extends Model<UserCreationAttributes, UserCreationAttributes>,
    UserCreationAttributes {
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
