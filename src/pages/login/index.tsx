import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api";
import "./style.css";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/slice/userSlice";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUserMutation] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const result = await loginUserMutation({ login, password });
      if ("error" in result) {
        console.error("Error logging in:", result.error);
      } else {
        dispatch(
          setAuth({
            access: result.data.access_token,
            refresh: result.data.refresh_token,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login">
      <input
        className="login-input"
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-btn" onClick={handleLogin}>
        Log In
      </button>
    </div>
  );
}

export default Login;
