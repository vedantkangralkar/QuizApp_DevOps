import { Link } from 'react-router-dom';

// Renders quiz info and a 'Start Quiz' link, styling based on dark mode
const QuizCard = ({ quiz, isDarkMode }) => {
    return (
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105`}>
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{quiz.description}</p>
                <div className="flex justify-between items-center">
                    <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {quiz.questions.length} questions
                    </span>
                    <Link
                        to={`/quiz/${quiz._id}`}
                        className={`px-4 py-2 rounded-md ${
                            isDarkMode
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-blue-500 hover:bg-blue-600'
                        } text-white transition-colors duration-300`}
                    >
                        Start Quiz
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default QuizCard;

