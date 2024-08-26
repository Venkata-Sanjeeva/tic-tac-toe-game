import React, { useState } from 'react';

export default function Body() {
  const [gameArray, setGameArray] = useState(Array(9).fill(null));
  const [gameOver, setGameOver] = useState(false)
  const [moveName, setMoveName] = useState("X");

  function checkWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (gameArray[a] && gameArray[a] === gameArray[b] && gameArray[a] === gameArray[c]) {
        return [true, gameArray[a]];
      }
    }

    if (gameArray.every(box => box !== null)) {
      return [true, "Draw"];
    }

    return [false, null];
  }

  function updateMove(index, move) {

    if (gameOver || gameArray[index] !== null) {
      return; // If the game is over or the box is already filled, do nothing
    }
    
    // Create a new copy of gameArray, update the relevant index
    setGameArray(prevGameArray => {
        const newGameArray = [...prevGameArray];
        newGameArray[index] = newGameArray[index] === null ? move : newGameArray[index];
        return newGameArray;
    });

    if (checkWinner()[0]) {
      setGameOver(true);
    } else {
      setMoveName(move === "X" ? "O" : "X");
    }

  }

  function resetScore() {
    setGameArray(Array(9).fill(null));
    setMoveName("X");
    setGameOver(false);
  }

  return (
    <div className='game-body'>
      <div className="player-moves">
        {checkWinner()[0] && checkWinner()[1] !== "Draw" ? (
            <p className="player-move-heading">Player <span className='move-name'>{checkWinner()[1]}</span> Won !!!</p>
          ) : checkWinner()[0] && checkWinner()[1] === "Draw" ? (
            <p className="player-move-heading"><span className='move-name'>It's a Draw !</span></p>
          ) : (
            <p className="player-move-heading">
              Player <span className='move-name'>{moveName}</span>'s Move.
            </p>
          )}
      </div>
      <div className="game-space">
        {gameArray.map((box, index) => {
            return (
                <div className="box" key={index} onClick={() => updateMove(index, moveName)}>
                    <p className="move-name" key={index + 1}>{box}</p>
                </div>
            )
        })}
      </div>
        {checkWinner()[0] || checkWinner()[1] === "Draw" ? <button className='reset-btn' onClick={resetScore}>Reset Score</button> : ""}
    </div>
  )
}
