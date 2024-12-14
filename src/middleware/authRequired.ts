// middleware/auth.js
import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';
import { NextRequest, NextResponse } from 'next/server';

export default withMiddlewareAuthRequired(async  (req: NextRequest) => {
  const session = await getSession(req); 
  // ... you can access session.user here
  return NextResponse.next();
});

export const config = {
  matcher: '/admin/:path*', 
};