import { useEffect, useState } from "react";

function DepositForm({ onDeposit }) {
  const [goals, setGoals] = useState([]);
  const [goalId, setGoalId] = useState("");
  const [amount, setAmount] = useState("");

  // Fetch all goals from the JSON Server
  useEffect(() => {
    fetch("http://localhost:3001/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Failed to fetch goals:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const depositAmount = parseFloat(amount);
    if (!goalId || depositAmount <= 0 || isNaN(depositAmount)) {
      alert("Please select a goal and enter a valid amount.");
      return;
    }

    const selectedGoal = goals.find((g) => g.id === parseInt(goalId));
    if (!selectedGoal) return;

    const updatedGoal = {
      ...selectedGoal,
      saved: selectedGoal.saved + depositAmount,
    };

    try {
      const res = await fetch(`http://localhost:3001/goals/${goalId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGoal),
      });

      if (!res.ok) throw new Error("Failed to deposit");

      const result = await res.json();
      onDeposit(result);

      setAmount("");
      setGoalId("");
    } catch (err) {
      console.error("Deposit error:", err);
      alert("Deposit failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <h2>Make a Deposit</h2>

      <label>Select Goal:</label>
      <select
        value={goalId}
        onChange={(e) => setGoalId(e.target.value)}
        required
      >
        <option value="">-- Choose a goal --</option>
        {goals.map((goal) => (
          <option key={goal.id} value={goal.id}>
            {goal.name}
          </option>
        ))}
      </select>

      <label>Amount to Deposit:</label>
      <input
        type="number"
        min="1"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
