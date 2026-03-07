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

    if (loading) return <div className="text-center py-32 text-[#1a1a1a]/40 font-syne font-bold uppercase tracking-widest text-sm animate-pulse">Loading...</div>;
    if (!article) return <div className="text-center py-32 text-red-500/80 font-syne font-bold uppercase tracking-widest text-sm">Article not found</div>;

    return (
        <article className="max-w-4xl mx-auto">
            <button
                onClick={() => router.back()}
                className="mb-16 text-[#1a1a1a]/60 hover:text-[#1a1a1a] flex items-center gap-4 transition-colors font-syne font-bold uppercase tracking-widest text-sm group"
            >
                <span className="w-8 h-8 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:text-[#E5D5D0] transition-all">
                    ←
                </span>
                Back
            </button>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-syne font-black mb-8 uppercase tracking-tighter text-[#1a1a1a] leading-none">
                {article.title}
            </h1>
            <p className="text-[#1a1a1a]/50 font-syne font-bold uppercase tracking-widest text-sm mb-16 border-b border-[#1a1a1a]/10 pb-12">
                {new Date(article.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </p>

            <div className="mb-24 prose prose-lg prose-neutral max-w-none 
                prose-p:text-[#4a4a4a] prose-p:font-light prose-p:leading-relaxed 
                prose-headings:text-[#1a1a1a] prose-headings:font-syne prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight 
                prose-a:text-[#1a1a1a] prose-a:underline prose-a:underline-offset-4 prose-a:decoration-[#1a1a1a]/30 hover:prose-a:decoration-[#1a1a1a] 
                prose-strong:text-[#1a1a1a] prose-strong:font-medium
                prose-blockquote:border-l-[#1a1a1a]/20 prose-blockquote:font-cormorant prose-blockquote:italic prose-blockquote:text-2xl prose-blockquote:text-[#1a1a1a]/60
                prose-ul:text-[#4a4a4a] prose-li:font-light">
                <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>

            <Comments itemId={article.id} />
        </article>
    );
}

export default function ArticlePage() {
    return (
        <main className="min-h-screen py-32 px-6 sm:px-10 max-w-5xl mx-auto relative z-20">
            <Suspense fallback={<div className="text-center pt-32 text-[#1a1a1a]/40 font-syne font-bold uppercase tracking-widest text-sm animate-pulse">Loading article viewer...</div>}>
                <ArticleContent />
            </Suspense>
        </main>
    );
}
