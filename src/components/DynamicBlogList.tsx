"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DynamicBlogList() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            if (!db) {
                setLoading(false);
                return;
            }
            try {
                // To fetch without complex composite indexes right away, we fetch all and sort client-side.
                const querySnapshot = await getDocs(collection(db, "blogs"));
                const data: any[] = [];
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setBlogs(data);
            } catch (error) {
                console.error("Error fetching dynamic blogs", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) return (
        <div className="mt-12 pt-12 border-t border-[#1a1a1a]/10 w-full max-w-5xl mx-auto">
            <h2 className="text-3xl font-cormorant italic font-bold mb-8 w-60 h-8 bg-[#1a1a1a]/10 animate-pulse rounded-full"></h2>
            <div className="space-y-6">
                {[1, 2].map((i) => (
                    <div key={i} className="group bg-white/30 backdrop-blur-xl border border-white/40 p-8 rounded-[2.5rem] animate-pulse h-[120px] w-full">
                        <div className="h-6 w-3/4 bg-[#1a1a1a]/10 rounded-full mb-4"></div>
                        <div className="h-4 w-1/4 bg-[#1a1a1a]/5 rounded-full"></div>
                    </div>
                ))}
            </div>
        </div>
    );
    if (blogs.length === 0) return null; // Don't show anything if no dynamic blogs exist

    return (
        <div className="mt-12 pt-12 border-t border-[#1a1a1a]/10">
            <h2 className="text-3xl font-cormorant italic font-bold text-[#1a1a1a] mb-12">
                Latest Articles (Live)
            </h2>
            <div className="space-y-6">
                {blogs.map((post, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        key={post.id}
                        className="group bg-white/30 backdrop-blur-xl border border-white/40 p-8 rounded-[2.5rem] hover:bg-white/50 transition-all duration-500 ease-out relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/0 via-transparent to-[#1a1a1a]/0 group-hover:from-[#1a1a1a]/5 group-hover:to-transparent transition-all duration-700" />
                        <Link
                            href={`/article?id=${post.id}`}
                            className="block relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                            <h3 className="text-3xl font-syne font-bold uppercase tracking-tight mb-2 group-hover:opacity-60 transition-opacity text-[#1a1a1a]">
                                {post.title}
                            </h3>
                            <p className="text-[#4a4a4a] text-sm font-syne font-bold uppercase tracking-widest whitespace-nowrap">
                                {new Date(post.date).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
