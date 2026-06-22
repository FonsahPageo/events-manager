import { auth } from "@/lib/auth/server";
import EventDetailContent from "@/components/event-detail-content";

export default async function EventDetailsPage({
    params,
}: {
    params: Promise<{ eventId: string }>;
}) {
    const { eventId } = await params;
    const session = await auth.getSession();
    return <EventDetailContent userId={session.data?.user.id || ""} eventId={eventId} />;
} 