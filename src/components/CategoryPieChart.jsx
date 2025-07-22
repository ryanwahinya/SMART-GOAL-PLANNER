import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryPieChart() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data));
  }, []);

  const categoryTotals = goals.reduce((acc, goal) => {
    if (!acc[goal.category]) {
      acc[goal.category] = 0;
    }
    acc[goal.category] += goal.saved;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Savings by Category",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#4caf50",
          "#2196f3",
          "#ff9800",
          "#9c27b0",
          "#f44336",
          "#00bcd4",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-container">
      <h2>Savings by Category</h2>
      <div className="chart-wrapper">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}

export default CategoryPieChart;
