import { auth } from '@/lib/auth/server';

export async function GET() {
  try {
    const { data: session } = await auth.getSession();
    return Response.json(session);
  } catch (error) {
    console.error('[GET /api/auth/get-session] Error:', error);
    return Response.json(
      { error: 'Failed to get session' },
      { status: 500 }
    );
  }
}