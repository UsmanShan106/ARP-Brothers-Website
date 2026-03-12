import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Methodology.css';

// GSAP registration in main.jsx

const Methodology = () => {
    const sectionRef = useRef(null);
    const lineRef = useRef(null);
    const pillarsRef = useRef([]);

    const pillars = [
        {
            title: "Capital Investment",
            description: "Strategically injecting capital into high-growth potential sectors, transforming early-stage concepts into market leaders.",
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop"
        },
        {
            title: "Advisory Support",
            description: "Our team of seasoned experts provides hands-on guidance, ensuring every venture is built on a foundation of operational excellence.",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
        },
        {
            title: "Ecosystem Synergy",
            description: "Leveraging our diverse portfolio to create meaningful cross-industry connections that accelerate growth and innovation.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animating the golden line
            gsap.fromTo(lineRef.current,
                { strokeDashoffset: 1000, strokeDasharray: 1000 },
                {
                    strokeDashoffset: 0,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1, // scrubbing is smooth but sync to scroll
                        toggleActions: "play none none reverse",
                    }
                }
            );

            // Animating pillars - optimized transition (use x/y/opacity only)
            pillarsRef.current.forEach((pillar, index) => {
                gsap.fromTo(pillar,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: pillar,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                            // Fast-leave/fast-enter strategy for smoother look
                            fastScrollEnd: true,
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="methodology" ref={sectionRef} id="methodology">
            <div className="methodology__container">
                <div className="methodology__header">
                    <h2 className="methodology__sub">The Methodology</h2>
                    <h1 className="methodology__title">Architecture of Future Value</h1>
                </div>

                <div className="methodology__flow">
                    {/* SVG Line Background */}
                    <svg className="methodology__line-svg" viewBox="0 0 100 800" preserveAspectRatio="none">
                        <path
                            ref={lineRef}
                            d="M 50 0 Q 80 200 50 400 T 50 800"
                            fill="none"
                            stroke="var(--brand-gold)"
                            strokeWidth="0.5"
                        />
                    </svg>

                    {pillars.map((pillar, index) => (
                        <div
                            key={index}
                            className={`methodology__pillar ${index % 2 === 0 ? 'left' : 'right'}`}
                            ref={el => pillarsRef.current[index] = el}
                        >
                            <div className="methodology__pillar-content">
                                <div className="methodology__pillar-image">
                                    <img src={pillar.image} alt={pillar.title} loading="lazy" />
                                    <div className="methodology__pillar-overlay"></div>
                                </div>
                                <div className="methodology__pillar-text">
                                    <h3 className="methodology__pillar-title">{pillar.title}</h3>
                                    <p className="methodology__pillar-desc">{pillar.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default React.memo(Methodology);
