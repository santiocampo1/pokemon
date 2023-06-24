// Dependencies
import { Route, Routes } from "react-router-dom";
// Components
import Home from "./views/home/home";
import Create from "./views/create/create";
import Detail from "./views/detail/detail";
// Styles
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
