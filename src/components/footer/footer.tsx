import { motion } from 'framer-motion';
import Logo from '../logo/logo';
import './footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-inner">
                <motion.div
                    className="footer-brand"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <Logo size={52} />
                    <span>Drewniane domki nad polskim morzem</span>
                </motion.div>
                <nav className="footer-links">
                    <a href="#o-nas">O nas</a>
                    <a href="#morze">Bałtyk</a>
                    <a href="#galeria">Galeria</a>
                    <a href="#kontakt">Kontakt</a>
                </nav>
            </div>
            <div className="container footer-bottom">
                <span>© {new Date().getFullYear()} Domki Galion. Wszelkie prawa zastrzeżone.</span>
                <a href="#top">Do góry ↑</a>
            </div>
        </footer>
    );
}

export default Footer;
