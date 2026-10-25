import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { photos } from '../../data/photos';
import { fadeUp, stagger } from '../../lib/motion';
import './header.css';

const slides = [
    { ...photos.exteriorPanorama, caption: 'Lato w ogrodzie' },
    { ...photos.livingRoom, caption: 'Drewniane, przytulne wnętrza' },
    { ...photos.exteriorPath, caption: 'Zieleń i spokój' },
    { ...photos.winterNight, caption: 'Otwarte cały rok' },
];

const SLIDE_INTERVAL = 6500;
const titleWords = ['Szum', 'fal,', 'zapach', 'drewna', 'i', 'cisza.'];

function Header() {
    const [active, setActive] = useState(0);
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
    const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    useEffect(() => {
        const timer = setTimeout(() => setActive((i) => (i + 1) % slides.length), SLIDE_INTERVAL);
        return () => clearTimeout(timer);
    }, [active]);

    return (
        <header id="top" className="hero" ref={ref}>
            <motion.div className="hero-slides" style={{ y: bgY }} aria-hidden="true">
                <AnimatePresence initial={false}>
                    <motion.img
                        key={slides[active].src}
                        src={slides[active].src}
                        alt=""
                        className="hero-slide"
                        initial={{ opacity: 0, scale: 1.12 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ opacity: { duration: 1.6 }, scale: { duration: 8, ease: 'easeOut' } }}
                    />
                </AnimatePresence>
            </motion.div>
            <div className="hero-overlay" />

            <motion.div
                className="container hero-content"
                style={{ y: contentY, opacity: contentOpacity }}
                variants={stagger(0.3, 0.08)}
                initial="hidden"
                animate="show"
            >
                <motion.span className="hero-badge" variants={fadeUp}>
                    Domki Galion · polskie wybrzeże Bałtyku
                </motion.span>
                <h1 className="hero-title">
                    {titleWords.map((word, i) => (
                        <span key={i} className="hero-word-mask">
                            <motion.span
                                className={`hero-word ${i === 5 ? 'accent' : ''}`}
                                variants={{
                                    hidden: { y: '110%' },
                                    show: { y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
                                }}
                            >
                                {word}
                            </motion.span>
                        </span>
                    ))}
                </h1>
                <motion.p className="hero-text" variants={fadeUp}>
                    Drewniane domki z ogrodem i werandą, kilka minut od bałtyckiej plaży. Zostaw miasto za
                    sobą – tu dni płyną wolniej.
                </motion.p>
                <motion.div className="hero-actions" variants={fadeUp}>
                    <motion.a href="#kontakt" className="btn btn-primary" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                        Zarezerwuj pobyt <span aria-hidden="true">→</span>
                    </motion.a>
                    <motion.a href="#galeria" className="btn btn-ghost" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                        Zobacz domki
                    </motion.a>
                </motion.div>
            </motion.div>

            <motion.div
                className="container hero-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 1 }}
            >
                <div className="hero-dots">
                    {slides.map((slide, index) => (
                        <button
                            key={slide.src}
                            className={`hero-dot ${index === active ? 'is-active' : ''}`}
                            aria-label={`Slajd ${index + 1}: ${slide.caption}`}
                            onClick={() => setActive(index)}
                        >
                            {index === active && (
                                <motion.span
                                    className="hero-dot-fill"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }}
                                />
                            )}
                        </button>
                    ))}
                </div>
                <a href="#o-nas" className="hero-scroll" aria-label="Przewiń w dół">
                    <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
                        ↓
                    </motion.span>
                </a>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={active}
                        className="hero-caption"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4 }}
                    >
                        {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')} · {slides[active].caption}
                    </motion.span>
                </AnimatePresence>
            </motion.div>
        </header>
    );
}

export default Header;
