'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import React from 'react'
import { useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import { ScrollTrigger, SplitText } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, SplitText)

const Hero = () => {
    const videoRefDesktop = useRef<HTMLVideoElement>(null)
    const videoRefMobile = useRef<HTMLVideoElement>(null)

    const isMobile = useMediaQuery({ maxWidth: 767 })

    useGSAP(() => {
        // Text animations
        const heroSplit = new SplitText('.title', {
            type: 'chars, words',
        })
        const paragraphSplit = new SplitText('.subtitle', {
            type: 'lines',
        })

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'))

        gsap.from(heroSplit.chars, {
            y: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
        })

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1,
        })

        // Leaf scroll animation
        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        })
            .to('.right-leaf', { y: 200 }, 0)
            .to('.left-leaf', { y: -200 }, 0)

        // Video scroll animation
        const startValue = isMobile ? 'top 50%' : 'center 60%'
        const endValue = isMobile ? '120% top ' : 'bottom top'

        const video = isMobile
            ? videoRefMobile.current
            : videoRefDesktop.current

        // to make the video scrolling smoother because sometimes the mouse wheel scroll and
        //the video feels like its playing on 10 fps, we go to FFmpeg and download.
        // you click windows then you click the windows builds by Btbn, then ffmpeg-master-latest-win64-gpl-shared.zip and add the bin folder to env variables in windows
        // then we go to the folder that has the video and run the command:
        // ffmpeg -i input.mp4 -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output.mp4
        // so we did this so it makes the video smoother when scrolling

        if (video) {
            const setupScrollVideo = () => {
                const duration = video.duration

                gsap.timeline({
                    scrollTrigger: {
                        trigger: video,
                        start: startValue,
                        end: endValue,
                        // make video play on scroll
                        scrub: true,
                        pin: true,
                    },
                }).to(video, {
                    currentTime: duration,
                    ease: 'none',
                })
            }

            // Video metadata might not be loaded yet
            if (video.readyState >= 1) {
                setupScrollVideo()
            } else {
                video.addEventListener('loadedmetadata', setupScrollVideo)
                return () => {
                    video.removeEventListener(
                        'loadedmetadata',
                        setupScrollVideo
                    )
                }
            }
        }
    }, [])

    return (
        <>
            <section id="hero" className="noisy">
                <h1 className="title uppercase">Mojito</h1>

                <Image
                    src="/images/hero-left-leaf.png"
                    alt="left-leaf"
                    width={500}
                    height={500}
                    className="left-leaf"
                />

                <Image
                    src="/images/hero-right-leaf.png"
                    alt="right-leaf"
                    width={500}
                    height={500}
                    className="right-leaf"
                />

                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Cool. Crisp. Classic.</p>
                            <p className="subtitle">
                                Sip the Spirit
                                <br />
                                of Summer
                            </p>
                        </div>

                        <div className="view-cocktails">
                            <p className="subtitle">
                                Every cocktail on our menu is a blend of premium
                                ingredients, creative, flair, and timeless
                                recipes - designed to delight your senses.
                                <link
                                    rel="stylesheet"
                                    type="text/css"
                                    href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
                                />
                            </p>
                            <a href="#cocktails">View Cocktails</a>
                        </div>
                    </div>
                </div>
            </section>

            <div className="video absolute inset-0">
                {isMobile ? (
                    <video
                        ref={videoRefMobile}
                        muted
                        playsInline
                        preload="auto"
                        className="block"
                        src="/videos/outputMobile.mp4"
                    />
                ) : (
                    <video
                        ref={videoRefDesktop}
                        muted
                        playsInline
                        preload="auto"
                        className="block"
                        src="/videos/output.mp4"
                        id="video-desktop"
                    />
                )}
            </div>
        </>
    )
}

export default Hero
