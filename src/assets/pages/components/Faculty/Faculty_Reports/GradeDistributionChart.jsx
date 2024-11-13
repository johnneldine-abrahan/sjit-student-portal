import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "A", value: 400 },
  { name: "B", value: 300 },
  { name: "C", value: 300 },
  { name: "D", value: 200 },
  { name: "F", value: 100 },
];

const GradeDistributionChart = () => {
  return (
    <LineChart width={500} height={500} data={data}>
      {" "}
      {/* Adjusted width */}
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#0088FE" />
    </LineChart>
  );
};

export default GradeDistributionChart;