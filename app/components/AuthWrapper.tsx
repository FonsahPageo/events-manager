'use client';

import dynamic from "next/dynamic";
import { authClient } from "@/lib/auth/client";
import { useEffect, useState } from "react";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false);
    const [NeonProvider, setNeonProvider] = useState<any>(null);
    const [UserButtonComponent, setUserButtonComponent] = useState<any>(null);

    useEffect(() => {
        setIsClient(true);

        // dynamically import on the client
        import('@neondatabase/auth/react').then((mod) => {
            setNeonProvider(() => mod.NeonAuthUIProvider);
            setUserButtonComponent(() => mod.UserButton);
        });
    }, []);

    // return children without auth wrapper on server
    if (!isClient || !NeonProvider) {
        return <>{children}</>;
    }

    // render with the provider once on client
    const Provider = NeonProvider;
    return (
        <div suppressHydrationWarning>
            <Provider authClient={authClient as any}>
                {children}
            </Provider>
        </div>
    );
}

// export a separate component for UserButton
export function ClientUserButton(props: any) {
    const [isClient, setIsClient] = useState(false);
    const [UserButtonComponent, setUserButtonComponent] = useState<any>(null);

    useEffect(() => {
        setIsClient(true);
        import('@neondatabase/auth/react').then((mod) => {
            setUserButtonComponent(() => mod.UserButton);
        });
    }, []);

    if (!isClient || !UserButtonComponent) {
        return <div className="h-9 w-9 animate-pulse bg-gray-200 rounded-full" />
    }

    const UserButton = UserButtonComponent;
    return <UserButton {...props} />;
};