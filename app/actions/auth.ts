"use server";

import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    const username = (formData.get("username") as string)?.trim();
    const password = (formData.get("password") as string)?.trim();

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (username !== adminUsername) {
        return { error: "Invalid credentials" };
    }

    if (!adminPassword) {
        return { error: "Authentication configuration error" };
    }

    if (password !== adminPassword) {
        return { error: "Invalid credentials" };
    }

    // Create the session
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
    const session = await encrypt({ username, expires });

    // Save the session in a cookie
    (await cookies()).set("session", session, {
        expires,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });

    redirect("/admin");
}

export async function logout() {
    // Destroy the session
    (await cookies()).set("session", "", { expires: new Date(0), path: "/" });
    redirect("/login");
}
