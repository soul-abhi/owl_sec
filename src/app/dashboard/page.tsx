"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
    id: string;
    userId: string;
    name: string;
    profileDesc?: string;
}

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [profileDesc, setProfileDesc] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/login");
            return;
        }

        try {
            const parsedUser = JSON.parse(userData);
            queueMicrotask(() => {
                setUser(parsedUser);
                setProfileDesc(parsedUser.profileDesc || "");
                setIsReady(true);
            });
        } catch {
            localStorage.removeItem("user");
            router.push("/login");
            return;
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/");
    };

    const handleSaveDescription = () => {
        setIsSaving(true);
        setTimeout(() => {
            if (user) {
                const updatedUser = { ...user, profileDesc };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
            }
            setIsSaving(false);
            setIsEditing(false);
        }, 300);
    };

    if (!isReady) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-black">
                <div className="border-2 border-black px-8 py-6 bg-white text-base font-semibold tracking-wide">
                    Loading dashboard...
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white text-black overflow-y-auto">
            <div className="max-w-6xl mx-auto px-6 py-10">
                <section className="border-2 border-black bg-white p-8 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="text-xs tracking-[0.2em] uppercase text-black/70 mb-2">Dashboard</p>
                            <h1 className="text-4xl font-bold leading-tight">Welcome, {user.name}</h1>
                            <p className="text-sm text-black/70 mt-2">Account ID: {user.userId}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-6 py-3 border-2 border-black bg-black text-white font-semibold hover:bg-white hover:text-black transition"
                        >
                            Logout
                        </button>
                    </div>
                </section>

                <section className="border-2 border-black bg-white p-8 mb-6">
                    <div className="flex items-center justify-between gap-4 mb-4">
                        <h2 className="text-2xl font-bold">Profile Summary</h2>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 border-2 border-black bg-black text-white text-sm font-semibold hover:bg-white hover:text-black transition"
                            >
                                Edit
                            </button>
                        )}
                    </div>

                    {isEditing ? (
                        <div>
                            <textarea
                                value={profileDesc}
                                onChange={(e) => setProfileDesc(e.target.value)}
                                rows={4}
                                maxLength={200}
                                placeholder="Add a short professional summary"
                                className="w-full border-2 border-black bg-white px-4 py-3 text-black focus:outline-none"
                            />
                            <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <p className="text-sm text-black/70">{profileDesc.length}/200</p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleSaveDescription}
                                        disabled={isSaving}
                                        className="px-5 py-2 border-2 border-black bg-black text-white text-sm font-semibold disabled:opacity-60 hover:bg-white hover:text-black transition"
                                    >
                                        {isSaving ? "Saving..." : "Save"}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setProfileDesc(user.profileDesc || "");
                                        }}
                                        className="px-5 py-2 border-2 border-black bg-white text-black text-sm font-semibold hover:bg-black hover:text-white transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="border-2 border-black bg-neutral-50 p-5 min-h-28 flex items-center">
                            <p className="leading-relaxed text-black/90">
                                {profileDesc || "No profile summary added yet."}
                            </p>
                        </div>
                    )}
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Link
                        href="/create-post"
                        className="block border-2 border-black bg-white p-8 hover:bg-black hover:text-white transition"
                    >
                        <h3 className="text-2xl font-bold mb-2">Create Post</h3>
                        <p className="text-sm text-current/80">Write and publish a new post.</p>
                    </Link>

                    <Link
                        href="/explore"
                        className="block border-2 border-black bg-white p-8 hover:bg-black hover:text-white transition"
                    >
                        <h3 className="text-2xl font-bold mb-2">Explore</h3>
                        <p className="text-sm text-current/80">Read posts from other members.</p>
                    </Link>
                </section>

                <section className="border-2 border-black bg-white p-8">
                    <h2 className="text-2xl font-bold mb-4">Activity</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { value: "0", label: "Posts" },
                            { value: "0", label: "Comments" },
                            { value: "New", label: "Status" },
                        ].map((item) => (
                            <div key={item.label} className="border-2 border-black bg-neutral-50 p-6 text-center">
                                <div className="text-3xl font-bold mb-1">{item.value}</div>
                                <div className="text-sm uppercase tracking-wider text-black/70">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}