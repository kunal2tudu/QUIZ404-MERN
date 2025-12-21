import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-[#fffbea] text-gray-900 min-h-screen font-quicksand">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-center">
                <span className="text-xs tracking-wider font-bold text-gray-500 uppercase">
                    MERN Stack Project
                </span>

                <h1 className="text-5xl sm:text-6xl font-extrabold mt-4 leading-tight">
                    We write the <span className="text-yellow-500">code.</span>
                    <br />
                    You test your <span className="text-purple-600">skills.</span>
                </h1>

                <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
                    Welcome to our Full Stack Quiz Platform. Built using MongoDB, Express,
                    React, and Node — designed to challenge your mind and reward your
                    knowledge.
                </p>

                <div className="flex gap-4 justify-center mt-8">
                    <Link to="/join-quiz" className="bg-yellow-400 px-6 py-3 rounded-full font-bold hover:bg-yellow-500 transition">
                        Play the Quiz
                    </Link>
                    <a href="#team" className="bg-white border px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition">
                        Meet the Team
                    </a>
                </div>

                {/* Image Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
                    <img src="/assets/team1.jpg" className="rounded-xl shadow-lg" alt="Team" />
                    <img src="/assets/team2.jpg" className="rounded-xl shadow-lg" alt="Team" />
                    <img src="/assets/team3.jpg" className="rounded-xl shadow-lg" alt="Team" />
                </div>
            </section>

            {/* Tech Stack */}
            <section className="px-6 py-20 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <span className="text-xs tracking-wider font-bold text-gray-500 uppercase">
                        Tech Stack
                    </span>

                    <h2 className="text-4xl font-bold mt-3">Mission: Master the MERN Stack.</h2>

                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Our project wasn’t just built. It was engineered. From backend
                        architecture to frontend polish — everything is optimized for
                        performance, scalability and fun.
                    </p>

                    <div className="grid sm:grid-cols-3 gap-8 mt-10">
                        <div className="bg-[#fff7d6] p-6 rounded-xl shadow">
                            <h3 className="font-bold text-lg mb-2">MongoDB & Data</h3>
                            <p className="text-gray-600 text-sm">
                                Robust database design with efficient querying and secure data
                                storage.
                            </p>
                        </div>

                        <div className="bg-[#f0e9ff] p-6 rounded-xl shadow">
                            <h3 className="font-bold text-lg mb-2">Express & Node</h3>
                            <p className="text-gray-600 text-sm">
                                Fast backend APIs ensuring seamless quiz processing.
                            </p>
                        </div>

                        <div className="bg-[#ffe6f2] p-6 rounded-xl shadow">
                            <h3 className="font-bold text-lg mb-2">React Frontend</h3>
                            <p className="text-gray-600 text-sm">
                                Interactive, responsive UI that delivers smooth gameplay.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="px-6 py-20 max-w-5xl mx-auto text-center">
                <span className="text-xs tracking-wider font-bold text-gray-500 uppercase">
                    Our Process
                </span>

                <h2 className="text-4xl font-bold mt-2">From Idea to Deployment</h2>

                <div className="mt-10 space-y-6">
                    <div className="bg-white shadow p-6 rounded-xl">🧠 Planning & Design</div>
                    <div className="bg-white shadow p-6 rounded-xl">🛠️ Backend Development</div>
                    <div className="bg-white shadow p-6 rounded-xl">🎨 Frontend Development</div>
                    <div className="bg-white shadow p-6 rounded-xl">🚀 Testing & Launch</div>
                </div>
            </section>

            {/* Team */}
            <section id="team" className="px-6 py-20 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <span className="text-xs tracking-wider font-bold text-gray-500 uppercase">
                        The Squad
                    </span>

                    <h2 className="text-4xl font-bold mt-2">Meet the Developers</h2>

                    <div className="grid sm:grid-cols-3 gap-10 mt-12">
                        <div>
                            <img src="/assets/dev1.jpg" className="w-32 h-32 rounded-full mx-auto shadow" />
                            <h3 className="font-bold mt-4">Sapna Rai</h3>
                            <p className="text-gray-500 text-sm">Backend Developer</p>
                        </div>

                        <div>
                            <img src="/assets/dev2.jpg" className="w-32 h-32 rounded-full mx-auto shadow" />
                            <h3 className="font-bold mt-4">Kunal Tudu</h3>
                            <p className="text-gray-500 text-sm">Frontend Developer</p>
                        </div>

                        <div>
                            <img src="/assets/dev3.jpg" className="w-32 h-32 rounded-full mx-auto shadow" />
                            <h3 className="font-bold mt-4">Saurav</h3>
                            <p className="text-gray-500 text-sm">Frontend Developer</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 py-20">
                <div className="max-w-5xl mx-auto bg-yellow-400 rounded-3xl p-12 text-center shadow-xl">
                    <h2 className="text-4xl font-bold mb-4">
                        Ready to Test Your Knowledge?
                    </h2>
                    <p className="text-gray-700 mb-6">
                        Challenge yourself. Beat your friends. Claim your place on the leaderboard.
                    </p>

                    <div className="flex gap-4 justify-center">
                        <Link to="/dashboard" className="bg-black text-white px-6 py-3 rounded-full font-bold">
                            Start Quiz
                        </Link>
                        <a href="https://github.com" target="_blank" rel="noreferrer"
                            className="border px-6 py-3 rounded-full font-bold">
                            View Source Code
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
