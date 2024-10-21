
import Gamer from '../Models/gamer.schema.js';

export const createRecord = async (req, res) => {
  try {
    const { playerName1, playerName2, player1Score, player2Score, winner } = req.body;

    const gamerRecord = await Gamer.create({
      playerName1,
      playerName2,
      player1Score,
      player2Score,
      winner,
    });

    res.status(201).json({
      message: 'Record created successfully',
      data: gamerRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error storing the record' });
  }
};

export const getRecordAll = async (req, res) => {
  try {
    const data = await Gamer.findAll();
    res.status(200).json({ data:data });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching the data' });
  }
};
