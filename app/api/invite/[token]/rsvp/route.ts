import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { RsvpStatus } from "@/app/generated/prisma/enums";

const RSVP_STATUSES = ["going", "maybe", "not_going"] as const;

function isRsvpStatus(s: string): s is RsvpStatus {
    return (RSVP_STATUSES as readonly string[]).includes(s);
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ token: string }> }
) {
    const { token } = await params;
    const formData = await request.formData();

    const name = String(formData.get("name") ?? "").trim();
    if (name.length < 2 || name.length > 120) {
        return NextResponse.json({ error: "Name must be between 2 and 120 characters." }, { status: 400 });
    }

    const email = String(formData.get("email") ?? "").trim();
    if (email.length < 3 || email.length > 120 || !email.includes("@")) {
        return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    const status = String(formData.get("status") ?? "").trim();
    if (!isRsvpStatus(status)) {
        return NextResponse.json({ error: "Invalid RSVP status." }, { status: 400 });
    }

    const invite = await prisma.eventInvite.findFirst({
        where: { token },
        select: {
            id: true,
            event: {
                select: { id: true },
            },
        },
    });

    if (!invite) {
        return NextResponse.json({ error: "Invite link is invalid" }, { status: 404 });
    }

    const eventId = invite.event.id;
    const emailNormalized = email.toLowerCase();

    await prisma.eventRsvp.upsert({
        where: {
            eventId_emailNormalized: {
                eventId,
                emailNormalized,
            },
        },
        create: {
            eventId,
            inviteId: invite.id,
            name,
            email,
            emailNormalized,
            status: status as RsvpStatus,
        },
        update: {
            name,
            status: status as RsvpStatus,
            respondedAt: new Date(),
        },
    });

    return NextResponse.json({ success: true });
}
