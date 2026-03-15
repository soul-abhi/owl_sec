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
                    content: "Thought-focused platforms encourage clearer conversations. Removing profile pressure helps ideas stand on their own merit.",
                    author: { userId: "#34FG78", name: "Community Member" },
                    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                    commentsCount: 5
                },
                {
                    id: "2",
                    content: "A focused writing format improves quality. Short, structured posts are easier to read and discuss professionally.",
                    author: { userId: "#12AB45", name: "Editorial Team" },
                    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
                    commentsCount: 12
                },
                {
                    id: "3",
                    content: "Professional communities improve when participants prioritize clarity, context, and constructive feedback.",
                    author: { userId: "#89XY12", name: "Industry Reader" },
                    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
                    commentsCount: 8
                },
                {
                    id: "4",
                    content: "Consistent formatting and respectful tone make a platform more usable for long-term contributors.",
                    author: { userId: "#56CD90", name: "Operations" },
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
            <div className="min-h-screen flex items-center justify-center bg-white text-black">
                <div className="border-2 border-black bg-white px-8 py-6 text-base font-semibold tracking-wide">
                    Loading posts...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black p-6">
            <div className="max-w-4xl mx-auto">
                <div className="border-2 border-black bg-white p-8 mb-6">
                    <div>
                        <p className="text-xs tracking-[0.2em] uppercase text-black/70 mb-2">Explore</p>
                        <h1 className="text-4xl font-bold mb-2">Community Feed</h1>
                        <p className="text-black/70 text-base">Read recent posts from the network.</p>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-5">
                        <Link href="/create-post">
                            <button className="px-6 py-3 border-2 border-black bg-black text-white font-semibold hover:bg-white hover:text-black transition">
                                New Post
                            </button>
                        </Link>
                        <Link href="/dashboard">
                            <button className="px-6 py-3 border-2 border-black bg-white text-black font-semibold hover:bg-black hover:text-white transition">
                                Dashboard
                            </button>
                        </Link>
                    </div>
                </div>

                {posts.length === 0 ? (
                    <div className="border-2 border-black bg-white p-16 text-center">
                        <h2 className="text-3xl font-bold mb-3">No posts yet</h2>
                        <p className="text-black/70 text-lg mb-6">Be the first to publish a post.</p>
                        <Link href="/create-post">
                            <button className="px-8 py-4 border-2 border-black bg-black text-white font-semibold hover:bg-white hover:text-black transition text-lg">
                                Create Post
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="border-2 border-black bg-white p-8"
                            >
                                <div className="flex items-start justify-between mb-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center text-lg font-bold">
                                            {post.author.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-xl leading-tight">{post.author.name}</p>
                                            <p className="text-black/60 font-mono text-sm font-semibold mt-1">
                                                {post.author.userId}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-black/60 text-sm font-semibold">
                                        {getTimeAgo(post.createdAt)}
                                    </p>
                                </div>
                                <p className="text-black text-base leading-relaxed mb-5">
                                    {post.content}
                                </p>
                                <div className="flex items-center gap-6 border-t-2 border-black/10 pt-4 text-sm uppercase tracking-wide text-black/70">
                                    <span className="font-semibold">{post.commentsCount} comments</span>
                                    <span className="font-semibold">Like</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}