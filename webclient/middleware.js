import { NextResponse } from "next/server";
import { verifySession } from "./app/lib/dal";

const protectedRoutes = ["/dashboard", "/campaign"];
const publicRoutes = ["/"];

export default async function middleware(req) {
   const path = req.nextUrl.pathname;
   console.log("path", path);

   const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
   const isPublicRoute = publicRoutes.includes(path);

   const { isAuth, _ } = await verifySession();

   console.log("isAuth", isAuth);
   if (isProtectedRoute && !isAuth) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
   }

   return NextResponse.next();
}

export const config = {
   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
