"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DynamicProjectList() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!db) {
                setLoading(false);
                return;
            }
            try {
                const querySnapshot = await getDocs(collection(db, "projects"));
                const data: any[] = [];
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });

                // Sort by order first, then date
                data.sort((a, b) => {
                    if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                });

                setProjects(data);
            } catch (error) {
                console.error("Error fetching dynamic projects", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariant = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    if (loading) return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col p-8 border border-white/40 rounded-[2.5rem] bg-white/20 backdrop-blur-xl animate-pulse h-[400px]">
                    <div className="w-12 h-12 bg-[#1a1a1a]/10 rounded-full mb-8"></div>
                    <div className="h-8 w-3/4 bg-[#1a1a1a]/10 rounded-full mb-4"></div>
                    <div className="h-4 w-full bg-[#1a1a1a]/5 rounded-full mb-3"></div>
                    <div className="h-4 w-5/6 bg-[#1a1a1a]/5 rounded-full mb-3"></div>
                    <div className="h-4 w-4/6 bg-[#1a1a1a]/5 rounded-full mb-8"></div>
                    <div className="mt-auto flex justify-between pt-6 border-t border-[#1a1a1a]/5">
                        <div className="h-6 w-16 bg-[#1a1a1a]/10 rounded-full"></div>
                        <div className="flex gap-4">
                            <div className="h-6 w-16 bg-[#1a1a1a]/10 rounded-full"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    if (projects.length === 0) return (
        <div className="text-center py-32 border border-[#1a1a1a]/10 rounded-[2.5rem] bg-white/20 backdrop-blur-xl">
            <p className="text-[#4a4a4a] text-xl font-cormorant italic">No repositories found. Add some from the Admin Dashboard!</p>
        </div>
    );

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
            {projects.map((repo) => (
                <motion.div
                    key={repo.id}
                    variants={itemVariant}
                    className="group flex flex-col p-8 border border-white/40 rounded-[2.5rem] bg-white/30 backdrop-blur-xl hover:bg-white/50 transition-all duration-700 ease-out hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] overflow-hidden"
                >
                    <div className="flex justify-between items-start mb-8">
                        {repo.imageUrl ? (
                            <img src={repo.imageUrl} alt={repo.title} className="w-full h-48 object-cover rounded-3xl border border-white/20 mb-2 shadow-sm" />
                        ) : (
                            <div className="w-full h-48 bg-[#1a1a1a]/5 rounded-3xl flex items-center justify-center mb-2">
                                <span className="font-syne font-black text-4xl text-[#1a1a1a]/20 uppercase">{repo.title.substring(0, 2)}</span>
                            </div>
                        )}
                    </div>

                    <div className="mb-6 flex-grow">
                        <Link href={`/article?id=${repo.id}&type=projects`}>
                            <h2 className="text-3xl font-syne font-bold text-[#1a1a1a] mb-4 group-hover:opacity-60 transition-opacity tracking-tight uppercase break-words hyphens-auto">
                                {repo.title}
                            </h2>
                        </Link>
                        <p className="text-[#4a4a4a] text-lg font-light leading-relaxed mb-6 line-clamp-4 min-h-[5rem]">
                            {(repo.content || "").substring(0, 160)}...
                        </p>
                    </div>

                    <div className="mt-auto space-y-6">
                        {repo.category && (
                            <div className={`inline-flex items-center gap-2 text-[10px] font-syne uppercase tracking-widest font-bold px-4 py-2 rounded-full border ${repo.category.toLowerCase() === 'completed' ? 'bg-[#1a1a1a]/5 text-[#1a1a1a] border-[#1a1a1a]/10' :
                                repo.category.toLowerCase() === 'working' ? 'bg-[#1a1a1a]/5 text-[#1a1a1a] border-[#1a1a1a]/10' :
                                    'bg-[#1a1a1a]/5 text-[#1a1a1a] border-[#1a1a1a]/10'
                                }`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]"></span>
                                {repo.category}
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-6 border-t border-[#1a1a1a]/10">
                            <span className="text-sm font-syne font-bold text-[#1a1a1a]/50">
                                {new Date(repo.date).getFullYear()}
                            </span>
                            <div className="flex gap-2">
                                <Link
                                    href={`/article?id=${repo.id}&type=projects`}
                                    className="px-5 py-2 rounded-full bg-[#1a1a1a] text-[#E5D5D0] font-syne text-xs uppercase tracking-widest font-bold hover:bg-[#1a1a1a]/80 transition-colors"
                                >
                                    View
                                </Link>

                                {repo.githubUrl && (
                                    <Link
                                        href={repo.githubUrl}
                                        target="_blank"
                                        className="w-10 h-10 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center text-[#1a1a1a] hover:bg-[#1a1a1a]/5 transition-colors group-hover/btn:bg-white"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0 -.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2V21" /></svg>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
