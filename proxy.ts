import { auth } from "@/lib/auth/server";

export default auth.middleware({
    // redirects unauthenticated users to the sign-in page
    loginUrl: "/auth/sign-in",
});

export const config = {
    matcher: [
        // Protected roiutes requiring authentication
        "/account/:path*",
    ],
};