'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'

const Contact = () => {
  const sectionRef = useRef(null)

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: window.innerWidth < 768 ? 1 : 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 
            initial={{ opacity: window.innerWidth < 768 ? 1 : 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-5xl font-bold mb-8 pb-1 bg-gradient-to-r dark:from-blue-400 dark:to-purple-600 from-blue-700 to-purple-900 bg-clip-text text-transparent"
          >
            Get in Touch
          </motion.h2>
          
          <motion.p
            initial={{ opacity: window.innerWidth < 768 ? 1 : 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-gray-700 dark:text-gray-300 text-lg mb-12"
          >
            I'm always open to new opportunities and collaborations.
            Feel free to reach out if you'd like to work together!
          </motion.p>

          <motion.div
            initial={{ opacity: window.innerWidth < 768 ? 1 : 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col md:flex-row justify-center gap-6"
          >
            <motion.a
              href="mailto:harelzad@gmail.com"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email Me
            </motion.a>
            
            <motion.a
              href="https://github.com/harelzadok"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800/10 hover:bg-gray-800/15 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white px-8 py-3 rounded-full transition-all border border-gray-300 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/30 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
