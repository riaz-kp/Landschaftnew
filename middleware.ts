import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

// Add protection for /admin routes
const protectedRoutes = ["/admin"];
const publicRoutes = ["/login", "/admin/login"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route)) && !publicRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = req.cookies.get("session")?.value;
    const session = cookie ? await decrypt(cookie).catch(() => null) : null;

    // 1. Redirect to /login if the user is not authenticated and trying to access a protected route
    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // 2. Redirect to /admin if the user is authenticated and trying to access a public route (like /login)
    if (isPublicRoute && session && !path.startsWith("/admin/logout")) {
        return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
