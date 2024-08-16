import React, { useState, useEffect } from 'react';
import './index.css';

const initialBoard = Array(9).fill(null);

const calculateWinner = (squares: (string | null)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Square: React.FC<{ value: string | null; onClick: () => void; disabled: boolean }> = ({ value, onClick, disabled }) => (
  <button
    className={`w-16 h-16 bg-white border border-gray-400 text-2xl font-bold leading-16 text-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    onClick={onClick}
    disabled={disabled}
  >
    {value}
  </button>
);

const Board: React.FC = () => {
  const [squares, setSquares] = useState<Array<string | null>>(initialBoard);
  const [xIsNext, setXIsNext] = useState(true); // X is player, O is computer
  const [isComputerThinking, setIsComputerThinking] = useState(false); // New state for AI delay
  const winner = calculateWinner(squares);
  const gameFinished = !!winner; // Check if the game is finished

  const handleClick = (i: number) => {
    if (squares[i] || isComputerThinking || gameFinished) return; // Disable click if game is won or during computer's turn
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const makeComputerMove = () => {
    setIsComputerThinking(true);
    setTimeout(() => {
      const availableSquares = squares
        .map((val, idx) => val === null ? idx : -1)
        .filter(idx => idx !== -1);

      if (availableSquares.length === 0) {
        setIsComputerThinking(false);
        return;
      }

      const move = availableSquares[Math.floor(Math.random() * availableSquares.length)];
      handleClick(move);
      setIsComputerThinking(false);
    }, 1000); // Delay in milliseconds
  };

  useEffect(() => {
    if (!xIsNext && !gameFinished && !isComputerThinking) {
      makeComputerMove();
    }
  }, [xIsNext, isComputerThinking, gameFinished]);

  const renderSquare = (i: number) => (
    <Square
      key={i}
      value={squares[i]}
      onClick={() => handleClick(i)}
      disabled={gameFinished}
    />
  );

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">{status}</div>
      <div className="flex flex-wrap w-48">
        {Array.from({ length: 3 }, (_, row) => (
          <div key={row} className="flex">
            {Array.from({ length: 3 }, (_, col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">井字游戏</h1>
      <Board />
    </div>
  </div>
);

export default App;
