"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [secretPhrase, setSecretPhrase] = useState<string | null>(null);
    const [generatedUserId, setGeneratedUserId] = useState<string>("");
    const router = useRouter();

    const generateUserId = () => {
        const digits1 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        const letters = String.fromCharCode(
            65 + Math.floor(Math.random() * 26),
            65 + Math.floor(Math.random() * 26)
        );
        const digits2 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        return `#${digits1}${letters}${digits2}`;
    };

    const generateSecretPhrase = () => {
        const words = ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel',
            'india', 'juliet', 'kilo', 'lima', 'mike', 'november', 'oscar', 'papa'];
        const phrase = [];
        for (let i = 0; i < 6; i++) {
            phrase.push(words[Math.floor(Math.random() * words.length)]);
        }
        return phrase.join('-');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        setLoading(true);

        // Mock signup
        setTimeout(() => {
            const userId = generateUserId();
            const phrase = generateSecretPhrase();
            setGeneratedUserId(userId);
            setSecretPhrase(phrase);
            setLoading(false);
        }, 1500);
    };

    const handleDownload = () => {
        if (!secretPhrase) return;

        const element = document.createElement("a");
        const file = new Blob(
            [`BIXBEE SECRET RECOVERY PHRASE\n\nUser ID: ${generatedUserId}\nName: ${name}\n\nSecret Phrase: ${secretPhrase}\n\n⚠️ IMPORTANT: Keep this phrase safe!\nThis is the ONLY way to recover your account if you forget your password.\n\n- Never share this phrase with anyone\n- Store it in a secure location\n- We cannot recover it for you\n\nWelcome to BIXBEE - Thoughts Not Profile`],
            { type: "text/plain" }
        );
        element.href = URL.createObjectURL(file);
        element.download = `bixbee-recovery-${generatedUserId}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const handleContinue = () => {
        router.push("/login");
    };

    if (secretPhrase) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'lab(97.1626% 2.99937 -4.13398)' }}>
                <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl border-4 border-black">
                    <div className="text-center mb-8">
                        <div className="text-7xl mb-4">🎉</div>
                        <h1 className="text-4xl font-bold mb-3 font-[cursive]">Welcome to BIXBEE!</h1>
                        <p className="text-gray-600 text-lg">Your account has been created</p>
                    </div>

                    <div className="bg-linear-to-br from-purple-100 to-blue-100 border-4 border-purple-500 p-6 rounded-2xl mb-6">
                        <div className="text-center mb-4">
                            <p className="text-sm text-gray-600 mb-2">Your User ID</p>
                            <p className="text-4xl font-bold font-mono text-purple-700">{generatedUserId}</p>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border-4 border-yellow-500 p-6 rounded-2xl mb-6">
                        <div className="flex items-start gap-3 mb-4">
                            {/* <span className="text-3xl">⚠️</span> */}
                            <div>
                                <h2 className="text-xl font-bold text-yellow-800 mb-2">
                                    Save Your Secret Recovery Phrase
                                </h2>
                                <p className="text-yellow-700 text-sm">
                                    This phrase is the <span className="font-bold">ONLY way</span> to recover your account if you forget your password.
                                    We cannot recover it for you!
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-white p-5 rounded-xl border-3 border-yellow-400 mb-4">
                            <p className="font-mono text-center text-xl font-bold break-all text-gray-800">
                                {secretPhrase}
                            </p>
                        </div>
                        
                        <button
                            onClick={handleDownload}
                            className="w-full py-4 bg-yellow-500 text-white font-bold rounded-xl hover:bg-yellow-600 transition duration-200 shadow-lg text-lg"
                        >
                            📥 Download Recovery Phrase
                        </button>
                    </div>

                    <button
                        onClick={handleContinue}
                        className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition duration-200 shadow-lg text-lg"
                    >
                        Continue to Login →
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'lab(97.1626% 2.99937 -4.13398)' }}>
            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border-4 border-black">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold mb-3 font-[cursive]">Join BIXBEE</h1>
                    <p className="text-gray-600 text-lg">Express Yourself Anonymously</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 border-3 border-red-500 text-red-700 px-4 py-3 rounded-2xl text-center font-semibold">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-5 py-4 border-3 border-gray-300 rounded-2xl focus:border-black focus:outline-none transition text-black text-lg"
                            placeholder="Enter your name"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-2 ml-1">This will be visible to others</p>
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
                            placeholder="Create a strong password"
                            required
                            minLength={8}
                        />
                        <p className="text-xs text-gray-500 mt-2 ml-1">At least 8 characters</p>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-bold mb-2 text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-5 py-4 border-3 border-gray-300 rounded-2xl focus:border-black focus:outline-none transition text-black text-lg"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-black text-white font-bold rounded-2xl hover:bg-gray-800 transition duration-200 text-lg disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link href="/login" className="text-black font-bold hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}