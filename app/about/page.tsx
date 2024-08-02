'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Container from '@/components/layout/Container';

const SkillCard = dynamic(() => import('@/components/ui/SkillCard'));

export default function About() {
  return (
    <Container>
      <h1 className="mb-12 text-4xl font-bold">About Me</h1>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Who I Am</h2>
        <p className="mb-6">
          Hello! I&apos;m Harel Zadok, a software engineer from Israel with a passion for creating
          innovative and user-centric applications. With experience spanning multiple programming
          languages and frameworks, I strive to build solutions that are both functional and
          aesthetically pleasing.
        </p>
        <p>
          My journey in tech began early, and I have since developed a strong foundation in both
          front-end and back-end development. My work is driven by a desire to solve complex
          problems and deliver high-quality results.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Technical Skills</h2>
        <div className="mb-6 flex flex-wrap justify-center gap-8">
          <SkillCard
            title="Languages"
            items={['C/C++', 'C#', 'Java', 'JavaScript/TypeScript', 'Dart', 'Kotlin']}
          />
          <SkillCard
            title="Frameworks"
            items={['Next.js', 'TailwindCSS', 'Flutter', 'ReactJS', 'React Native', 'Xamarin']}
          />
          <SkillCard
            title="Specialties"
            items={[
              'Full-stack development',
              'Performance optimization',
              'Scalable architecture',
              'Multi-threaded server development',
            ]}
          />
        </div>
        <p className="mb-6">
          I am continually exploring new technologies and frameworks to stay at the forefront of the
          industry. My goal is to leverage my skills to create applications that offer exceptional
          user experiences and meet the highest standards of performance and security.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Recent Projects</h2>
        <div className="mb-8">
          <h4 className="mb-4 text-xl font-semibold">Personal Website</h4>
          <p className="mb-4">
            Developed using Next.js and TailwindCSS, featuring dark/light mode, a navigation bar,
            and a modern design. Visit it at{' '}
            <Link href="https://www.harelzadok.com" className="text-blue-500 hover:underline">
              harelzadok.com
            </Link>
            .
          </p>
        </div>
        <div className="mb-8">
          <h4 id="custom-keyboard" className="mb-4 text-xl font-semibold">
            Custom Keyboard
          </h4>
          <p className="mb-4">
            Created a physical keyboard using Raspberry Pi Pico, with a corresponding Windows
            application built using Xamarin in C#. This project showcases my hardware integration
            and software development skills.
          </p>
        </div>
        <div className="mb-8">
          <h4 id="game-development" className="mb-4 text-xl font-semibold">
            Game Development
          </h4>
          <p className="mb-4">
            Worked on several game projects using Unreal Engine, focusing on C++ integration and
            optimizing performance for immersive gameplay experiences.
          </p>
        </div>
        <div className="mb-8">
          <h4 className="mb-4 text-xl font-semibold">Multi-threaded Server</h4>
          <p className="mb-4">
            Developed a multi-threaded server in C++ using Winsocks. This server features
            capabilities such as chat, real-time data forwarding, and successful deployment to a
            data center. The project demonstrates my expertise in server development and network
            programming.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Interests and Hobbies</h2>
        <p className="mb-6">
          Outside of programming, I enjoy various activities and pursuits that help me stay active
          and creatively inspired. These hobbies contribute to a balanced and fulfilling lifestyle.
        </p>
        <p>
          I believe that pursuing interests outside of work enhances my problem-solving abilities
          and fuels my passion for technology.
        </p>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold">Get in Touch</h2>
        <p className="mb-6">
          I am always open to new opportunities and collaborations. If you would like to discuss
          potential projects or just want to connect, feel free to reach out through the{' '}
          <Link href="/contact" className="text-blue-500 hover:underline">
            Contact page
          </Link>
          .
        </p>
        <p>Thank you for visiting my portfolio. I look forward to hearing from you!</p>
      </section>
    </Container>
  );
}
