"use client"

import { useState, useEffect } from 'react'
import { ThemeProvider } from "./components/theme-provider"
import { ThemeToggle } from "./components/theme-toggle"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import quizService from '../services/quizService' // Import the actual quizService
// import AlertDialogDelete from "../components/AlertDialog"
import AdminDialog from "../components/AdminDialog";
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const [token] = useState(localStorage.getItem("token")); // Replace with actual token logic
    const [quizTimer, setQuizTimer] = useState(''); // store as a string
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState({});
    const [resultsPage, setResultsPage] = useState({});
    const [currentQuizPage, setCurrentQuizPage] = useState(1);
    const quizzesPerPage = 10;
    const [activeTab, setActiveTab] = useState("create");
    
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const data = await quizService.getAllQuizzes();
                setQuizzes(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchQuizzes();
    }, []);

    // handle timer input changes
    const handleTimerChange = (e) => {
        setQuizTimer(e.target.value);
    };

    const navigateToQuizz = () => {
        navigate('/');
    };

    const navigateToRegister = () => {
        navigate('/register');
        localStorage.removeItem('token');
    };
    // Creates a new quiz using form data (title, description, questions, etc.)
    const handleCreateQuiz = async () => {
        const timerValue = quizTimer === '' ? 0 : parseInt(quizTimer, 10);
        const quizData = { 
            title: quizTitle, 
            description: quizDescription, 
            timer: timerValue,
            questions 
        };
        try {
            const newQuiz = await quizService.createQuiz(quizData, token);
            setQuizzes([...quizzes, newQuiz]);
            resetForm();
        } catch (error) {
            console.error(error);
        }
    };

    // Updates existing quiz with new data
    const handleUpdateQuiz = async () => {
        const timerValue = quizTimer === '' ? 0 : parseInt(quizTimer, 10);
        const quizData = { 
            title: quizTitle, 
            description: quizDescription, 
            timer: timerValue,
            questions 
        };
        try {
            const updatedQuiz = await quizService.updateQuiz(selectedQuizId, quizData, token);
            setQuizzes(quizzes.map(quiz => quiz._id === selectedQuizId ? updatedQuiz : quiz));
            resetForm();
        } catch (error) {
            console.error(error);
        }
    };

    // Loads a quiz from API to populate form for editing
    const handleEditQuiz = async (quiz) => {

        try {
            const quizDetails = await quizService.getQuizById(quiz._id, token);
            setQuizTitle(quizDetails.title || '');
            setQuizDescription(quizDetails.description || '');
            setQuestions(quizDetails.questions.length ? quizDetails.questions : [{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
            setQuizTimer(quizDetails.timer ? quizDetails.timer : 0);
            setSelectedQuizId(quiz._id);
            setActiveTab("create"); // Switch to create/update tab
        } catch (error) {
            console.error(error);
        }
    };

    // Fetches or hides quiz results
    const handleViewResults = async (quizId) => {
        if (results[quizId]) {
            setResults(prevResults => {
                const updatedResults = { ...prevResults };
                delete updatedResults[quizId];
                return updatedResults;
            });
        } else {
            try {
                const resultsData = await quizService.getQuizResults(quizId, token);
                setResults(prevResults => ({ ...prevResults, [quizId]: resultsData }));
                setResultsPage(prevPages => ({ ...prevPages, [quizId]: 1 }));
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Deletes quiz from database
    const handleDeleteQuiz = async (id) => {
        try {
            await quizService.deleteQuiz(id, token);
            setQuizzes(quizzes.filter(quiz => quiz._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    // Resets form fields to empty for new quiz creation
    const resetForm = () => {
        setQuizTitle('');
        setQuizDescription('');
        setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
        setSelectedQuizId(null);
        setQuizTimer(0);
    };

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        if (field === 'question') {
            newQuestions[index].question = value;
        } else if (field.startsWith('option')) {
            const optionIndex = parseInt(field.split('-')[1], 10);
            newQuestions[index].options[optionIndex] = value;
        } else if (field === 'correctAnswer') {
            newQuestions[index].correctAnswer = value;
        }
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
    };

    const removeQuestion = (index) => {
        setQuestions(prev => prev.filter((_, i) => i !== index));
    };

    const filteredQuizzes = quizzes.filter(quiz => 
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastQuiz = currentQuizPage * quizzesPerPage;
    const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
    const currentQuizzes = filteredQuizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);

    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <div className="min-h-screen bg-background text-foreground">
                <header className="border-b">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                        <div className="flex items-center space-x-4">
                        <Button onClick={navigateToQuizz}>All Quizzes</Button>
                        <Button onClick={navigateToRegister}>Sign out</Button>
                        <ThemeToggle />
                        </div>
                    </div>
                </header>
                <main className="container mx-auto px-4 py-8">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="create">Create/Update Quiz</TabsTrigger>
                            <TabsTrigger value="list">Existing Quizzes</TabsTrigger>
                        </TabsList>
                        <TabsContent value="create">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{selectedQuizId ? 'Update Quiz' : 'Create Quiz'}</CardTitle>
                                    <CardDescription>Fill in the details to create or update a quiz.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Input
                                        placeholder="Quiz Title"
                                        value={quizTitle}
                                        onChange={(e) => setQuizTitle(e.target.value)}
                                    />
                                    <Input
                                        placeholder="Quiz Description"
                                        value={quizDescription}
                                        onChange={(e) => setQuizDescription(e.target.value)}
                                    />
                                    {questions.map((q, index) => (
                                        <Card key={index}>
                                            <CardContent className="space-y-2 pt-4">
                                                <Input
                                                    placeholder="Question"
                                                    value={q.question}
                                                    onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                                />
                                                {q.options.map((option, i) => (
                                                    <Input
                                                        key={i}
                                                        placeholder={`Option ${i + 1}`}
                                                        value={option}
                                                        onChange={(e) => handleQuestionChange(index, `option-${i}`, e.target.value)}
                                                    />
                                                ))}
                                                <Input
                                                    placeholder="Correct Answer"
                                                    value={q.correctAnswer}
                                                    onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                                                />
                                                <Button variant="destructive" onClick={() => removeQuestion(index)}>
                                                    Remove Question
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                    <Input
                                        type="number"
                                        placeholder="Timer (minutes)"
                                        value={quizTimer}
                                        onChange={handleTimerChange}
                                    />
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button onClick={addQuestion}>Add Question</Button>
                                    <Button onClick={selectedQuizId ? handleUpdateQuiz : handleCreateQuiz}>
                                        {selectedQuizId ? 'Update Quiz' : 'Create Quiz'}
                                    </Button>
                                    <Button variant="outline" onClick={resetForm}>Reset Form</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="list">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Existing Quizzes</CardTitle>
                                    <CardDescription>Manage and view results of existing quizzes.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Input
                                        placeholder="Search Quizzes"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="mb-4"
                                    />
                                    <div className="space-y-4">
                                        {currentQuizzes.map(quiz => (
                                            <Card key={quiz._id}>
                                                <CardHeader>
                                                    <CardTitle>{quiz.title}</CardTitle>
                                                    <CardDescription>{quiz.description}</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="flex space-x-2">
                                                        <Button onClick={() => handleEditQuiz(quiz)}>Edit</Button>
                                                        <AdminDialog onConfirm={() => handleDeleteQuiz(quiz._id)}>
                                                            <Button variant="destructive">Delete</Button>
                                                        </AdminDialog>
                                                        <Button onClick={() => handleViewResults(quiz._id)}>
                                                            {results[quiz._id] ? 'Hide Results' : 'View Results'}
                                                        </Button>
                                                    </div>
                                                    {results[quiz._id] && (
                                                        <div className="mt-4">
                                                            <h4 className="text-lg font-semibold mb-2">Quiz Results</h4>
                                                            {results[quiz._id].length === 0 ? (
                                                                <p>No one has taken this test yet.</p>
                                                            ) : (
                                                                <>
                                                                    <Table>
                                                                        <TableHeader>
                                                                            <TableRow>
                                                                                <TableHead>User</TableHead>
                                                                                <TableHead>Total Questions</TableHead>
                                                                                <TableHead>Attempted Questions</TableHead>
                                                                                <TableHead>Correct Answers</TableHead>
                                                                                <TableHead>Score</TableHead>
                                                                            </TableRow>
                                                                        </TableHeader>
                                                                        <TableBody>
                                                                            {results[quiz._id].slice(
                                                                                (resultsPage[quiz._id] - 1) * 10,
                                                                                resultsPage[quiz._id] * 10
                                                                            ).map((result, index) => (
                                                                                <TableRow key={index}>
                                                                                    <TableCell>{result.user}</TableCell>
                                                                                    <TableCell>{result.totalQuestions}</TableCell>
                                                                                    <TableCell>{result.attemptedQuestions}</TableCell>
                                                                                    <TableCell>{result.correctAnswers}</TableCell>
                                                                                    <TableCell>{result.score}</TableCell>
                                                                                </TableRow>
                                                                            ))}
                                                                        </TableBody>
                                                                    </Table>
                                                                    <div className="flex justify-between mt-4">
                                                                        <Button
                                                                            onClick={() => setResultsPage(prev => ({ ...prev, [quiz._id]: Math.max(1, prev[quiz._id] - 1) }))}
                                                                            disabled={resultsPage[quiz._id] === 1}
                                                                        >
                                                                            Previous
                                                                        </Button>
                                                                        <Button
                                                                            onClick={() => setResultsPage(prev => ({ ...prev, [quiz._id]: prev[quiz._id] + 1 }))}
                                                                            disabled={resultsPage[quiz._id] * 10 >= results[quiz._id].length}
                                                                        >
                                                                            Next
                                                                        </Button>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <div className="flex justify-between items-center w-full">
                                        <Button
                                            onClick={() => setCurrentQuizPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentQuizPage === 1}
                                        >
                                            Previous
                                        </Button>
                                        <span>
                                            Page {currentQuizPage} of {Math.ceil(filteredQuizzes.length / quizzesPerPage)}
                                        </span>
                                        <Button
                                            onClick={() => setCurrentQuizPage(prev => Math.min(prev + 1, Math.ceil(filteredQuizzes.length / quizzesPerPage)))}
                                            disabled={currentQuizPage === Math.ceil(filteredQuizzes.length / quizzesPerPage)}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </ThemeProvider>
    )
}

