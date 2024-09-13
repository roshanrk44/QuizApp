import React from 'react';
import "./App.css";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateQuiz from './components/CreateQuiz';
import Result from './components/Result';
import Home from "./components/Home";
import Select from "./components/Select.jsx";

function App() {
  return (
    <Router>
      <div className='App-home'>
        <Link to="/">
          <img src='https://img.icons8.com/?size=100&id=2797&format=png&color=000000' alt="Home Icon" />
          Home
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/take-quiz" element={<Select />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
