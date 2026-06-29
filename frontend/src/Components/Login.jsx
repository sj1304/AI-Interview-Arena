import { useState } from "react";
import axios from "axios";
import "../css/Auth.css";
import Register from "./Register";
import {Link} from 'react-router-dom';
import logoimg from "../logo.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const Knowpass=()=>{
    alert("You Should Have known!");
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log(res.data);

      // Save token temporarily
      localStorage.setItem("token", res.data.token);
localStorage.setItem("userId", res.data.user.id);
      
      alert("Login Successful!");
      navigate("/dashboard");
      setEmail("");
      setPassword("");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <>
    <div className="logo">
                  <img className="log-reg-logo" src={logoimg} alt="Logo" />
                </div>
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <br />
        <div className="reg-forgot-link login">
      <Link to="/register">Don't have an account?</Link>
        <Link to="#" onClick={Knowpass}>Forgot Password?</Link>
        </div>
        <button className="loginbtn" type="submit">
          Sign In
        </button>
      </form>
    </div>
    </>
  );
}

export default Login;