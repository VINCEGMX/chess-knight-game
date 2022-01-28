import React, { useState, useEffect } from "react";
import classes from "./Tile.module.css";
import knightImage from "../../assets/chess-knight.png";
import targetImage from "../../assets/target.png";

function Tile(props) {
  const { indX, indY, pieceIsShown, targetIsShown, onMove } = props;
  const [showPiece, setShowPiece] = useState(pieceIsShown);
  const [showTarget, setShowTarget] = useState(targetIsShown);
  useEffect(() => {
    setShowPiece(pieceIsShown);
  }, [pieceIsShown]);

  useEffect(() => {
    setShowTarget(targetIsShown);
  }, [targetIsShown]);

  let colorStyle;
  if (indX % 2 === 0) {
    colorStyle = indY % 2 === 0 ? classes.white : classes.black;
  } else {
    colorStyle = indY % 2 === 0 ? classes.black : classes.white;
  }

  return (
    <div
      className={`${classes.tile} ${colorStyle}`}
      onClick={onMove.bind(null, indX, indY)}
    >
      {showPiece && <img src={knightImage} alt="knight" />}
      {showTarget && <img src={targetImage} alt="target" />}
    </div>
  );
}

export default React.memo(Tile);
