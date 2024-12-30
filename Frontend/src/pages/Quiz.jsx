import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import quizService from '../services/quizService';
import Question from '../components/Question';
import Timer from '../components/Timer';

const Quiz = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [quizResult, setQuizResult] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [totalQuestion, setTotalQuestion] = useState(0);
    const [attempted, setAttempted] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const data = await quizService.getQuizById(quizId);
                setQuiz(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchQuiz();
    }, [quizId]);

    // Selects an answer, updates local state, moves to next question or sets quiz as completed
    const handleAnswerSelect = (selectedAnswerIndex) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = {
            questionIndex: currentQuestionIndex,
            selectedAnswer: quiz.questions[currentQuestionIndex].options[selectedAnswerIndex],
            isCorrect: quiz.questions[currentQuestionIndex].correctAnswer === quiz.questions[currentQuestionIndex].options[selectedAnswerIndex]
        };
        setAnswers(newAnswers);
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsQuizCompleted(true);
        }
    };

    const token = localStorage.getItem("token");

    // Submits quiz results via API, stores them for display
    const handleSubmit = async (timeRemaining, forceSubmit = false) => {
        // If time is up and not forcing submit, show time-up state
        if (timeRemaining === 0 && !forceSubmit) {
            setIsTimeUp(true);
            return;
        }
        try {
            const result = await quizService.submitQuizResults(quizId, { answers, timeRemaining }, token);
            setQuizResult(result.correctAnswers);
            setIsSubmitted(true);
            setTotalQuestion(result.totalQuestions);
            setAttempted(result.attempted);
        } catch (error) {
            console.error(error);
        }
    };

    // Toggles light/dark theme
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    if (!quiz) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (!quiz.questions) return <div className="flex justify-center items-center h-screen">No questions available.</div>;

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">{quiz.title}</h2>
                    <button
                        onClick={toggleTheme}
                        className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'}`}
                    >
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>

                {quiz.questions.length > 0 && !isQuizCompleted && !isTimeUp && currentQuestionIndex < quiz.questions.length && (
                    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <Question 
                            question={quiz.questions[currentQuestionIndex]} 
                            onAnswerSelect={handleAnswerSelect}
                            isDarkMode={isDarkMode}
                        />
                        {quiz.timer > 0 && <Timer quiz={quiz} onSubmit={handleSubmit} isDarkMode={isDarkMode} />}
                        {quiz.timer === 0 && (
                            <button 
                                onClick={() => handleSubmit(0)}
                                className={`mt-4 px-6 py-2 rounded-md ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                            >
                                Submit Quiz
                            </button>
                        )}
                    </div>
                )}

                {(isTimeUp || isQuizCompleted) && !isSubmitted && (
                    <button 
                        onClick={() => handleSubmit(0, true)}
                        className={`mt-4 px-6 py-2 rounded-md ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
                    >
                        Submit Quiz
                    </button>
                )}

                {isSubmitted && (
                    <div className={`bg-white shadow-md rounded-lg p-6 ${isDarkMode ? 'bg-gray-800' : ''}`}>
                        <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className={`p-4 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                <p className="font-semibold">Total Questions: {totalQuestion}</p>
                            </div>
                            <div className={`p-4 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                <p className="font-semibold">Attempted Questions: {attempted}</p>
                            </div>
                            <div className={`p-4 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                <p className="font-semibold">Unattempted Questions: {totalQuestion - attempted}</p>
                            </div>
                            <div className={`p-4 rounded-md ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white`}>
                                <p className="font-semibold">Your Score: {quizResult}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;

