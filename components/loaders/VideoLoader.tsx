'use client'

import { useEffect, useState } from 'react'
import { Loader } from 'lucide-react'

export default function VideoLoader() {
    const [videoLoaded, setVideoLoaded] = useState(false)
    const [hide, setHide] = useState(false)

    useEffect(() => {
        const video = document.querySelector('video')

        if (!video) return

        const handleLoadedData = () => {
            setVideoLoaded(true)
        }

        video.addEventListener('loadeddata', handleLoadedData)

        return () => {
            video.removeEventListener('loadeddata', handleLoadedData)
        }
    }, [])

    useEffect(() => {
        if (videoLoaded) {
            const timeout = setTimeout(() => setHide(true), 100)
            return () => clearTimeout(timeout)
        }
    }, [videoLoaded])

    if (hide) return null

    return (
        <div
            className={`fixed inset-0 z-50 bg-black text-white flex items-center justify-center text-2xl transition-opacity duration-500 ${
                videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            style={{ zIndex: 100 }}
        >
            <Loader className="animate-spin" size={30} />
        </div>
    )
}
