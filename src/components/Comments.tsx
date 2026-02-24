"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Comments({ itemId }: { itemId: string }) {
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState("");
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if (!auth) {
            fetchComments();
            return;
        }
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        fetchComments();
        return () => unsubscribe();
    }, [itemId]);

    const fetchComments = async () => {
        if (!itemId || !db) return;
        try {
            const q = query(collection(db, "comments"), where("itemId", "==", itemId));
            const querySnapshot = await getDocs(q);
            const data: any[] = [];
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            // Sort client-side to avoid needing complex Firestore indexes initially
            data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setComments(data);
        } catch (error) {
            console.error("Error fetching comments", error);
        }
    };

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return alert("Please login to comment");
        if (!newComment.trim()) return;
        if (!db) return alert("Database not initialized");

        try {
            await addDoc(collection(db, "comments"), {
                itemId,
                content: newComment,
                authorParams: {
                    name: user.displayName || user.email,
                    photo: user.photoURL,
                },
                date: new Date().toISOString(),
            });
            setNewComment("");
            fetchComments();
        } catch (error) {
            console.error("Error adding comment", error);
        }
    };

    const loginWithGoogle = async () => {
        if (!auth) {
            alert("Firebase Auth not initialized. Check your environment variables.");
            return;
        }
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="mt-16 pt-8 border-t border-gray-800">
            <h3 className="text-2xl font-bold mb-6">Comments</h3>

            <div className="space-y-6 mb-8">
                {comments.length === 0 ? (
                    <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
                ) : (
                    comments.map(c => (
                        <div key={c.id} className="bg-white/5 p-4 rounded-xl border border-white/10 flex gap-4">
                            {c.authorParams?.photo ? (
                                <img src={c.authorParams.photo} alt="Avatar" className="w-10 h-10 rounded-full" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                                    {c.authorParams?.name?.[0]?.toUpperCase()}
                                </div>
                            )}
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold">{c.authorParams?.name}</span>
                                    <span className="text-xs text-gray-500">{new Date(c.date).toLocaleDateString()}</span>
                                </div>
                                <p className="text-gray-300">{c.content}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {user ? (
                <form onSubmit={handleAddComment} className="flex flex-col gap-3">
                    <textarea
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                        rows={3}
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                    />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold self-end transition-colors">
                        Post Comment
                    </button>
                    <p className="text-xs text-gray-500 text-right">Commenting as {user.displayName || user.email}</p>
                </form>
            ) : (
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                    <p className="mb-4 text-gray-400">You must be logged in to leave a comment.</p>
                    <button onClick={loginWithGoogle} className="bg-white text-black font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        Login with Google
                    </button>
                </div>
            )}
        </div>
    );
}
