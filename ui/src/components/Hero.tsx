'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

const Hero = () => {
  const [mounted, setMounted] = useState(false)
  const [dots, setDots] = useState<Array<{ x: string, y: string }>>([])
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  useEffect(() => {
    setMounted(true)
    // Generate random positions for dots only on client-side
    const newDots = Array(20).fill(0).map(() => ({
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`
    }))
    setDots(newDots)
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 z-[1]">
        {/* Light and dark mode gradients */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-sky-100 via-indigo-50 to-transparent dark:from-gray-900 dark:via-gray-900 dark:to-transparent" />
      </div>

      <motion.div
        className="container mx-auto px-6 relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="text-lg md:text-xl text-gray-800 dark:text-gray-300 mb-4"
        >
          Hello, I'm
        </motion.h2>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-400 via-purple-500 to-rose-500 animate-gradient-x"
        >
          Harel Zadok
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-800 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          A passionate programmer with 6 years of experience in software development, specializing in full-stack development.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center gap-4"
        >
          <motion.a
            href="#projects"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
          
          <motion.a
            href="#contact"
            className="bg-gray-800/10 hover:bg-gray-800/15 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white px-8 py-3 rounded-full transition-all border border-gray-300 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Animated background elements */}
      {mounted && (
        <div className="absolute inset-0 z-0">
          {dots.map((dot, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
              initial={{
                x: dot.x,
                y: dot.y,
              }}
              animate={{
                y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Hero;
