'use client'

import { navLinks } from '@/constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import React from 'react'

const Navbar = () => {
    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: 'bottom top',
            },
        })
        navTween.fromTo(
            'nav',
            {
                backgroundColor: 'transparent',
            },
            {
                backgroundColor: '#00000050',
                backgroudFilter: 'blur(10px)',
                duration: 1,
                ease: 'power1.inOut',
            }
        )
    })

    return (
        <nav>
            <div>
                <a href="#home" className="flex items-center gap-2">
                    <Image
                        src={'/images/logo.png'}
                        alt="logo"
                        width={35}
                        height={35}
                    />
                    <p>Velvet Pour</p>
                </a>

                <ul>
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
