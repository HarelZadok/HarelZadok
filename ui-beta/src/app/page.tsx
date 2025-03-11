'use client'

import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Skills from '../components/Skills'
import { ThemeWrapper } from '../components/ThemeWrapper'

export default function Home() {
  return (
    <ThemeWrapper>
      <main className="md:snap-y md:snap-mandatory h-screen overflow-y-auto smooth-scroll bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100 via-indigo-50 to-white
        dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-blue-950 dark:via-gray-900 dark:to-black">
        <Navigation />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div id="hero" className="md:snap-start min-h-screen">
            <Hero />
          </div>
          <div className="md:snap-start min-h-screen">
            <About />
          </div>
          <div className="md:snap-start min-h-screen">
            <Skills />
          </div>
          <div className="md:snap-start min-h-screen">
            <Projects />
          </div>
          <div className="md:snap-start min-h-screen">
            <Contact />
          </div>
        </motion.div>
      </main>
    </ThemeWrapper>
  )
}
