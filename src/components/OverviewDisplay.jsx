import React from "react";

function OverviewDisplay({ goals }) {
  const totalGoals = goals.length;

  const totalSaved = goals.reduce((sum, goal) => sum + (goal.saved || 0), 0);

  const completedGoals = goals.filter(
    (goal) => goal.saved >= goal.targetAmount
  ).length;

  const today = new Date();

  const getStatusMessage = (goal) => {
    const deadlineDate = new Date(goal.deadline);
    const timeDiff = deadlineDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (goal.saved >= goal.targetAmount) {
      return <span className="completed">✅ Completed</span>;
    } else if (daysLeft < 0) {
      return <span className="overdue">❌ Overdue</span>;
    } else if (daysLeft <= 30) {
      return <span className="warning">⚠️ {daysLeft} days left</span>;
    } else {
      return <span>{daysLeft} days left</span>;
    }
  };

  return (
    <div className="overview-card">
      <h2>📊 Overview</h2>

      <div className="overview-stats">
        <p><strong>Total Goals:</strong> {totalGoals}</p>
        <p><strong>Total Saved:</strong> ${totalSaved.toLocaleString()}</p>
        <p><strong>Goals Completed:</strong> {completedGoals}</p>
      </div>

      <h3>Goal Deadlines</h3>
      <ul className="goal-deadlines">
        {goals.map((goal) => (
          <li key={goal.id}>
            <strong>{goal.name}:</strong> {getStatusMessage(goal)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OverviewDisplay;
