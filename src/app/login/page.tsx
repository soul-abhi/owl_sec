"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Mock login for UI testing
        setTimeout(() => {
            if (userId === "#00AA00" && password === "Abhi9837@#") {
                localStorage.setItem("user", JSON.stringify({
                    id: "1",
                    userId: "#00AA00",
                    name: "Abhishek",
                    profileDesc: "Creator of BIXBEE"
                }));
                router.push("/dashboard");
            } else {
                setError("Invalid credentials. Use #00AA00 / Abhi9837@# for demo.");
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'lab(97.1626% 2.99937 -4.13398)' }}>
            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border-4 border-black">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold mb-3 font-[cursive]">BIXBEE</h1>
                    <p className="text-gray-600 text-lg">Thoughts Not Profile</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 border-3 border-red-500 text-red-700 px-4 py-3 rounded-2xl text-center font-semibold">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="userId" className="block text-sm font-bold mb-2 text-gray-700">
                            User ID
                        </label>
                        <input
                            type="text"
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value.toUpperCase())}
                            className="w-full px-5 py-4 border-3 border-gray-300 rounded-2xl focus:border-black focus:outline-none transition text-black font-mono text-lg font-bold"
                            placeholder="#00AA00"
                            required
                            maxLength={8}
                        />
                        {/* <p className="text-xs text-gray-500 mt-2 ml-1">Format: #00AA00 to #99ZZ99</p> */}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-bold mb-2 text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-4 border-3 border-gray-300 rounded-2xl focus:border-black focus:outline-none transition text-black text-lg"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <Link href="/forgot-password" className="text-sm text-gray-600 hover:text-black font-semibold hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-black text-white font-bold rounded-2xl hover:bg-gray-800 transition duration-200 text-lg disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                        {loading ? "Connecting..." : "Connect"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        New to BIXBEE?{" "}
                        <Link href="/signup" className="text-black font-bold hover:underline">
                            Join Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}