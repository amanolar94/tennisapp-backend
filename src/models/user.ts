import { DataTypes, Model } from "sequelize";
import { sequelize } from "instances/sequelize";
import Player from "./player";
import Secretary from "./secretary";

export type Roles = "player" | "sec";

export type CreateUserParams = {
  email: string;
  password: string;
  name?: string;
  photoUrl?: string;
};
export interface CreateUserRequest extends CreateUserParams {
  role: Roles;
  clubId?: number;
}

export type UserAttributes = {
  email: string;
  password: string;
};

export type UserCreationAttributes = Omit<
  CreateUserParams,
  "password" | "name" | "photoUrl" | "role"
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

User.hasMany(Secretary, {
  sourceKey: "email",
  foreignKey: "secretaryEmail",
  as: "secretary",
});

Secretary.belongsTo(User, {
  foreignKey: "secretaryEmail",
  as: "user",
});

export default User;
