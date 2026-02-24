import DynamicBlogList from "@/components/DynamicBlogList";

export default function Blog() {
    return (
        <main className="min-h-screen p-10 max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                Writings & Insights
            </h1>
            <DynamicBlogList />
        </main>
    );
}
