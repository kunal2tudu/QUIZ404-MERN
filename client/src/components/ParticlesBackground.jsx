import React, { useEffect } from 'react';

const ParticlesBackground = ({ variant = 'default' }) => {
    useEffect(() => {
        if (window.particlesJS) {
            const opacityValue = variant === 'auth' ? 0.2 : 0.6;

            window.particlesJS("particles-js", {
                particles: {
                    number: { value: 50, density: { enable: true, value_area: 800 } }, // Reduced count slightly
                    color: { value: "#000" },
                    shape: {
                        type: "circle",
                        stroke: { width: 0, color: "#000000" },
                        polygon: { nb_sides: 5 },
                    },
                    opacity: {
                        value: opacityValue,
                        random: true,
                        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: { enable: false },
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#000",
                        opacity: 0.4,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                    },
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" },
                        resize: true,
                    },
                    modes: {
                        repulse: { distance: 100, duration: 0.4 },
                        push: { particles_nb: 4 },
                    },
                },
                retina_detect: false, // PERFORMANCE FIX: Disabled retina detection
            });
        }
    }, [variant]);

    return (
        <div id="particles-js" className={`fixed inset-0 z-0 ${variant === 'auth' ? '' : 'pointer-events-none'}`}></div>
    );
};

export default ParticlesBackground;
