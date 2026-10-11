import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Wallet,
    IndianRupee,
    Save,
    Target,
} from "lucide-react";

function Budget() {
    const navigate = useNavigate();

    const [budget, setBudget] = useState("");
    const [savedBudget, setSavedBudget] = useState(0);

    useEffect(() => {
        const storedBudget = localStorage.getItem("budget");

        if (storedBudget) {
            setSavedBudget(Number(storedBudget));
            setBudget(storedBudget);
        }
    }, []);

    function handleSave(e) {
        e.preventDefault();

        if (!budget || Number(budget) <= 0) {
            alert("Please enter a valid budget.");
            return;
        }

        localStorage.setItem("budget", budget);
        setSavedBudget(Number(budget));

        alert("Monthly budget saved successfully! 🎉");
    }

    return (
        <div className="budget-page">

            <div className="budget-container">

                <button
                    className="back-button"
                    onClick={() => navigate("/dashboard")}
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </button>

                <div className="budget-header">
                    <div>
                        <h1>Monthly Budget</h1>
                        <p>Set a spending limit and manage your money smarter.</p>
                    </div>

                    <div className="budget-icon">
                        <Wallet size={30} />
                    </div>
                </div>

                <div className="budget-card">

                    <div className="target-icon">
                        <Target size={28} />
                    </div>

                    <h2>Set Your Monthly Budget</h2>

                    <p>
                        Choose how much you want to spend each month.
                    </p>

                    <form onSubmit={handleSave}>

                        <label>
                            <IndianRupee size={17} />
                            Monthly Budget
                        </label>

                        <div className="budget-input">
                            <span>₹</span>

                            <input
                                type="number"
                                min="1"
                                placeholder="Enter amount"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                            />
                        </div>

                        <button
                            className="save-budget-button"
                            type="submit"
                        >
                            <Save size={18} />
                            Save Budget
                        </button>

                    </form>

                    {savedBudget > 0 && (
                        <div className="current-budget">
                            <span>Current Monthly Budget</span>

                            <strong>
                                ₹{savedBudget.toLocaleString("en-IN")}
                            </strong>
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default Budget;