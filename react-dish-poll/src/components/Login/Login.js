import { useState } from "react";
import users from "../../data/users.json";
import "./Login.css";

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) handleLogin(user);
    else setError("Invalid username or password");
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={submit}>
          <input
            className="login-input"
            type="text"
            placeholder="Email or Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-button" type="submit">
            Login
          </button>

          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
  );
};
export default Login;
