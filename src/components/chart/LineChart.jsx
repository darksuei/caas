import React from 'react'
import {
    ComposedChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

import classes from "./Chart.module.scss";
  
const data = [
    {name: 'January', Present: 1, TotalMembers: 10},
    {name: 'February', Present: 3},
    {name: 'March', Present: 2},
    {name: 'April', Present: 4},
    {name: 'May', Present: 2},
    {name: 'June', Present: 1},
];
  

const LineChart = () => {
  return (
    <div className={classes.lineChart}>   
    <div className="name">Congregation Attendance</div>                         
      
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={600}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 80,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" label={{ value: '', position: 'insideBottomLeft', offset: 0 }} scale="band" />
          <Tooltip />
          <Line width={"100%"} type="monotone" dataKey="Present" className={classes.lineChartLine} stroke='#000080'/>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChart