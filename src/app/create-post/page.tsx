"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreatePostPage() {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/login");
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (content.trim().length === 0) {
            setError("Post cannot be empty");
            return;
        }

        setLoading(true);

        // Mock post creation
        setTimeout(() => {
            setLoading(false);
            router.push("/explore");
        }, 1500);
    };

    return (
        <div className="min-h-screen p-6" style={{ background: 'lab(97.1626% 2.99937 -4.13398)' }}>
            <div className="max-w-3xl mx-auto">
                <Link href="/dashboard">
                    <button className="mb-6 px-6 py-3 bg-white text-black font-bold rounded-2xl hover:bg-gray-100 transition shadow-lg border-3 border-black">
                        ← Back to Dashboard
                    </button>
                </Link>

                <div className="bg-white rounded-3xl shadow-2xl border-4 border-black p-10">
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">✍️</div>
                        <h1 className="text-4xl font-bold mb-2 font-[cursive]">Create a Post</h1>
                        <p className="text-gray-600 text-lg">Share your thoughts with the community</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border-3 border-red-500 text-red-700 px-4 py-3 rounded-2xl mb-6 text-center font-semibold">
                                {error}
                            </div>
                        )}

                        <div className="bg-linear-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border-3 border-purple-300 mb-6">
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-bold">💡 Tips for great posts:</span>
                            </p>
                            <ul className="text-sm text-gray-600 space-y-1 ml-4">
                                <li>• Be authentic and express your true thoughts</li>
                                <li>• Respect others and keep it friendly</li>
                                <li>• Share experiences, feelings, or ideas</li>
                            </ul>
                        </div>

                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-6 py-5 border-3 border-gray-300 rounded-2xl focus:border-black focus:outline-none transition text-black resize-none text-lg"
                            rows={12}
                            placeholder="What's on your mind? Share your thoughts, feelings, or anything you want to express..."
                            required
                            maxLength={1000}
                        />
                        
                        <div className="flex justify-between items-center mt-6">
                            <p className="text-sm text-gray-500 font-semibold">
                                {content.length}/1000 characters
                            </p>
                            <div className="flex gap-3">
                                <Link href="/dashboard">
                                    <button
                                        type="button"
                                        className="px-8 py-4 bg-gray-200 text-black font-bold rounded-2xl hover:bg-gray-300 transition shadow-md border-2 border-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </Link>
                                <button
                                    type="submit"
                                    disabled={loading || !content.trim()}
                                    className="px-10 py-4 bg-black text-white font-bold rounded-2xl hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg text-lg"
                                >
                                    {loading ? "Posting..." : "Post 🚀"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}