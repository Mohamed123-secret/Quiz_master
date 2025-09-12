import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import QuizDetails from './QuizDetails.jsx';
import Home from './Home.jsx'
import Ajoutquizz from './Ajouter.jsx';
import QuizPlay from './QuizPlay.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/quizzes/:id' element={<QuizDetails />} />
        <Route path='/ajouter' element={<Ajoutquizz />} />   
        <Route path='/quiz-play' element={<QuizPlay />} />     
      </Routes>
    </Router>
  );
}

export default App
