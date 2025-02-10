'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

interface ProjectDetails {
  title: string
  description: string
  tech: string[]
  link: string
  longDescription?: string
  features?: string[]
  gradient: {
    from: string
    to: string
    darkFrom: string
    darkTo: string
    bgFrom: string
    bgTo: string
    border: string
    darkBorder: string
  }
}

interface ProjectModalProps {
  project: ProjectDetails | null
  onClose: () => void
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: window.innerWidth < 768 ? 1 : 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: window.innerWidth < 768 ? 1 : 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: window.innerWidth < 768 ? 1 : 0, scale: 0.9, y: 20 }}
          onClick={e => e.stopPropagation()}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className={`bg-gradient-to-r ${project.gradient.from} ${project.gradient.to} ${project.gradient.darkFrom} ${project.gradient.darkTo} p-8 relative`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {project.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="bg-white/20 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
              {project.longDescription || project.description}
            </p>

            {project.features && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li 
                      key={index}
                      className="flex items-start text-gray-700 dark:text-gray-300"
                    >
                      <svg 
                        className={`w-5 h-5 mr-2 mt-1 ${project.gradient.from} ${project.gradient.to} ${project.gradient.darkFrom} ${project.gradient.darkTo}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 12l2 2 4-4" 
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.link !== '#' && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center bg-gradient-to-r ${project.gradient.from} ${project.gradient.to} ${project.gradient.darkFrom} ${project.gradient.darkTo}
                  text-white px-6 py-2.5 rounded-full transition-transform duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Visit Project
                <svg 
                  className="w-5 h-5 ml-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </motion.a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProjectModal
