import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const res = NextResponse.redirect(new URL('/auth/login', request.url));

  // Remove os cookies de autenticação
  res.cookies.delete('accessToken', { path: '/' });
  res.cookies.delete('refreshToken', { path: '/' });

  return res;
}
