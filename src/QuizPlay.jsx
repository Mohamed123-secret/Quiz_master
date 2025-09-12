import { useParams } from "react-router-dom";
import { useState } from "react";
import useRecuperation from "./useRecuperation";

const QuizPlay = () => {
    const { id } = useParams(); // récupère l'id de l'URL
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selected, setSelected] = useState("");

    const { quizData: quizzes, isLoading, error } = useRecuperation("http://localhost:8000/quizzes");

    // Cherche le quiz correspondant à l'id
    const quiz = quizzes?.find((q) => q.id === parseInt(id));

    if (!quiz) {
        return <div>Quiz introuvable...</div>;
    }

    const handleAnswer = () => {
        if (selected === quiz.questions[currentQuestion].answer) {
            setScore(score + 1);
        }

        const next = currentQuestion + 1;
        if (next < quiz.questions.length) {
            setCurrentQuestion(next);
            setSelected("");
        } else {
            setShowScore(true);
        }
    };

    return (
        <div className="quiz">
            {error && <div>{error}</div>}
            {isLoading && <div>Chargement...</div>}
            <h1>Quiz : {quiz.title}</h1>
            {showScore ? (
                <div>
                    <h2>Score final : {score} / {quiz.questions.length}</h2>
                </div>
            ) : (
                <div>
                    <h2>
                        Question {currentQuestion + 1} sur {quiz.questions.length}
                    </h2>
                    <p>{quiz.questions[currentQuestion].question}</p>
                    <ul>
                        {quiz.questions[currentQuestion].options.map((option, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        name="answer"
                                        value={option}
                                        checked={selected === option}
                                        onChange={(e) => setSelected(e.target.value)}
                                    />
                                    {option}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleAnswer} disabled={!selected}>
                        Valider
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizPlay;
