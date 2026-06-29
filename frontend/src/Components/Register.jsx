import { useState } from "react";
import axios from "axios";
import "../css/Auth.css";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logoimg from "../logo.png";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(res.data.message);
      navigate("/");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <>
     <div className="logo">
              <img className="log-reg-logo" src={logoimg} alt="Logo" />
            </div>
    <div className="container">
      <h1>Register</h1>
       
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <input
            type="email"
            placeholder="Email"
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
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <br />
<div className="reg-forgot-link">
        <Link to="/">Already have an account?</Link>
        </div>
        <button className="loginbtn" type="submit">
          Sign In
        </button>
        
      </form>
    </div>
    </>
  );
}

export default Register;