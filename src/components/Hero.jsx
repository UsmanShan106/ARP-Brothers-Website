import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Globe from './Globe';
import './Hero.css';

const getCanvasDpr = () => {
    if (typeof window === 'undefined') return 1;
    const isMobile = window.innerWidth <= 768;
    const maxDpr = isMobile ? 1 : 1.5;
    return Math.min(window.devicePixelRatio || 1, maxDpr);
};

const Hero = () => {
    useEffect(() => {
        // #region agent log
        fetch('http://127.0.0.1:7714/ingest/4a86ba09-f794-4c19-a298-02356a5e2b9c', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Debug-Session-Id': '9e17ce',
            },
            body: JSON.stringify({
                sessionId: '9e17ce',
                runId: 'initial',
                hypothesisId: 'H4',
                location: 'Hero.jsx:18',
                message: 'Hero mounted, about to render Canvas',
                data: {},
                timestamp: Date.now(),
            }),
        }).catch(() => { });
        // #endregion agent log
    }, []);

    return (
        <section className="hero">
            {/* 3D Background Layer */}
            <div className="hero__canvas-container">
                <Canvas
                    dpr={getCanvasDpr()}
                    camera={{ position: [0, 0, 9], fov: 45 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <Suspense fallback={null}>
                        {/* Lighting */}
                        <ambientLight intensity={0.4} />
                        <pointLight position={[10, 10, 10]} intensity={1.2} color="#FF6B6B" />
                        <pointLight position={[-10, -5, 5]} intensity={0.3} color="#ffffff" />

                        {/* Globe ONLY — Stars now global in App.jsx */}
                        <Globe />
                    </Suspense>
                </Canvas>
            </div>

            {/* Content Layer */}
            <div className="hero__content">
                <div className="hero__text-box">
                    <h2 className="hero__sub-title">Investment Management</h2>
                    <h1 className="hero__headline">
                        Architects of Future Value. <br />
                        <span className="hero__headline--alt">Cultivating Global Ventures.</span>
                    </h1>
                    <p className="hero__description">
                        A premier venture studio and investment umbrella spanning <br />
                        EdTech, Retail, and Philanthropy.
                    </p>

                    <div className="hero__actions">
                        <a href="#ecosystem" className="hero__btn">
                            <span className="hero__btn-text">Discover Our Ecosystem</span>
                            <div className="hero__btn-line"></div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Aesthetic Side Badge */}
            <div className="hero__badge">
                <span className="hero__badge-year">Est. 2024</span>
                <div className="hero__badge-line"></div>
                <span className="hero__badge-label">ARP Brothers</span>
            </div>
        </section>
    );
};

export default React.memo(Hero);
