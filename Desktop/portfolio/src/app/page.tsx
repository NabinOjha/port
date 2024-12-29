'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation, useScroll, useTransform, useSpring } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { SocialIconProps, WorkHistoryItemProps, BlogPostLinkProps, SectionProps } from './types'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-red-600 origin-left z-50"
        style={{ scaleX }}
      />
      <main className="container mx-auto px-4 py-12 relative">
        <HeroSection isLoaded={isLoaded} />
        <SkillsSection isLoaded={isLoaded} />
        <WorkHistorySection isLoaded={isLoaded} />
        <BlogPostsSection isLoaded={isLoaded} />
        <ContactSection isLoaded={isLoaded} />
      </main>
    </div>
  )
}

function HeroSection({ isLoaded }: SectionProps) {
  const { scrollY } = useScroll()
  const y2 = useTransform(scrollY, [0, 500], [0, -100])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
      className="relative mb-20 flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        className="relative z-10 text-center"
        style={{ y: y2 }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-8"
        >
          <Image
            src="/home.png?height=250&width=250"
            alt="Nabin Ojha"
            width={250}
            height={250}
            className="mx-auto"
          />
        </motion.div>
        <motion.h1
          className="text-6xl font-bold mb-4 text-red-600"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Nabin Ojha
        </motion.h1>
        <motion.p
          className="text-3xl text-gray-600 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Software Engineer
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <SocialIcon Icon={Github} href="https://github.com/NabinOjha" />
          <SocialIcon Icon={Linkedin} href="https://www.linkedin.com/in/nabin-ojha-9b8825169/" />
          <SocialIcon Icon={Mail} href="mailto:nabinojha47@gmail.com" />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

function SocialIcon({ Icon, href }: SocialIconProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors duration-300"
    >
      <Icon size={24} />
    </motion.a>
  )
}

function SkillsSection({ isLoaded }: SectionProps) {
  const controls = useAnimation()
  const skills: string[] = ['JavaScript', 'React', 'Node.js', 'Ruby', 'Ruby on Rails', 'SQL', 'AWS']
  
  useEffect(() => {
    if (isLoaded) {
      controls.start(i => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1 }
      }))
    }
  }, [isLoaded, controls])

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="mb-20"
    >
      <h2 className="text-4xl font-semibold mb-8 text-center text-gray-800">Skills</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            custom={index}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative"
          >
            <span className="block bg-red-100 text-red-800 px-6 py-3 rounded-lg text-lg font-medium border border-red-200">
              {skill}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

function WorkHistorySection({ isLoaded }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="mb-20"
    >
      <h2 className="text-4xl font-semibold mb-8 text-center text-gray-800">Work History</h2>
      <div className="space-y-8">
        <WorkHistoryItem
          company="Fetchly Labs"
          position="Software Engineer"
          duration="May 2024 - Present "
        />
        <WorkHistoryItem
          company="Danphe Software Labs"
          position="Software Engineer"
          duration="May 2023 - May 2024"
        />

        <WorkHistoryItem
          company="Booking For Nepal"
          position="Associate Software Engineer"
          duration="Oct 2021 - May 2023"
        />
      </div>
    </motion.section>
  )
}

function WorkHistoryItem({ company, position, duration }: WorkHistoryItemProps) {
  return (
    <div
      className="bg-white p-6 rounded-lg transition-all duration-300 hover:shadow-xl border border-gray-200"
    >
      <h3 className="text-2xl font-semibold text-red-600">{company}</h3>
      <p className="text-xl text-gray-700">{position}</p>
      <p className="text-sm text-gray-500 mb-4">{duration}</p>
    </div>
  )
}

function BlogPostsSection({ isLoaded }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="mb-20"
    >
      <h2 className="text-4xl font-semibold mb-8 text-center text-gray-800">Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BlogPostLink
          title="10 Tips for Better React Performance"
          url="#"
          description="Learn how to optimize your React applications for better performance and create smoother user experiences."
        />
        <BlogPostLink
          title="The Future of AI in Web Development"
          url="#"
          description="Explore how AI is shaping the future of web development and what it means for developers in the coming years."
        />
      </div>
    </motion.section>
  )
}

function BlogPostLink({ title, url, description }: BlogPostLinkProps) {
  return (
    <div className="h-full"
    >
      <Link 
        href={url} 
        className="bg-white p-6 rounded-lg transition-all duration-300 hover:shadow-xl border border-gray-200 h-full flex flex-col"
      >
        <h3 className="text-2xl font-semibold mb-4 text-red-600">{title}</h3>
        <p className="text-gray-600 flex-grow">{description}</p>
        <div className="mt-4 text-red-600 font-medium">Read more →</div>
      </Link>
    </div>
  )
}

function ContactSection({ isLoaded }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
      transition={{ duration: 0.8, delay: 1.4 }}
      className="text-center"
    >
      <h2 className="text-4xl font-semibold mb-8 text-gray-800">Get In Touch</h2>
      <p className="text-xl mb-8 text-gray-600">Interested in working together? Let&apos;s  connect!</p>
      <motion.a
        href="mailto:nabinojha47@gmail.com"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-red-700 transition-all duration-300"
      >
        Contact Me
      </motion.a>
    </motion.section>
  )
}

