import React, { useEffect } from 'react';

const GlobalClickEffect = () => {
    useEffect(() => {
        const handleClick = (e) => {
            // Robust check: Is it a tag listed OR does it have a pointer cursor?
            let target = e.target;
            let isClickable = false;

            // Traverse up to find clickable ancestor (limit depth for perf)
            for (let i = 0; i < 5 && target && target !== document.body; i++) {
                const style = window.getComputedStyle(target);
                if (style.cursor === 'pointer' ||
                    target.tagName === 'A' ||
                    target.tagName === 'BUTTON' ||
                    target.getAttribute('role') === 'button') {
                    isClickable = true;
                    break;
                }
                target = target.parentElement;
            }

            if (isClickable) {
                createSpikeEffect(e.clientX, e.clientY);
            }
        };

        const createSpikeEffect = (x, y) => {
            const burst = document.createElement('div');
            burst.className = 'spike-burst active';
            burst.style.left = `${x}px`;
            burst.style.top = `${y}px`;

            // Spikes config (angles and distances from user snippet)
            const spikesConfig = [
                { angle: '5deg', distance: '30px' },
                { angle: '55deg', distance: '31px' },
                { angle: '75deg', distance: '27px' },
                { angle: '135deg', distance: '30px' },
                { angle: '190deg', distance: '28px' },
                { angle: '210deg', distance: '32px' },
                { angle: '280deg', distance: '31px' },
                { angle: '330deg', distance: '30px' }
            ];

            spikesConfig.forEach(conf => {
                const spike = document.createElement('div');
                spike.className = 'spike';
                spike.style.setProperty('--angle', conf.angle);
                spike.style.setProperty('--distance', conf.distance);
                burst.appendChild(spike);
            });

            // Append to a global container or body
            // Let's ensure a container exists or just append to body with fixed position logic (CSS ensures this)
            // But to avoid scroll issues, CSS handled .click-effect-container as fixed.
            // But implementing container in JSX is cleaner.
            // However, appending to body is safer for z-index layering above everything.
            document.body.appendChild(burst);

            // Cleanup
            setTimeout(() => {
                burst.remove();
            }, 750);
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    return null; // Renderless component
};

export default GlobalClickEffect;
