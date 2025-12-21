import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        navigate('/');
    };

    return (
        <div className="w-full relative z-50 pt-4 px-4 sm:px-6 lg:px-8 font-display">
            <nav className={`mx-auto max-w-7xl bg-white/90 dark:bg-[#1c190d]/90 backdrop-blur-md rounded-full border border-[#e5e7eb] dark:border-[#333] shadow-lg transition-all duration-300 ${scrolled ? 'shadow-xl' : ''}`}>
                <div className="px-6 py-3 flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex items-center gap-3 shrink-0">
                        <Link to="/" className="flex items-center gap-2 group hover:scale-105 transition-transform duration-200">
                            <div className="size-10 bg-primary rounded-full flex items-center justify-center text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
                                <span className="material-symbols-outlined text-[24px]">extension</span>
                            </div>
                            <span className="text-xl font-extrabold tracking-tight text-black dark:text-white">
                                Quiz<span className="text-primary">404</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        <Link to="/" className="px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-primary/20 rounded-full transition-colors duration-200">
                            Home
                        </Link>
                        <Link to="/about" className="px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-primary/20 rounded-full transition-colors duration-200">
                            About Us
                        </Link>
                        <Link to="/quiz" className="px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-primary/20 rounded-full transition-colors duration-200">
                            Quiz
                        </Link>
                        <Link to="/contact" className="px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-primary/20 rounded-full transition-colors duration-200">
                            Contact Us
                        </Link>
                        <Link to="/leaderboard" className="px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-primary/20 rounded-full transition-colors duration-200">
                            Leaderboard
                        </Link>
                    </div>

                    {/* Auth & Mobile Toggle */}
                    <div className="flex items-center gap-3 md:gap-4 shrink-0">
                        <div className="flex items-center gap-3">
                            {user ? (
                                <div className="flex items-center gap-3">
                                    <span className="hidden sm:inline font-bold text-gray-700 dark:text-gray-300">Hi, {user.username}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="relative inline-flex group"
                                    >
                                        <div className="absolute transition-all duration-200 rounded-full -inset-px bg-black group-hover:shadow-[4px_4px_0px_0px_rgba(255,0,0,1)]"></div>
                                        <div className="relative inline-flex items-center justify-center h-10 px-6 py-2 text-sm font-bold text-white transition-all duration-200 bg-red-500 border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900 cursor-pointer">
                                            Logout
                                        </div>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="hidden sm:inline-flex items-center justify-center h-10 px-6 py-2 text-sm font-bold text-black dark:text-white dark:hover:text-black transition-all duration-200 bg-transparent border-2 border-black dark:border-gray-600 hover:bg-white dark:hover:bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                                        Login
                                    </Link>
                                    <Link to="/register" className="relative inline-flex group">
                                        <div className="absolute transition-all duration-200 rounded-full -inset-px bg-black group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:group-hover:shadow-[4px_4px_0px_0px_rgba(244,209,37,0.4)]"></div>
                                        <button className="relative inline-flex items-center justify-center h-10 px-6 py-2 text-sm font-bold text-black transition-all duration-200 bg-[#f4d125] border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 cursor-pointer">
                                            Signup
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden flex items-center justify-center p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="hidden absolute top-20 left-4 right-4 bg-white dark:bg-[#1c190d] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-4 flex flex-col gap-2 z-40 animate-fade-in-down lg:hidden" style={{ display: 'flex' }}>
                    <Link to="/" className="block px-4 py-3 rounded-xl hover:bg-[#f4d125]/10 font-bold text-gray-800 dark:text-gray-200">Home</Link>
                    <Link to="/about" className="block px-4 py-3 rounded-xl hover:bg-[#f4d125]/10 font-bold text-gray-800 dark:text-gray-200">About Us</Link>
                    <Link to="/quiz" className="block px-4 py-3 rounded-xl hover:bg-[#f4d125]/10 font-bold text-gray-800 dark:text-gray-200">Quiz</Link>
                    <Link to="/contact" className="block px-4 py-3 rounded-xl hover:bg-[#f4d125]/10 font-bold text-gray-800 dark:text-gray-200">Contact Us</Link>
                    <Link to="/leaderboard" className="block px-4 py-3 rounded-xl hover:bg-[#f4d125]/10 font-bold text-gray-800 dark:text-gray-200">Leaderboard</Link>

                    <div className="h-px bg-gray-100 dark:bg-gray-800 my-1"></div>

                    <div className="flex flex-col gap-2 mt-2">
                        {user ? (
                            <button onClick={handleLogout} className="block w-full px-4 py-3 text-center rounded-xl bg-red-500 border-2 border-black font-bold text-white">Logout</button>
                        ) : (
                            <>
                                <Link to="/login" className="block px-4 py-3 text-center rounded-xl border-2 border-gray-200 dark:border-gray-700 font-bold text-gray-800 dark:text-gray-200">Login</Link>
                                <Link to="/register" className="block px-4 py-3 text-center rounded-xl bg-primary border-2 border-black font-bold text-black">Signup</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
