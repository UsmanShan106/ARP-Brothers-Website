import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Architecture.css';

gsap.registerPlugin(ScrollTrigger);

const Architecture = () => {
    const sectionRef = useRef(null);
    const animateElements = useRef([]);

    // Clear refs on re-render to avoid duplication
    animateElements.current = [];
    const addToAnimateRefs = (el) => {
        if (el && !animateElements.current.includes(el)) {
            animateElements.current.push(el);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Sequential fade-up for header cells and cards
            gsap.fromTo(animateElements.current,
                {
                    opacity: 0,
                    y: 40
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const capabilities = [
        {
            id: '01',
            title: "Digital Commerce Infrastructure",
            text: "End-to-end platform architecture, management, and scaling for modern retail.",
            type: "large"
        },
        {
            id: '02',
            title: "Strategic Brand Incubation",
            text: "Crafting compelling, high-equity brand identities that command market authority.",
            type: "small"
        },
        {
            id: '03',
            title: "Performance Marketing & Digital Ecosystems",
            text: "Data-driven social strategies, targeted ad scaling, and comprehensive digital management.",
            type: "small"
        }
    ];

    return (
        <section ref={sectionRef} className="arch" id="architecture">
            <div className="arch__inner">

                {/* ── Heading ────────────────────────────────────────────── */}
                <div ref={addToAnimateRefs} className="arch__header">
                    <h2 className="arch__sub">Engineering Digital Dominance</h2>
                    <div className="arch__divider"></div>
                </div>

                {/* ── Grid ───────────────────────────────────────────────── */}
                <div className="arch__grid">
                    {capabilities.map((item) => (
                        <div
                            key={item.id}
                            ref={addToAnimateRefs}
                            className={`arch__card arch__card--${item.type}`}
                        >
                            <div className="arch__card-top">
                                <span className="arch__id">System_{item.id}</span>
                                <h3 className="arch__title">{item.title}</h3>
                                <p className="arch__text">{item.text}</p>
                            </div>

                            <div className="arch__card-bottom">
                                {/* Aesthetic indicator */}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.5 }}>
                                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Footer / CTA ───────────────────────────────────────── */}
                <div ref={addToAnimateRefs} className="arch__footer">
                    <button className="arch__cta">
                        Discuss Ideas With Us
                        <div className="arch__cta-bg"></div>
                    </button>
                </div>

            </div>
        </section>
    );
};

export default React.memo(Architecture);
