import React from "react";
import { useTranslation } from "react-i18next";
import { IsummData as Props } from "../../interfaces/IsummData";
import { Icon } from "@iconify/react";
import Card from "../UI/card/Card";
import classes from "./SummaryBox.module.scss";

const SummaryBox: React.FC<{ item: Props }> = (props) => {
  return (
    <div className={classes.summary__box}>
      <Card>
        <div className={classes.summary__box__wrapper}>
            <div className={classes.summary__box__info__amount}>
                <h4>{props.item.value}</h4>
                <p>{props.item.desc}</p>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default SummaryBox;
