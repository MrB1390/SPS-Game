
//POSTGRES
import { DataTypes } from 'sequelize';
import sequelize from '../Database/db.connect.js';

const Gamer = sequelize.define('Gamer', {
  gamerId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  playerName1: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 50],
    },
  },
  playerName2: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 50],
    },
  },
  player1Score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  player2Score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  winner: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false, // Disable timestamps if not needed
});

export default Gamer;
