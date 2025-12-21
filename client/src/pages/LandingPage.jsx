import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/ParticlesBackground';

const LandingPage = () => {
    const navigate = useNavigate();

    // Check if user is logged in
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            navigate('/dashboard');
        }
    }, [navigate]);

    // GSAP Animations
    useEffect(() => {
        let ctx = gsap.context(() => {
            // Basic animations for space elements
            gsap.from('.spacecraft', { duration: 2, y: -100, opacity: 0, ease: "power2.out", delay: 0.5 });

            let tl1 = gsap.timeline();
            tl1.from('.planet-1', { duration: 1, x: -400, y: -50, rotation: 32, scale: 0.5, opacity: 0 })
                .to('.planet-1', { duration: 1, rotation: 15, scale: 1.2 })
                .to('.planet-1', { duration: 1, rotation: 0, scale: 1 });

            let tl2 = gsap.timeline({ repeat: -1, yoyo: true });
            tl2.from('.planet-2', { duration: 1, x: 50, y: -50, rotation: 30, opacity: 0 })
                .to('.planet-2', { duration: 5, rotation: 360 });

            gsap.from('.astronaut', { duration: 3, y: -100, scale: 1.3, opacity: 0, ease: "back.out(1.7)", delay: 1 });
            gsap.from('.ufo', { duration: 2, y: 100, opacity: 0, ease: "power1.out", delay: 1.5 });

            // Create floating animations for space objects
            gsap.to('.spacecraft', { duration: 4, y: "+=30", repeat: -1, yoyo: true, ease: "sine.inOut" });
            gsap.to('.planet-1', { duration: 5, y: "+=20", repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
            gsap.to('.planet-2', { duration: 7, y: "+=15", repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
            gsap.to('.astronaut', { duration: 6, y: "+=25", repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.7 });
            gsap.to('.ufo', { duration: 3, y: "+=15", x: "+=25", repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 });

            // Add slow rotation to planets
            gsap.to('.planet-1', { duration: 25, rotation: 360, repeat: -1, ease: "none" });
            gsap.to('.planet-2', { duration: 18, rotation: -360, repeat: -1, ease: "none" });
        });

        return () => ctx.revert();
    }, []);

    // Particles handled by ParticlesBackground component

    const handleButtonClick = (e) => {
        // Just visual effect, navigation handled by Link or Logic
        const btn = e.currentTarget;
        const clickEffects = document.querySelectorAll('.click-effect');
        clickEffects.forEach(effect => {
            effect.style.top = (e.clientY + window.scrollY) + "px";
            effect.style.left = (e.clientX + window.scrollX) + "px";
            effect.classList.add("effect");
            setTimeout(() => {
                effect.classList.remove("effect");
            }, 750);
        });
    };

    return (
        <div className="bg-[#f2f2f2] text-black overflow-x-hidden min-h-screen flex flex-col font-['Poppins']">
            <Navbar />

            <ParticlesBackground />

            <main className="main-hero relative flex items-center justify-center px-4 flex-grow z-10">

                {/* Space Animation Elements */}
                <div className="space-container">
                    <div className="space-blob blob-1" style={{ backgroundColor: 'rgba(180, 180, 220, 0.6)' }}>
                        <img src="/assets/spacecraft.png" alt="spacecraft" className="space-img spacecraft" />
                    </div>
                    <div className="space-blob blob-2" style={{ backgroundColor: 'rgba(180, 180, 220, 0.5)' }}>
                        <img src="/assets/planet-2.png" alt="planet" className="space-img planet-2" />
                    </div>
                    <div className="space-blob blob-3" style={{ backgroundColor: 'rgba(180, 180, 220, 0.6)' }}><img src="/assets/planet-1.png" alt="planet" className="space-img planet-1" /></div>
                    <div className="space-blob blob-4" style={{ backgroundColor: 'rgba(180, 180, 220, 0.5)' }}><img src="/assets/astronaut.png" alt="astronaut" className="space-img astronaut" /></div>
                    <img src="/assets/ufo.png" alt="ufo" className="space-img ufo" />
                </div>

                {/* Content */}
                <div className="text-center space-y-8 animate-float max-w-5xl mx-auto relative z-10">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold black-ops leading-tight px-4 text-yellow-400 drop-shadow-lg">
                        Welcome to the
                        <br className="md:hidden" />
                        <span className="whitespace-nowrap"> Knowledge Zone</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto px-4 font-semibold">
                        Enter the <span className='text-purple-600 font-bold'>ultimate knowledge galaxy</span>, where every question unlocks new possibilities.
                    </p>
                    <div className="space-y-4 relative inline-block">
                        <button
                            type="button"
                            onClick={(e) => {
                                handleButtonClick(e);
                                const userInfo = localStorage.getItem('userInfo');
                                navigate(userInfo ? '/dashboard' : '/register');
                            }}
                            className="btn bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-8 rounded-full 
                                     hover:scale-105 transform transition-transform duration-300 hover:shadow-lg hover:shadow-yellow-500/50">
                            🚀 Get Started
                        </button>
                        <div className="click-effect">
                            <div className="spike" style={{ "--angle": "5deg", "--distance": "30px" }}></div>
                            <div className="spike" style={{ "--angle": "55deg", "--distance": "31px" }}></div>
                            <div className="spike" style={{ "--angle": "75deg", "--distance": "27px" }}></div>
                            <div className="spike" style={{ "--angle": "135deg", "--distance": "30px" }}></div>
                            <div className="spike" style={{ "--angle": "190deg", "--distance": "28px" }}></div>
                            <div className="spike" style={{ "--angle": "210deg", "--distance": "32px" }}></div>
                            <div className="spike" style={{ "--angle": "280deg", "--distance": "31px" }}></div>
                            <div className="spike" style={{ "--angle": "330deg", "--distance": "30px" }}></div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Features Section */}
            <section className="py-20 px-6 relative z-10 bg-white/50 backdrop-blur-sm">
                <div className="container mx-auto grid md:grid-cols-3 gap-12">
                    <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl hover:scale-105 transition-transform duration-300 border border-gray-200 shadow-xl">
                        <h3 className="text-2xl font-bold text-purple-600 mb-4">Multiple Categories</h3>
                        <p className="text-gray-600">Explore diverse topics from science to pop culture.</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl hover:scale-105 transition-transform duration-300 border border-gray-200 shadow-xl">
                        <h3 className="text-2xl font-bold text-purple-600 mb-4">Real-time Scoring</h3>
                        <p className="text-gray-600">Track your progress with instant feedback and scoring.</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl hover:scale-105 transition-transform duration-300 border border-gray-200 shadow-xl">
                        <h3 className="text-2xl font-bold text-purple-600 mb-4">Global Rankings</h3>
                        <p className="text-gray-600">Compete with players worldwide and climb the leaderboard.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;
