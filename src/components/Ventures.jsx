import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import './Ventures.css';

const Ventures = () => {
    const sectionRef = useRef(null);
    const scrollContainerRef = useRef(null);

    const portfolio = [
        {
            name: "Learn2Earn",
            category: "EdTech Innovation",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop",
            description: "Revolutionizing lifelong learning through incentivized educational pathways."
        },
        {
            name: "Asad Collection",
            category: "Luxury Retail",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
            description: "Curating a world-class portfolio of fashion and lifestyle brands."
        },
        {
            name: "Asad Foundation",
            category: "Philanthropic Legacy",
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop",
            description: "Building sustainable futures for underserved communities globally."
        }
    ];

    // useLayoutEffect is better for GSAP measurements
    useLayoutEffect(() => {
        if (!scrollContainerRef.current) return;

        const ctx = gsap.context(() => {
            const getScrollAmount = () => {
                const scrollWidth = scrollContainerRef.current.scrollWidth;
                return -(scrollWidth - window.innerWidth);
            };

            gsap.to(scrollContainerRef.current, {
                x: getScrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 0.1, // Faster scrub for more responsive feel
                    start: "top top",
                    end: () => `+=${scrollContainerRef.current.scrollWidth}`,
                    invalidateOnRefresh: true,
                    // Fast scroll optimization
                    fastScrollEnd: 3000,
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="ventures" ref={sectionRef} id="ventures">
            <div className="ventures__sticky">
                <div className="ventures__header">
                    <span className="ventures__sub">The Ventures</span>
                    <h2 className="ventures__title">A Portfolio of Innovation</h2>
                </div>

                <div className="ventures__scroll-container" ref={scrollContainerRef}>
                    {portfolio.map((item, index) => (
                        <div key={index} className="ventures__card">
                            <div className="ventures__card-inner">
                                <div className="ventures__image-wrapper">
                                    <img src={item.image} alt={item.name} className="ventures__image" loading="lazy" />
                                    <div className="ventures__overlay"></div>
                                </div>
                                <div className="ventures__info">
                                    <span className="ventures__item-cat">{item.category}</span>
                                    <h3 className="ventures__item-name">{item.name}</h3>
                                    <p className="ventures__item-desc">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="ventures__stopper"></div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Ventures);
