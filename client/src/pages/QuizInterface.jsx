import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/ParticlesBackground';

const QuizInterface = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // User State
    const [user, setUser] = useState(null);

    // View State: 'category', 'difficulty', 'quiz', 'results'
    const [view, setView] = useState('category');

    // Quiz Config
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');

    // Quiz Data
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Game State
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [hintCount, setHintCount] = useState(3);
    const [answerSelected, setAnswerSelected] = useState(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null); // true, false, null
    const [pointAnimation, setPointAnimation] = useState(null); // { points: 10, x: 50, y: 50 }

    const [quizId, setQuizId] = useState(null); // Null for global, ID for custom

    // Refs
    const timerRef = useRef(null);

    // Particles handled by ParticlesBackground component

    // Timer Logic
    useEffect(() => {
        if (view === 'quiz' && !answerSelected && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && !answerSelected) {
            // Time Up - Auto select wrong answer or just move next?
            // Let's mark as wrong (null selection)
            handleAnswerSelect(-1);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [view, answerSelected, timeLeft]); // Dependent on timeLeft to trigger 0 check


    // Check Auth & URL Params on Mount
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            navigate('/login');
            return;
        }
        setUser(JSON.parse(userInfo));

        const params = new URLSearchParams(location.search);
        const codeParam = params.get('code');
        const catParam = params.get('category');

        if (codeParam) {
            fetchCustomQuiz(codeParam);
        } else if (catParam) {
            const formattedCat = catParam.charAt(0).toUpperCase() + catParam.slice(1);
            handleCategorySelect(formattedCat);
        }
    }, [navigate, location]);

    const fetchCustomQuiz = async (code) => {
        setIsLoading(true);
        try {
            const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
            console.log(`[DEBUG] Fetching custom quiz from: http://localhost:5000/api/quiz/code/${code}`);
            const res = await axios.get(`http://localhost:5000/api/quiz/code/${code}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const mappedQuestions = res.data.questions.map(q => ({
                question: q.question_text || q.question, // Handle both potential field names
                options: q.options,
                correct_answer: parseInt(q.correct_answer), // Ensure number
                hint: q.hint || "No hint for custom quizzes"
            }));

            setQuestions(mappedQuestions);
            setQuizId(res.data._id);
            setSelectedCategory(res.data.title); // Use title as category
            setSelectedDifficulty('Custom');

            setView('quiz');
            setCurrentQuestionIndex(0);
            setScore(0);
            setHintCount(0);
            resetQuestionState();

        } catch (error) {
            console.error(error);
            alert('Invalid Code or Failed to load quiz');
            navigate('/join-quiz');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setView('difficulty');
    };

    const handleDifficultySelect = async (difficulty) => {
        setIsLoading(true);
        setSelectedDifficulty(difficulty);

        try {
            const token = user?.token || JSON.parse(localStorage.getItem('userInfo'))?.token;

            const response = await axios.get(`http://localhost:5000/api/quiz/questions`, {
                params: { category: selectedCategory, difficulty },
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.length > 0) {
                // Fix potential prop mismatch if generic API returns question_text
                const mappedQuestions = response.data.map(q => ({
                    ...q,
                    question: q.question_text || q.question // Handle both just in case
                }));

                setQuestions(mappedQuestions);
                setView('quiz');
                setCurrentQuestionIndex(0);
                setScore(0);
                setHintCount(3);
                resetQuestionState();
            } else {
                alert('No questions found for this category/difficulty.');
                setView('category');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to load questions.');
            setView('category'); // Go back
        } finally {
            setIsLoading(false);
        }
    };

    const resetQuestionState = () => {
        setTimeLeft(30);
        setAnswerSelected(false);
        setSelectedOptionIndex(null);
        setIsCorrect(null);
        setPointAnimation(null);
    };

    const handleAnswerSelect = (index) => {
        if (answerSelected) return;
        setAnswerSelected(true);
        setSelectedOptionIndex(index);
        clearInterval(timerRef.current);

        const currentQ = questions[currentQuestionIndex];
        const isRight = index === currentQ.correct_answer;
        setIsCorrect(isRight);

        if (isRight) {
            const points = 10 + Math.floor(timeLeft / 3);
            setScore(prev => prev + points);
            // Show point animation
            setPointAnimation({ points, x: Math.random() * 200, y: Math.random() * 200 }); // Random pos logic simplified
        }

        // Auto move next
        setTimeout(() => {
            handleNextQuestion();
        }, 2000);
    };

    const handleNextQuestion = (auto = false) => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            resetQuestionState();
        } else {
            endQuiz();
        }
    };

    const useHint = () => {
        if (hintCount > 0 && !answerSelected) {
            setHintCount(prev => prev - 1);
            alert(`Hint: ${questions[currentQuestionIndex].hint}`);
        }
    };

    const endQuiz = async () => {
        setView('results');
        try {
            const token = user?.token || JSON.parse(localStorage.getItem('userInfo'))?.token;
            // Post score
            await axios.post('http://localhost:5000/api/quiz/submit', {
                score,
                category: selectedCategory,
                difficulty: selectedDifficulty,
                total_questions: questions.length, // Added total questions
                time_taken: 300 - timeLeft,
                quiz_id: quizId // Pass quizId (null or value)
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Failed to save score', error);
        }
    };

    const getResultMessage = () => {
        if (score >= 90) return 'Outstanding! You\'re a quiz genius! 🏆';
        if (score >= 70) return 'Great job! Very impressive knowledge! 🌟';
        if (score >= 50) return 'Good effort! Keep learning! 👍';
        return 'Nice try! Practice makes perfect! 📚';
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#f2f2f2] text-black">
                <div className="text-4xl animate-pulse text-purple-600 font-bold">Loading Quiz...</div>
            </div>
        );
    }

    return (
        <div className="bg-[#f2f2f2] text-black overflow-x-hidden min-h-screen flex flex-col font-quicksand relative">
            <Navbar />
            <ParticlesBackground />

            {/* View: Category Selection */}
            {view === 'category' && (
                <section className="min-h-screen flex flex-col items-center justify-center space-y-10 text-center p-4 relative z-10">
                    <h2 className="text-4xl sm:text-6xl font-bold animate-float text-yellow-500 drop-shadow-lg black-ops">Choose Your Quiz Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {['General', 'Technology', 'Geography', 'Science', 'Movies', 'Sports', 'History', 'Music'].map(cat => (
                            <button key={cat} onClick={() => handleCategorySelect(cat)} className="p-6 bg-white hover:bg-purple-50 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 border border-gray-200 group">
                                <span className="text-lg font-semibold text-gray-800 group-hover:text-purple-700">{cat}</span>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* View: Difficulty Selection */}
            {view === 'difficulty' && (
                <section className="min-h-screen flex flex-col items-center justify-center space-y-10 text-center p-4 relative z-10">
                    <h2 className="text-4xl sm:text-6xl font-bold animate-float text-yellow-500 drop-shadow-lg black-ops">Choose Difficulty</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full px-4">
                        <button onClick={() => handleDifficultySelect('easy')} className="p-8 bg-green-50 hover:bg-green-100 rounded-xl transition-all shadow-lg hover:scale-105 border border-green-200">
                            <span className="text-2xl font-bold text-green-600">Easy</span>
                        </button>
                        <button onClick={() => handleDifficultySelect('medium')} className="p-8 bg-yellow-50 hover:bg-yellow-100 rounded-xl transition-all shadow-lg hover:scale-105 border border-yellow-200">
                            <span className="text-2xl font-bold text-yellow-600">Medium</span>
                        </button>
                        <button onClick={() => handleDifficultySelect('hard')} className="p-8 bg-red-50 hover:bg-red-100 rounded-xl transition-all shadow-lg hover:scale-105 border border-red-200">
                            <span className="text-2xl font-bold text-red-600">Hard</span>
                        </button>
                    </div>
                    <button onClick={() => setView('category')} className="text-gray-500 hover:text-black underline font-semibold">Back to Categories</button>
                </section>
            )}

            {/* View: Quiz */}
            {view === 'quiz' && questions.length > 0 && (
                <section className="max-w-4xl mx-auto pt-32 px-6 w-full flex-grow relative z-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-yellow-500 black-ops mb-2">{selectedCategory} Quiz</h2>
                        <div className="flex justify-between items-center text-xl mt-4 bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-md border border-gray-200">
                            <span className="font-bold text-gray-700">Question {currentQuestionIndex + 1}/{questions.length}</span>
                            <span className={`${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-purple-600'} font-bold font-mono text-2xl`}>
                                00:{timeLeft.toString().padStart(2, '0')}
                            </span>
                            <span className="text-green-600 font-bold">Score: {score}</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-300 rounded-full h-2.5 mt-4">
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl relative border border-white/40">
                        {/* Question */}
                        <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-gray-800">{questions[currentQuestionIndex].question}</h3>

                        {/* Options */}
                        <div className="grid gap-4">
                            {questions[currentQuestionIndex].options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswerSelect(idx)}
                                    disabled={answerSelected}
                                    className={`p-4 rounded-xl text-left transition-all border flex items-center shadow-sm
                                        ${!answerSelected ? 'hover:bg-purple-50 hover:scale-[1.01] hover:shadow-md bg-white border-gray-200' : ''}
                                        ${answerSelected && idx === questions[currentQuestionIndex].correct_answer ? 'bg-green-100 border-green-500 ring-2 ring-green-400' : ''}
                                        ${answerSelected && idx === selectedOptionIndex && idx !== questions[currentQuestionIndex].correct_answer ? 'bg-red-100 border-red-500 ring-2 ring-red-400' : ''}
                                        ${answerSelected && idx !== questions[currentQuestionIndex].correct_answer && idx !== selectedOptionIndex ? 'opacity-50 bg-gray-50 border-gray-200' : ''}
                                    `}
                                >
                                    <span className={`font-bold mr-4 w-8 h-8 flex items-center justify-center rounded-full text-sm ${answerSelected && idx === questions[currentQuestionIndex].correct_answer ? 'bg-green-500 text-white' :
                                        answerSelected && idx === selectedOptionIndex && idx !== questions[currentQuestionIndex].correct_answer ? 'bg-red-500 text-white' :
                                            'bg-gray-200 text-gray-700'
                                        }`}>{String.fromCharCode(65 + idx)}</span>
                                    <span className="text-lg text-gray-800 font-semibold">{option}</span>
                                </button>
                            ))}
                        </div>

                        {/* Hint & Controls */}
                        <div className="flex justify-between items-center mt-8">
                            <button onClick={useHint} disabled={hintCount === 0 || answerSelected} className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold">
                                <span>💡 Hint</span>
                                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">{hintCount}</span>
                            </button>
                        </div>

                        {/* Floating Point Animation */}
                        {pointAnimation && (
                            <div className="absolute text-yellow-500 font-bold text-4xl animate-bounce" style={{ top: '10%', right: '10%' }}>
                                +{pointAnimation.points}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* View: Results */}
            {view === 'results' && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white border border-gray-200 p-10 rounded-3xl max-w-md w-full text-center shadow-2xl animate-float relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                        <h3 className="text-4xl font-bold mb-4 text-gray-800 black-ops">Quiz Complete! 🎉</h3>
                        <p className="text-xl mb-2 text-gray-600">Your Final Score</p>
                        <div className="text-6xl font-bold text-purple-600 mb-6">{score}</div>
                        <p className="mb-8 text-gray-500 italic font-medium">{getResultMessage()}</p>

                        <div className="space-y-4">
                            <button onClick={() => window.location.reload()} className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:scale-105 transition-transform shadow-lg">
                                Try Another Quiz
                            </button>
                            <button onClick={() => navigate('/home')} className="w-full bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all border border-gray-300">
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizInterface;
