import { siteConfig } from "@/lib/config";
import Link from "next/link";

export default function About() {
    return (
        <main className="min-h-screen bg-black text-white py-20 px-6 sm:px-10 max-w-5xl mx-auto">
            {/* Header Section */}
            <section className="mb-16">
                <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent">
                    About Me
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
                    <div className="md:col-span-2">
                        <p className="text-2xl text-gray-300 leading-relaxed mb-6 font-light">
                            I'm <span className="text-white font-medium">Hareram Kushwaha</span>, a Computer Science Engineering student focused on writing correct, readable code and improving problem-solving skills through consistent practice.
                        </p>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            I prefer clear, maintainable solutions and enjoy building small projects to learn new tools and concepts. Currently, I'm pursuing my degree at <span className="text-white">KPR Institute of Engineering and Technology</span>.
                        </p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4">Focus Area</h3>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                Full-Stack (MERN)
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                DS & Algorithms
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                System Design
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="mb-20">
                <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                    <span className="w-8 h-px bg-gray-800"></span>
                    Tech Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                    {['Java', 'JavaScript (ES6+)', 'PHP', 'Python', 'React.js', 'Node.js', 'MongoDB', 'MySQL', 'HTML & CSS', 'Git & GitHub'].map((tech) => (
                        <span key={tech} className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-sm text-gray-300 hover:border-gray-600 transition-colors">
                            {tech}
                        </span>
                    ))}
                </div>
            </section>

            {/* Experience Section (from Resume) */}
            <section className="mb-20 border-l border-gray-800 pl-8 ml-4">
                <h2 className="text-2xl font-semibold mb-10">Experience</h2>
                <div className="relative">
                    <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-black"></div>
                    <div className="mb-2 flex justify-between items-center">
                        <h3 className="text-xl font-medium text-white">Full Stack Intern</h3>
                        <span className="text-sm text-gray-500">Oasis Infobyte</span>
                    </div>
                    <ul className="space-y-4 text-gray-400 list-disc ml-5">
                        <li>Engineered a responsive storefront interface using HTML5/CSS3/JS, achieving 100% cross-device compatibility.</li>
                        <li>Optimized asset-loading strategies and UI rendering in JavaScript, reducing average page-load time by 200ms.</li>
                        <li>Streamlined collaborative development via Git/GitHub branching strategies, decreasing merge conflict frequency by 30%.</li>
                    </ul>
                </div>
            </section>

            {/* Projects Section */}
            <section className="mb-20">
                <div className="flex justify-between items-end mb-10">
                    <h2 className="text-2xl font-semibold">Selected Projects</h2>
                    <Link href="/projects" className="text-sm text-gray-500 hover:text-white transition-colors">View all →</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {siteConfig.projects.slice(0, 6).map((project) => (
                        <a
                            key={project.name}
                            href={`https://github.com/${siteConfig.social.github}/${project.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-6 bg-gray-900/30 border border-gray-800 rounded-2xl hover:bg-gray-900/50 hover:border-gray-700 transition-all"
                        >
                            <h3 className="text-lg font-medium mb-2 flex items-center justify-between">
                                {project.name.replace(/-/g, ' ')}
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity"><path d="M7 7h10v10" /><path d="M7 17L17 7" /></svg>
                            </h3>
                            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                {project.description}
                            </p>
                        </a>
                    ))}
                </div>
            </section>

            {/* Work & Practice */}
            <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-2xl font-semibold mb-6">Work & Practice</h2>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                        I maintain a regular practice schedule for Data Structures and Algorithms to sharpen my problem-solving skills.
                    </p>
                    <div className="space-y-4">
                        <a href={`https://leetcode.com/u/${siteConfig.social.leetcode}/`} target="_blank" className="flex items-center gap-4 p-4 bg-gray-900/30 border border-gray-800 rounded-xl hover:border-orange-500/50 transition-colors">
                            <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 font-bold">L</div>
                            <div>
                                <div className="text-sm font-medium">LeetCode</div>
                                <div className="text-xs text-gray-500">Solving algorithmic challenges</div>
                            </div>
                        </a>
                        <a href={`https://www.hackerrank.com/profile/${siteConfig.social.hackerrank}`} target="_blank" className="flex items-center gap-4 p-4 bg-gray-900/30 border border-gray-800 rounded-xl hover:border-green-500/50 transition-colors">
                            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500 font-bold">H</div>
                            <div>
                                <div className="text-sm font-medium">HackerRank</div>
                                <div className="text-xs text-gray-500">Core OOP & Java practice</div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="bg-gray-900/20 border border-gray-800 p-8 rounded-3xl">
                    <h2 className="text-2xl font-semibold mb-6">Resume</h2>
                    <p className="text-gray-400 mb-8">
                        For a detailed overview of my academic and professional journey, you can view or download my resume.
                    </p>
                    <div className="flex flex-col gap-4">
                        <a
                            href={siteConfig.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            View Live Resume
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="border-t border-gray-800 pt-20">
                <h2 className="text-4xl font-bold mb-10">Get in Touch</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <p className="text-gray-400 text-lg">
                            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                        </p>
                        <div className="space-y-4">
                            <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                                <span className="p-3 bg-gray-900 rounded-lg group-hover:bg-blue-500/10 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                </span>
                                {siteConfig.contact.email}
                            </a>
                            <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                                <span className="p-3 bg-gray-900 rounded-lg group-hover:bg-green-500/10 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                </span>
                                {siteConfig.contact.phone}
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col justify-end">
                        <div className="flex gap-6">
                            <a href={`https://linkedin.com/in/${siteConfig.social.linkedin}`} target="_blank" className="text-gray-500 hover:text-white transition-colors">LinkedIn</a>
                            <a href={`https://github.com/${siteConfig.social.github}`} target="_blank" className="text-gray-500 hover:text-white transition-colors">GitHub</a>
                            <a href={`https://twitter.com/${siteConfig.social.twitter}`} target="_blank" className="text-gray-500 hover:text-white transition-colors">Twitter</a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
