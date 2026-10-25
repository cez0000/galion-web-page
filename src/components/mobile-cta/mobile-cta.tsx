import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import './mobile-cta.css';

// Sticky booking bar for phones: appears after the hero, hides once the contact section is on screen.
function MobileCta() {
    const [visible, setVisible] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (y) => {
        const contact = document.getElementById('kontakt');
        const contactReached = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.8 : false;
        setVisible(y > window.innerHeight * 0.7 && !contactReached);
    });

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="mobile-cta"
                    initial={{ y: '120%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '120%' }}
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                >
                    <a href="tel:+48123456789" className="mobile-cta-call" aria-label="Zadzwoń">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                        </svg>
                    </a>
                    <a href="#kontakt" className="btn btn-primary mobile-cta-book">
                        Zarezerwuj pobyt
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default MobileCta;
