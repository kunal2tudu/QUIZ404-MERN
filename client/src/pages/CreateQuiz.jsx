import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CreateQuiz = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([
        { question_text: '', options: ['', '', '', ''], correct_answer: 0 }
    ]);
    const [loading, setLoading] = useState(false);

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question_text: '', options: ['', '', '', ''], correct_answer: 0 }]);
    };

    const removeQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        try {
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };
            const res = await axios.post('http://localhost:5000/api/quiz/create', { title, questions }, config);
            alert(`Quiz Created! Share this code: ${res.data.code}`);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Failed to create quiz');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f2f2f2] min-h-screen font-quicksand text-black">
            <Navbar />
            <div className="pt-24 pb-20 px-4 max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-8 black-ops text-yellow-400 drop-shadow-lg">Create Your Quiz</h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-200">
                        <label className="block text-xl font-bold mb-2 text-purple-700">Quiz Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border-2 border-purple-100 rounded-lg focus:outline-none focus:border-purple-500 text-lg"
                            placeholder="e.g., Ultimate Space Trivia"
                            required
                        />
                    </div>

                    {questions.map((q, qIndex) => (
                        <div key={qIndex} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 relative animate-fade-in-up">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-700">Question {qIndex + 1}</h3>
                                {questions.length > 1 && (
                                    <button type="button" onClick={() => removeQuestion(qIndex)} className="text-red-500 hover:text-red-700 font-bold">
                                        Remove
                                    </button>
                                )}
                            </div>

                            <input
                                type="text"
                                value={q.question_text}
                                onChange={(e) => handleQuestionChange(qIndex, 'question_text', e.target.value)}
                                className="w-full p-3 mb-4 border border-gray-200 rounded-lg focus:border-yellow-400 outline-none"
                                placeholder="Enter question text here..."
                                required
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                                {q.options.map((opt, oIndex) => (
                                    <div key={oIndex} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name={`correct-${qIndex}`}
                                            checked={q.correct_answer === oIndex}
                                            onChange={() => handleQuestionChange(qIndex, 'correct_answer', oIndex)}
                                            className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                                        />
                                        <input
                                            type="text"
                                            value={opt}
                                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                            className={`w-full p-2 border rounded-lg outline-none focus:border-purple-400 ${q.correct_answer === oIndex ? 'border-green-400 bg-green-50' : 'border-gray-200'}`}
                                            placeholder={`Option ${oIndex + 1}`}
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="flex gap-4 justify-center">
                        <button type="button" onClick={addQuestion} className="px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-full hover:bg-gray-300 transition-colors">
                            + Add Question
                        </button>
                        <button type="submit" disabled={loading} className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full hover:scale-105 transition-transform shadow-lg">
                            {loading ? 'Creating...' : 'Host Quiz'}
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default CreateQuiz;
