import { Link } from "react-router-dom";

const NavBar = () => {
    return ( 
        <div className="">
            <nav className="bg-gray-800 p-4">
                <ul className="flex space-x-4 justify-evenly">      
                    <li><Link to={"/"} className="text-white hover:text-gray-400">Home</Link></li>
                    <li><Link to={"/"} className="text-white hover:text-gray-400">Quizzes</Link></li>
                    <li><Link to={"/quiz-play"} className="text-white hover:text-gray-400">Quiz-Play</Link></li>
                    <li><Link to={"/ajouter"} className="text-white hover:text-gray-400">AjouteQuiz</Link></li>
                    <li><Link to={"/signup"} className="bg-yellow-500 text-white px-4 py-2 rounded mx-2">Sign Up</Link></li>
                    <li><Link to={"/login"} className="bg-green-500 text-white px-4 py-2 rounded mx-2">Login</Link></li>
                </ul>
            </nav>
            <div className="text-center mt-4 text-red">
                <p>&copy; 2025 Quiz Master.</p>
            </div>
        </div>
     );
}

export default NavBar;