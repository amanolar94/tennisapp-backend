import { DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/sequelize";

export type resetPasswordAttributes = {
  userEmail: string;
  token: string;
};

export type resetPasswordPayload = { email: string };

export interface resetPasswordInstance
  extends Model<resetPasswordAttributes>,
    resetPasswordAttributes {}

const resetPassword = sequelize.define<resetPasswordInstance>(
  "resetPassword",
  {
    userEmail: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.TEXT,
    },
    token: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true, //Stops auto-pluralization to table names
    timestamps: false,
  }
);

export default resetPassword;
