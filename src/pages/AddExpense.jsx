import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    IndianRupee,
    Receipt,
    CalendarDays,
    Tag,
    FileText,
    PlusCircle,
} from "lucide-react";

function AddExpense() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (!title || !amount || !date) {
            alert("Please fill in all required fields.");
            return;
        }

        const newExpense = {
            id: Date.now(),
            title,
            amount: Number(amount),
            category,
            date,
            notes,
        };

        const oldExpenses =
            JSON.parse(localStorage.getItem("expenses")) || [];

        localStorage.setItem(
            "expenses",
            JSON.stringify([...oldExpenses, newExpense])
        );

        alert("Expense added successfully! 🎉");

        navigate("/dashboard");
    }

    return (
        <div className="expense-page">

            <div className="expense-container">

                <button
                    className="back-button"
                    onClick={() => navigate("/dashboard")}
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </button>

                <div className="expense-header">
                    <div>
                        <h1>Add New Expense</h1>
                        <p>Record your spending and keep your budget organized.</p>
                    </div>

                    <div className="expense-icon">
                        <PlusCircle size={30} />
                    </div>
                </div>

                <form
                    className="expense-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">
                        <label>
                            <Receipt size={17} />
                            Expense Name
                        </label>

                        <input
                            type="text"
                            placeholder="Example: College canteen"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label>
                                <IndianRupee size={17} />
                                Amount
                            </label>

                            <input
                                type="number"
                                placeholder="₹ 0"
                                min="1"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <Tag size={17} />
                                Category
                            </label>

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option>Food</option>
                                <option>Travel</option>
                                <option>Education</option>
                                <option>Shopping</option>
                                <option>Entertainment</option>
                                <option>Health</option>
                                <option>Other</option>
                            </select>
                        </div>

                    </div>

                    <div className="form-group">
                        <label>
                            <CalendarDays size={17} />
                            Date
                        </label>

                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <FileText size={17} />
                            Notes
                        </label>

                        <textarea
                            placeholder="Add a note about this expense..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows="4"
                        />
                    </div>

                    <button
                        className="save-expense-button"
                        type="submit"
                    >
                        <PlusCircle size={19} />
                        Add Expense
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddExpense;