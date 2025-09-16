import React from 'react'
import './index.css'
import ListeQuiz from './ListeQuiz.jsx';
import useRecuperation from './useRecuperation.jsx';
import NavBar from './NavBare.jsx';
const Home = () => {

       const { quizData:quiz, isLoading, error } = useRecuperation('http://localhost:8000/quizzes?_sort=id&_order=desc');
       console.log(quiz);         
    return (
        <div>
            {error && <div>{error}</div>}
            <div>
                <NavBar />
            </div>
            <div className='justify-center flex text-white'>
                {isLoading && <div className='bg-emerald-600 px-7 py-1 text-1xl rounded-md'>Encours de traitement</div>}
            </div>
           {quiz && <ListeQuiz quizzes={quiz} />}
        </div>
    );
}

export default Home;
