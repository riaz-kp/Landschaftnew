"use client";

import { useState, useTransition } from "react";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2, Lock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            try {
                const result = await login(formData);
                if (result?.error) {
                    setError(result.error);
                }
            } catch (err: any) {
                // Next.js redirect throws an error that should be caught or ignored
                // but usually the router handles it if not caught.
                // If it's a real error, we show it.
                if (err.message !== "NEXT_REDIRECT") {
                    setError("An unexpected error occurred. Please try again.");
                    console.error(err);
                }
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 font-sans">
            <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200 rounded-full blur-[100px]" />
            </div>

            <Card className="w-full max-w-md border-slate-200/60 shadow-xl backdrop-blur-sm bg-white/80 overflow-hidden relative z-10">
                <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

                <CardHeader className="space-y-4 pt-10 pb-6 text-center">
                    <div className="space-y-2">
                        <Link href="/admin" className="flex items-end justify-center gap-3 group">
                            <Image
                                src="/logo.svg"
                                alt="Landschaft Logo"
                                width={36}
                                height={36}
                                className="object-contain transition-opacity group-hover:opacity-80"
                            />
                            <CardTitle
                                className="text-2xl font-bold tracking-[0.05em] text-slate-900 uppercase transition-opacity group-hover:opacity-80 leading-none"
                                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                            >
                                LANDSCHAFT
                            </CardTitle>
                        </Link>
                        <CardDescription className="text-slate-500 font-medium tracking-wide">
                            Sign in to manage your workspace
                        </CardDescription>
                    </div>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                                <div className="h-1 w-1 bg-red-600 rounded-full shrink-0" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Username</Label>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Enter username"
                                    className="pl-10 h-11 bg-slate-50/50 border-slate-200 transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Password</Label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10 h-11 bg-slate-50/50 border-slate-200 transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="pt-2 pb-8 px-6">
                        <Button
                            type="submit"
                            className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-all shadow-md active:scale-[0.98] disabled:opacity-70"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            {/* <p className="fixed bottom-8 text-slate-400 text-xs font-medium tracking-widest uppercase">
                © 2024 Landschaft Agency
            </p> */}
        </div>
    );
}
