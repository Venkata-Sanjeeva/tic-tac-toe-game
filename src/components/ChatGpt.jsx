import React, { useState } from 'react';

const rowStyle = {
  display: 'flex'
};

const squareStyle = {
  width: '60px',
  height: '60px',
  backgroundColor: '#ddd',
  margin: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  color: 'white',
  cursor: 'pointer'
};

const boardStyle = {
  backgroundColor: '#eee',
  width: '208px',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  border: '3px #eee solid'
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
};

const instructionsStyle = {
  marginTop: '5px',
  marginBottom: '5px',
  fontWeight: 'bold',
  fontSize: '16px',
};

const buttonStyle = {
  marginTop: '15px',
  marginBottom: '16px',
  width: '80px',
  height: '40px',
  backgroundColor: '#8acaca',
  color: 'white',
  fontSize: '16px',
};

function Square({ value, onClick }) {
  return (
    <div
      className="square"
      style={squareStyle}
      onClick={onClick}>
      {value}
    </div>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  function calculateWinner(squares) {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(index) {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const newWinner = calculateWinner(newSquares);
    setWinner(newWinner);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span>{isXNext ? 'X' : 'O'}</span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span>{winner ? winner : 'None'}</span>
      </div>
      <button style={buttonStyle} onClick={handleReset}>Reset</button>
      <div style={boardStyle}>
        {[0, 1, 2].map(row => (
          <div key={row} className="board-row" style={rowStyle}>
            {[0, 1, 2].map(col => {
              const index = row * 3 + col;
              return (
                <Square
                  key={index}
                  value={squares[index]}
                  onClick={() => handleClick(index)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ChatGpt() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}
