"use server";

import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function login(formData: FormData) {
    const username = (formData.get("username") as string)?.trim();
    const password = (formData.get("password") as string)?.trim();

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (username !== adminUsername) {
        return { error: "Invalid credentials" };
    }

    if (!adminPasswordHash) {
        return { error: "Authentication configuration error" };
    }



    try {
        const isValid = await bcrypt.compare(password, adminPasswordHash);
        if (!isValid) {
            return { error: "Invalid credentials" };
        }
    } catch (err: any) {
        console.log(err)
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
