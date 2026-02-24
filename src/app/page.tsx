"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { motion } from "framer-motion";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "anticipate" as const
      },
    },
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full animate-blob rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full animate-blob [animation-delay:2s] rounded-full" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-emerald-900/10 blur-[100px] rounded-full animate-blob [animation-delay:4s] rounded-full" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={itemVariants} className="mb-6 inline-block">
              <span className="px-4 py-1.5 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-md text-sm text-gray-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Open to new opportunities
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-9xl font-bold mb-8 tracking-tighter"
            >
              <span className="bg-gradient-to-br from-white via-gray-300 to-gray-600 bg-clip-text text-transparent">
                Engineering
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                Digital Excellence.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-3xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
            >
              {siteConfig.bio}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link
                href="/projects"
                className="group relative px-10 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-all flex items-center gap-3"
              >
                View My Work
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </Link>

              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-10 py-4 border border-gray-800 text-white font-semibold rounded-2xl hover:bg-gray-900 hover:border-gray-600 transition-all backdrop-blur-sm flex items-center gap-3"
              >
                Get Resume
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-[-2px] transition-transform"><path d="M7 7h10v10" /><path d="M7 17L17 7" /></svg>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-gray-800 rounded-full flex justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-2 bg-gray-500 rounded-full"
              />
            </div>
          </motion.div>
        </section>

        {/* Philosophy Section */}
        <section className="py-32 px-6 bg-zinc-950/50 border-y border-gray-900 relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
              </div>
              <h3 className="text-2xl font-bold">Scalable Architecture</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Building backend systems that handle growth without compromising on speed or reliability.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" /></svg>
              </div>
              <h3 className="text-2xl font-bold">Clean Code</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Writing maintainable, readable, and highly testable code with a deep focus on design patterns.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" /></svg>
              </div>
              <h3 className="text-2xl font-bold">Frontend Mastery</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Crafting fluid, interactive user experiences with a pixel-perfect approach to UI/UX.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Skills Marquee */}
        <section className="py-24 overflow-hidden border-b border-gray-900 group">
          <div className="flex whitespace-nowrap animate-float [animation-duration:10s]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-20 items-center px-10">
                {['Next.js', 'React', 'TypeScript', 'Java', 'PHP', 'Node.js', 'MongoDB', 'MySQL', 'System Design'].map((tech) => (
                  <span key={tech} className="text-6xl md:text-8xl font-black text-gray-900/40 hover:text-white/10 transition-colors pointer-events-none uppercase italic">
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-40 px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-12">Let's build something <br /><span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">extraordinary.</span></h2>
          <Link
            href="/about"
            className="inline-flex items-center gap-4 text-xl text-gray-400 hover:text-white transition-colors group"
          >
            Learn more about my journey
            <span className="w-12 h-px bg-gray-800 group-hover:w-20 group-hover:bg-blue-500 transition-all"></span>
          </Link>
        </section>
      </div>
    </main>
  );
}
