import { DataTypes, Model } from "sequelize";
import { sequelize } from "instances/sequelize";

export type resetPasswordAttributes = {
  userEmail: string;
  token: string;
};

export type resetPasswordPayload = { email: string };

export interface resetPasswordInstance
  extends Model<resetPasswordAttributes>,
    resetPasswordAttributes {}
