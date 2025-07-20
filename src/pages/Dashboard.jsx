import { useEffect, useState } from "react";
import AddGoalForm from "../components/AddGoalForm";
import GoalCard from "../components/GoalCard";
import DepositForm from "../components/DepositForm";
import CategoryPieChart from "../components/CategoryPieChart";
import OverviewDisplay from "../components/OverviewDisplay";

function Dashboard() {
  const [goals, setGoals] = useState([]);

  const fetchGoals = () => {
    fetch("http://localhost:3002/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Failed to fetch goals", err));
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleGoalAdd = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  const handleDeposit = () => {
    fetchGoals();
  };

  const handleEditGoal = (goal) => {
  console.log("Edit goal clicked:", goal);
  };

  const handleDeleteGoal = async (id) => {
    try {
      const res = await fetch(`http://localhost:3002/goals/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
      } else {
        console.error("Failed to delete goal");
      }
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };

  return (
    <div className="container">
      <h1>Smart Goal Planner</h1>

      
      <AddGoalForm onGoalAdded={handleGoalAdd} />

      <DepositForm onDeposit={handleDeposit} />

      <CategoryPieChart goals={goals} />

      <OverviewDisplay goals={goals} />

      

      <h2>Your Goals</h2>
      {goals.length === 0 ? (
        <p>No goals yet. Start by adding one above!</p>
      ) : (
        goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onDelete={handleDeleteGoal}
            onEdit={handleEditGoal}
          />
        ))
      )}
    </div>
  );
}

export default Dashboard;
