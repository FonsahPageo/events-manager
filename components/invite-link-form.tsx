"use client"

import { Button } from "./ui/button";
import { useState } from "react";

export function InviteLinkForm({ eventId }: { eventId: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`/api/events/${eventId}/invite`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to generate invite link');
            }

            window.location.href = `/events/${eventId}`;
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to generate invite link');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Link'}
            </Button>
        </form>
    );
}
