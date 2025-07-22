import { useEffect, useState } from "react";
import EditGoalForm from "../components/EditGoalForm";
import AddGoalForm from "../components/AddGoalForm";
import GoalCard from "../components/GoalCard";
import DepositForm from "../components/DepositForm";
import CategoryPieChart from "../components/CategoryPieChart";
import OverviewDisplay from "../components/OverviewDisplay";

function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null); 

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
    setEditingGoal(goal);
  };

  const handleUpdateGoal = async (updatedGoal) => {
    try {
      const res = await fetch(`http://localhost:3002/goals/${updatedGoal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedGoal),
      });

      if (res.ok) {
        const updated = await res.json();
        setGoals((prevGoals) =>
          prevGoals.map((g) => (g.id === updated.id ? updated : g))
        );
        setEditingGoal(null); 
      } else {
        console.error("Failed to update goal");
      }
    } catch (err) {
      console.error("Error updating goal:", err);
    }
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

      {editingGoal ? (
        <EditGoalForm
          goal={editingGoal}
          onSave={handleUpdateGoal}
          onCancel={() => setEditingGoal(null)}
        />
      ) : (
        <>
          <AddGoalForm onGoalAdded={handleGoalAdd} />
          <DepositForm onDeposit={handleDeposit} />
        </>
      )}

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
