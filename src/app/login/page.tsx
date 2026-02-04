"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [userName, setUserName] = useState("");
    const [enPass, setEnPass] = useState("");
    // const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login with:", { userName, enPass });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border-2 border-black">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">BIXBEE</h1>
                    <p className="text-gray-600">Thoughts Not Profile</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="userName" className="block text-sm font-bold mb-2 text-gray-700">
                            UserName
                        </label>
                        <input
                            type="text"
                            id="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none transition text-black"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="enPass" className="block text-sm font-bold mb-2 text-gray-700">
                            EnPass
                        </label>
                        <input
                            type="password"
                            id="enPass"
                            value={enPass}
                            onChange={(e) => setEnPass(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-black focus:outline-none transition text-black"
                            placeholder="Enter your encrypted password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition duration-200 mt-8"
                    >
                        Connect
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        New user?{" "}
                        <a href="#" className="text-black font-bold hover:underline">
                            Join BIXBEE
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
