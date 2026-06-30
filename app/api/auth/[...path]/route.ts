import { auth } from "@/lib/auth/server";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/server";

// Export Neon auth handlers for all routes except get-session
export async function GET(request: NextRequest, context: any) {
    const pathname = new URL(request.url).pathname;

    // Handle get-session requests here instead of delegating to Neon
    if (pathname === "/api/auth/get-session") {
        try {
            const { data: session } = await getSession();
            return NextResponse.json(session);
        } catch (error) {
            console.error('[GET /api/auth/get-session] Error:', error);
            return NextResponse.json(
                { error: 'Failed to get session' },
                { status: 500 }
            );
        }
    }

    // Delegate all other routes to Neon auth handler
    const handlers = auth.handler();
    return handlers.GET(request, context);
}

export const { POST, PUT, PATCH, DELETE } = auth.handler();