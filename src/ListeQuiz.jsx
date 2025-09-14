import React from 'react';
import { Link } from 'react-router-dom';
import './index.css' 

// const quizzesData = quizzes.flatMap(quiz =>
//     quiz.questions.map(q => ({
//         quiz_title: quiz.title,
//         question: q.question,
//         options: q.options,
//         answer: q.answer,
//         id: q.id
//     }))
// );
// console.log(quizzesData);
// console.log({ quizzes });

//     return (
//         <div className='flex items-center justify-center'>
//             {
//                 quizzes.map(quiz => {
//                     <div className='text-center' key={quiz.id}>
//                         <h1>{quiz.id}</h1>
//                         <h2 className='bg-green-700 text-white text-2xl'>Titre : {quiz.quiz_title}</h2>
//                         <p>Question : {quiz.question}</p>
//                         <ul className='font-bold'>
//                             {quiz.options.map((option, index) => (
//                                 <li key={index}>{option}</li>
//                             ))}
//                         </ul>
//                         <p>{quiz.answer}</p>
//                         <div className=''><button>Comencer le quiz</button></div>
//                     </div>

//                 })


//             }
//         </div>
//     );
// }
const ListeQuiz = ({ quizzes }) => {
    return (
        <div className='flex  items-center flex-col p-4 gap-4 flex-wrap'>

            {quizzes?.map((quiz) => (
                <div className='text-center cadre m-5' key={quiz.id}>
                    <h2 className='bg-green-700 text-white text-2xl'>
                     {quiz.title}
                    </h2>
                    {/* <p>Réponse : {q.answer}</p> */}
                    {quiz.questions?.map((q) => (
                        <div key={q.id} className="border p-4 mt-2">
                            <p className="font-bold text-red-500">Question : {q.question}</p>
                        </div>
                    ))}
                    <div>
                        <Link to={`quizzes/${quiz.id}`} className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">
                            Commencer le quiz
                        </Link>
                    </div>
                     
                    
                </div>
            ))}
        </div>
    );
};

export default ListeQuiz;