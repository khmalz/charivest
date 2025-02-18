import { cookies } from "next/headers";
import { decrypt } from "@/app/_lib/session";
import { cache } from "react";

export const verifySession = cache(async () => {
   const cookie = (await cookies()).get("session")?.value;
   const session = await decrypt(cookie);

   if (!session || !session.address || new Date(session.expiresAt) < new Date()) {
      return { isAuth: false, address: null };
   }

   return { isAuth: true, address: session.address };
});
