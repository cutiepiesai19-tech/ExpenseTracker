import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    BarChart3,
    IndianRupee,
    Receipt,
    PieChart,
} from "lucide-react";

function Reports() {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const storedExpenses =
            JSON.parse(localStorage.getItem("expenses")) || [];

        setExpenses(storedExpenses);
    }, []);

    const totalSpent = expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

    const categories = {};

    expenses.forEach((expense) => {
        if (!categories[expense.category]) {
            categories[expense.category] = 0;
        }

        categories[expense.category] += Number(expense.amount);
    });

    return (
        <div className="reports-page">

            <div className="reports-container">

                <button
                    className="back-button"
                    onClick={() => navigate("/dashboard")}
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </button>

                <div className="reports-header">
                    <div>
                        <h1>Spending Reports</h1>
                        <p>Understand where your money is going.</p>
                    </div>

                    <div className="reports-icon">
                        <BarChart3 size={30} />
                    </div>
                </div>

                <div className="report-stats">

                    <div className="report-stat-card">
                        <IndianRupee size={25} />
                        <span>Total Spent</span>
                        <strong>
                            ₹{totalSpent.toLocaleString("en-IN")}
                        </strong>
                    </div>

                    <div className="report-stat-card">
                        <Receipt size={25} />
                        <span>Total Transactions</span>
                        <strong>{expenses.length}</strong>
                    </div>

                </div>

                <div className="category-report">

                    <div className="section-title">
                        <PieChart size={22} />
                        <h2>Spending by Category</h2>
                    </div>

                    {Object.keys(categories).length === 0 ? (
                        <p className="empty-report">
                            No expenses available yet.
                        </p>
                    ) : (
                        Object.entries(categories).map(
                            ([category, amount]) => {

                                const percentage =
                                    totalSpent > 0
                                        ? (amount / totalSpent) * 100
                                        : 0;

                                return (
                                    <div
                                        className="category-row"
                                        key={category}
                                    >

                                        <div className="category-info">
                                            <span>{category}</span>

                                            <strong>
                                                ₹{amount.toLocaleString("en-IN")}
                                            </strong>
                                        </div>

                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            />
                                        </div>

                                        <small>
                                            {percentage.toFixed(1)}%
                                        </small>

                                    </div>
                                );
                            }
                        )
                    )}

                </div>

                <div className="expense-history">

                    <h2>Expense History</h2>

                    {expenses.length === 0 ? (
                        <p className="empty-report">
                            No expenses added yet.
                        </p>
                    ) : (
                        expenses
                            .slice()
                            .reverse()
                            .map((expense) => (
                                <div
                                    className="history-row"
                                    key={expense.id}
                                >

                                    <div>
                                        <strong>{expense.title}</strong>

                                        <p>
                                            {expense.category} • {expense.date}
                                        </p>
                                    </div>

                                    <strong className="history-amount">
                                        - ₹{Number(expense.amount).toLocaleString("en-IN")}
                                    </strong>

                                </div>
                            ))
                    )}

                </div>

            </div>

        </div>
    );
}

export default Reports;