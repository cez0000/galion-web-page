import type { Variants } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1, ease } },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease } },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.12): Variants => ({
    hidden: {},
    show: { transition: { delayChildren, staggerChildren } },
});

// Spread onto a motion element to animate it once when it scrolls into view.
export const inView = {
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, amount: 0.2 },
} as const;
