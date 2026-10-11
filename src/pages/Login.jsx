import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WalletCards } from "lucide-react";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(e) {
        e.preventDefault();

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        localStorage.setItem("loggedIn", "true");

        navigate("/dashboard");
    }

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="logo-circle">
                    <WalletCards size={32} />
                </div>

                <h1>SpendWise</h1>

                <p className="login-subtitle">
                    Student Expense Tracker
                </p>

                <form onSubmit={handleLogin}>

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="main-button"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

                <p className="demo-text">
                    Track smarter. Spend better. ✨
                </p>

            </div>

        </div>
    );
}

export default Login;