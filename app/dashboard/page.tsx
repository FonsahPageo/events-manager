import { DashboardContent } from "@/components/dashboard-content";
import { getSession } from "@/lib/auth/server";
import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const {data: session} = await auth.getSession();

    if(!session?.user) {
        return <div>Not Authenticated</div>
    }
    
    return <DashboardContent userId={session.user.id} />
} 