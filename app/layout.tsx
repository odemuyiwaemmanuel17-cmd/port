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
    title: 'Emmanuel Odemuyiwa | Aerospace Engineering & Full-Stack / Mobile Developer',
    description: 'Portfolio of Emmanuel Odemuyiwa — Aerospace Engineering Undergraduate & Full-Stack/Mobile Developer. Building high-performance web platforms, Flutter mobile apps, and CAD systems.',
    keywords: [
        'Emmanuel Odemuyiwa',
        'Aerospace Engineering',
        'Full-Stack Developer',
        'Mobile Developer',
        'Flutter',
        'React',
        'Next.js',
        'TypeScript',
        'Node.js',
        'Supabase',
        'CAD Modeling',
        'Onshape',
        'FreeCAD',
        'Portfolio',
    ],
    authors: [{ name: 'Emmanuel Odemuyiwa', url: 'https://github.com/odemuyiwaemmanuel17-cmd' }],
    creator: 'Emmanuel Odemuyiwa',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://github.com/odemuyiwaemmanuel17-cmd',
        title: 'Emmanuel Odemuyiwa | Aerospace Engineering & Full-Stack / Mobile Developer',
        description: 'Aerospace Engineering meets Full-Stack & Mobile Software. Parametric 3D CAD modeling, modern AI/web technology, and performant digital systems.',
        siteName: 'Emmanuel Odemuyiwa Portfolio',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Emmanuel Odemuyiwa | Aerospace Engineering & Full-Stack Developer',
        description: 'Aerospace Engineering meets Full-Stack & Mobile Software.',
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
            <body className="min-h-screen bg-[#090d16] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-white">
                {/* Cybernetic Background Grid & Telemetry Glows */}
                <div className="fixed inset-0 bg-cyber-grid pointer-events-none z-0 opacity-60" />
                <div className="fixed top-0 left-1/2 -translate-x-1/2 h-[550px] w-full max-w-7xl bg-radial-glow pointer-events-none -z-10" />
                <div className="fixed top-20 right-10 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none -z-10 animate-pulse-slow" />
                <div className="fixed bottom-1/3 left-10 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[180px] pointer-events-none -z-10" />
                <div className="fixed bottom-10 right-1/4 h-[350px] w-[350px] rounded-full bg-purple-600/10 blur-[160px] pointer-events-none -z-10" />
                
                <div className="relative z-10">
                    {children}
                </div>
            </body>
        </html>
    );
}