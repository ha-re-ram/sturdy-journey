import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import { getAllPosts } from "@/lib/blog";

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
        <main className="min-h-screen p-10">
            <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
            <p className="text-gray-400 mb-8">{data.date}</p>

            <div
                className="prose prose-invert max-w-3xl"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
        </main>
    );
}
