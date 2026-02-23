import { siteConfig } from "@/lib/config";

export default function About() {
    return (
        <main className="min-h-screen bg-black text-white p-10 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">About Me</h1>

            <section className="mb-12">
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                    I am a Computer Science student focused on becoming a grounded and skilled software engineer.
                    I build systems, explore low-level concepts, and continuously improve through disciplined practice.
                </p>
                <p className="text-gray-400 leading-relaxed">
                    Currently, I'm diving deep into distributed systems, performance optimization, and building robust web applications.
                    I believe in the power of simple, scalable code and a strong foundation in CS fundamentals.
                </p>
            </section>

            <section className="border-t border-gray-800 pt-12">
                <h2 className="text-2xl font-semibold mb-6">Resume</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href={siteConfig.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        View Live Resume
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                    </a>
                    <a
                        href={siteConfig.resumeSource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-900 transition-colors"
                    >
                        Source Code
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </a>
                </div>
            </section>
        </main>
    );
}

