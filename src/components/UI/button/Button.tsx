import React from "react";
import classes from "./Button.module.scss";

interface Props {
  type?: "button" | "submit";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  outline?: boolean;
  disabled?: boolean; // Add the disabled prop here
}

const Button: React.FC<Props> = (props) => {
  return (
    <button
      className={`${classes.btn} ${
        props.outline ? classes.outline : classes.button
      } `}
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled} // Pass the disabled prop to the button
    >
      {props.children}
    </button>
  );
};

export default Button;
