import dotenv from "dotenv";
import Gamer from "../Models/gamer.schema.js";

dotenv.config();

export const createRecord = async (req, res) => {
  try {
    const { playerName1, playerName2, player1Score, player2Score, winner } =
      req.body; //Destructure Fields from request body
    const gamerRecord = new Gamer({
      playerName1,
      playerName2,
      player1Score,
      player2Score,
      winner,
    });
    await gamerRecord.save();
    res.status(201).json({
      message: "Record created Successfully",
      data: gamerRecord,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in Storing the Record" });
  }
};

export const getRecordAll = async (req, res) => {
  try {
    const data = await Gamer.find();
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error Fetching the data",
    });
  }
};
