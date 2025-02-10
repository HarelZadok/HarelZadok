'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import ProjectModal from './ProjectModal'

const Projects = () => {
  const sectionRef = useRef(null)

  const projects = [
    {
      title: 'Video Game Development',
      description: 'Explored game development using Unreal Engine 4/5 with C++ integration. While this experience was valuable, it helped me discover my true passion lies elsewhere.',
      tech: ['Unreal Engine', 'C++', 'Game Development'],
      link: '#',
      longDescription: 'An immersive journey into game development using Unreal Engine, combining creative design with technical implementation. This project involved working with both Blueprint visual scripting and native C++ programming to create optimized, performant game mechanics. The experience provided valuable insights into real-time rendering, physics simulation, and game optimization techniques.',
      features: [
        'Custom C++ gameplay mechanics implementation',
        'Blueprint integration with C++ components',
        'Advanced animation systems and state machines',
        'Physics-based interaction systems',
        'Performance optimization techniques',
        'Custom shader development',
        'AI behavior programming',
        'Cross-platform compatibility considerations'
      ],
      gradient: {
        from: 'from-amber-500',
        to: 'to-orange-600',
        darkFrom: 'dark:from-amber-400',
        darkTo: 'dark:to-orange-500',
        bgFrom: 'from-amber-500/10',
        bgTo: 'to-orange-500/10',
        border: 'border-amber-200/50',
        darkBorder: 'dark:border-amber-700/50'
      }
    },
    {
      title: 'Custom Server',
      description: 'Developed a server from scratch using C++, demonstrating deep understanding of network programming and server architecture.',
      tech: ['C++', 'Networking', 'Server Architecture'],
      link: '#',
      longDescription: 'A sophisticated server implementation showcasing advanced network programming concepts and high-performance computing principles. Built entirely from scratch in C++, this server utilizes Windows Sockets (Winsock) for network communications and implements a robust multi-threading architecture for handling concurrent connections. The server was successfully configured for port forwarding and deployed to host various applications, including websites and game servers.',
      features: [
        'Custom thread pool implementation for optimal resource usage',
        'Asynchronous I/O operations for improved performance',
        'Real-time chat functionality with message broadcasting',
        'Configured port forwarding for external access',
        'Successfully hosted multiple websites',
        'Deployed and ran Minecraft server instances'
      ],
      gradient: {
        from: 'from-rose-500',
        to: 'to-red-600',
        darkFrom: 'dark:from-rose-400',
        darkTo: 'dark:to-red-500',
        bgFrom: 'from-rose-500/10',
        bgTo: 'to-red-500/10',
        border: 'border-rose-200/50',
        darkBorder: 'dark:border-rose-700/50'
      }
    },
    {
      title: 'Physical Keyboard',
      description: 'Built a custom keyboard using Raspberry Pi Pico and C++, with a complementary Windows program in Xamarin (C#) for enhanced functionality.',
      tech: ['C++', 'Raspberry Pi', 'Xamarin', 'C#'],
      link: '#',
      longDescription: 'An innovative hardware-software integration project combining embedded systems programming with desktop application development. The keyboard is powered by a Raspberry Pi Pico microcontroller, programmed in C++ for optimal performance and low-level hardware control. The companion Windows application, developed in C# using Xamarin, provides an intuitive interface for keyboard configuration and customization.',
      features: [
        'Custom PCB design and implementation',
        'Low-level firmware written in C++ for Raspberry Pi Pico',
        'Real-time key mapping and macro programming',
        'Windows configuration app with modern UI',
        'On-board memory for profile storage'
      ],
      gradient: {
        from: 'from-emerald-500',
        to: 'to-teal-600',
        darkFrom: 'dark:from-emerald-400',
        darkTo: 'dark:to-teal-500',
        bgFrom: 'from-emerald-500/10',
        bgTo: 'to-teal-500/10',
        border: 'border-emerald-200/50',
        darkBorder: 'dark:border-emerald-700/50'
      }
    },
    {
      title: 'Portfolio Website',
      description: 'Modern portfolio website built with NextJS and TypeScript, featuring server-side rendering and dynamic theming.',
      tech: ['NextJS', 'TypeScript', 'React', 'Firebase'],
      link: '#',
      longDescription: 'A comprehensive showcase of my professional journey and technical expertise, built with modern web technologies. This website features server-side rendering for optimal performance, dynamic dark/light theming, and smooth animations powered by Framer Motion. The site is structured with modular components including About, Skills, Projects, and Contact sections, each designed with responsive layouts and engaging user interactions.',
      features: [
        'Responsive design with mobile-first approach',
        'Dark/light mode with smooth transitions',
        'Server-side rendering for optimal performance',
        'Interactive animations using Framer Motion',
        'Modular component architecture',
        'TypeScript for type safety and better development experience',
        'Tailwind CSS for modern, utility-first styling',
        'Hosted on Vercel with continuous deployment'
      ],
      gradient: {
        from: 'from-blue-500',
        to: 'to-purple-600',
        darkFrom: 'dark:from-blue-400',
        darkTo: 'dark:to-purple-500',
        bgFrom: 'from-blue-500/10',
        bgTo: 'to-purple-500/10',
        border: 'border-blue-200/50',
        darkBorder: 'dark:border-blue-700/50'
      }
    },
  ]

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-12 pb-1 text-center bg-gradient-to-r dark:from-blue-400 dark:to-purple-600 from-blue-700 to-purple-900 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-gray-800/5 dark:bg-white/5 rounded-xl overflow-hidden hover:bg-gray-800/10 dark:hover:bg-white/10 transition-colors"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{project.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-sm bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
                    whileHover={{ x: 5 }}
                  >
                    Learn More 
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="w-4 h-4 ml-1 translate-y-[1px]" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <motion.a
              href="https://github.com/harelzadok"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-800/10 hover:bg-gray-800/15 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white px-8 py-3 rounded-full transition-all border border-gray-300 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View More on GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  )
}

export default Projects
