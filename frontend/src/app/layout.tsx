import type { Metadata } from 'next'
import Layout from '@/components/layout';
import "./index.css";

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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div id="root">
          <Layout>
            {children}
          </Layout>
        </div>
      </body>
    </html>
  );
}
