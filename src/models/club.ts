import { DataTypes, Model } from "sequelize";
import { sequelize } from "instances/sequelize";
import Secretary from "./secretary";

export type ClubAttributes = {
  id: number;
  name: string;
  long: string;
  lat: string;
};

export type CreateClubParams = Omit<ClubAttributes, "id">;

export type ClubInstance = Model<ClubAttributes>;

const Club = sequelize.define<ClubInstance>(
  "club",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    long: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: { type: DataTypes.STRING, allowNull: false },
  },
  {
    freezeTableName: true, //Stops auto-pluralization to table names
    timestamps: false,
  }
);

Club.hasMany(Secretary, {
  sourceKey: "email",
  foreignKey: "secretaryEmail",
  as: "secretary",
});

Secretary.belongsTo(Club, {
  foreignKey: "secretaryEmail",
  as: "club",
});

export default Club;
