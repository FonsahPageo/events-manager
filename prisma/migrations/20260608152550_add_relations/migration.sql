-- AddForeignKey
ALTER TABLE "events_rsvps" ADD CONSTRAINT "events_rsvps_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_rsvps" ADD CONSTRAINT "events_rsvps_invite_id_fkey" FOREIGN KEY ("invite_id") REFERENCES "event_invites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
