import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Navigation from "./components/shared/Navigation/Navigation";
import Authenticate from "./pages/authenticate/Authenticate";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        {/*<Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />*/}
        <Route path="/authenticate" element={<Authenticate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
