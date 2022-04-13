import Login from "./components/Login";
import Register from "./components/Register";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import "./App.css";
// import Home from "./components/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<RequireAuth />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
