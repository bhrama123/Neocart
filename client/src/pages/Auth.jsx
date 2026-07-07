import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import "./Auth.css";

function Auth() {

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {

    try {

      if (isLogin) {
        const res = await api.post("/auth/login", {
          email,
          password
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);

        navigate("/dashboard");

      } else {
        await api.post("/auth/register", {
          name,
          email,
          password
        });

        alert("Account created successfully!");
        setIsLogin(true);
      }

    } catch (err) {
  alert(err.response?.data?.message || "Error occurred");
}
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>{isLogin ? "Login to Your Account" : "Create Account"}</h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} className="toggle-text">
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>

      </div>

    </div>
  );
}

export default Auth;