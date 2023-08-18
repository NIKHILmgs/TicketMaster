import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Search from "./components/Search";
import Navbar from "./components/Navbar";
import Favourites from "./components/Favourites";

import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Search />}></Route>
        <Route path="/Favourites" element={<Favourites></Favourites>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
