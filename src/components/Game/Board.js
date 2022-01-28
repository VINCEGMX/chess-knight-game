import classes from "./Board.module.css";
import Tile from "./Tile";

function Board(props) {
  const { pieceLocation, targetLocation, onMove } = props;
  let board = [];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board.push(
        <Tile
          key={i.toString() + j.toString()}
          indX={i}
          indY={j}
          pieceIsShown={
            pieceLocation.x === i && pieceLocation.y === j ? true : false
          }
          targetIsShown={
            targetLocation.x === i && targetLocation.y === j ? true : false
          }
          onMove={onMove}
        />
      );
    }
  }

  return <div className={classes.board}>{board}</div>;
}

export default Board;
