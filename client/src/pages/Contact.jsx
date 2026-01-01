import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState(''); // '' | 'loading' | 'success' | 'error'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await axios.post(`${API_BASE_URL}/api/contact`, formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' }); // Clear form
            setTimeout(() => setStatus(''), 5000); // Reset status after 5s
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
            setTimeout(() => setStatus(''), 5000);
        }
    };

    return (
        <div className="bg-[#f8f8f5] dark:bg-[#221f10] font-sans text-[#1c190d] dark:text-[#fcfbf8] antialiased min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow w-full pt-20">
                <section className="relative pt-16 pb-12 px-6 text-center overflow-hidden">
                    <div className="hidden lg:block absolute top-10 left-20 text-[#f4d125]/20 rotate-12 animate-pulse">
                        <span className="material-symbols-outlined text-9xl">extension</span>
                    </div>
                    <div className="hidden lg:block absolute bottom-10 right-20 text-[#f4d125]/20 -rotate-12 animate-pulse" style={{ animationDelay: '1s' }}>
                        <span className="material-symbols-outlined text-9xl">lightbulb</span>
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto space-y-6">
                        <div className="inline-block transform -rotate-2 bg-[#1c190d] text-[#f4d125] font-black px-4 py-2 text-sm uppercase tracking-widest rounded-lg shadow-xl shadow-yellow-900/10 mb-4">
                            We don't bite!
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-[#1c190d] dark:text-white tracking-tight leading-tight">
                            Get in
                            <span className="relative inline-block text-[#1c190d] dark:text-white ml-2">
                                Touch
                                <svg className="absolute w-full h-4 -bottom-1 left-0 text-[#f4d125] z-[-1]" preserveAspectRatio="none" viewBox="0 0 100 15">
                                    <path d="M0 10 Q 50 20 100 10" fill="none" opacity="0.8" stroke="currentColor" strokeWidth="8"></path>
                                </svg>
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium max-w-2xl mx-auto pt-4 leading-relaxed">
                            Got a question about a quiz? Found a bug? Or just want to tell us a coding joke? We're all ears!
                        </p>
                    </div>
                </section>

                <section className="max-w-[1200px] mx-auto px-6 pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Left Column: Info */}
                        <div className="lg:col-span-5 space-y-8 lg:space-y-12 flex flex-col h-full justify-center">
                            <div className="bg-white dark:bg-[#1c190d] p-8 rounded-[2rem] shadow-xl shadow-stone-200/50 dark:shadow-none border border-stone-100 dark:border-stone-800 space-y-8">
                                <div className="flex items-start gap-5 group">
                                    <div className="w-14 h-14 rounded-2xl bg-[#f4d125] flex items-center justify-center text-[#1c190d] shadow-lg shadow-[#f4d125]/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                        <span className="material-symbols-outlined text-[28px]">mail</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Email us</p>
                                        <a className="text-xl font-bold hover:text-[#f4d125] transition-colors" href="mailto:kunaltudu2@gmail.com">kunaltudu2@gmail.com</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5 group">
                                    <div className="w-14 h-14 rounded-2xl bg-[#221f10] dark:bg-stone-800 flex items-center justify-center text-[#f4d125] shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                                        <span className="material-symbols-outlined text-[28px]">call</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Call us</p>
                                        <p className="text-xl font-bold">+91 (555) 404-QUIZ</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5 group">
                                    <div className="w-14 h-14 rounded-2xl bg-[#221f10] dark:bg-stone-800 flex items-center justify-center text-[#f4d125] shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                        <span className="material-symbols-outlined text-[28px]">location_on</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">Visit us</p>
                                        <p className="text-xl font-bold leading-snug">Lovely Professional University,<br />Phagwara, Punjab</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-black flex items-center gap-2">
                                    <span className="material-symbols-outlined">share</span>
                                    Connect with the Squad
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    <a className="group relative flex items-center gap-3 px-6 py-4 bg-[#221f10] rounded-full text-white hover:bg-white hover:text-black hover:ring-2 hover:ring-[#221f10] transition-all hover:-translate-y-1 shadow-xl shadow-orange-900/5" href="#">
                                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                                        <span className="font-bold">LinkedIn</span>
                                    </a>
                                    <a className="group relative flex items-center gap-3 px-6 py-4 bg-[#221f10] rounded-full text-white hover:bg-white hover:text-black hover:ring-2 hover:ring-[#221f10] transition-all hover:-translate-y-1 shadow-xl shadow-orange-900/5" href="#">
                                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                                        <span className="font-bold">GitHub</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Form */}
                        <div className="lg:col-span-7">
                            <div className="bg-[#f4d125] rounded-[3rem] p-3 md:p-4 shadow-2xl shadow-yellow-500/20 transform rotate-1 lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="bg-white dark:bg-[#2a2614] rounded-[2.5rem] p-8 md:p-12 h-full border-4 border-[#1c190d]/5 relative overflow-hidden">
                                    {/* Status Messages Overlay */}
                                    {status === 'success' && (
                                        <div className="absolute inset-0 z-20 bg-white/90 dark:bg-[#2a2614]/95 flex flex-col items-center justify-center text-center animate-fade-in">
                                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-500/30">
                                                <span className="material-symbols-outlined text-white text-4xl">check</span>
                                            </div>
                                            <h3 className="text-3xl font-black text-[#1c190d] dark:text-white">Message Sent!</h3>
                                            <p className="text-gray-600 dark:text-gray-300 mt-2 font-medium">We'll get back to you soon.</p>
                                        </div>
                                    )}
                                    {status === 'error' && (
                                        <div className="absolute top-0 left-0 w-full p-4 bg-red-500 text-white text-center font-bold animate-slide-down z-20">
                                            Something went wrong. Please try again.
                                        </div>
                                    )}

                                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2 group">
                                                <label className="font-extrabold text-sm uppercase tracking-wider ml-4 text-[#1c190d] dark:text-[#f4d125] group-focus-within:text-[#f4d125] transition-colors">Your Name</label>
                                                <input
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-[#f8f8f5] dark:bg-[#221f10] border-0 rounded-2xl px-6 py-5 font-bold text-lg focus:ring-4 focus:ring-[#f4d125]/40 focus:bg-white placeholder:text-gray-300 transition-all"
                                                    placeholder="John Doe"
                                                    type="text"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2 group">
                                                <label className="font-extrabold text-sm uppercase tracking-wider ml-4 text-[#1c190d] dark:text-[#f4d125] group-focus-within:text-[#f4d125] transition-colors">Your Email</label>
                                                <input
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-[#f8f8f5] dark:bg-[#221f10] border-0 rounded-2xl px-6 py-5 font-bold text-lg focus:ring-4 focus:ring-[#f4d125]/40 focus:bg-white placeholder:text-gray-300 transition-all"
                                                    placeholder="john@example.com"
                                                    type="email"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 group">
                                            <label className="font-extrabold text-sm uppercase tracking-wider ml-4 text-[#1c190d] dark:text-[#f4d125] group-focus-within:text-[#f4d125] transition-colors">Your Message</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-[#f8f8f5] dark:bg-[#221f10] border-0 rounded-2xl px-6 py-5 font-bold text-lg focus:ring-4 focus:ring-[#f4d125]/40 focus:bg-white placeholder:text-gray-300 resize-none transition-all"
                                                placeholder="Tell us what's on your mind..."
                                                rows="5"
                                            ></textarea>
                                        </div>
                                        <button
                                            disabled={status === 'loading'}
                                            className="mt-4 w-full bg-[#1c190d] text-white font-black text-xl py-5 rounded-2xl hover:bg-[#f4d125] hover:text-black hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                                            type="submit"
                                        >
                                            {status === 'loading' ? (
                                                <>Sending... <span className="material-symbols-outlined animate-spin">progress_activity</span></>
                                            ) : (
                                                <>Send Message <span className="material-symbols-outlined font-bold group-hover:translate-x-1 transition-transform">send</span></>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
