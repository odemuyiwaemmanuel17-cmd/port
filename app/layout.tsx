import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Odemuyiwa Emmanuel | Full-Stack & Mobile Developer',
    description: 'Production-ready developer portfolio showcasing performant web apps, mobile systems, and modern UI engineering.',
    keywords: ['Next.js', 'React', 'TypeScript', 'Flutter', 'Tailwind CSS', 'Full-Stack Developer', 'Portfolio'],
    authors: [{ name: 'Odemuyiwa Emmanuel' }],
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark scroll-smooth">
            <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
                <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0 opacity-50" />
                <div className="fixed top-0 right-0 h-[480px] w-[480px] rounded-full bg-cyan-500/5 blur-[140px] pointer-events-none -z-10" />
                <div className="relative z-10">
                    {children}
                </div>
            </body>
        </html>
    );
}