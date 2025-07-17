'use client'

import { useEffect, useState } from 'react'
import { Loader } from 'lucide-react'

export default function SpecificVideoLoader({
    targetId,
}: {
    targetId: string
}) {
    const [videoLoaded, setVideoLoaded] = useState(false)
    const [hide, setHide] = useState(false)

    useEffect(() => {
        const video = document.getElementById(
            targetId
        ) as HTMLVideoElement | null
        if (!video) {
            console.error(`Video element with ID ${targetId} not found`)
            setVideoLoaded(true) // Fail safe
            return
        }

        // Check if video is already loaded enough to play
        const checkReadyState = () => {
            if (video.readyState >= 3) {
                setVideoLoaded(true)
                console.log(`Video ${targetId} is ready to play`)
                return true
            }
            return false
        }

        // Check immediately
        if (checkReadyState()) {
            return
        }

        // Set up event listeners
        const onLoadedData = () => {
            if (checkReadyState()) {
                cleanup()
            }
        }

        const onCanPlay = () => {
            setVideoLoaded(true)
            cleanup()
        }

        const onError = () => {
            console.error('Video loading failed')
            setVideoLoaded(true) // Fail safe - don't block UI if video fails
            cleanup()
        }

        const cleanup = () => {
            video.removeEventListener('loadeddata', onLoadedData)
            video.removeEventListener('canplay', onCanPlay)
            video.removeEventListener('error', onError)
        }

        video.addEventListener('loadeddata', onLoadedData)
        video.addEventListener('canplay', onCanPlay)
        video.addEventListener('error', onError)

        // Timeout fallback in case events never fire
        const timeout = setTimeout(() => {
            console.warn('Video loading timeout reached')
            setVideoLoaded(true)
            cleanup()
        }, 5000) // 5 second timeout

        return () => {
            cleanup()
            clearTimeout(timeout)
        }
    }, [targetId])

    useEffect(() => {
        if (videoLoaded) {
            const timeout = setTimeout(() => setHide(true), 100) // Slightly longer fade-out
            return () => clearTimeout(timeout)
        }
    }, [videoLoaded])

    if (hide) return null

    return (
        <div
            className={`fixed inset-0 z-[100] bg-black text-white flex items-center justify-center text-2xl transition-opacity duration-500 ${
                videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
            <Loader className="animate-spin" size={30} />
        </div>
    )
}
