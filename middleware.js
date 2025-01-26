// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const response = NextResponse.next(); // Continue processing the request

  // Add CORS headers to the response
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return response;
}

// Optional: Matcher to apply middleware to specific paths
export const config = {
  matcher: "/api/:path*", // Apply middleware to all paths under /api
};
