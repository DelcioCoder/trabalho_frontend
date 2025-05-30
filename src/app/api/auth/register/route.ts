import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const { username, email, password, password2 } = await request.json();

    const apiRes = await fetch('http://localhost:8000/auth/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, password2 }),
    })

    if(!apiRes.ok) {
        const err = await apiRes.json();
        return NextResponse.json({ message: err.detail || 'Erro ao registrar usuário' }, { status: 400 });
    }

    const res = NextResponse.json({ success: true });
    return res;


}