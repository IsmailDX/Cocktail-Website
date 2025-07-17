'use client'

import { useEffect, useState } from 'react'
import { Loader } from 'lucide-react'

export default function FontLoader() {
    const [fontsLoaded, setFontsLoaded] = useState(false)
    const [hide, setHide] = useState(false)

    useEffect(() => {
        const loadFonts = async () => {
            if (document.fonts) {
                await document.fonts.ready
                setFontsLoaded(true)
            }
        }

        loadFonts()
    }, [])

    useEffect(() => {
        if (fontsLoaded) {
            const timeout = setTimeout(() => setHide(true), 100)
            return () => clearTimeout(timeout)
        }
    }, [fontsLoaded])

    if (hide) return null

    return (
        <div
            className={`fixed inset-0 z-50 bg-black text-white flex items-center justify-center text-2xl transition-opacity duration-500 ${
                fontsLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            style={{ zIndex: 100 }}
        >
            <Loader className="animate-spin" size={30} />
        </div>
    )
}
