import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import gsap from 'gsap';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/ParticlesBackground';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [welcomeText, setWelcomeText] = useState('');

    // Leaderboard State
    const [topPlayers, setTopPlayers] = useState([]);
    const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

    // Fetch Leaderboard for Dashboard Widget
    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/quiz/leaderboard`);
                setTopPlayers(res.data.slice(0, 3)); // Top 3 only
            } catch (err) {
                console.error("Leaderboard fetch failed", err);
            } finally {
                setLoadingLeaderboard(false);
            }
        };

        fetchLeaderboard();
    }, []);

    useEffect(() => {
        // Check Auth
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            navigate('/login');
            return;
        }
        setUser(JSON.parse(userInfo));

        // Init AOS
        AOS.init({
            once: true,
            duration: 800,
            offset: 200,
        });

        // Typewriter Effect
        const userData = JSON.parse(userInfo);
        const fullText = `Welcome, ${userData.username || 'Traveler'}!`;
        let i = 0;
        const typeWriter = () => {
            if (i < fullText.length) {
                setWelcomeText((prev) => fullText.substring(0, i + 1));
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        // Small delay start
        setTimeout(typeWriter, 500);

    }, [navigate]);

    // GSAP Animations (Ported from LandingPage)
    useEffect(() => {
        if (!user) return; // Wait for DOM to assume presence
        let ctx = gsap.context(() => {
            gsap.to('.spacecraft', { duration: 4, y: "+=30", repeat: -1, yoyo: true, ease: "sine.inOut" });
            gsap.to('.planet-1', { duration: 5, y: "+=20", repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
            gsap.to('.planet-2', { duration: 7, y: "+=15", repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
            gsap.to('.astronaut', { duration: 6, y: "+=25", repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.7 });
            gsap.to('.ufo', { duration: 3, y: "+=15", x: "+=25", repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 });
        });
        return () => ctx.revert();
    }, [user]);

    // Particles handled by ParticlesBackground component

    if (!user) return null; // or loading spinner

    return (
        <div className="bg-[#f2f2f2] text-black overflow-x-hidden min-h-screen flex flex-col font-quicksand">
            <Navbar />
            <ParticlesBackground />

            {/* Hero Section */}
            <section className="relative text-center min-h-screen flex items-center justify-center px-6 pt-24 animate-float z-10">

                {/* Space Blobs (Ported from LandingPage) */}
                <div className="space-container">
                    <div className="space-blob blob-1" style={{ backgroundColor: 'rgba(180, 180, 220, 0.6)' }}>
                        <img src="/assets/spacecraft.png" alt="spacecraft" className="space-img spacecraft" />
                    </div>
                    <div className="space-blob blob-2" style={{ backgroundColor: 'rgba(180, 180, 220, 0.5)' }}>
                        <img src="/assets/planet-2.png" alt="planet" className="space-img planet-2" />
                    </div>
                    <div className="space-blob blob-3" style={{ backgroundColor: 'rgba(180, 180, 220, 0.6)' }}><img src="/assets/planet-1.png" alt="planet" className="space-img planet-1" /></div>
                    <div className="space-blob blob-4" style={{ backgroundColor: 'rgba(180, 180, 220, 0.5)' }}>
                        {/* Astronaut darkened similar to LandingPage */}
                        <img src="/assets/astronaut.png" alt="astronaut" className="space-img astronaut" style={{ filter: 'brightness(0.5)' }} />
                    </div>
                    <img src="/assets/ufo.png" alt="ufo" className="space-img ufo" />
                </div>

                <div className="max-w-3xl mx-auto relative z-10">
                    {/* Welcome Message */}
                    <div className="text-purple-600 text-lg mb-6 font-mono overflow-hidden whitespace-nowrap min-h-[1.5em] font-bold">
                        {welcomeText}
                        <span className="animate-blink">|</span>
                    </div>

                    {/* Main Heading - Yellow with Black Outline */}
                    <h2 className="text-5xl sm:text-6xl font-extrabold mb-6 title-font black-ops text-yellow-400 drop-shadow-lg">
                        Explore Your Knowledge Universe
                    </h2>

                    {/* Description */}
                    <p className="text-gray-700 text-lg mb-8 font-semibold">
                        Engage in thrilling challenges and connect with fellow knowledge enthusiasts across the cosmos.
                    </p>

                    {/* Call-to-action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
                        <Link to="/create-quiz" className="px-8 py-3 bg-white text-purple-700 border-2 border-purple-200 font-bold rounded-full hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                            Host a Quiz
                        </Link>
                        <Link to="/my-quizzes" className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-200 font-bold rounded-full hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                            My Quizzes
                        </Link>
                        <Link to="/join-quiz" className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full hover:scale-105 transition-transform shadow-lg">
                            Take a Quiz 🚀
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-white/50 backdrop-blur-md py-16 px-6 rounded-2xl mx-4 sm:mx-12 relative z-10" data-aos="fade-up">
                <h3 className="text-3xl font-bold text-center mb-6 text-purple-600">How It Works</h3>
                <div className="grid sm:grid-cols-3 gap-10 text-center text-gray-700">
                    <div className="bg-white/80 p-6 rounded-lg hover:scale-105 transition-transform duration-300 shadow-md">
                        <h4 className="text-xl font-semibold mb-2">1. Choose Your Path</h4>
                        <p>Select topics you love to kickstart your adventure.</p>
                    </div>
                    <div className="bg-white/80 p-6 rounded-lg hover:scale-105 transition-transform duration-300 shadow-md">
                        <h4 className="text-xl font-semibold mb-2">2. Challenge Others</h4>
                        <p>Compete in exciting battles with friends or bots.</p>
                    </div>
                    <div className="bg-white/80 p-6 rounded-lg hover:scale-105 transition-transform duration-300 shadow-md">
                        <h4 className="text-xl font-semibold mb-2">3. Win Rewards</h4>
                        <p>Earn badges, climb the leaderboard, and shine bright.</p>
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="py-20 px-6 relative z-10" data-aos="fade-up">
                <h3 className="text-3xl font-bold text-center mb-8 text-black">Featured Categories</h3>
                <div className="grid sm:grid-cols-4 gap-6 text-center">
                    {['Technology', 'Science', 'History', 'Sports'].map((cat, idx) => (
                        <Link
                            key={cat}
                            to={`/quiz?category=${cat.toLowerCase()}`}
                            className="block p-6 bg-white rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl border border-gray-200 group"
                            data-aos="flip-left"
                            data-aos-delay={idx * 200}
                        >
                            <h4 className="text-xl font-semibold mb-2 text-purple-700 group-hover:text-purple-900 transition-colors">{cat}</h4>
                            <span className="text-sm text-yellow-600 font-bold group-hover:underline">Play Now →</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Leaderboard Section */}
            <section className="bg-white/50 backdrop-blur-md py-16 px-6 rounded-2xl mx-4 sm:mx-12 mb-20 relative z-10" data-aos="fade-right">
                <div className="max-w-md mx-auto bg-white/90 p-6 rounded-2xl shadow-xl animate-float border-2 border-purple-200">
                    <h3 className="text-2xl font-bold text-center black-ops text-purple-800">Top Minds of the Week</h3>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4 transition transform hover:scale-110">
                        {loadingLeaderboard ? (
                            <p className="text-center text-gray-500 animate-pulse">Loading standings...</p>
                        ) : topPlayers.length === 0 ? (
                            <p className="text-center text-gray-500">No scores yet 🎮 Be the first!</p>
                        ) : (
                            <ul className="space-y-2 text-center text-gray-800">
                                {topPlayers.map((p, index) => (
                                    <li key={p._id || index} className="text-lg">
                                        {index === 0 && "🥇 "}
                                        {index === 1 && "🥈 "}
                                        {index === 2 && "🥉 "}
                                        <span className={`font-bold ${index === 0 ? 'text-yellow-600' : index === 1 ? 'text-gray-500' : 'text-orange-500'}`}>
                                            {p.user?.username || "Unknown Player"}
                                        </span>{" "}
                                        - {p.score} pts
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <Link to="/leaderboard" className="block mt-6 px-6 py-3 text-center bg-yellow-400 text-black text-lg font-semibold rounded-full hover:bg-yellow-500 transition transform hover:scale-105">
                        Go to the Leaderboard
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Dashboard;
