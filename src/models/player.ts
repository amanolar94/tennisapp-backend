import { sequelize } from "instances/sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export type PlayerAttributes = {
  userEmail: string;
  points: number;
  commendmentsCount: number;
  penaltyExpiration: string;
  penaltyReason: string;
};

export type PlayerCreationAttributes = Optional<
  PlayerAttributes,
  "points" | "commendmentsCount" | "penaltyExpiration" | "penaltyReason"
>;

export interface PlayerInstance
  extends Model<PlayerAttributes, PlayerCreationAttributes>,
    PlayerAttributes {}

const Player = sequelize.define<PlayerInstance>(
  "player",
  {
    userEmail: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.TEXT,
      unique: true,
    },
    points: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    commendmentsCount: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    penaltyExpiration: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    penaltyReason: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true, //Stops auto-pluralization to table names
    timestamps: false,
  }
);

export default Player;
