import Link from "next/link";
import { Button } from "./ui/button";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export async function DashboardContent({ userId }: { userId: string }) {

    const rows = await prisma.event.findMany({
        where: { ownerUserId: userId },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            title: true,
            eventDate: true,
            location: true,
            // rsvps: {select: { status: true}},
        },
    });

    const events = rows.map((e) => ({
        id: e.id,
        title: e.title,
        eventDate: e.eventDate ? e.eventDate.toISOString() : null,
        location: e.location,
    }));

    return <div className="flex flex-1 flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Your Events</h1>
                <p className="text-sm text-muted-foreground">
                    Track attendee responses and manage invite links
                </p>
            </div>

            <Button asChild>
                <Link href={"/events/new"}>Create Event</Link>
            </Button>
        </div>

        {/* list of events */}

        {events.length === 0 ? (
            <Card>
                <CardHeader>
                    <CardTitle>No Events yet</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Create your first event to sart collecting RSVPs.
                    </p>
                </CardContent>
            </Card>
        ) : (
            <div className="grid gap-4 md:grid-cols-2">
                {events.map((event) => (
                    <Card key={event.id}>
                        <CardHeader className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                                <CardTitle className="text-lg">
                                    {event.title}
                                </CardTitle>
                                <Button asChild size="sm">
                                    <Link href={`/events/${event.id}`}>Open</Link>
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <Badge variant="secondary" />
                                <Badge variant="secondary" />
                                <Badge variant="secondary" />
                            </div>
                            <p>
                                {event.eventDate
                                    ? new Date(event.eventDate).toLocaleString()
                                    : "No date selected"}
                                {event.location ? ` - ${event.location}` : ""}
                            </p>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        )}
    </div>
}