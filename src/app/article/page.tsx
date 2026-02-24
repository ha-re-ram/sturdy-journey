"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ReactMarkdown from "react-markdown";
import Comments from "@/components/Comments";

function ArticleContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get("id");
    const type = searchParams.get("type") || "blogs";

    const [article, setArticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            if (!id || !db) {
                setLoading(false);
                return;
            }
            try {
                const docRef = doc(db, type, id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setArticle({ id: docSnap.id, ...docSnap.data() });
                }
            } catch (error) {
                console.error("Error fetching article", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id, type]);

    if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>;
    if (!article) return <div className="text-center py-20 text-red-400">Article not found</div>;

    return (
        <article className="prose prose-invert prose-lg max-w-none">
            <button
                onClick={() => router.back()}
                className="mb-8 text-gray-400 hover:text-white flex items-center gap-2 transition-colors border max-w-max px-4 py-2 border-white/10 rounded-full"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                Back
            </button>
            <h1 className="text-4xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
                {article.title}
            </h1>
            <p className="text-gray-400 mb-12 border-b border-gray-800 pb-8">
                {new Date(article.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </p>

            <div className="mb-16 prose-p:text-gray-300 prose-headings:text-white prose-a:text-blue-400">
                <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>

            <Comments itemId={article.id} />
        </article>
    );
}

export default function ArticlePage() {
    return (
        <main className="min-h-screen p-10 max-w-4xl mx-auto pt-24">
            <Suspense fallback={<div className="text-center pt-32 text-gray-500">Loading article viewer...</div>}>
                <ArticleContent />
            </Suspense>
        </main>
    );
}
