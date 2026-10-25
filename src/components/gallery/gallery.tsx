import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { photos } from '../../data/photos';
import { fadeUp, inView, scaleIn, stagger } from '../../lib/motion';
import './gallery.css';

const items = [
    { photo: photos.exteriorPanorama, layout: 'wide' },
    { photo: photos.livingRoom, layout: 'tall' },
    { photo: photos.kitchen, layout: '' },
    { photo: photos.bedroomDouble, layout: '' },
    { photo: photos.bathroom, layout: '' },
    { photo: photos.bedroomTwin, layout: '' },
    { photo: photos.livingKitchen, layout: 'wide' },
    { photo: photos.winterNight, layout: '' },
];

function Gallery() {
    const [current, setCurrent] = useState<number | null>(null);
    const [direction, setDirection] = useState(1);

    const close = useCallback(() => setCurrent(null), []);
    const step = useCallback((dir: number) => {
        setDirection(dir);
        setCurrent((i) => (i === null ? i : (i + dir + items.length) % items.length));
    }, []);

    useEffect(() => {
        if (current === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowRight') step(1);
            if (e.key === 'ArrowLeft') step(-1);
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [current, close, step]);

    return (
        <section id="galeria" className="section gallery">
            <div className="container">
                <motion.div className="section-head gallery-head" variants={stagger()} {...inView}>
                    <div>
                        <motion.span className="eyebrow" variants={fadeUp}>
                            Galeria
                        </motion.span>
                        <motion.h2 className="section-title" variants={fadeUp}>
                            Zajrzyj do środka
                        </motion.h2>
                    </div>
                    <motion.p className="section-lead" variants={fadeUp}>
                        Jasne, drewniane wnętrza, wygodne sypialnie na poddaszu i zielony ogród. Kliknij zdjęcie,
                        aby je powiększyć.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="gallery-grid"
                    variants={stagger(0, 0.08)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {items.map((item, index) => (
                        <motion.button
                            key={item.photo.src}
                            className={`gallery-item ${item.layout}`}
                            onClick={() => setCurrent(index)}
                            aria-label={`Powiększ: ${item.photo.alt}`}
                            variants={scaleIn}
                            whileHover="hover"
                        >
                            <motion.img
                                src={item.photo.src}
                                alt={item.photo.alt}
                                loading="lazy"
                                variants={{ hover: { scale: 1.07 } }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            />
                            <motion.span
                                className="gallery-item-label"
                                initial={{ opacity: 0, y: 12 }}
                                variants={{ hover: { opacity: 1, y: 0 } }}
                            >
                                {item.photo.alt}
                            </motion.span>
                        </motion.button>
                    ))}
                </motion.div>
            </div>

            <AnimatePresence>
                {current !== null && (
                    <motion.div
                        className="lightbox"
                        role="dialog"
                        aria-modal="true"
                        onClick={close}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <button className="lightbox-close" aria-label="Zamknij" onClick={close}>
                            ×
                        </button>
                        <button
                            className="lightbox-nav prev"
                            aria-label="Poprzednie zdjęcie"
                            onClick={(e) => {
                                e.stopPropagation();
                                step(-1);
                            }}
                        >
                            ‹
                        </button>
                        <figure onClick={(e) => e.stopPropagation()}>
                            <div className="lightbox-stage">
                                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                    <motion.img
                                        key={current}
                                        src={items[current].photo.src}
                                        alt={items[current].photo.alt}
                                        custom={direction}
                                        initial={{ opacity: 0, x: direction * 80 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: direction * -80 }}
                                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        onDragEnd={(_, info) => {
                                            if (info.offset.x < -60) step(1);
                                            else if (info.offset.x > 60) step(-1);
                                        }}
                                    />
                                </AnimatePresence>
                            </div>
                            <figcaption>
                                {items[current].photo.alt}
                                <span>
                                    {current + 1} / {items.length}
                                </span>
                            </figcaption>
                        </figure>
                        <button
                            className="lightbox-nav next"
                            aria-label="Następne zdjęcie"
                            onClick={(e) => {
                                e.stopPropagation();
                                step(1);
                            }}
                        >
                            ›
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default Gallery;
