import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const subdomain = host.split('.')[0];

  // Attach the subdomain as a header or URL parameter
  const response = NextResponse.next();
  response.headers.set('x-subdomain', subdomain);

  return response;
}
