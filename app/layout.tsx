import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'TecnoAI — Your business in an app',
    description: 'TecnoAI builds practical web apps that centralize your operation—so you stop losing time, tasks, and clients.',
    icons: {
        icon: '/favicon.ico',
    },
    manifest: '/manifest.json',
    openGraph: {
        title: 'TecnoAI',
        description: 'Turn business chaos into a real system.',
        type: 'website',
        url: 'https://tecnoai.org',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <LanguageProvider>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </LanguageProvider>
            </body>
        </html>
    );
}
