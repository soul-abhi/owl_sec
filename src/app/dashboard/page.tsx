"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Use setTimeout to avoid cascading renders
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/login");
            return;
        }
        const parsedUser = JSON.parse(userData);
        
        // Use a microtask to avoid cascading renders
        Promise.resolve().then(() => {
            setUser(parsedUser);
            setProfileDesc(parsedUser.profileDesc || "");
        });
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
        }, 800);
    };

    if (!user || !mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="text-6xl mb-4"
                    >
                        ⚡
                    </motion.div>
                    <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                        Loading your space...
                    </p>
                </motion.div>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring" as const, stiffness: 100 }
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
            {/* Animated Background Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.5, 0.3, 0.5],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 p-6 max-w-7xl mx-auto"
            >
                {/* Glassmorphic Header Card */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    className="backdrop-blur-xl bg-white/80 rounded-3xl shadow-2xl border border-white/20 p-8 mb-6 relative overflow-hidden"
                >
                    {/* Animated Gradient Border */}
                    <motion.div
                        animate={{
                            background: [
                                "linear-gradient(0deg, #8B5CF6, #3B82F6)",
                                "linear-gradient(180deg, #8B5CF6, #3B82F6)",
                                "linear-gradient(360deg, #8B5CF6, #3B82F6)",
                            ],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 opacity-20 blur-2xl"
                    />

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <motion.h1
                                    className="text-5xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600"
                                    animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                                >
                                    Welcome back, {user.name}!
                                </motion.h1>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <motion.p
                                        whileHover={{ scale: 1.05 }}
                                        className="text-gray-700 font-mono text-xl md:text-2xl font-bold px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full"
                                    >
                                        {user.userId}
                                    </motion.p>
                                    <motion.span
                                        animate={{
                                            boxShadow: [
                                                "0 0 20px rgba(34, 197, 94, 0.3)",
                                                "0 0 40px rgba(34, 197, 94, 0.6)",
                                                "0 0 20px rgba(34, 197, 94, 0.3)",
                                            ],
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold"
                                    >
                                        ● Online
                                    </motion.span>
                                </div>
                            </motion.div>
                            <motion.button
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLogout}
                                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                            >
                                Logout 👋
                            </motion.button>
                        </div>

                        {/* Profile Description Section */}
                        <motion.div
                            variants={itemVariants}
                            className="border-t border-purple-200/50 pt-6"
                        >
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                                <motion.span
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    💭
                                </motion.span>
                                Your Story
                            </h2>
                            <AnimatePresence mode="wait">
                                {isEditing ? (
                                    <motion.div
                                        key="editing"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        <textarea
                                            value={profileDesc}
                                            onChange={(e) => setProfileDesc(e.target.value)}
                                            className="w-full px-6 py-4 border-2 border-purple-300 rounded-2xl focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-200 transition text-black resize-none text-lg backdrop-blur-sm bg-white/70"
                                            rows={4}
                                            placeholder="Share what brings you to BIXBEE... What do you want to express?"
                                            maxLength={200}
                                        />
                                        <div className="flex justify-between items-center mt-3">
                                            <p className="text-sm text-gray-600 font-medium">{profileDesc.length}/200</p>
                                            <div className="flex gap-3">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={handleSaveDescription}
                                                    disabled={isSaving}
                                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 transition-all"
                                                >
                                                    {isSaving ? "✨ Saving..." : "💾 Save"}
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => {
                                                        setIsEditing(false);
                                                        setProfileDesc(user.profileDesc || "");
                                                    }}
                                                    className="px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-300 transition"
                                                >
                                                    Cancel
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="viewing"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.01 }}
                                            className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border-2 border-purple-200 mb-4 min-h-25 flex items-center"
                                        >
                                            <p className="text-gray-800 text-lg leading-relaxed">
                                                {profileDesc || "✨ You haven't shared your story yet. Click edit to let others know what brings you to BIXBEE!"}
                                            </p>
                                        </motion.div>
                                        <motion.button
                                            whileHover={{ scale: 1.05, rotate: 2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setIsEditing(true)}
                                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                                        >
                                            {profileDesc ? "✏️ Edit Story" : "✨ Add Your Story"}
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Action Cards */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                >
                    <Link href="/create-post">
                        <motion.div
                            whileHover={{
                                scale: 1.05,
                                rotate: 2,
                                boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.5)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="relative group cursor-pointer overflow-hidden rounded-3xl"
                        >
                            <motion.div
                                animate={{
                                    background: [
                                        "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
                                        "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                                        "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
                                    ],
                                }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="p-10 text-white relative z-10"
                            >
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="text-7xl mb-4"
                                >
                                    ✍️
                                </motion.div>
                                <h3 className="text-4xl font-bold mb-3">Create Post</h3>
                                <p className="text-purple-100 text-lg">Share your thoughts with the world</p>
                                <motion.div
                                    className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                            </motion.div>
                        </motion.div>
                    </Link>

                    <Link href="/explore">
                        <motion.div
                            whileHover={{
                                scale: 1.05,
                                rotate: -2,
                                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="relative group cursor-pointer overflow-hidden rounded-3xl backdrop-blur-xl bg-white/90 border border-white/20"
                        >
                            <div className="p-10 text-gray-800 relative z-10">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="text-7xl mb-4"
                                >
                                    🌍
                                </motion.div>
                                <h3 className="text-4xl font-bold mb-3">Explore</h3>
                                <p className="text-gray-600 text-lg">Discover what others are sharing</p>
                                <motion.div
                                    className="absolute -left-10 -top-10 w-40 h-40 bg-blue-200/30 rounded-full"
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                            </div>
                        </motion.div>
                    </Link>
                </motion.div>

                {/* Stats Card */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    className="backdrop-blur-xl bg-white/80 rounded-3xl shadow-2xl border border-white/20 p-8 overflow-hidden relative"
                >
                    <motion.div
                        animate={{
                            opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-blue-100/50"
                    />
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                            Your Activity 📊
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { value: "0", label: "Posts Created", color: "purple", emoji: "📝", from: "from-purple-400", to: "to-purple-600" },
                                { value: "0", label: "Comments", color: "blue", emoji: "💬", from: "from-blue-400", to: "to-blue-600" },
                                { value: "New", label: "Member Status", color: "green", emoji: "✨", from: "from-green-400", to: "to-emerald-600" },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: [0, 5, -5, 0],
                                        transition: { duration: 0.3 }
                                    }}
                                    className={`relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br ${stat.from} ${stat.to} text-white text-center group cursor-pointer`}
                                >
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                        className="text-4xl mb-3"
                                    >
                                        {stat.emoji}
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.2 }}
                                        className="text-5xl font-bold mb-2"
                                    >
                                        {stat.value}
                                    </motion.div>
                                    <div className="font-semibold text-white/90">{stat.label}</div>
                                    <motion.div
                                        className="absolute -right-5 -bottom-5 w-20 h-20 bg-white/20 rounded-full"
                                        animate={{ scale: [1, 1.5, 1] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}