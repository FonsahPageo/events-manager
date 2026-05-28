declare module "@/components/ui/form" {
    import * as React from "react";
    export function Form(props: React.ComponentProps<"form">): JSX.Element;
    export function FormField(props: React.ComponentProps<"div">): JSX.Element;
    export function FormMessage(props: React.ComponentProps<"div">): JSX.Element;
}
