import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { photos } from '../../data/photos';
import { fadeUp, inView, stagger } from '../../lib/motion';
import './about.css';

const stats = [
    { value: '2', label: 'sypialnie w każdym domku' },
    { value: '6', label: 'miejsc noclegowych' },
    { value: '365', label: 'dni w roku otwarte' },
];

function About() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const mainY = useTransform(scrollYProgress, [0, 1], [24, -24]);
    const smallY = useTransform(scrollYProgress, [0, 1], [50, -30]);

    return (
        <section id="o-nas" className="section about">
            <div className="container about-grid">
                <div className="about-media" ref={ref}>
                    <motion.div
                        className="about-img-main"
                        style={{ y: mainY }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.img
                            src={photos.houseFront.src}
                            alt={photos.houseFront.alt}
                            loading="lazy"
                            initial={{ scale: 1.15 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                        />
                    </motion.div>
                    <motion.div
                        className="about-img-small"
                        style={{ y: smallY }}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <img src={photos.bedroomTwin.src} alt={photos.bedroomTwin.alt} loading="lazy" />
                    </motion.div>
                </div>

                <motion.div className="about-text" variants={stagger()} {...inView}>
                    <motion.span className="eyebrow" variants={fadeUp}>
                        O nas
                    </motion.span>
                    <motion.h2 className="section-title" variants={fadeUp}>
                        Twój drugi dom nad Bałtykiem
                    </motion.h2>
                    <motion.p className="section-lead" variants={fadeUp}>
                        Domki Galion to kameralne miejsce stworzone z myślą o prawdziwym odpoczynku. Pachnące
                        drewnem wnętrza, własna weranda i zielony ogród – a do morza tylko krótki spacer.
                    </motion.p>
                    <motion.p className="about-paragraph" variants={fadeUp}>
                        Każdy domek to piętrowa przestrzeń z salonem, aneksem kuchennym, łazienką i dwiema
                        sypialniami na poddaszu. Dzieci pokochają plac zabaw, a dorośli – wieczory na werandzie
                        po dniu spędzonym na plaży.
                    </motion.p>

                    <motion.div className="about-stats" variants={stagger(0.1, 0.1)}>
                        {stats.map((stat) => (
                            <motion.div key={stat.label} className="about-stat" variants={fadeUp} whileHover={{ y: -4 }}>
                                <strong>{stat.value}</strong>
                                <span>{stat.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default About;
