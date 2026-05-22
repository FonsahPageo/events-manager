import { getSession } from '@/lib/auth/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    return Response.json(session);
  } catch (error) {
    return Response.json({ error: 'Failed to get session' }, { status: 500 });
  }
}