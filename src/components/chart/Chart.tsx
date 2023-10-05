import React, { useState } from "react";
import { faker } from "@faker-js/faker";

import { useTranslation } from "react-i18next";
import BarChart from "./BarChart";
import classes from "./Chart.module.scss";
import data from "../../constants/data";
import Card from "../UI/card/Card";

const Chart = () => {
    const labels = data.revenueByMonths.labels.map((month) => (month));
    const values = data.revenueByMonths.data.map((value) => (value))

    const [parishData] = useState({
        labels,
        datasets: [
            {
            label: ("Added Parishes"),
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            // data:  values,
            backgroundColor: "rgba(0, 0, 128, 0.5)",
            },
        ],
    });

    const [churchData] = useState({
        labels,
        datasets: [
          {
            label: "Added Churches",
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            // data:  values,
            backgroundColor: "rgba(0, 0, 128, 0.5)",
          },
        ],
    });
    
    return(
        <section className={classes.chart}>
        <p className="subTitle">Analysis <span style={{fontSize: '12px'}}>(Over the Last 6 Months)</span></p>
        <div className={classes.charts__container}>
          <div className={classes.charts__wrapper}>
            <Card>
              <div className={classes.chart__wrapper}>
                <BarChart
                  chartData={parishData}
                  chartTitle={`${"Added Parishes"}`}
                />
              </div>
            </Card>
            <Card>
            <div className={classes.chart__wrapper}>
              <BarChart
                chartData={churchData}
                chartTitle={`${"Added Churches"}`}
              />
            </div>
          </Card>
          </div>
        </div>
      </section>   
    )
}


export default Chart;