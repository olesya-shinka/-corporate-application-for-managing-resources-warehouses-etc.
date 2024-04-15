import { useState } from "react";
import { login } from "../../api";
import './style.css'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const loginUser = async () => {
    try {
      await login(username, password);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login">
      <input className="login-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input className="login-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-btn" onClick={loginUser}>log in</button>
    </div>
  );
}

export default Login;
