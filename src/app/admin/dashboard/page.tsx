"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Form states
    const [tab, setTab] = useState("blogs"); // 'blogs' | 'projects'
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            router.push("/admin");
            return;
        }
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                router.push("/admin");
            } else {
                // Ensure commenters logging in with Google cannot access the admin dashboard
                const isEmailPasswordUser = currentUser.providerData.some(p => p.providerId === 'password');
                const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

                if (adminEmail && currentUser.email !== adminEmail) {
                    signOut(auth);
                    router.push("/admin");
                    alert("Access Denied: You are not the admin. Logging out.");
                } else if (!adminEmail && !isEmailPasswordUser) {
                    signOut(auth);
                    router.push("/admin");
                    alert("Access Denied: Dashboard is for email/password admins only.");
                } else {
                    setUser(currentUser);
                    fetchItems("blogs");
                }
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [router]);

    const fetchItems = async (collectionName: string) => {
        if (!db) return;
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        setItems(data);
    };

    const handleTabChange = (newTab: string) => {
        setTab(newTab);
        setTitle("");
        setContent("");
        fetchItems(newTab);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!db) return alert("Database not initialized");
        try {
            await addDoc(collection(db, tab), {
                title,
                content,
                date: new Date().toISOString(),
                slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            });
            setTitle("");
            setContent("");
            fetchItems(tab);
            alert(`${tab === "blogs" ? "Blog" : "Project"} added successfully!`);
        } catch (error: any) {
            alert("Error adding document: " + error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        if (!db) return alert("Database not initialized");
        try {
            await deleteDoc(doc(db, tab, id));
            fetchItems(tab);
        } catch (error: any) {
            alert("Error deleting document: " + error.message);
        }
    };

    const handleLogout = async () => {
        if (auth) {
            await signOut(auth);
        }
        router.push("/admin");
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
    if (!user) return null;

    return (
        <main className="min-h-screen bg-black text-white p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
                        Admin Dashboard
                    </h1>
                    <button onClick={handleLogout} className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/40 transition">
                        Logout
                    </button>
                </div>

                <div className="flex gap-4 mb-8 border-b border-gray-800 pb-2">
                    <button
                        onClick={() => handleTabChange("blogs")}
                        className={`px-4 py-2 font-semibold transition-colors ${tab === "blogs" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-500 hover:text-gray-300"}`}
                    >
                        Manage Blogs
                    </button>
                    <button
                        onClick={() => handleTabChange("projects")}
                        className={`px-4 py-2 font-semibold transition-colors ${tab === "projects" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-500 hover:text-gray-300"}`}
                    >
                        Manage Projects
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Form Section */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h2 className="text-2xl font-bold mb-6">Add New {tab === "blogs" ? "Blog" : "Project"}</h2>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Content (Markdown supported)</label>
                                <textarea
                                    required
                                    rows={8}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
                                Publish {tab === "blogs" ? "Blog" : "Project"}
                            </button>
                        </form>
                    </div>

                    {/* List Section */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h2 className="text-2xl font-bold mb-6">Existing {tab === "blogs" ? "Blogs" : "Projects"}</h2>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {items.length === 0 ? (
                                <p className="text-gray-500">No {tab} found.</p>
                            ) : items.map((item) => (
                                <div key={item.id} className="bg-black/40 p-4 rounded-lg border border-white/5 flex justify-between items-center group hover:border-blue-500/30 transition">
                                    <div>
                                        <h3 className="font-semibold text-lg">{item.title}</h3>
                                        <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-400 opacity-0 group-hover:opacity-100 transition px-3 py-1 hover:bg-red-500/20 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
