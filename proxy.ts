import { auth } from "@/lib/auth/server";
import { NextRequest, NextResponse } from "next/server";

export default auth.middleware({
    // redirects unauthenticated users to the sign-in page
    loginUrl: "/auth/sign-in",
});

export const config = {
    matcher: [
        // Protected routes requiring authentication
        "/dashboard",
    ],
};