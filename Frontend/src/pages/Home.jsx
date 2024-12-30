import { useState, useEffect } from 'react';
import quizService from '../services/quizService';
import QuizCard from '../components/QuizCard';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Button } from "../components/ui/button"

const Home = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    // Loads quizzes on component mount and checks for authorization
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                setIsLoading(true);
                const data = await quizService.getAllQuizzes();
                setQuizzes(data);
                setIsLoading(false);
            } catch (error) {
                setError('Failed to fetch quizzes. Please try again later.');
                setIsLoading(false);
                if (error.msg=='No token, authorization denied') {
                    navigate('/register'); // Redirect to sign-up page if unauthorized
                }
            }
        };
        fetchQuizzes();
    }, [navigate]);

    // Toggles dark/light mode
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };
    const navigateToAdmin = () => {
        navigate('/admin');
    }

    // Filters quizzes by search term
    const filteredQuizzes = quizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Available Quizzes</h2>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Search quizzes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`px-3 py-2 rounded-md ${
                                isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                            }`}
                        />
                        <Button onClick={navigateToAdmin} >Admin DashBoard</Button>
                        <button
                            onClick={toggleTheme}
                            className={`px-4 py-2 rounded-md ${
                                isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'
                            }`}
                        >
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-8">
                        <p className="text-red-500">{error}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.isArray(filteredQuizzes) && filteredQuizzes.length > 0 ? (
                            filteredQuizzes.map((quiz) => (
                                <QuizCard key={quiz._id} quiz={quiz} isDarkMode={isDarkMode} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-8">
                                <p>No quizzes found.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;

