import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Partners.css';

import SirAdnanRasheed from '../assets/img/SirAdnanRasheed.jpeg';
import SirAbidHussain from '../assets/img/SirAbidHussain.jpg';
import SirAsifIqbal from '../assets/img/SirAsifIqbal.jpg';

gsap.registerPlugin(ScrollTrigger);

const Partners = () => {
    const sectionRef = useRef(null);
    const animateElements = useRef([]);

    // Clear and handle refs safely
    animateElements.current = [];
    const addToAnimateRefs = (el) => {
        if (el && !animateElements.current.includes(el)) {
            animateElements.current.push(el);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Drift upward sequential fade-up animation
            gsap.fromTo(animateElements.current,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    stagger: 0.15,
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

    const leaders = [
        {
            name: "Adnan Rasheed",
            role: "Founder & CEO",
            image: SirAdnanRasheed
        },
        {
            name: "Abid Hussain",
            role: "Co-Founder & CEO",
            image: SirAbidHussain
        },
        {
            name: "Asif Iqbal",
            role: "Head Director",
            image: SirAsifIqbal
        }
    ];

    return (
        <section ref={sectionRef} className="pt" id="partners">
            <div className="pt__inner">

                {/* ── Heading ────────────────────────────────────────────── */}
                <div ref={addToAnimateRefs} className="pt__header">
                    <span className="pt__overline">Visionary Leadership</span>
                    <h2 className="pt__title">The Architects Behind the Ecosystem</h2>
                </div>

                {/* ── Strict 3-Column Grid ───────────────────────────────── */}
                <div className="pt__grid">
                    {leaders.map((leader, index) => (
                        <div
                            key={index}
                            ref={addToAnimateRefs}
                            className="pt__member"
                        >
                            <div className="pt__portrait-wrap">
                                <img
                                    src={leader.image}
                                    alt={leader.name}
                                    className="pt__portrait"
                                    loading="lazy"
                                />
                            </div>

                            <div className="pt__info">
                                <h3 className="pt__name">{leader.name}</h3>
                                <p className="pt__role">{leader.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default React.memo(Partners);
