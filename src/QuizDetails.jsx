import { useState } from "react";
import useRecuperation from "./useRecuperation";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "./NavBare";

const QuizDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { quizData: quiz, isLoading, error } = useRecuperation(`http://localhost:8000/quizzes/${id}`);

    // États pour jouer
    //Veux dire pour gérer la question actuelle, le score, l'affichage du score final et la réponse sélectionnée
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selected, setSelected] = useState("");

    // Gérer la suppression du quiz
    const handleDelete = () => {
        fetch(`http://localhost:8000/quizzes/${id}`, {
            method: "DELETE",
        }).then(() => {
            console.log("Supprimé avec succès");
            navigate("/");
        });
    };

    // Gérer la réponse
    const handleAnswer = () => {
        if (selected === quiz.questions[currentQuestion].answer) {
            setScore(score + 1);
        } //Veux dire si la réponse sélectionnée est égale à la bonne réponse
        // on passe à la question suivante
        // ou on affiche le score final
        const next = currentQuestion + 1;
        if (next < quiz.questions.length) {
            setCurrentQuestion(next);
            setSelected("");
        } else {
            setShowScore(true);
        } //Veux dire si la prochaine question est inférieur au nombre total de questions
        // on passe à la question suivante sinon on affiche le score final
    };

    return (
        <div>
            {error && <div>{error}</div>}
            <NavBar />
            {isLoading && (
                <div className='justify-center flex text-white'>
                    {isLoading && <div className='bg-emerald-600 px-7 py-1 text-1xl rounded-md'>Encours de traitement</div>}
                </div>
            )}

            {quiz && (
                <div className="p-4">
                    <h2 className="bg-green-700 text-white flex justify-center text-2xl">
                        Titre : {quiz.title}
                    </h2>

                    {showScore ? (
                        <div className="text-center mt-6">
                            <h2 className="text-2xl font-bold">
                                Score final : {score} / {quiz.questions.length} <br />
                                {((score / quiz.questions.length) * 100).toFixed(2)}%
                                {/* veux dire pourcentage de réussite toFixed(2) pour arrondir à 2 décimales */}
                            </h2>
                            <button
                                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                                onClick={() => {
                                    setCurrentQuestion(0);
                                    setScore(0);
                                    setShowScore(false);
                                    setSelected("");
                                }}
                            >
                                Rejouer
                            </button>
                            {/* Veux dire pour recommencer le quiz à zéro */}
                        </div>
                    ) : (
                        <div className="mt-6 text-center">
                            <h3 className="text-xl font-bold">
                                Question {currentQuestion + 1} sur {quiz.questions.length}
                            </h3>
                            {/* Veux dire pour afficher le numéro de la question actuelle et le nombre total de questions */}
                            <p className="mt-2">{quiz.questions[currentQuestion].question}</p>
                            {/* Veux dire pour afficher la question actuelle */}

                            <ul className="mt-4 space-y-2">
                                {quiz.questions[currentQuestion].options.map((option, index) => (
                                    <li key={index}>
                                        <label className="cursor-pointer">
                                            <input
                                                type="radio"
                                                name="answer"
                                                value={option}
                                                checked={selected === option}
                                                onChange={(e) => setSelected(e.target.value)}
                                            />
                                            {" "}{option}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            {/* Veux dire pour afficher les options de réponse */}
                            <button
                                onClick={handleAnswer}
                                disabled={!selected}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Valider
                            </button>
                            {/* Veux dire pour valider la réponse sélectionnée */}
                        </div>
                    )}

                    <div className="flex justify-center m-4">
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Supprimer le Quiz
                        </button>
                        {/* Veux dire pour supprimer le quiz */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizDetails;
