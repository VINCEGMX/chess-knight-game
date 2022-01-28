import React from "react";

import classes from "./Button.module.css";

function Button(props) {
  return (
    <button
      style={{ backgroundColor: props.color }}
      type={props.type || "button"}
      className={classes.button}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
