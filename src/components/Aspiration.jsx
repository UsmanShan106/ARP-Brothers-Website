import React from 'react';
import { motion } from 'framer-motion';
import './Aspiration.css';

const Aspiration = () => {
    return (
        <section className="aspiration" id="contact">
            <div className="aspiration__container">
                <motion.div
                    className="aspiration__content"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="aspiration__headline">
                        WE DON'T PREDICT THE FUTURE, <br />
                        <span className="aspiration__headline--gold">WE ARCHITECT IT.</span> <br />
                        JOIN US.
                    </h1>

                    <p className="aspiration__text">
                        Partnering with ARP Brothers means building a lasting global legacy.
                        From scaling disruptive tech to grounding philanthropic impact through
                        the Asad Foundation, we build for generations.
                    </p>

                    <div className="aspiration__action">
                        <a href="mailto:partnerships@arpbrothers.com" className="aspiration__btn">
                            <span className="aspiration__btn-text">INQUIRE ABOUT PARTNERSHIPS</span>
                            <div className="aspiration__btn-underline"></div>
                        </a>
                    </div>
                </motion.div>

                <footer className="aspiration__footer">
                    <div className="aspiration__footer-logo">ARP BROTHERS</div>
                    <div className="aspiration__footer-copy">© 2024 ARP Brothers. All Rights Reserved.</div>
                </footer>
            </div>
        </section>
    );
};

export default Aspiration;
