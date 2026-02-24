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

    if (loading) return null; // Or a stealthy spinner
    if (blogs.length === 0) return null; // Don't show anything if no dynamic blogs exist

    return (
        <div className="mt-12 pt-12 border-t border-gray-900">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500 mb-8">
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
                        className="group bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:to-transparent transition-all duration-500" />
                        <Link
                            href={`/article?id=${post.id}`}
                            className="block relative z-10"
                        >
                            <h3 className="text-2xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-gray-400 text-sm">
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
