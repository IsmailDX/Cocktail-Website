'use client'
import { ReactLenis } from 'lenis/react'
import type { PropsWithChildren } from 'react'

function SmoothScrolling({ children }: PropsWithChildren) {
    return <ReactLenis root>{children}</ReactLenis>
}

export default SmoothScrolling
