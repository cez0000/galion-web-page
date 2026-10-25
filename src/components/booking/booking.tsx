import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { photos } from '../../data/photos';
import { fadeUp, inView, stagger } from '../../lib/motion';
import './booking.css';

function Booking() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1.05]);

    return (
        <section className="booking" ref={ref}>
            <motion.img
                className="booking-bg"
                src={photos.exteriorPanorama.src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                style={{ y, scale }}
            />
            <div className="booking-overlay" />
            <motion.div className="container booking-content" variants={stagger(0, 0.15)} {...inView}>
                <motion.span className="eyebrow" variants={fadeUp}>
                    Sezon już czeka
                </motion.span>
                <motion.h2 variants={fadeUp}>
                    Najlepsze terminy znikają <em>najszybciej</em>
                </motion.h2>
                <motion.p variants={fadeUp}>
                    Zarezerwuj swój domek nad Bałtykiem już dziś i zacznij odliczać dni do urlopu.
                </motion.p>
                <motion.div className="booking-actions" variants={fadeUp}>
                    <motion.a
                        href="#rezerwacja"
                        className="btn btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        animate={{ boxShadow: ['0 0 0 0 rgba(200,145,90,0.6)', '0 0 0 18px rgba(200,145,90,0)'] }}
                        transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                    >
                        Sprawdź dostępność
                    </motion.a>
                    <a href="tel:+48123456789" className="btn btn-ghost">
                        Zadzwoń: +48 123 456 789
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default Booking;
