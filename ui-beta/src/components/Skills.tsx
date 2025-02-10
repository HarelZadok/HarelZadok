'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'

const Skills = () => {
  const sectionRef = useRef(null)

  const skills = {
    languages: [
      'JavaScript/TypeScript',
      'Python',
      'C/C++',
      'Java',
      'C#',
      'Kotlin',
      'Swift',
      'Dart'
    ],
    web: [
      'React',
      'Next.js',
      'Firebase',
      'MongoDB',
      'REST APIs'
    ],
    mobile: [
      'React Native',
      'Flutter',
      'Kotlin Compose',
      'SwiftUI',
      'Expo',
      'Xamarin',
      'Android Native'
    ],
    systems: [
      'Linux',
      '.NET',
      'Electron',
      'TensorFlow',
      'PyTorch',
      'Raspberry Pi'
    ]
  }

  const skillCategories = [
    { 
      name: 'Programming Languages', 
      items: skills.languages,
      gradient: {
        from: 'from-blue-500',
        to: 'to-blue-600',
        darkFrom: 'dark:from-blue-400',
        darkTo: 'dark:to-blue-500',
        bgFrom: 'from-blue-500/10',
        bgTo: 'to-blue-500/10',
        border: 'border-blue-200/50',
        darkBorder: 'dark:border-blue-700/50'
      }
    },
    { 
      name: 'Web Development', 
      items: skills.web,
      gradient: {
        from: 'from-purple-500',
        to: 'to-purple-600',
        darkFrom: 'dark:from-purple-400',
        darkTo: 'dark:to-purple-500',
        bgFrom: 'from-purple-500/10',
        bgTo: 'to-purple-500/10',
        border: 'border-purple-200/50',
        darkBorder: 'dark:border-purple-700/50'
      }
    },
    { 
      name: 'Mobile & Cross-Platform', 
      items: skills.mobile,
      gradient: {
        from: 'from-emerald-500',
        to: 'to-emerald-600',
        darkFrom: 'dark:from-emerald-400',
        darkTo: 'dark:to-emerald-500',
        bgFrom: 'from-emerald-500/10',
        bgTo: 'to-emerald-500/10',
        border: 'border-emerald-200/50',
        darkBorder: 'dark:border-emerald-700/50'
      }
    },
    { 
      name: 'Desktop & Systems', 
      items: skills.systems,
      gradient: {
        from: 'from-rose-500',
        to: 'to-rose-600',
        darkFrom: 'dark:from-rose-400',
        darkTo: 'dark:to-rose-500',
        bgFrom: 'from-rose-500/10',
        bgTo: 'to-rose-500/10',
        border: 'border-rose-200/50',
        darkBorder: 'dark:border-rose-700/50'
      }
    }
  ]

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="min-h-screen flex items-center justify-center py-20 antialiased"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, transform: 'translateY(50px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.5 }}
          layout
        >
          <motion.h2
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.4 }}
            layout
            className="text-4xl md:text-5xl font-bold mb-12 pb-1 text-center bg-gradient-to-r dark:from-blue-400 dark:to-purple-600 from-blue-700 to-purple-900 bg-clip-text text-transparent"
          >
            Technical Skills
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, transform: 'translateY(20px)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                viewport={{ amount: 0.6 }}
                transition={{ 
                  duration: 0.4,
                  delay: 0.1 * (index + 1)
                }}
                layout
                className="bg-white/50 dark:bg-black/50 backdrop-blur-sm p-8 rounded-xl shadow-lg"
              >
                <motion.h3 
                  layout
                  className={`text-2xl font-semibold mb-6 bg-gradient-to-r ${category.gradient.from} ${category.gradient.to} ${category.gradient.darkFrom} ${category.gradient.darkTo} bg-clip-text text-transparent`}
                >
                  {category.name}
                </motion.h3>
                <motion.div 
                  layout
                  className="flex flex-wrap gap-3"
                >
                  {category.items.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, transform: 'scale(0.9)' }}
                      whileInView={{ opacity: 1, transform: 'scale(1)' }}
                      viewport={{ amount: 0.6 }}
                      transition={{ 
                        duration: 0.3,
                        delay: 0.05 * skillIndex + 0.1 * (index + 1)
                      }}
                      whileHover={{ transform: 'scale(1.05)' }}
                      layout
                      className={`bg-gradient-to-r ${category.gradient.bgFrom} ${category.gradient.bgTo}
                                text-gray-800 dark:text-gray-200 px-5 py-2.5 rounded-full text-base
                                border ${category.gradient.border} ${category.gradient.darkBorder} backdrop-blur-sm`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
