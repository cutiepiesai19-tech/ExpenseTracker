import { Link } from "react-router-dom";
import {
    LayoutDashboard,
    PlusCircle,
    Wallet,
    BarChart3,
    LogOut,
    IndianRupee,
} from "lucide-react";

function Dashboard() {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const budget = Number(localStorage.getItem("budget")) || 10000;

    const totalSpent = expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

    const budgetLeft = budget - totalSpent;

    return (
        <div className="app-layout">

            {/* SIDEBAR */}
            <aside className="sidebar">
                <div className="brand">
                    <div className="brand-icon">
                        <Wallet size={24} />
                    </div>
                    <div>
                        <h2>SpendWise</h2>
                        <span>Student Finance</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <Link className="nav-item active" to="/dashboard">
                        <LayoutDashboard size={19} />
                        Dashboard
                    </Link>

                    <Link className="nav-item" to="/add-expense">
                        <PlusCircle size={19} />
                        Add Expense
                    </Link>

                    <Link className="nav-item" to="/budget">
                        <Wallet size={19} />
                        Budget
                    </Link>

                    <Link className="nav-item" to="/reports">
                        <BarChart3 size={19} />
                        Reports
                    </Link>
                </nav>

                <button
                    className="logout-button"
                    onClick={() => {
                        localStorage.removeItem("loggedIn");
                        window.location.href = "/login";
                    }}
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </aside>

            {/* MAIN CONTENT */}
            <main className="main-content">

                <div className="top-header">
                    <div>
                        <p className="small-heading">STUDENT EXPENSE TRACKER</p>
                        <h1>Welcome back 👋</h1>
                        <p>Here's an overview of your spending.</p>
                    </div>

                    <Link className="add-expense-btn" to="/add-expense">
                        <PlusCircle size={18} />
                        Add Expense
                    </Link>
                </div>

                {/* STAT CARDS */}
                <section className="stats-grid">

                    <div className="stat-card purple">
                        <div>
                            <p>Total Spent</p>
                            <h2>₹{totalSpent.toLocaleString()}</h2>
                        </div>
                        <div className="stat-icon">
                            <IndianRupee size={22} />
                        </div>
                    </div>

                    <div className="stat-card blue">
                        <div>
                            <p>Monthly Budget</p>
                            <h2>₹{budget.toLocaleString()}</h2>
                        </div>
                        <div className="stat-icon">
                            <Wallet size={22} />
                        </div>
                    </div>

                    <div className="stat-card green">
                        <div>
                            <p>Budget Left</p>
                            <h2>₹{budgetLeft.toLocaleString()}</h2>
                        </div>
                        <div className="stat-icon">
                            <BarChart3 size={22} />
                        </div>
                    </div>

                    <div className="stat-card orange">
                        <div>
                            <p>Transactions</p>
                            <h2>{expenses.length}</h2>
                        </div>
                        <div className="stat-icon">
                            <PlusCircle size={22} />
                        </div>
                    </div>

                </section>

                {/* RECENT EXPENSES */}
                <section className="dashboard-section">

                    <div className="section-heading">
                        <div>
                            <h2>Recent Expenses</h2>
                            <p>Your latest spending activity</p>
                        </div>

                        <Link to="/reports">View Reports →</Link>
                    </div>

                    {expenses.length === 0 ? (
                        <div className="empty-box">
                            <Wallet size={40} />
                            <h3>No expenses yet</h3>
                            <p>Start tracking your expenses to see them here.</p>

                            <Link className="empty-button" to="/add-expense">
                                Add Your First Expense
                            </Link>
                        </div>
                    ) : (
                        <div className="expense-list">

                            {expenses.slice(-5).reverse().map((expense) => (
                                <div className="expense-row" key={expense.id}>

                                    <div className="expense-info">
                                        <div className="expense-icon">
                                            ₹
                                        </div>

                                        <div>
                                            <h3>{expense.title}</h3>
                                            <p>
                                                {expense.category} • {expense.date}
                                            </p>
                                        </div>
                                    </div>

                                    <strong>
                                        - ₹{Number(expense.amount).toLocaleString()}
                                    </strong>

                                </div>
                            ))}

                        </div>
                    )}

                </section>

            </main>
        </div>
    );
}

export default Dashboard;