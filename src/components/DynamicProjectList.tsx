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
                data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setProjects(data);
            } catch (error) {
                console.error("Error fetching dynamic projects", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading || projects.length === 0) return null;

    return (
        <div className="mt-20 pt-16 border-t border-gray-900">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 mb-10 text-center">
                Custom Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {projects.map((post, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        key={post.id}
                        className="group flex flex-col p-8 border border-gray-800 rounded-3xl bg-gray-900/20 backdrop-blur-sm hover:bg-gray-900/40 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5"
                    >
                        <div className="mb-4">
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-4 min-h-[5rem]">
                                {post.content.substring(0, 150)}...
                            </p>
                        </div>
                        <div className="mt-auto pt-6 border-t border-gray-800/50 flex justify-between items-center">
                            <span className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                            <Link
                                href={`/article?id=${post.id}&type=projects`}
                                className="text-blue-400 hover:text-white font-medium text-sm flex items-center gap-2 transition-colors"
                            >
                                Read More
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
