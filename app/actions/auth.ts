"use server";

import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function login(formData: FormData) {
    const username = (formData.get("username") as string)?.trim();
    const password = (formData.get("password") as string);

    const adminUsername = process.env.ADMIN_USERNAME?.trim();
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH?.trim();

    console.log("--- Login Attempt DEBUG ---");
    console.log("Username provided:", username);
    console.log("Admin Username defined:", adminUsername);
    console.log("Hash present in env:", !!adminPasswordHash);

    if (username !== adminUsername) {
        console.log("Result: Username mismatch");
        return { error: `Invalid username (Got: ${username})` };
    }

    if (!adminPasswordHash) {
        console.log("Result: MISSING HASH ENV");
        return { error: "Configuration Error: ADMIN_PASSWORD_HASH not found in env" };
    }

    try {
        const isValid = await bcrypt.compare(password, adminPasswordHash);
        console.log("Result: Password valid check:", isValid);

        if (!isValid) {
            return { error: "Invalid password" };
        }
    } catch (err: any) {
        console.error("Bcrypt error:", err);
        return { error: "Authentication system error" };
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
