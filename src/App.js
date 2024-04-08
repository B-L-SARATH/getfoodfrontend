import Home from "./screens/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Cart from "./screens/Cart";
import Myorders from "./screens/Myorders";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="*"
        element={
          <div className="fs-1 text-white text-center">404 NOT FOUND</div>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/myorders" element={<Myorders />} />
    </Routes>
  );
}

export default App;
