import "./globals.css";

export const metadata = {
  title: "Next.js Workshop",
  description: "A hands-on workshop by GDG VITC",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={"antialiased bg-black"}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
