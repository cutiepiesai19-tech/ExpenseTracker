import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import Budget from "./pages/Budget";
import Reports from "./pages/Reports";

function App() {
  return (
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />
s
          <Route path="/add-expense" element={<AddExpense />} />

          <Route path="/budget" element={<Budget />} />

          <Route path="/reports" element={<Reports />} />

        </Routes>
      </BrowserRouter>
  );
}

export default App;