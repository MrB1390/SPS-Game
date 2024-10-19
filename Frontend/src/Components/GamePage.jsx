import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHandPaper, FaHandRock, FaHandScissors, FaUserAlt } from "react-icons/fa";

const GamePage = () => {
  const [playerName1, setPlayerName1] = useState("");
  const [playerName2, setPlayerName2] = useState("");
  const [player1Choice, setPlayer1Choice] = useState("");
  const [player2Choice, setPlayer2Choice] = useState("");
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [round, setRound] = useState(1);
  const [winner, setWinner] = useState("");

  const baseUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

  const choices = [
    { label: "Stone", icon: <FaHandRock size={50} /> },
    { label: "Paper", icon: <FaHandPaper size={50} /> },
    { label: "Scissors", icon: <FaHandScissors size={50} /> },
  ];

  const calculateWinner = () => {
    if (player1Choice === player2Choice) {
      setPlayer1Score(player1Score + 0.5);
      setPlayer2Score(player2Score + 0.5);
    } else if (
      (player1Choice === "Stone" && player2Choice === "Scissors") ||
      (player1Choice === "Scissors" && player2Choice === "Paper") ||
      (player1Choice === "Paper" && player2Choice === "Stone")
    ) {
      setPlayer1Score(player1Score + 1);
    } else {
      setPlayer2Score(player2Score + 1);
    }

    setRound(round + 1);
    setPlayer1Choice("");
    setPlayer2Choice("");
  };

  const resetGame = () => {
    setPlayerName1('');
    setPlayerName2('');
    setPlayer1Score(0);
    setPlayer2Score(0);
    setRound(1);
    setWinner('');
    setPlayer1Choice('');
    setPlayer2Choice('');
  };

  const submitGameRecord = async () =>{
    const result = player1Score > player2Score ? playerName1 : playerName2;
    setWinner(result);

    try {
        await axios.post(`${baseUrl}/game/newRecord`, {
            playerName1,
            playerName2,
            player1Score,
            player2Score,
            winner: result,
        });
        alert('Thanks For Playing')
    } catch (error) {
        console.error('Error saving game data:', error);
    }
    resetGame(); // reset after Submission
  };

  useEffect(()=>{
    if(round > 6) {
        submitGameRecord();
    }
  },[round])
  
  const isGameOver = round > 6
  const isChoice = playerName1 && playerName2

  return( 
  <div>
    <div className="row mt-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Player 1 Name"
            value={playerName1}
            onChange={(e) => setPlayerName1(e.target.value)}
            required
            disabled={round > 1}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Player 2 Name"
            value={playerName2}
            onChange={(e) => setPlayerName2(e.target.value)}
            required
            disabled={round > 1}
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 text-center">
          <h5>Player 1</h5>
          <FaUserAlt size={50} /> {/* Player 1 Icon */}
          {choices.map((choice) => (
            <button
              key={choice.label}
              className="btn btn-primary m-2"
              onClick={() => setPlayer1Choice(choice.label)}
              disabled={ !isChoice || !!player1Choice || isGameOver}
            >
              {choice.icon}
              <br />
              {choice.label}
            </button>
          ))}
        </div>
        <div className="col-md-6 text-center">
          <h5>Player 2</h5>
          <FaUserAlt size={50} /> {/* Player 2 Icon */}
          {choices.map((choice) => (
            <button
              key={choice.label}
              className="btn btn-primary m-2"
              onClick={() => setPlayer2Choice(choice.label)}
              disabled={ !isChoice || !!player2Choice || isGameOver}
            >
              {choice.icon}
              <br />
              {choice.label}
            </button>
          ))}
        </div>
      </div>

      <div className="row mt-4 text-center">
        <div className="col-md-6">
          <h5>Player 1 Chose: {player1Choice}</h5>
        </div>
        <div className="col-md-6">
          <h5>Player 2 Chose: {player2Choice}</h5>
        </div>
      </div>

      <div className="row mt-4 text-center">
        <div className="col-md-12">
          <h3>Round {round} / 6</h3>
          <button
            className="btn btn-success"
            onClick={calculateWinner}
            disabled={!player1Choice || !player2Choice || isGameOver}
          >
            Submit Round
          </button>
        </div>
      </div>

      {isGameOver && (
        <div className="row mt-4 text-center">
          <h3>Game Over! Winner: {winner}</h3>
        </div>
      )}
    </div>
  );
};

export default GamePage;
