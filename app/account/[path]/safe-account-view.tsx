"use client";

import React, { useEffect, useState } from "react";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("AccountView crash - full error:", error);
    console.error("Component stack:", info.componentStack);
  }
  render() {
    if (this.state.hasError) {
      console.debug("AccountView error details:", this.state.error?.message, "\nStack:", this.state.error?.stack);
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function SafeAccountView({ path }: { path: string }) {
  const [AccountView, setAccountView] = useState<React.ComponentType<{ path: string }> | null>(null);

  useEffect(() => {
    import("@neondatabase/auth/react").then((mod) => {
      setAccountView(() => mod.AccountView);
    });
  }, []);

  if (!AccountView) {
    return <div className="h-48 animate-pulse bg-gray-100 rounded-lg" />;
  }

  return (
    <ErrorBoundary
      fallback={
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted mb-4">Could not load account settings. Check the browser console for details.</p>
        </div>
      }
    >
      <AccountView path={path} />
    </ErrorBoundary>
  );
}
