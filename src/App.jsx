import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import GoalShareView from "./pages/GoalShareView"; // Make sure it's in /pages

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/share/:id" element={<GoalShareView />} />
      </Routes>
    </Router>
  );
}

export default App;
