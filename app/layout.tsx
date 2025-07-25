import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import SmoothScrolling from '@/components/SmoothingScrolling'
import FontLoader from '@/components/loaders/FontLoader'
// import SpecificVideoLoader from '@/components/loaders/SpecificVideoLoader'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Velvet Pour',
    description: 'Cocktail Website by IsmailDX',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <SmoothScrolling>
                    <FontLoader />
                    {/* <SpecificVideoLoader targetId="video-desktop" /> */}
                    {children}
                </SmoothScrolling>
            </body>
        </html>
    )
}
