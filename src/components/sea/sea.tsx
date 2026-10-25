import { motion } from 'framer-motion';
import { photos } from '../../data/photos';
import { fadeUp, inView, scaleIn, stagger } from '../../lib/motion';
import './sea.css';

const experiences = [
    {
        number: '01',
        title: 'Szerokie, piaszczyste plaże',
        text: 'Złoty piasek, wydmy porośnięte trawą i chłodna bryza – Bałtyk w najpiękniejszym wydaniu.',
    },
    {
        number: '02',
        title: 'Zachody słońca nad morzem',
        text: 'Wieczorne spacery brzegiem, kiedy niebo płonie różem i złotem. Tego nie da się zapomnieć.',
    },
    {
        number: '03',
        title: 'Sosnowe lasy i trasy rowerowe',
        text: 'Pachnące żywicą lasy nadmorskie i kilometry ścieżek – idealne na rodzinne wycieczki.',
    },
    {
        number: '04',
        title: 'Świeża ryba prosto z kutra',
        text: 'Smażona flądra, wędzony węgorz i gofry z bitą śmietaną – smaki polskiego wybrzeża.',
    },
];

const seasons = [
    { photo: photos.exteriorPanorama, name: 'Lato', text: 'Plaża, słońce i długie wieczory w ogrodzie.' },
    { photo: photos.exteriorPath, name: 'Wiosna i jesień', text: 'Puste plaże, spokój i niższe ceny.' },
    { photo: photos.winterNight, name: 'Zima', text: 'Sztormowy Bałtyk i ciepło drewnianego domku.' },
];

function Waves() {
    return (
        <div className="sea-waves" aria-hidden="true">
            {[0, 1, 2].map((layer) => (
                <motion.svg
                    key={layer}
                    className={`sea-wave sea-wave--${layer}`}
                    viewBox="0 0 2880 120"
                    preserveAspectRatio="none"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 14 + layer * 6, repeat: Infinity, ease: 'linear' }}
                >
                    <path d="M0 60 Q 360 0 720 60 T 1440 60 T 2160 60 T 2880 60 V120 H0 Z" />
                </motion.svg>
            ))}
        </div>
    );
}

function Sea() {
    return (
        <section id="morze" className="sea">
            <Waves />
            <div className="container section sea-inner">
                <motion.div className="section-head sea-head" variants={stagger()} {...inView}>
                    <motion.span className="eyebrow" variants={fadeUp}>
                        Polskie morze
                    </motion.span>
                    <motion.h2 className="section-title" variants={fadeUp}>
                        Bałtyk na wyciągnięcie ręki
                    </motion.h2>
                    <motion.p className="section-lead" variants={fadeUp}>
                        Rano kawa na werandzie, w południe plaża, wieczorem zachód słońca nad morzem. Z Domków
                        Galion odkryjesz wszystko, co najlepsze na polskim wybrzeżu.
                    </motion.p>
                </motion.div>

                <motion.div className="sea-grid" variants={stagger(0, 0.12)} {...inView}>
                    {experiences.map((item) => (
                        <motion.article
                            key={item.number}
                            className="sea-card"
                            variants={fadeUp}
                            whileHover={{ y: -8, backgroundColor: 'rgba(255,255,255,0.1)' }}
                        >
                            <span className="sea-card-number">{item.number}</span>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </motion.article>
                    ))}
                </motion.div>
                <p className="sea-swipe-hint" aria-hidden="true">
                    Przesuń, aby zobaczyć więcej →
                </p>

                <motion.h3 className="sea-seasons-title" variants={fadeUp} {...inView}>
                    Wyjątkowo o każdej porze roku
                </motion.h3>
                <motion.div className="sea-seasons" variants={stagger(0, 0.15)} {...inView}>
                    {seasons.map((season) => (
                        <motion.figure key={season.name} className="sea-season" variants={scaleIn}>
                            <motion.img
                                src={season.photo.src}
                                alt={season.photo.alt}
                                loading="lazy"
                                whileHover={{ scale: 1.08 }}
                                transition={{ duration: 0.8 }}
                            />
                            <figcaption>
                                <strong>{season.name}</strong>
                                <span>{season.text}</span>
                            </figcaption>
                        </motion.figure>
                    ))}
                </motion.div>
                <p className="sea-swipe-hint" aria-hidden="true">
                    Przesuń, aby zobaczyć więcej →
                </p>
            </div>
        </section>
    );
}

export default Sea;
