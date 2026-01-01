import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import './AuthPage.css'; // Import the new custom styles
import ParticlesBackground from '../components/ParticlesBackground';

const AuthPage = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '', // Used for register
        email: '',    // Used for login & register
        password: ''
    });
    const [loadingField, setLoadingField] = useState(null); // 'username', 'email', 'password'
    const [formState, setFormState] = useState(''); // '' | 'load' | 'submit'

    // Particles handled by ParticlesBackground component

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFieldBtnClick = (field) => {
        if (loadingField) return;
        setLoadingField(field);

        // Simulate check/validation animation
        setTimeout(() => {
            setLoadingField(null); // Just visual for now
        }, 1500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Start Loading Animation
        setFormState('load');

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        const payload = isLogin
            ? { email: formData.email, password: formData.password }
            : { username: formData.username, email: formData.email, password: formData.password };

        try {
            // Simulate minimum delay for animation visibility if API is too fast
            const minDelay = new Promise(resolve => setTimeout(resolve, 1500));
            const [res] = await Promise.all([
                axios.post(`${API_BASE_URL}${endpoint}`, payload),
                minDelay
            ]);

            localStorage.setItem('userInfo', JSON.stringify(res.data));

            // Success Animation
            setFormState('submit');

            // Wait before redirecting
            setTimeout(() => {
                navigate('/home');
            }, 1000);

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'An error occurred');
            setFormState(''); // Reset on error
        }
    };

    return (
        <div className="auth-body-bg">
            <ParticlesBackground variant="auth" />

            <div className="auth-container">
                <h2 className="auth-header">{isLogin ? 'Login to Quiz 404' : 'Join Quiz 404'}</h2>
                <form
                    className={`auth-form ${formState}`}
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    data-success-msg={isLogin ? "Welcome Back!" : "Registered!"}
                >

                    {!isLogin && (
                        <div className="input-group">
                            <input
                                type="text"
                                className="auth-input"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                            <span className="auth-label">USERNAME</span>
                            <button
                                type="button"
                                className={`auth-btn-icon ${loadingField === 'username' ? 'loading' : ''}`}
                                onClick={() => handleFieldBtnClick('username')}
                            >
                                {loadingField !== 'username' && 'arrow_forward'}
                            </button>
                        </div>
                    )}

                    <div className="input-group">
                        <input
                            type="email" // Use email type for validation
                            className="auth-input"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <span className="auth-label">EMAIL</span>
                        <button
                            type="button"
                            className={`auth-btn-icon ${loadingField === 'email' ? 'loading' : ''}`}
                            onClick={() => handleFieldBtnClick('email')}
                        >
                            {loadingField !== 'email' && 'arrow_forward'}
                        </button>
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            className="auth-input"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <span className="auth-label">PASSWORD</span>
                        <button
                            type="button"
                            className={`auth-btn-icon ${loadingField === 'password' ? 'loading' : ''}`}
                            onClick={() => handleFieldBtnClick('password')}
                        >
                            {loadingField !== 'password' && 'arrow_forward'}
                        </button>
                    </div>

                    {/* Animated Submit Button */}
                    <button type="submit" className="anim-submit-btn" disabled={formState !== ''}></button>

                    <div className="toggle-text">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span onClick={() => { setIsLogin(!isLogin); setFormState(''); }}>
                            {isLogin ? 'Register' : 'Login'}
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;
