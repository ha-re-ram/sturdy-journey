"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "firebase/auth";

export default function Comments({ itemId }: { itemId: string }) {
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState("");
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if (!auth) {
            fetchComments();
            return;
        }
        // Recover authentication state if returning from a mobile redirect login
        getRedirectResult(auth).catch((error) => {
            console.error("Redirect auth error:", error);
        });

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

        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });

        try {
            await signInWithPopup(auth, provider);
        } catch (error: any) {
            if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
                // Ignore, user simply closed or double-clicked the button. Do not console.error here to avoid Next.js dev overlays.
                return;
            }

            console.error("Firebase Login Detailed Error:", error);

            if (error.code === 'auth/popup-blocked') {
                // Important fallback for mobile embedded browsers (Instagram, Medium, Safari strict mode)
                signInWithRedirect(auth, provider);
            } else if (error.code === 'auth/unauthorized-domain') {
                alert("Domain not authorized for Google Sign-In. Please add 'localhost' and your domain to the Firebase Console -> Authentication -> Settings -> Authorized Domains.");
            } else if (error.code === 'auth/configuration-not-found' || error.message.includes("configuration")) {
                alert("Google Sign-In is not enabled! Please go to your Firebase Console -> Authentication -> Sign-in method -> Enable 'Google'.");
            } else if (error.code === 'auth/invalid-api-key') {
                alert("Invalid Firebase API Key. Please check your .env.local file.");
            } else {
                alert("Error logging in: " + error.message + " (Check console for details)");
            }
        }
    };

    return (
        <div className="mt-24 pt-16 border-t border-[#1a1a1a]/10">
            <h3 className="text-4xl font-syne font-bold uppercase tracking-tighter mb-12 text-[#1a1a1a]">Comments</h3>

            <div className="space-y-8 mb-12">
                {comments.length === 0 ? (
                    <p className="text-[#1a1a1a]/40 font-cormorant italic text-xl">No comments yet. Be the first to share your thoughts.</p>
                ) : (
                    comments.map(c => (
                        <div key={c.id} className="bg-white/30 backdrop-blur-md p-6 rounded-[2rem] border border-white/40 flex gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                            {c.authorParams?.photo ? (
                                <img src={c.authorParams.photo} alt="Avatar" className="w-12 h-12 rounded-full shadow-sm" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-[#1a1a1a]/5 text-[#1a1a1a] flex items-center justify-center font-syne font-bold text-lg border border-[#1a1a1a]/10">
                                    {c.authorParams?.name?.[0]?.toUpperCase()}
                                </div>
                            )}
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="font-syne font-bold tracking-tight text-[#1a1a1a] text-lg">{c.authorParams?.name}</span>
                                    <span className="text-xs font-syne font-bold uppercase tracking-widest text-[#1a1a1a]/40">{new Date(c.date).toLocaleDateString()}</span>
                                </div>
                                <p className="text-[#4a4a4a] font-light leading-relaxed">{c.content}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {user ? (
                <form onSubmit={handleAddComment} className="flex flex-col gap-4">
                    <textarea
                        className="w-full bg-white/30 backdrop-blur-md border border-[#1a1a1a]/10 rounded-[2rem] p-6 text-[#1a1a1a] font-light focus:outline-none focus:border-[#1a1a1a]/30 focus:bg-white/50 transition-all placeholder-[#1a1a1a]/30 resize-none shadow-[0_5px_15px_rgba(0,0,0,0.01)]"
                        rows={3}
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                    />
                    <div className="flex justify-between items-center">
                        <p className="text-xs font-syne font-bold uppercase tracking-widest text-[#1a1a1a]/40">Commenting as {user.displayName || user.email}</p>
                        <button type="submit" className="bg-[#1a1a1a] hover:bg-[#1a1a1a]/80 text-[#E5D5D0] px-8 py-3 rounded-full font-syne font-bold uppercase tracking-widest text-xs transition-colors shadow-lg">
                            Post Comment
                        </button>
                    </div>
                </form>
            ) : (
                <div className="bg-white/30 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/40 text-center shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                    <p className="mb-8 text-[#1a1a1a]/60 font-cormorant italic text-xl">You must be logged in to leave a comment.</p>
                    <button onClick={loginWithGoogle} className="bg-[#1a1a1a] text-[#E5D5D0] font-syne font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:bg-[#1a1a1a]/80 transition-colors shadow-lg">
                        Login with Google
                    </button>
                </div>
            )}
        </div>
    );
}
