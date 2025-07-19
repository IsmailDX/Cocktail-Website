import About from '@/components/About'
import Art from '@/components/Art'
import Cocktails from '@/components/Cocktails'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <Cocktails />
            <About />
            <Art />
        </main>
    )
}
