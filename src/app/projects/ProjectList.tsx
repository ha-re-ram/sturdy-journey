"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GitHubRepo } from "@/lib/github";

export default function ProjectList({ repos }: { repos: GitHubRepo[] }) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {repos.map((repo) => (
                <motion.div
                    key={repo.id}
                    variants={item}
                    className="group flex flex-col p-8 border border-gray-800 rounded-3xl bg-gray-900/20 backdrop-blur-sm hover:bg-gray-900/40 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-gray-800/50 rounded-2xl group-hover:bg-blue-500/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-blue-400 transition-colors"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                        </div>
                        <div className="flex gap-2">
                            {repo.language && (
                                <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-gray-800/50 text-gray-400 border border-gray-700">
                                    {repo.language}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                            {repo.name.replace(/-/g, ' ')}
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-4 min-h-[5rem]">
                            {repo.description || "Experimental project and code samples exploring new technologies and concepts."}
                        </p>
                    </div>

                    <div className="mt-auto space-y-6">
                        {repo.status && (
                            <div className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full border ${repo.status === 'Completed'
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${repo.status === 'Completed' ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
                                {repo.status}
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-6 border-t border-gray-800/50">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                    {repo.stargazers_count}
                                </span>
                                <span>
                                    {new Date(repo.updated_at).getFullYear()}
                                </span>
                            </div>
                            <Link
                                href={repo.html_url}
                                target="_blank"
                                className="text-white hover:text-blue-400 font-medium text-sm flex items-center gap-2 transition-colors"
                            >
                                Source
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-45 transition-transform"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
