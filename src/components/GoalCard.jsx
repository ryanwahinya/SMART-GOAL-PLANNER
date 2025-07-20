import { useState } from "react";

function GoalCard({ goal, onDelete, onEdit }) {
  const { id, name, targetAmount, saved, category, deadline, createdAt } = goal;

  const progress = Math.min((saved / targetAmount) * 100, 100);
  const remaining = Math.max(targetAmount - saved, 0);

  const today = new Date();
  const deadlineDate = new Date(deadline);
  const timeDiff = deadlineDate - today;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  let status = "";
  let statusClass = "";

  if (progress >= 100) {
    status = "✅ Completed";
    statusClass = "status completed";
  } else if (daysLeft < 0) {
    status = "❌ Overdue";
    statusClass = "status overdue";
  } else if (daysLeft <= 30) {
    status = "⚠️ Deadline Soon";
    statusClass = "status warning";
  } else {
    status = "In Progress";
    statusClass = "status";
  }

  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [estimatedMonths, setEstimatedMonths] = useState(null);

  const handleSuggestion = (e) => {
    e.preventDefault();
    const monthly = parseFloat(monthlyAmount);
    if (monthly > 0) {
      const months = Math.ceil(remaining / monthly);
      setEstimatedMonths(months);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="goal-card">
      <div className="goal-header">
        <h3>{name}</h3>
        <span className={statusClass}>{status}</span>
      </div>

      <div className="goal-info">
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Target:</strong> ${targetAmount.toLocaleString()}</p>
        <p><strong>Saved:</strong> ${saved.toLocaleString()}</p>
        <p><strong>Remaining:</strong> ${remaining.toLocaleString()}</p>
        <p><strong>Deadline:</strong> {deadline} ({daysLeft} days left)</p>
        <p><strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}</p>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <form onSubmit={handleSuggestion} className="suggestion-form">
        <label>💡 Monthly saving suggestion:</label>
        <input
          type="number"
          placeholder="e.g. 100"
          value={monthlyAmount}
          onChange={(e) => setMonthlyAmount(e.target.value)}
          min="1"
        />
        <button type="submit">Calculate</button>

        {estimatedMonths !== null && (
          <p className="suggestion-output">
            ➡️ You’ll reach your goal in <strong>{estimatedMonths}</strong>{" "}
            month{estimatedMonths > 1 ? "s" : ""}.
          </p>
        )}
      </form>

      <div className="goal-actions">
        <button className="edit-btn" onClick={() => onEdit(goal)}>Edit</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default GoalCard;
