"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Post {
    id: string;
    content: string;
    author: {
        userId: string;
        name: string;
    };
    createdAt: string;
    commentsCount: number;
}

export default function ExplorePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/login");
            return;
        }

        // Mock posts data
        setTimeout(() => {
            setPosts([
                {
                    id: "1",
                    content: "Just discovered BIXBEE! This platform is amazing for expressing thoughts freely without the pressure of maintaining a profile. Love it! 💜",
                    author: { userId: "#34FG78", name: "Anonymous User" },
                    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                    commentsCount: 5
                },
                {
                    id: "2",
                    content: "Sometimes the best conversations happen when we focus on thoughts, not who's saying them. That's the beauty of anonymity.",
                    author: { userId: "#12AB45", name: "ThoughtSeeker" },
                    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
                    commentsCount: 12
                },
                {
                    id: "3",
                    content: "Late night thoughts: Why do we care so much about other people's opinions? Life becomes so much easier when you just be yourself.",
                    author: { userId: "#89XY12", name: "Midnight Thinker" },
                    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
                    commentsCount: 8
                },
                {
                    id: "4",
                    content: "The freedom to express without judgment is liberating. Thank you BIXBEE for creating this space! 🙏",
                    author: { userId: "#56CD90", name: "FreeSpirit" },
                    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                    commentsCount: 3
                }
            ]);
            setLoading(false);
        }, 1000);
    }, [router]);

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) return `${seconds}s ago`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'lab(97.1626% 2.99937 -4.13398)' }}>
                <div className="text-center">
                    <div className="text-6xl mb-4">🌍</div>
                    <div className="text-2xl font-bold">Loading posts...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6" style={{ background: 'lab(97.1626% 2.99937 -4.13398)' }}>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-5xl font-bold mb-2 font-[cursive]">Explore 🌍</h1>
                        <p className="text-gray-700 text-lg">Discover thoughts from around the community</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/create-post">
                            <button className="px-6 py-3 bg-black text-white font-bold rounded-2xl hover:bg-gray-800 transition shadow-lg border-2 border-black">
                                ✍️ New Post
                            </button>
                        </Link>
                        <Link href="/dashboard">
                            <button className="px-6 py-3 bg-white text-black font-bold rounded-2xl hover:bg-gray-100 transition shadow-lg border-3 border-black">
                                Dashboard
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Posts */}
                {posts.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-2xl border-4 border-black p-16 text-center">
                        <div className="text-8xl mb-6">🌱</div>
                        <h2 className="text-3xl font-bold mb-3">No posts yet</h2>
                        <p className="text-gray-600 text-lg mb-6">Be the first to share something!</p>
                        <Link href="/create-post">
                            <button className="px-8 py-4 bg-black text-white font-bold rounded-2xl hover:bg-gray-800 transition shadow-lg text-lg">
                                Create First Post
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white rounded-3xl shadow-xl border-3 border-black p-8 hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer group"
                                onClick={() => router.push(`/post/${post.id}`)}
                            >
                                <div className="flex items-start justify-between mb-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-2xl border-3 border-black">
                                            {post.author.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-xl">{post.author.name}</p>
                                            <p className="text-gray-500 font-mono text-sm font-semibold">
                                                {post.author.userId}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-sm font-semibold">
                                        {getTimeAgo(post.createdAt)}
                                    </p>
                                </div>
                                <p className="text-gray-800 text-lg leading-relaxed mb-5">
                                    {post.content}
                                </p>
                                <div className="flex items-center gap-6 text-gray-600 border-t-2 border-gray-100 pt-4">
                                    <div className="flex items-center gap-2 hover:text-blue-600 transition">
                                        <span className="text-2xl">💬</span>
                                        <span className="font-semibold">{post.commentsCount} comments</span>
                                    </div>
                                    <div className="flex items-center gap-2 hover:text-red-600 transition">
                                        <span className="text-2xl">❤️</span>
                                        <span className="font-semibold">Like</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}