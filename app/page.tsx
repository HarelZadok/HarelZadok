'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Container from '@/components/layout/Container';

const SkillCard = dynamic(() => import('@/components/ui/SkillCard'));

export default function Home() {
  return (
    <Container maxWidth="72rem">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold">Hi, I&apos;m Harel Zadok</h1>
        <p className="mb-6 text-xl">
          A passionate software engineer from Israel, specializing in creating innovative and
          user-centric applications.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/about"
            className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
          >
            Learn More About Me
          </Link>
          <Link
            href="/projects"
            className="rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
          >
            View My Projects
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mb-12">
        <h2 className="mb-6 text-center text-3xl font-semibold">Featured Projects</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <ProjectCard
            title="Personal Website"
            description="Developed using Next.js and TailwindCSS, featuring dark/light mode and a modern design."
            link="https://www.harelzadok.com"
          />
          <ProjectCard
            title="Custom Keyboard"
            description="Created a physical keyboard with a corresponding Windows application using Xamarin in C#."
            link="/about#custom-keyboard"
          />
          <ProjectCard
            title="Game Development"
            description="Worked on various game projects using Unreal Engine, focusing on performance optimization."
            link="/about#game-development"
          />
        </div>
      </section>

      {/* Skills Overview */}
      <section className="mb-12 text-center">
        <h2 className="mb-6 text-3xl font-semibold">Skills Overview</h2>
        <p className="mb-4 text-lg">
          I have expertise in various programming languages, frameworks, and development practices.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
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
      </section>

      {/* Contact Information */}
      <section className="mb-12 text-center">
        <h2 className="mb-6 text-3xl font-semibold">Get in Touch</h2>
        <p className="mb-4 text-lg">
          Interested in working together or have a question? Feel free to reach out!
        </p>
        <Link
          href="/contact"
          className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          Contact Me
        </Link>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <p>&copy; {new Date().getFullYear()} Harel Zadok. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-4">
          <Link href="https://github.com/HarelZadok" className="text-blue-500 hover:underline">
            GitHub
          </Link>
        </div>
      </footer>
    </Container>
  );
}

function ProjectCard({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  const { theme } = useTheme();

  return (
    <div
      className={clsx('flex w-80 flex-col items-center rounded-lg p-6 shadow-md', {
        ['bg-gray-100']: theme === 'light',
        ['bg-[rgb(50,50,50)]']: theme === 'dark',
      })}
    >
      <h3 className="mb-4 text-xl font-semibold">{title}</h3>
      <p className="mb-4 text-center">{description}</p>
      <Link href={link} className="text-blue-500 hover:underline">
        Learn More
      </Link>
    </div>
  );
}
