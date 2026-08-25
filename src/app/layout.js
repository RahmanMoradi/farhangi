import "./globals.css";
import Script from "next/script";
import "tailwindcss/tailwind.css";
import GAHandler from "@/Components/GAHandler/GAHandler";
import { UserProvider } from "@/Context/UserContext";
import { CartProvider } from "@/Context/CartContext";
import { SessionProvider } from "@/Context/SessionContext";

export const metadata = {
  title: "Farhangi Store",
  description: "فروشگاه فرهنگی",
};

export default function RootLayout({ children }) {
  return (
    <html dir="rtl">
      <body className="bg-[#FFFFFF]">
        <UserProvider>
          <SessionProvider>
            <CartProvider>
              {children}
              <GAHandler />
            </CartProvider>
          </SessionProvider>
        </UserProvider>
      </body>
    </html>
  );
}