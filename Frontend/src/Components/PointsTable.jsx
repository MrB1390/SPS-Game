import axios from "axios";
import React, { useState, useEffect } from "react";

const PointsTable = () => {
  const [gameRecord, setGameRecord] = useState([]);
  const baseUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
  const fetchRecord = async () => {
    try {
      const response = await axios.get(`${baseUrl}/game/getRecord`);
      setGameRecord(response.data.data);
    } catch (error) {
      console.error("Error fetching game records:", error);
    }
  };
  useEffect(() => {
    fetchRecord();
  }, []);
  return (
    <div>
      <h3 className="mt-4">Point Table</h3>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th scope="col">Game ID</th>
            <th scope="col">Player 1</th>
            <th scope="col">Player 2</th>
            <th scope="col">Player 1 Score</th>
            <th scope="col">Player 2 Score</th>
            <th scope="col">Winner</th>
          </tr>
        </thead>
        <tbody>
          {gameRecord.map((game, index) => (
            <tr key={index}>
              <td>{game.gamerId}</td>
              <td>{game.playerName1}</td>
              <td>{game.playerName2}</td>
              <td>{game.player1Score}</td>
              <td>{game.player2Score}</td>
              <td>{game.winner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PointsTable;
