"use client"

import { Button } from "./ui/button";
import { FormField } from "@/components/ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";

export function RsvpForm({ token }: { token: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch(`/api/invite/${token}/rsvp`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to submit RSVP');
            }

            window.location.href = `/invite/${token}?submitted=1`;
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit RSVP');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormField>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                />
            </FormField>
            <FormField>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@domain.com"
                />
            </FormField>
            <FormField>
                <Label htmlFor="status">Attendance</Label>
                <select
                    id="status"
                    name="status"
                    required
                    defaultValue="going"
                    className="flex h-10 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3"
                >
                    <option value="going">Going</option>
                    <option value="maybe">Maybe</option>
                    <option value="not_going">Not going</option>
                </select>
            </FormField>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit RSVP'}
            </Button>
        </form>
    );
}
