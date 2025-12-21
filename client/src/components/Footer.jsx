import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative mt-20 w-full bg-[#f4d125] text-[#1c190d] font-sans">
            <div className="absolute -top-[40px] left-0 w-full h-[41px] bg-[#f4d125] rounded-t-[3rem]"></div>

            <div className="max-w-[1120px] mx-auto px-6 pb-12 pt-8 md:px-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16 items-end">

                    {/* Brand Section */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="material-symbols-outlined text-[40px] rotate-[-10deg]">bolt</span>
                                <span className="font-black text-2xl tracking-tight uppercase">QUIZ404</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight">
                                Keep your brain <br />
                                <span className="underline decoration-4 decoration-white/40">buzzing!</span>
                            </h2>
                            <p className="text-lg font-medium leading-relaxed max-w-md opacity-90 mt-2">
                                Join our community to get the latest MERN stack quizzes and challenge updates.
                            </p>
                        </div>
                    </div>

                    {/* Social Connect */}
                    <div className="flex flex-col justify-end lg:items-end">
                        <div className="flex flex-col gap-4">
                            <p className="text-lg font-bold mb-2 lg:text-right">Connect with us:</p>
                            <div className="flex gap-4">
                                <a className="group relative flex items-center gap-3 px-6 py-4 bg-[#221f10] rounded-full text-white hover:bg-white hover:text-black transition-all hover:-translate-y-1 shadow-xl shadow-orange-900/5" href="#">
                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                                    </svg>
                                    <span className="font-bold">LinkedIn</span>
                                </a>
                                <a className="group relative flex items-center gap-3 px-6 py-4 bg-[#221f10] rounded-full text-white hover:bg-white hover:text-black transition-all hover:-translate-y-1 shadow-xl shadow-orange-900/5" href="#">
                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                                    </svg>
                                    <span className="font-bold">GitHub</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="h-px w-full bg-[#1c190d]/10 mb-12"></div>

                {/* Navigation Links */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 text-center md:text-left">
                    <nav className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
                        <Link to="/" className="px-5 py-3 rounded-xl bg-white/20 hover:bg-white/40 text-[#1c190d] font-bold text-lg transition-colors border border-black/5">
                            Home
                        </Link>
                        <Link to="/about" className="px-5 py-3 rounded-xl bg-white/20 hover:bg-white/40 text-[#1c190d] font-bold text-lg transition-colors border border-black/5">
                            About Us
                        </Link>
                        <Link to="/contact" className="px-5 py-3 rounded-xl bg-white/20 hover:bg-white/40 text-[#1c190d] font-bold text-lg transition-colors border border-black/5">
                            Contact
                        </Link>
                        <Link to="/privacy" className="px-5 py-3 rounded-xl bg-white/20 hover:bg-white/40 text-[#1c190d] font-bold text-lg transition-colors border border-black/5">
                            Privacy Policy
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <a className="group relative flex items-center justify-center w-14 h-14 bg-[#221f10] rounded-full text-[#f4d125] hover:bg-white hover:text-black transition-all hover:-translate-y-1 shadow-lg shadow-black/5" href="#">
                            <span className="material-symbols-outlined text-[24px]">forum</span>
                        </a>
                        <a className="group relative flex items-center justify-center w-14 h-14 bg-[#221f10] rounded-full text-[#f4d125] hover:bg-white hover:text-black transition-all hover:-translate-y-1 shadow-lg shadow-black/5" href="#">
                            <span className="material-symbols-outlined text-[24px]">terminal</span>
                        </a>
                        <a className="group relative flex items-center justify-center w-14 h-14 bg-[#221f10] rounded-full text-[#f4d125] hover:bg-white hover:text-black transition-all hover:-translate-y-1 shadow-lg shadow-black/5" href="#">
                            <span className="material-symbols-outlined text-[24px]">photo_camera</span>
                        </a>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-[#1c190d]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium opacity-80">
                    <p>© 2023 MERN Stack Group Project. All rights reserved.</p>
                    <div className="flex items-center gap-2">
                        <span>Made with</span>
                        <span className="material-symbols-outlined text-[16px] animate-pulse">favorite</span>
                        <span>and lots of coffee.</span>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none rounded-b-none h-full z-0">
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl transform translate-x-1/2"></div>
            </div>
        </footer>
    );
};

export default Footer;
