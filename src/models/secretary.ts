import { sequelize } from "instances/sequelize";
import { DataTypes, Model } from "sequelize";

export type SecretaryAttributes = {
  secretaryEmail: string;
  clubId: number;
};

export type SecretaryCreationAttributes = SecretaryAttributes;

export interface PlayerInstance
  extends Model<SecretaryAttributes, SecretaryCreationAttributes>,
    SecretaryAttributes {}

const Secretary = sequelize.define<PlayerInstance>(
  "secretary",
  {
    secretaryEmail: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.TEXT,
      unique: true,
    },
    clubId: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true, //Stops auto-pluralization to table names
    timestamps: false,
  }
);

export default Secretary;
