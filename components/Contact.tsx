'use client'

import { openingHours, socials } from '@/constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import Image from 'next/image'
import React from 'react'

const Contact = () => {
    useGSAP(() => {
        const titleSplit = SplitText.create('#contact h2', { type: 'words' })

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                start: 'top center',
            },
            ease: 'power1.inOut',
        })

        timeline
            .from(titleSplit.words, {
                opacity: 0,
                yPercent: 100,
                stagger: 0.02,
            })
            .from('#contact h3, #contact p', {
                opacity: 0,
                yPercent: 100,
                stagger: 0.02,
            })
            .to('#f-right-leaf', {
                y: '-50',
                duration: 1,
                ease: 'power1.inOut',
            })
            .to(
                '#f-left-leaf',
                {
                    y: '-50',
                    duration: 1,
                    ease: 'power1.inOut',
                },
                '<'
            )
    })

    return (
        <footer id="contact">
            <Image
                src="/images/footer-right-leaf.png"
                alt="leaf-right"
                id="f-right-leaf"
                width={300}
                height={300}
            />

            <Image
                src="/images/footer-left-leaf.png"
                alt="leaf-left"
                id="f-left-leaf"
                width={300}
                height={300}
            />

            <div className="content">
                <h2>Where to Find Us</h2>

                <div>
                    <h3>Visit Our Bar</h3>
                    <p>23 Nile Street, Giza, Cairo, Egypt</p>
                </div>

                <div>
                    <h3>Contact Us</h3>
                    <p>+20 1555 945 120</p>
                    <p>cocktail@gmail.com</p>
                </div>

                <div>
                    <h3>Open Every Day</h3>
                    {openingHours.map((time) => (
                        <p key={time.day}>
                            {time.day} : {time.time}
                        </p>
                    ))}
                </div>

                <div>
                    <h3>Socials</h3>

                    <div className="flex-center gap-5">
                        {socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                            >
                                <Image
                                    key={social.name}
                                    src={`${social.icon}`}
                                    alt={social.name}
                                    width={30}
                                    height={30}
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Contact
