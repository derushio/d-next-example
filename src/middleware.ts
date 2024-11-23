import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

/**
 * リクエストURL
 */
export const HEADER_URL = 'x-url';

/**
 * リクエストPATH
 */
export const HEADER_PATH = 'x-url-path';

/**
 * 全体に関わるmiddleware
 */
export async function middleware(req: NextRequest) {
  // リクエストURLをServer Componentから取得するためのヘッダ
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(HEADER_URL, req.url);
  requestHeaders.set(HEADER_PATH, new URL(req.url).pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
