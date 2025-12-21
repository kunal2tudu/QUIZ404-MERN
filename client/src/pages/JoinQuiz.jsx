import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const JoinQuiz = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [communityQuizzes, setCommunityQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleJoin = (e) => {
        e.preventDefault();
        if (code.trim().length !== 6) {
            alert('Please enter a valid 6-digit code');
            return;
        }
        navigate(`/quiz?code=${code}`);
    };

    useEffect(() => {
        const fetchCommunityQuizzes = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (!userInfo) return;

                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                };
                const res = await axios.get('http://localhost:5000/api/quiz/all', config);
                setCommunityQuizzes(res.data);
            } catch (error) {
                console.error("Failed to load community quizzes", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCommunityQuizzes();
    }, []);

    return (
        <div className="bg-[#f2f2f2] min-h-screen font-quicksand text-black flex flex-col">
            <Navbar />
            <div className="flex-grow pt-32 pb-20 px-6">
                {/* Join Section */}
                <div className="max-w-md mx-auto w-full bg-white p-8 rounded-2xl shadow-xl border-2 border-purple-100 text-center animate-float mb-20">
                    <h2 className="text-3xl font-bold mb-6 black-ops text-purple-800">Join a Quiz</h2>
                    <p className="text-gray-600 mb-8 font-semibold">Enter the unique 6-digit code shared by your host to enter the arena.</p>

                    <form onSubmit={handleJoin} className="space-y-6">
                        <input
                            type="text"
                            maxLength="6"
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} // Numbers only
                            className="w-full text-center text-4xl tracking-widest p-4 border-2 border-gray-300 rounded-xl focus:border-yellow-400 outline-none font-mono"
                            placeholder="000000"
                        />
                        <button type="submit" className="w-full py-4 bg-yellow-400 text-black font-bold text-xl rounded-xl hover:bg-yellow-500 transition-colors shadow-lg">
                            Launch 🚀
                        </button>
                    </form>
                </div>

                {/* Community Quizzes Section */}
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-10 black-ops text-gray-800 drop-shadow-sm">Community Quizzes</h2>

                    {loading ? (
                        <div className="text-center text-xl text-gray-400 animate-pulse">Loading community challenges...</div>
                    ) : communityQuizzes.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">No community quizzes available yet. Be the first to host one!</div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {communityQuizzes.map((quiz) => (
                                <div key={quiz._id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{quiz.title}</h3>
                                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold whitespace-nowrap">
                                            {quiz.questions.length} Qs
                                        </span>
                                    </div>
                                    <div className="text-gray-500 text-sm mb-6 flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">
                                            {quiz.creator?.username?.charAt(0).toUpperCase() || '?'}
                                        </span>
                                        Hosted by <span className="text-purple-600 font-semibold">{quiz.creator?.username || 'Unknown'}</span>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => navigate(`/quiz?code=${quiz.code}`)}
                                            className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-md"
                                        >
                                            Take Quiz
                                        </button>
                                        <div className="px-3 py-3 bg-gray-100 rounded-xl font-mono text-gray-500 text-sm flex items-center" title="Quiz Code">
                                            #{quiz.code}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default JoinQuiz;
