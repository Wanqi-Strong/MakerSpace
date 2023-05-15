import React, { PureComponent } from "react";

import {
    PieChart, Pie, Legend, Tooltip,
} from "recharts";

const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
  ];

function MyPieChart(props) {
    return (
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
    );
}
export default MyPieChart;