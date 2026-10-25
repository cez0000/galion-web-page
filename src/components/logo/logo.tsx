import { useId } from 'react';
import { motion } from 'framer-motion';
import './logo.css';

// One wavelength of the logo's sea; the wave path is longer than the mark and slides by exactly
// one period, so the loop is seamless.
const PERIOD = 20;
const WAVE = `M-16 41.5 ${Array.from({ length: 8 }, (_, i) => (i === 0 ? 'q5 -2.6 10 0' : 't10 0')).join(' ')}`;
const BOB = { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } as const;

// Galleon ("galion") on Baltic waves – sails in wood tone, hull follows currentColor.
export function LogoMark({ size = 44 }: { size?: number }) {
    const clipId = useId();

    return (
        <motion.svg
            className="logo-mark"
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
            variants={{ hover: { rotate: [0, -6, 4, 0], transition: { duration: 1.2 } } }}
        >
            <defs>
                <clipPath id={clipId}>
                    <rect x="3" y="34" width="42" height="14" />
                </clipPath>
            </defs>
            <motion.g
                style={{ originX: 0.5, originY: 1 }}
                animate={{ y: [0, -0.9, 0], rotate: [-1.5, 1.5, -1.5] }}
                transition={{ y: BOB, rotate: { ...BOB, duration: BOB.duration * 2 } }}
            >
                <path d="M24 5v27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M24 5l7 2.5-7 2.5" fill="var(--wood)" />
                <path d="M22 10.5 11.5 27H22z" fill="var(--wood)" />
                <path d="M26 13l10 14H26z" fill="var(--wood-soft)" />
                <path d="M8 30h32l-4.5 6.5h-23z" fill="currentColor" />
            </motion.g>
            <g clipPath={`url(#${clipId})`}>
                <motion.path
                    d={WAVE}
                    stroke="var(--sea)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: [0, -PERIOD] }}
                    transition={{ opacity: { duration: 0.8, delay: 0.3 }, x: { duration: 2.6, repeat: Infinity, ease: 'linear' } }}
                />
            </g>
        </motion.svg>
    );
}

function Logo({ size }: { size?: number }) {
    return (
        <motion.span className="logo" whileHover="hover">
            <LogoMark size={size} />
            <span className="logo-text">
                <small>Domki</small>
                <strong>Galion</strong>
            </span>
        </motion.span>
    );
}

export default Logo;
