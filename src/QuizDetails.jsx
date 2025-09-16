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
        alert(`Voulez-vous vraiment supimer cette quiz ${fetch(`http://localhost:8000/quizzes/${id}`, {
            method: "DELETE",
        }).then(() => {
            console.log("Supprimé avec succès");
            navigate("/");
        })
            }`)
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
                <div className=" bg-white max-w-xl shadow-lg rounded-2xl mx-auto">
                    <h2 className=" text-purple-600 font-bold py-3 mx-auto rounded flex text-3xl">
                        {quiz.title}
                    </h2>

                    {showScore ? (
                        <div className="max-w-xl mx-auto bg-white text-center mt-6">
                            <h2 className="text-xl font-bold text-gray-600 ">
                                <span className="">Felicitation:</span>
                                Votre Score final : {score} / {quiz.questions.length} <br />
                                {((score / quiz.questions.length) * 100).toFixed(2)}%
                                {/* veux dire pourcentage de réussite toFixed(2) pour arrondir à 2 décimales */}
                            </h2>
                            <button
                                className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl"
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
                            <h3 className="text-lg font-semibold text-purple-600">
                                Question {currentQuestion + 1} sur {quiz.questions.length}
                            </h3>
                            {/* Veux dire pour afficher le numéro de la question actuelle et le nombre total de questions */}
                            <p className="mt-2 text-gray-700 text-lg">{quiz.questions[currentQuestion].question}</p>
                            {/* Veux dire pour afficher la question actuelle */}

                            <ul className="flex mt-4 space-y-2 p-3 flex-col text-xl">
                                {quiz.questions[currentQuestion].options.map((option, index) => (
                                    <li key={index} className="p-3 rounded-xl border border-gray-300 hover:bg-gray-100 cursor-pointer transition">
                                        <label className="cursor-pointer flex space-x-2 cadre">
                                            <input
                                                type="radio"
                                                name="answer"
                                                value={option}
                                                checked={selected === option}
                                                onChange={(e) => setSelected(e.target.value)}
                                                className="accent-purple-600 mr-3"
                                            />
                                            {" "}{option}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            {/* Veux dire pour afficher les options de réponse */}

                        </div>
                    )}
                    <div className="flex justify-center text-center">

                        <div className="flex m-4">
                            <button
                                onClick={handleDelete}
                                className="mt-6 bg-purple-600 hover:bg-red-300 cursor-help text-white px-6 py-2 rounded-xl transition"

                            >
                                DELET
                            </button>
                            {/* Veux dire pour supprimer le quiz */}
                        </div>

                        <div className="m-4">
                            <button
                                onClick={handleAnswer}
                                disabled={!selected}
                                className="w-full mt-6 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 font-semibold transition rounded-xl "
                            >
                                Valider
                            </button>
                            {/* Veux dire pour valider la réponse sélectionnée */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizDetails;
