import { useState, useCallback, useEffect } from "react";
import classes from "./Game.module.css";
import Board from "./Board";
import Button from "../UI/Button";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateLocations() {
  const rndTargetX = randomIntFromInterval(0, 7);
  const rndTargetY = randomIntFromInterval(0, 7);
  let rndPieceX = -1,
    rndPieceY = -1;
  do {
    rndPieceX = randomIntFromInterval(0, 7);
    rndPieceY = randomIntFromInterval(0, 7);
  } while (rndPieceX === rndTargetX && rndPieceY === rndTargetY);
  return { rndPieceX, rndPieceY, rndTargetX, rndTargetY };
}

function findShortestPath(startX, startY, destX, destY) {
  let dir = [
    [-2, -1],
    [-2, +1],
    [-1, -2],
    [+1, -2],
    [+2, -1],
    [+2, +1],
    [-1, +2],
    [+1, +2],
  ];

  let queue = [[[startX, startY]]];
  let visited = new Set();

  while (queue.length !== 0) {
    let path = queue.shift();
    let cur = path.at(-1);
    if (cur[0] === destX && cur[1] === destY) return path[1];
    for (let d of dir) {
      let nextX = cur[0] + d[0],
        nextY = cur[1] + d[1];
      if (
        nextX >= 0 &&
        nextX < 8 &&
        nextY >= 0 &&
        nextY < 8 &&
        !visited.has(nextX + "," + nextY)
      ) {
        let newPath = [...path];
        newPath.push([nextX, nextY]);
        queue.push(newPath);
        visited.add(nextX + "," + nextY);
      }
    }
  }
}

function Game() {
  const [pieceLocation, setPieceLocation] = useState({
    x: -1,
    y: -1,
  });
  const [clickLocation, setClickLocation] = useState({
    x: -1,
    y: -1,
  });
  const [targetLocation, setTargetLocation] = useState({
    x: -1,
    y: -1,
  });
  const [gameStart, setGameStart] = useState(false);
  const [success, setSuccess] = useState(false);

  const startGameHandler = () => {
    const { rndPieceX, rndPieceY, rndTargetX, rndTargetY } =
      generateLocations();
    setPieceLocation({ x: rndPieceX, y: rndPieceY });
    setClickLocation({ x: rndPieceX, y: rndPieceY });
    setTargetLocation({ x: rndTargetX, y: rndTargetY });
    setGameStart(true);
    setSuccess(false);
  };

  const helperHandler = () => {
    if (!success) {
      const nextStep = findShortestPath(
        pieceLocation.x,
        pieceLocation.y,
        targetLocation.x,
        targetLocation.y
      );
      setClickLocation({ x: nextStep[0], y: nextStep[1] });
    }
  };

  const pieceMoveHandler = useCallback((i, j) => {
    setClickLocation({ x: i, y: j });
  }, []);

  useEffect(() => {
    if (gameStart) {
      if (
        Math.abs(clickLocation.x - pieceLocation.x) ** 2 +
          Math.abs(clickLocation.y - pieceLocation.y) ** 2 ===
        5
      ) {
        if (
          clickLocation.x === targetLocation.x &&
          clickLocation.y === targetLocation.y
        ) {
          setSuccess(true);
          setGameStart(false);
        }
        setPieceLocation({ x: clickLocation.x, y: clickLocation.y });
      }
    }
  }, [gameStart, clickLocation, pieceLocation, targetLocation]);

  return (
    <div className={classes.container}>
      <Board
        pieceLocation={pieceLocation}
        targetLocation={targetLocation}
        onMove={pieceMoveHandler}
      />
      <div>
        <Button color="green" onClick={startGameHandler}>
          Start Game
        </Button>
        <Button color="blue" onClick={helperHandler}>
          Help
        </Button>
      </div>
      {success && (
        <div style={{ color: "red" }}>Success! You can start again</div>
      )}
    </div>
  );
}

export default Game;
