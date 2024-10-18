// app/layout.tsx
import Login from "./login/login"
export const metadata = {
  title: 'My Next.js App',
  description: 'A simple Next.js app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body><Login></Login></body>
    </html>
  );
}
