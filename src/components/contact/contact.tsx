import { FormEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeUp, inView, stagger } from '../../lib/motion';
import './contact.css';

const EMAIL = 'kontakt@domkigalion.pl';

const details = [
    { label: 'Telefon', value: '+48 123 456 789', href: 'tel:+48123456789' },
    { label: 'E-mail', value: EMAIL, href: `mailto:${EMAIL}` },
    { label: 'Adres', value: 'ul. Nadmorska 10, 84-100 Władysławowo', href: 'https://maps.google.com/?q=ul.+Nadmorska+10,+84-100+Władysławowo' },
];

function Contact() {
    const [sent, setSent] = useState(false);

    // No backend yet – the form prepares an e-mail in the visitor's mail client.
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const body = [
            `Imię i nazwisko: ${data.get('name')}`,
            `Telefon: ${data.get('phone')}`,
            `Przyjazd: ${data.get('from')}`,
            `Wyjazd: ${data.get('to')}`,
            `Liczba osób: ${data.get('guests')}`,
            '',
            `${data.get('message') ?? ''}`,
        ].join('\n');
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Zapytanie o rezerwację')}&body=${encodeURIComponent(body)}`;
        setSent(true);
    };

    return (
        <section id="kontakt" className="section contact">
            <div className="container contact-grid">
                <motion.div className="contact-info" variants={stagger()} {...inView}>
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

                <motion.form
                    id="rezerwacja"
                    className="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h3>Zapytanie o termin</h3>
                    <div className="form-row">
                        <label>
                            Imię i nazwisko
                            <input name="name" required autoComplete="name" />
                        </label>
                        <label>
                            Telefon
                            <input name="phone" type="tel" autoComplete="tel" />
                        </label>
                    </div>
                    <div className="form-row form-row--3">
                        <label>
                            Przyjazd
                            <input name="from" type="date" required />
                        </label>
                        <label>
                            Wyjazd
                            <input name="to" type="date" required />
                        </label>
                        <label>
                            Liczba osób
                            <select name="guests" defaultValue="4">
                                {[1, 2, 3, 4, 5, 6].map((n) => (
                                    <option key={n}>{n}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <label>
                        Wiadomość
                        <textarea name="message" rows={4} placeholder="Np. przyjedziemy z psem, potrzebujemy łóżeczka…" />
                    </label>
                    <motion.button type="submit" className="btn btn-primary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        Wyślij zapytanie
                    </motion.button>
                    <AnimatePresence>
                        {sent && (
                            <motion.p
                                className="form-note"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0 }}
                            >
                                Dziękujemy! Otworzyliśmy Twój program pocztowy z gotową wiadomością.
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.form>
            </div>
        </section>
    );
}

export default Contact;
