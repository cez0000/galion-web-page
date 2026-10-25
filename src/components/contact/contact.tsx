import { motion } from 'framer-motion';
import { fadeUp, inView, stagger } from '../../lib/motion';
import './contact.css';

const EMAIL = 'kontakt@domkigalion.pl';

const details = [
    { label: 'Telefon', value: '+48 123 456 789', href: 'tel:+48123456789' },
    { label: 'E-mail', value: EMAIL, href: `mailto:${EMAIL}` },
    { label: 'Adres', value: 'ul. Nadmorska 10, 84-100 Władysławowo', href: 'https://maps.google.com/?q=ul.+Nadmorska+10,+84-100+Władysławowo' },
];

function Contact() {
    return (
        <section id="kontakt" className="section contact">
            <motion.div className="container contact-info" variants={stagger()} {...inView}>
                <motion.span className="eyebrow" variants={fadeUp}>
                    Kontakt
                </motion.span>
                <motion.h2 className="section-title" variants={fadeUp}>
                    Zarezerwuj swój pobyt
                </motion.h2>
                <motion.p className="section-lead" variants={fadeUp}>
                    Napisz lub zadzwoń – chętnie odpowiemy na pytania i pomożemy wybrać najlepszy termin.
                </motion.p>

                <motion.ul className="contact-details" variants={stagger(0.1, 0.1)}>
                    {details.map((item) => (
                        <motion.li key={item.label} variants={fadeUp}>
                            <span>{item.label}</span>
                            <a href={item.href} target={item.label === 'Adres' ? '_blank' : undefined} rel="noreferrer">
                                {item.value}
                            </a>
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>
        </section>
    );
}

export default Contact;
