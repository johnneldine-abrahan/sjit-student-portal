import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Sample data for the bar chart
const data = [
  { subject: "Math", grade: 85 },
  { subject: "Science", grade: 90 },
  { subject: "English", grade: 78 },
  { subject: "History", grade: 88 },
  { subject: "Art", grade: 112 },
];

const StudentGradesChart = () => {
  return (
    <BarChart width={500} height={500} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="subject" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="grade" fill="#7b8bbc" />
    </BarChart>
  );
};

export default StudentGradesChart;