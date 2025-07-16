import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/main.css'
import Main from "./pages/Main.jsx";
import CharMake from "./pages/CharMake.jsx";
import CharMake2 from "./pages/CharMake2.jsx";
import CharMake3 from "./pages/CharMake3.jsx";
import CharMake4 from "./pages/CharMake4.jsx";
import CharMake5 from "./pages/CharMake5.jsx";
import CharMake6 from "./pages/CharMake6.jsx";
import CharMake7 from "./pages/CharMake7.jsx";
import CharMake7_2 from "./pages/CharMake7_2.jsx";
import CharMake8 from "./pages/CharMake8.jsx";
import CharMake9 from "./pages/CharMake9.jsx";

function App() {

  return (
    <div className={`App`}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/char-make" element={<CharMake />} />
          <Route path="/char-make2" element={<CharMake2 />} />
          <Route path="/char-make3" element={<CharMake3 />} />
          <Route path="/char-make4" element={<CharMake4 />} />
          <Route path="/char-make5" element={<CharMake5 />} />
          <Route path="/char-make6" element={<CharMake6 />} />
          <Route path="/char-make7" element={<CharMake7 />} />
          <Route path="/char-make7_2" element={<CharMake7_2 />} />
          <Route path="/char-make8" element={<CharMake8 />} />
          <Route path="/char-make9" element={<CharMake9 />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
