import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import './App.css'
import Navbar from './components/navbar/navbar'
import Header from './components/header/header'
import About from './components/about/about'
import Sea from './components/sea/sea'
import Gallery from './components/gallery/gallery'
import Amenities from './components/amenities/amenities'
import Booking from './components/booking/booking'
import Contact from './components/contact/contact'
import Footer from './components/footer/footer'
import MobileCta from './components/mobile-cta/mobile-cta'

function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <Navbar />
      <main>
        <Header />
        <About />
        <Sea />
        <Gallery />
        <Amenities />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
    </MotionConfig>
  )
}

export default App
