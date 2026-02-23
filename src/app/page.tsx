import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6 inline-block px-4 py-1.5 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-gray-600 transition-colors">
          <span className="text-sm text-gray-400">Available for hire</span>
          <span className="ml-2 inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            Building Systems
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            That Scale.
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          I'm <span className="text-white font-semibold">Hareram Kushwaha</span>, a Computer Science student
          crafting high-performance web applications and exploring distributed systems.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link
            href="/projects"
            className="group relative px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all flex items-center gap-2"
          >
            Projects
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>

          <Link
            href="/blog"
            className="px-8 py-3.5 border border-gray-700 text-gray-300 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-500 transition-all backdrop-blur-sm"
          >
            Blog
          </Link>

          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 border border-gray-700 text-gray-300 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-500 transition-all backdrop-blur-sm flex items-center gap-2"
          >
            Resume
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10" /><path d="M7 17L17 7" /></svg>
          </a>
        </div>

        {/* Tech Stack Marquee (Simplified) */}
        <div className="mt-24 pt-10 border-t border-gray-800/50">
          <p className="text-sm text-gray-500 mb-6 uppercase tracking-widest">Tech Stack</p>
          <div className="flex flex-wrap justify-center gap-8 text-gray-400 grayscale hover:grayscale-0 transition-all duration-500">
            {['Next.js', 'React', 'TypeScript', 'Tailwind', 'Node.js', 'System Design'].map((tech) => (
              <span key={tech} className="hover:text-white transition-colors cursor-default text-lg font-medium">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

