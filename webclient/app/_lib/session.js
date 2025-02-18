import { cookies } from "next/headers";
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key";

export function encrypt(data) {
   return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

export function decrypt(encryptedData) {
   try {
      if (!encryptedData) {
         console.error("No encrypted data provided.");
         return null;
      }

      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedData) {
         console.error("Decryption failed: no valid decrypted data.");
         return null;
      }

      return JSON.parse(decryptedData);
   } catch (err) {
      console.error("Failed to decrypt session:", err);
      return null;
   }
}

export async function createSession(address) {
   const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
   const sessionData = encrypt({ address, expiresAt });
   const cookiesSet = await cookies();

   cookiesSet.set("session", sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
   });

   console.log("Login");
}

export async function deleteSession() {
   const cookiesSet = await cookies();

   cookiesSet.delete("session");

   console.log("Logout");
}
