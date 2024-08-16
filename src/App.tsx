import React, { useState } from 'react';
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Square: React.FC<{ value: string | null; onClick: () => void }> = ({ value, onClick }) => {
  return (
    <button
      className="w-16 h-16 bg-white border border-gray-400 text-2xl font-bold leading-16 text-center cursor-pointer"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

const Board: React.FC = () => {
  const [squares, setSquares] = useState<Array<string | null>>(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);

  const handleClick = (i: number) => {
    const newSquares = squares.slice();
    if (winner || newSquares[i]) return;
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i: number) => (
    <Square
      value={squares[i]}
      onClick={() => handleClick(i)}
    />
  );

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">{status}</div>
      <div className="flex flex-wrap w-48">
        <div className="flex">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="flex">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="flex">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
        <Board />
      </div>
    </div>
  );
};

export default App;
