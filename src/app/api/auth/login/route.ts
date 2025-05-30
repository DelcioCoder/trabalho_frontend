import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const apiRes = await fetch('http://localhost:8000/auth/api/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!apiRes.ok) {
    const err = await apiRes.json();
    return NextResponse.json({ message: err.detail || 'Credenciais inválidas' }, { status: 401 });
  }

  const { access, refresh } = await apiRes.json();

  const res = NextResponse.json({ success: true });
  // define cookies HttpOnly (só o servidor os vê)
  res.cookies.set('accessToken', access, {
    httpOnly: true,
    path: '/',          // aplica a todo o site
    maxAge: 60 * 60 * 24, // 24 horas
  });
  res.cookies.set('refreshToken', refresh, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });

  return res;
}
