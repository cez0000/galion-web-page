import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { fadeUp, inView, stagger } from '../../lib/motion';
import './amenities.css';

const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i: number = 0) => ({
        pathLength: 1,
        opacity: 1,
        transition: { pathLength: { duration: 1.4, delay: i * 0.15, ease: 'easeInOut' }, opacity: { duration: 0.2, delay: i * 0.15 } },
    }),
};

// Each icon is a list of stroke paths so they can "draw" themselves in.
const amenities = [
    { title: 'Dwie sypialnie', note: 'na przytulnym poddaszu', icon: ['M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6', 'M3 18h18M3 21v-3M21 21v-3', 'M6 10V8h5v2M13 10V8h5v2'] },
    { title: 'Pościel i ręczniki', note: 'w cenie pobytu', icon: ['M4 7h16v4H4z', 'M4 11h16v6H4z', 'M8 7V5M16 7V5'] },
    { title: 'Salon', note: 'z rozkładanym narożnikiem', icon: ['M4 12V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3', 'M2 13a2 2 0 0 1 4 0v2h12v-2a2 2 0 0 1 4 0v4H2z', 'M5 17v2M19 17v2'] },
    { title: 'Aneks kuchenny', note: 'lodówka, płyta, mikrofala, czajnik', icon: ['M4 10h16v10H4z', 'M4 14h16', 'M8 4v3M12 4v3M16 4v3'] },
    { title: 'Garnki i naczynia', note: 'komplet dla całej rodziny', icon: ['M5 10h14v7a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z', 'M3 10h18', 'M10 7h4'] },
    { title: 'TV i Wi‑Fi', note: 'bezpłatnie', icon: ['M3 5h18v11H3z', 'M8 20h8M12 16v4'] },
    { title: 'Weranda', note: 'zadaszona, przy każdym domku', icon: ['M3 10 12 4l9 6', 'M5 10v10M19 10v10', 'M5 15h14M9 15v5M15 15v5'] },
    { title: 'Plac zabaw', note: 'w sercu ośrodka', icon: ['M4 21 8 5h8l4 16', 'M6 13h12', 'M12 5v5'] },
    { title: 'Parking', note: 'na terenie obiektu', icon: ['M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z', 'M10 16V8h2.5a2.5 2.5 0 0 1 0 5H10'] },
    { title: 'Ogrzewanie', note: 'wypoczynek przez cały rok', icon: ['M12 2v20M2 12h20', 'M5 5l14 14M19 5 5 19'] },
];

// Seconds until the line-art finishes drawing and the idle motion starts.
const IDLE_DELAY = 2.6;

const idle = (keyframes: Record<string, number[]>, duration: number, delay = 0): Variants => ({
    hidden: {},
    show: {
        ...keyframes,
        transition: { delay: IDLE_DELAY + delay, duration, repeat: Infinity, ease: 'easeInOut' },
    },
});

// Faint line-art scene in the background, grouped so each part can idle on its own.
const scene: { paths: string[]; variants?: Variants; origin?: { originX: number; originY: number } }[] = [
    { paths: ['M60 70a26 26 0 1 1 0 .1'], variants: idle({ y: [0, -10, 0] }, 5) },
    {
        paths: ['M120 90h70a18 18 0 0 0-14-30 24 24 0 0 0-44 6 13 13 0 0 0-12 24z'],
        variants: idle({ x: [0, 14, 0], y: [0, -5, 0] }, 8, 0.4),
    },
    {
        paths: ['M20 300 110 210l90 90', 'M40 280v100h140V280', 'M95 380v-55h30v55M55 300h25v25H55zM140 300h25v25h-25z'],
    },
    {
        paths: ['M250 380V270', 'M250 270c-30 0-40-30-40-55s20-55 40-55 40 30 40 55-10 55-40 55z'],
        variants: idle({ rotate: [0, 2.5, 0, -2.5, 0] }, 6, 0.2),
        origin: { originX: 0.5, originY: 1 },
    },
    {
        paths: ['M0 420c25-16 50-16 75 0s50 16 75 0 50-16 75 0 50 16 75 0'],
        variants: idle({ x: [0, -12, 0], y: [0, 3, 0] }, 4.5),
    },
    {
        paths: ['M0 455c25-16 50-16 75 0s50 16 75 0 50-16 75 0 50 16 75 0'],
        variants: idle({ x: [0, 12, 0], y: [0, -3, 0] }, 5, 0.6),
    },
];

function Amenities() {
    return (
        <section id="udogodnienia" className="section amenities">
            <motion.svg className="amenities-scene" viewBox="0 0 320 470" fill="none" aria-hidden="true" {...inView}>
                {scene.map((group, g) => (
                    <motion.g key={g} variants={group.variants} style={group.origin}>
                        {group.paths.map((d, i) => (
                            <motion.path key={d} d={d} variants={draw} custom={g + i * 0.5} />
                        ))}
                    </motion.g>
                ))}
            </motion.svg>

            <div className="container amenities-grid">
                <motion.div className="amenities-text" variants={stagger()} {...inView}>
                    <motion.span className="eyebrow" variants={fadeUp}>
                        Udogodnienia
                    </motion.span>
                    <motion.h2 className="section-title" variants={fadeUp}>
                        Z myślą o Twoim komforcie
                    </motion.h2>
                    <motion.p className="section-lead" variants={fadeUp}>
                        Nasze domki urządziliśmy tak, by dobrze czuły się w nich zarówno rodziny z dziećmi, jak
                        i pary czy grupy przyjaciół, które chcą odpocząć blisko natury i morza.
                    </motion.p>
                    <motion.p className="amenities-paragraph" variants={fadeUp}>
                        W każdym domku czeka przestronny salon połączony z aneksem kuchennym, łazienka oraz dwie
                        sypialnie na poddaszu. Przyjeżdżasz z walizką – resztą zajęliśmy się my.
                    </motion.p>
                    <motion.p className="amenities-paragraph" variants={fadeUp}>
                        Na środku ośrodka znajduje się duży, zielony ogród z placem zabaw dla najmłodszych.
                    </motion.p>
                </motion.div>

                <motion.ul className="amenities-card" variants={stagger(0.2, 0.06)} {...inView}>
                    {amenities.map((item) => (
                        <motion.li key={item.title} className="amenity" variants={fadeUp} whileHover="hover">
                            <motion.svg
                                className="amenity-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                                variants={{ hover: { scale: 1.15, rotate: -6 } }}
                                transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                            >
                                {item.icon.map((d) => (
                                    <motion.path key={d} d={d} variants={draw} />
                                ))}
                            </motion.svg>
                            <div>
                                <strong>{item.title}</strong>
                                <span>{item.note}</span>
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </section>
    );
}

export default Amenities;
