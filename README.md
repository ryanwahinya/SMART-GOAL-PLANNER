# Smart Goal Planner
A personal finance web app that helps users define savings goals, track their progress, estimate monthly savings, and visualize data. Built using React, Tailwind CSS, and JSON Server for mock backend support.



# Features
1.Add financial goals with a target amount, category, and deadline.

2.Make deposits to each goal.

3.Visualize savings by category with a pie chart.

4.Get warnings if deadlines are near.

5.Mark goals as Overdue if the deadline passes before completion.

6.[Planned] Edit and update goals.

7.Get estimates on how many months it would take to meet your goal.

8.Overview Dashboard:

   .Total number of goals

   .Total money saved

   .Completed goals

   .Time left until each goal's deadline



# Tech Stack
.Frontend: React, CSS

.State Management: React useState and useEffect

.Data Viz: Chart.js (via react-chartjs-2)

.Backend: JSON Server (for local REST API simulation)

.Development Tools: Vite (or Create React App)



# Folder Structure

smart-goal-planner/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── AddGoalForm.jsx
│   │   ├── DepositForm.jsx
│   │   ├── GoalCard.jsx
│   │   ├── CategoryPieChart.jsx
│   │   └── OverviewDisplay.jsx
│   │
│   ├── pages/
│   │   └── Dashboard.jsx
│   │
│   ├── styles/
│   │   └── main.css
│   │
│   └── App.jsx
│
├── db.json                # JSON Server mock DB
├── package.json
└── README.md


# Install Instructions

1. Clone the repo
git clone https://github.com/your-username/smart-goal-planner.git
cd smart-goal-planner

2. Install dependencies
npm install

3. Start JSON Server (mock backend)
npx json-server --watch db.json --port 3002


Make sure db.json contains a goals array like this:

{
  "goals": []
}


4. Start the React app
npm run dev   # if using Vite
# or
npm start     # if using CRA


# Troubleshooting
1. Deposit not saving?

  .Ensure DepositForm.jsx is making a PATCH request to /goals/:id.

  .Ensure onDepositRefresh triggers re-fetching goals.

2. CORS errors or 404?

  .Confirm JSON Server is running on http://localhost:3001.




👨‍💻 Author
Ryan Wahinya
React Developer | Fintech UI Builder
[https://github.com/ryanwahinya]

📃 License
This project is licensed under the MIT License.