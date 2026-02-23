import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function Blog() {
    const posts = getAllPosts();

    return (
        <main className="min-h-screen p-10">
            <h1 className="text-3xl font-bold mb-8">Blog</h1>

            <div className="space-y-6">
                {posts.map((post) => (
                    <div key={post.slug}>
                        <Link
                            href={`/blog/${post.slug}`}
                            className="text-xl font-semibold hover:underline"
                        >
                            {post.title}
                        </Link>

                        <p className="text-gray-400 text-sm">
                            {post.date}
                        </p>
                    </div>
                ))}
            </div>
        </main>
    );
}
