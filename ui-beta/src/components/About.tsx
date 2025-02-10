'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'

const About = () => {
  const sectionRef = useRef(null)

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: window.innerWidth < 768 ? 1 : 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            initial={{ opacity: window.innerWidth < 768 ? 1 : 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-5xl font-bold mb-8 pb-1 text-center bg-gradient-to-r dark:from-blue-400 dark:to-purple-600 from-blue-700 to-purple-900 bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>

          <motion.div
            initial={{ opacity: window.innerWidth < 768 ? 1 : 0, transform: 'translateY(20px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            layout
            className="bg-white/50 dark:bg-black/50 backdrop-blur-sm p-8 rounded-xl shadow-lg"
          >
            <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
              Hey there! I'm a passionate software developer with six years of experience in crafting digital experiences. 
              My journey in software development has been driven by a fascination with creating seamless, cross-platform 
              solutions that make a real impact in users' lives.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
              Throughout my career, I've specialized in multiplatform frameworks and technologies. 
              I'm particularly passionate about developing applications that work flawlessly across different devices 
              and platforms, from mobile to web. This focus has led me to work extensively with modern frameworks 
              like React Native, Flutter, and Next.js, always striving to push the boundaries of what's possible 
              in cross-platform development.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
              My approach to software development is deeply rooted in understanding user needs and business objectives. 
              I believe in writing clean, maintainable code that not only works well today but can adapt to future requirements. 
              Whether it's optimizing performance, improving accessibility, or implementing complex features, 
              I enjoy tackling challenges that push my technical boundaries.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
              Beyond my professional work, I'm currently pursuing a PhD, where I'm expanding my theoretical knowledge 
              and research capabilities. This academic journey complements my practical experience, allowing me to 
              approach software development with both theoretical depth and practical expertise. When I'm not coding 
              or studying, you'll find me exploring new technologies and keeping up with the latest developments in 
              the ever-evolving world of software development.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
