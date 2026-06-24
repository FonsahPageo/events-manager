import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ eventId: string }> }
) {
    const { eventId } = await params;
    const session = await auth.getSession();
    const userId = session.data?.user.id;

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ownedByUser = await prisma.event.findFirst({
        where: { id: eventId, ownerUserId: userId },
        select: { id: true },
    });

    if (!ownedByUser) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const token = crypto.randomUUID().replace(/-/g, "");

    await prisma.eventInvite.upsert({
        where: { eventId },
        create: { eventId, token },
        update: { token }
    });

    return NextResponse.json({ success: true });
}
