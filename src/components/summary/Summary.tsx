import React from "react";

import SummaryBox from "./SummaryBox";
import classes from "./Summary.module.scss";
import { IsummData } from "../../interfaces/IsummData";

const summaryData: IsummData[] = [
  {
    value: '2,450',
    desc: "Total No. of Churches",
  },
  {
    value: '4,450',
    desc: "Total No. of Parish",
  },
  {
    value: '20',
    desc: "Month Onboarding",
  },
  {
    value: '40',
    desc: "Total Deactivated",
  },
];

function Summary() {

  return (
    <section className={classes.summary}>
      <p className="subTitle">Summary</p>
      <div className={classes.summary__box}>
        {summaryData.map((item) => (
          <SummaryBox key={item.desc} item={item} />
        ))}
      </div>
    </section>
  );
}

export default Summary;