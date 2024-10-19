import mongoose from "mongoose";

const gamerSchema = new mongoose.Schema({
  gamerId: {
    type: Number,
    default: 0,
  },
  playerName1: {
    type: String,
    required: [true, "firstName is required"],
    maxLength: 50,
  },
  playerName2: {
    type: String,
    required: [true, "lastName is required"],
    maxLength: 50,
  },
  player1Score: {
    type: Number,
    default: 0,
  },
  player2Score: {
    type: Number,
    default: 0,
  },
  winner: {
    type: String,
  },
});

gamerSchema.pre("save", async function (next) {
  try {
    const count = await Gamer.countDocuments({});
    this.gamerId = count + 1;
    next();
  } catch (error) {
    next(error);
  }
});

const Gamer = mongoose.model("gamer", gamerSchema);
export default Gamer;
