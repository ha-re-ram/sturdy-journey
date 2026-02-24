import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import DynamicBlogList from "@/components/DynamicBlogList";

export default function Blog() {
    const posts = getAllPosts();

    return (
        <main className="min-h-screen p-10 max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                Writings & Insights
            </h1>

            <div className="space-y-6">
                {posts.map((post) => (
                    <div key={post.slug} className="group bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-blue-500/50 transition-all duration-300">
                        <Link
                            href={`/blog/${post.slug}`}
                            className="block"
                        >
                            <h2 className="text-2xl font-semibold group-hover:text-blue-400 transition-colors mb-2">
                                {post.title}
                            </h2>
                            <p className="text-gray-400 text-sm">
                                {post.date}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>

            <DynamicBlogList />
        </main>
    );
}
