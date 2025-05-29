import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Monarch',
  description: 'Kanban App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en dark">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
