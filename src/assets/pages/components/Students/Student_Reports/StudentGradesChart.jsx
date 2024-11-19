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

const StudentGradesChart = ({ gradesData }) => {
  // Format the grades data for the chart
  const chartData = gradesData.map((grade) => ({
    subject: grade.subject_name,
    grade: grade.grade,
  }));

  return (
    <BarChart width={500} height={500} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="subject" />
      {/* Set the ground number to 75 and customize ticks */}
      <YAxis ticks={[70, 75, 80, 85, 90, 95, 100]} domain={[70, 100]} />
      <Tooltip />
      <Legend />
      <Bar dataKey="grade" fill="#7b8bbc" />
    </BarChart>
  );
};

export default StudentGradesChart;
