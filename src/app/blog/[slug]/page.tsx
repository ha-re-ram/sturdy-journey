import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import { getAllPosts } from "@/lib/blog";
import Comments from "@/components/Comments";

interface BlogPostProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}


export default async function BlogPost({ params }: BlogPostProps) {
    const { slug } = await params;

    const fullPath = path.join(
        process.cwd(),
        "src/content/blog",
        `${slug}.md`
    );

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { content, data } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return (
        <main className="min-h-screen p-10 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">{data.title}</h1>
            <p className="text-gray-400 mb-12">{data.date}</p>

            <div
                className="prose prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            <Comments itemId={slug} />
        </main>
    );
}
