import "./App.css";
import Form from "./components/Form";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/form">Form</Link>
          </li>
        </ul>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/form" element={<Form />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
