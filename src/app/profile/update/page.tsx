"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Loader2, ArrowLeft } from "lucide-react";
import { useSession, updateUser } from "@/lib/auth-client";

const UpdateProfilePage = () => {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isPending && !session) {
            toast.error("সাইন ইন করুন");
            router.push("/signin");
        }
    }, [session, isPending, router]);

    useEffect(() => {
        if (session?.user.name) setName(session.user.name);
    }, [session?.user.name]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim().length < 2) {
            toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
            return;
        }
        setLoading(true);
        try {
            const res = await updateUser({ name: name.trim() });
            if (res?.error) {
                toast.error(res.error.message || "আপডেট ব্যর্থ হয়েছে");
            } else {
                toast.success("তথ্য আপডেট হয়েছে!");
                router.push("/profile");
                router.refresh();
            }
        } catch {
            toast.error("আপডেট ব্যর্থ হয়েছে");
        } finally {
            setLoading(false);
        }
    };

    if (isPending || !session) {
        return (
            <div className="max-w-md mx-auto px-4 py-12">
                <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto px-4 py-12">
            <Link
                href="/profile"
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-700 mb-4"
            >
                <ArrowLeft className="w-3.5 h-3.5" /> প্রোফাইলে ফিরে যান
            </Link>
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <h1 className="text-xl font-bold text-gray-800 mb-4">
                    তথ্য আপডেট করুন
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                            আপনার নাম
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        তথ্য আপডেট করুন
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfilePage;