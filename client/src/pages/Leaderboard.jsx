import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('global'); // 'global' or 'custom'
    const [quizCode, setQuizCode] = useState('');
    const [searchedTitle, setSearchedTitle] = useState('');
    const canvasRef = useRef(null);

    const fetchLeaderboard = async (code = null) => {
        setIsLoading(true);
        setLeaderboard([]);

        try {
            let params = {};

            if (code) {
                // First get quiz_id from code
                try {
                    const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
                    const quizRes = await axios.get(`http://localhost:5000/api/quiz/code/${code}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    params.quiz_id = quizRes.data._id;
                    setSearchedTitle(quizRes.data.title);
                } catch (err) {
                    alert('Invalid Quiz Code');
                    setIsLoading(false);
                    return;
                }
            } else {
                setSearchedTitle('');
            }

            const response = await axios.get('http://localhost:5000/api/quiz/leaderboard', { params });
            // Map user._id inside user object if population happened, or just handle user.username
            // Controller populates 'user' -> { _id, username }
            // Our DB: 'user' is the populated object.
            // Map it flat for display if needed, or access directly.
            // API return: [{ user: {username: '...'}, score: 10, ... }]
            const formattedData = response.data.map(item => ({
                id: item._id,
                username: item.user ? item.user.username : 'Unknown',
                score: item.score,
                category: item.category,
                date: item.createdAt
            }));

            setLeaderboard(formattedData);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'global') {
            fetchLeaderboard();
        } else {
            setLeaderboard([]); // Clear when switching to custom until search
        }
    }, [activeTab]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (quizCode.length === 6) {
            fetchLeaderboard(quizCode);
        } else {
            alert('Please enter a 6-digit code');
        }
    };

    // Particles Reuse
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        const particles = Array.from({ length: 50 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            opacity: Math.random() * 0.5 + 0.2
        }));

        const animate = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.x > canvas.width || p.x < 0) p.speedX *= -1;
                if (p.y > canvas.height || p.y < 0) p.speedY *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.fill();
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="bg-[#f2f2f2] text-black overflow-x-hidden min-h-screen flex flex-col font-quicksand relative">
            {/* Note: User wanted "coherent" aesthetic. Dashboard is Light (#f2f2f2). 
                 Original Leaderboard was Dark. I am switching to Light to match Dashboard as requested "similar to landing and dashboard".
                 Wait, Landing supports both but user settled on Light.
             */}
            <Navbar />
            {/* Dark particles on light bg */}
            <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-50"></canvas>

            <section className="flex-grow pt-32 px-6 mb-20 bg-[#f2f2f2]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl font-bold mb-8 text-yellow-400 black-ops drop-shadow-md animate-float">Leaderboard</h2>

                    <div className="flex justify-center gap-4 mb-8">
                        <button
                            onClick={() => setActiveTab('global')}
                            className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'global' ? 'bg-yellow-400 text-black shadow-lg' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
                        >
                            Global Rankings
                        </button>
                        <button
                            onClick={() => setActiveTab('custom')}
                            className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'custom' ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
                        >
                            Custom Quiz
                        </button>
                    </div>

                    {activeTab === 'custom' && (
                        <form onSubmit={handleSearch} className="mb-8 flex gap-2 justify-center animate-fade-in-down">
                            <input
                                type="text"
                                maxLength="6"
                                placeholder="Enter Quiz Code"
                                value={quizCode}
                                onChange={(e) => setQuizCode(e.target.value.replace(/\D/g, ''))}
                                className="px-4 py-2 rounded-lg border-2 border-purple-200 focus:border-purple-500 outline-none w-48 text-center text-lg font-mono shadow-sm"
                            />
                            <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700 transition-colors shadow-md">
                                Search
                            </button>
                        </form>
                    )}

                    {searchedTitle && <h3 className="text-2xl font-bold mb-6 text-purple-700">🏆 {searchedTitle} 🏆</h3>}

                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                        {isLoading ? (
                            <div className="text-2xl animate-pulse text-gray-500">Loading Rankings...</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b-2 border-gray-100 text-gray-400 text-sm uppercase tracking-wider">
                                            <th className="p-4">Rank</th>
                                            <th className="p-4">Player</th>
                                            <th className="p-4">Score</th>
                                            <th className="p-4">Category</th>
                                            <th className="p-4">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        {leaderboard.length > 0 ? (
                                            leaderboard.map((entry, index) => (
                                                <tr key={index} className="border-b border-gray-50 hover:bg-yellow-50 transition-colors">
                                                    <td className="p-4 font-bold text-xl">
                                                        {index === 0 && '🥇'}
                                                        {index === 1 && '🥈'}
                                                        {index === 2 && '🥉'}
                                                        {index > 2 && <span className="text-gray-400">#{index + 1}</span>}
                                                    </td>
                                                    <td className="p-4 font-bold">{entry.username}</td>
                                                    <td className="p-4 text-purple-600 font-bold">{entry.score}</td>
                                                    <td className="p-4 text-sm bg-gray-100 rounded-lg inline-block my-2 px-3 py-1">{entry.category || '-'}</td>
                                                    <td className="p-4 text-sm text-gray-400">{new Date(entry.date).toLocaleDateString()}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="p-12 text-center text-gray-400 text-lg">
                                                    {activeTab === 'custom' && !searchedTitle ? 'Enter a code to see rankings' : 'No scores yet. Be the first! 🚀'}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Leaderboard;
