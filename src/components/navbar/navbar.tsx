import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Logo from '../logo/logo';
import './navbar.css';

const links = [
    { href: '#o-nas', label: 'O nas' },
    { href: '#morze', label: 'Bałtyk' },
    { href: '#galeria', label: 'Galeria' },
    { href: '#udogodnienia', label: 'Udogodnienia' },
    { href: '#kontakt', label: 'Kontakt' },
];

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40));

    const close = () => setOpen(false);

    return (
        <motion.nav
            className={`navbar ${scrolled || open ? 'navbar--solid' : ''}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
            <div className="container navbar-inner">
                <a href="#top" className="navbar-logo" aria-label="Domki Galion – strona główna" onClick={close}>
                    <Logo />
                </a>

                <button
                    className={`navbar-toggle ${open ? 'is-open' : ''}`}
                    aria-label="Menu"
                    aria-expanded={open}
                    onClick={() => setOpen((o) => !o)}
                >
                    <span />
                    <span />
                </button>

                <div className="navbar-links navbar-links--desktop">
                    {links.map((link) => (
                        <a key={link.href} href={link.href}>
                            {link.label}
                        </a>
                    ))}
                    <a href="#kontakt" className="btn btn-primary navbar-cta">
                        Zarezerwuj
                    </a>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="navbar-links navbar-links--mobile"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                    >
                        {links.map((link, i) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                onClick={close}
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * i }}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                        <a href="#kontakt" className="btn btn-primary navbar-cta" onClick={close}>
                            Zarezerwuj
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

export default Navbar;
