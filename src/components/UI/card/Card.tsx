// import React from "react";
// import classes from "./Card.module.scss";
// const Card: React.FC = (props) => {
//   return <div className={classes.card}>{props.children}</div>;
// };

// export default Card;
import React, { CSSProperties, ReactNode } from "react";
import classes from "./Card.module.scss";

interface CardProps {
  children: ReactNode;
  style?: CSSProperties; // Add a style prop to accept inline styling
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className={classes.card} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
