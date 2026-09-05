import type { Metadata } from 'next';
import { Space_Grotesk, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
    display: 'swap',
});

const manrope = Manrope({
    subsets: ['latin'],
    variable: '--font-manrope',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Odemuyiwa Emmanuel | Full-Stack & Mobile Developer',
    description: 'Production-ready developer portfolio showcasing high-performance web apps, resilient mobile systems with Flutter, and modern UI engineering.',
    keywords: ['Next.js', 'React', 'TypeScript', 'Flutter', 'Dart', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Full-Stack Developer', 'Odemuyiwa Emmanuel', 'Portfolio'],
    authors: [{ name: 'Odemuyiwa Emmanuel', url: 'https://github.com/odemuyiwaemmanuel17-cmd' }],
    creator: 'Odemuyiwa Emmanuel',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://github.com/odemuyiwaemmanuel17-cmd',
        title: 'Odemuyiwa Emmanuel | Full-Stack & Mobile Developer',
        description: 'Building high-performance web applications, fluid mobile experiences, and scalable systems.',
        siteName: 'Odemuyiwa Emmanuel Portfolio',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Odemuyiwa Emmanuel | Full-Stack & Mobile Developer',
        description: 'Building high-performance web applications, fluid mobile experiences, and scalable systems.',
        creator: '@odemuyiwa_dev',
    },
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`dark scroll-smooth ${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
            <body className="min-h-screen bg-[#080a0c] text-paper font-sans antialiased selection:bg-acid selection:text-ink">
                {/* Refined Ambient Lighting */}
                <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0 opacity-40" />
                <div className="fixed top-0 right-1/4 h-[500px] w-[500px] rounded-full bg-acid/5 blur-[160px] pointer-events-none -z-10" />
                <div className="fixed bottom-1/4 left-10 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[180px] pointer-events-none -z-10" />
                <div className="relative z-10">
                    {children}
                </div>
            </body>
        </html>
    );
}