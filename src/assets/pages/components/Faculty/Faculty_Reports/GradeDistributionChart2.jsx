import React from "react";
import {
 
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const GradeDistributionChart = ({ data }) => {
  return (
    <div>
      <BarChart width={700} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default GradeDistributionChart;