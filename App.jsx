import Register from "./Components/Register";
import Login from "./Components/Login";
import logoimg from "./logo.png";
import "./App.css";
function App() {
  return (
    <div>
      <div className="logo">
      <img src={logoimg} alt="AI Interview Arena Logo" width="200" />
      </div>
      <Register />
    </div>
  );
}

export default App;