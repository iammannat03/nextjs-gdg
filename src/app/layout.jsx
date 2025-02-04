import { ClientSessionProvider } from "@/providers/session-provider"
import "./globals.css";
import Sidebar from "../components/Sidebar"

export const metadata = {
  title: "Next.js Workshop",
  description: "A hands-on workshop by GDG VITC",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClientSessionProvider>
        <body
          className={"antialiased bg-black flex min-h-screen overflow-hidden"}
          suppressHydrationWarning
        >
        <Sidebar />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        </body>
      </ClientSessionProvider>
    </html>
  );
}
