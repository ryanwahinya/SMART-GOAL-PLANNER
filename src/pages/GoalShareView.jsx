import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GoalShareView() {
  const { id } = useParams();
  const [goal, setGoal] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3002/goals/${id}`)
      .then((res) => res.json())
      .then((data) => setGoal(data))
      .catch((err) => console.error("Failed to fetch goal", err));
  }, [id]);

  if (!goal) return <p>Loading shared goal...</p>;

  const { name, targetAmount, saved, category, deadline } = goal;
  const progress = Math.min((saved / targetAmount) * 100, 100);
  const remaining = Math.max(targetAmount - saved, 0);
  const deadlineDate = new Date(deadline);
  const daysLeft = Math.ceil((deadlineDate - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="goal-card shared">
      <h2>📤 Shared Goal View</h2>
      <h3>{name}</h3>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Target:</strong> ${targetAmount.toLocaleString()}</p>
      <p><strong>Saved:</strong> ${saved.toLocaleString()}</p>
      <p><strong>Remaining:</strong> ${remaining.toLocaleString()}</p>
      <p><strong>Deadline:</strong> {deadline} ({daysLeft} days left)</p>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <p><em>This is a read-only view.</em></p>
    </div>
  );
}

export default GoalShareView;
 