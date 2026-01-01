import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMyQuizzes();
    }, []);

    const fetchMyQuizzes = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo) {
                navigate('/login');
                return;
            }
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };
            const res = await axios.get(`${API_BASE_URL}/api/quiz/my`, config);
            setQuizzes(res.data);
        } catch (error) {
            console.error(error);
            alert('Failed to fetch your quizzes');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this quiz? This cannot be undone.')) {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                };
                await axios.delete(`${API_BASE_URL}/api/quiz/${id}`, config);
                // Remove from state
                setQuizzes(quizzes.filter(q => q._id !== id));
            } catch (error) {
                console.error(error);
                alert('Failed to delete quiz');
            }
        }
    };

    return (
        <div className="bg-[#f2f2f2] min-h-screen font-quicksand text-black flex flex-col">
            <Navbar />
            <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto w-full flex-grow">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-4xl font-bold black-ops text-purple-800 drop-shadow-sm">My Quizzes</h2>
                    <Link to="/create-quiz" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform shadow-lg">
                        + Create New
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center text-2xl font-bold text-gray-500 animate-pulse">Loading your masterpieces...</div>
                ) : quizzes.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300">
                        <p className="text-2xl text-gray-500 mb-6">You haven't created any quizzes yet.</p>
                        <Link to="/create-quiz" className="text-purple-600 font-bold hover:underline text-lg">Start hosting now!</Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {quizzes.map((quiz) => (
                            <div key={quiz._id} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-1 relative group">
                                <div className="absolute top-4 right-4 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-mono font-bold">
                                    Code: {quiz.code}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-800 pr-20">{quiz.title}</h3>
                                <p className="text-gray-500 mb-6">{quiz.questions.length} Questions • {new Date(quiz.createdAt).toLocaleDateString()}</p>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleDelete(quiz._id)}
                                        className="flex-1 py-3 border-2 border-red-100 text-red-500 font-bold rounded-xl hover:bg-red-50 hover:border-red-500 transition-colors"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(quiz.code);
                                            alert(`Code ${quiz.code} copied to clipboard!`);
                                        }}
                                        className="flex-1 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors shadow-md"
                                    >
                                        Copy Code
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MyQuizzes;
