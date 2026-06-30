import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { notFound } from "next/navigation";
import { RsvpForm } from "./rsvp-form";
import { submitOrUpdateRsvpAction } from "@/lib/actions/events";

export async function InviteRsvpContent({
  token,
  submitted
}: {
  token: string;
  submitted?: boolean;
}) {
  const row = await prisma.eventInvite.findFirst({
    where: { token },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          description: true,
          location: true,
          eventDate: true
        },
      },
    },
  });

  if (!row) {
    notFound();
  }

  const e = row.event;
  const event = {
    title: e.title,
    description: e.description,
    location: e.location,
    eventDate: e.eventDate ? e.eventDate.toISOString() : null,
  };

  const submitRsvpForToken = submitOrUpdateRsvpAction.bind(
    null,
    token
  );

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader className="space-y-3">
          <Badge variant="secondary" className="w-fit">
            RSVP
          </Badge>

          <CardTitle>
            {event.title}
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            {event.eventDate
              ? new Date(event.eventDate).toLocaleString()
              : "No date selectefd"
            }
            {event.location ? ` - ${event.location}` : ""}
          </p>
          {event.description ? (
            <p className="text-sm text-muted-foreground">{event.description}</p>
          ) : null}
        </CardHeader>
        <CardContent>
          {submitted ? (
            <p>Thanks. Your RSVP has been recorded (or updated)</p>
          ) : null}
          <RsvpForm token={token} />
        </CardContent>
      </Card>
    </div>
  );
}
