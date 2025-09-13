import { stringify } from "postcss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBare";

const Ajoutquizz = () => {
    const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], answer: "" }]);
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    // const [options, setOptions] = useState({"", "", "", ""});
    // const [correctAnswer, setCorrectAnswer] = useState("");

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: "" }]);
    };//Pour ajouter une nouvelle question

    const handleAddQuestionOption = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.push("");
        setQuestions(newQuestions);
    };//Pour ajouter une nouvelle option à une question spécifique

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };//Pour ajouter le texte de la question

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(newQuestions);
    };//Pour ajouter le texte d'une option spécifique
    const handlanswerChange = (questionIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answer = value;
        setQuestions(newQuestions);
    };//Pour ajouter la réponse correcte d'une question spécifique

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const quizData = {
            title,
            questions: questions
        };
        console.log(quizData);

        fetch('http://localhost:8000/quizzes',
            {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(quizData)
            }
        ).then(() => {
            console.log('Article ajouter avec sixe');
            setIsLoading(false);

        }).catch((err) => {
            console.log(err.message);
            setIsLoading(false);
            
        });
        navigate('/');
        
    };

    return (
        <div>
            <NavBar />
            <h2 className="text-center">Salut les Pros tu peux ajouter le Nouveu Quiz</h2>
            <form className="flex flex-col w-1/2 mx-auto mt-4 border p-2 rounded-lg shadow-lg bg-slate-300" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Quiz Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-4 p-2 border roundedw"
                />
                {questions.map((q, questionIndex) => (
                    <div key={questionIndex} className="mb-4 border p-4 rounded bg-green-800">
                        <input
                            type="text"
                            placeholder={`Question ${questionIndex + 1}`}
                            value={q.question}
                            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                            className="mb-2 p-2 border rounded w-full text-red-700"
                        />
                        {q.options.map((option, optionIndex) => (
                            <input
                                key={optionIndex}
                                type="text"
                                placeholder={`Option ${optionIndex + 1}`}
                                value={option}
                                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                                className="mb-2 p-2 border rounded w-full "
                            />
                        ))}
                        <button
                            type="button"
                            onClick={() => handleAddQuestionOption(questionIndex)}
                            className="mb-2 bg-blue-300 text-white px-4 py-2 rounded"
                        >
                            Add Option
                        </button>
                        <input
                            type="text"
                            placeholder="Correct Answer"
                            value={q.answer}
                            onChange={(e) => handlanswerChange(questionIndex, e.target.value)}
                            className="mb-2 p-2 border rounded w-full"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="mb-4 bg-red-600 text-white px-4 py-2 rounded"
                >
                    Add Question
                </button>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-purple-500 text-white px-4 py-2 rounded"
                >
                    Submit Quiz
                </button>
                
                {/* {!isLoading && <button className="flex justify-center bg-green-400 text-white p-3 text-2xl">Quiz ajouté avec succès</button>} */}
                {/* {isLoading && <button className="flex justify-center bg-orange-400 text-white p-3 text-2xl" disabled>Encours de traitement</button>} */}
            </form>
        </div>
    );
}

export default Ajoutquizz;