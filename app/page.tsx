import About from '@/components/About'
import Art from '@/components/Art'
import Cocktails from '@/components/Cocktails'
import Hero from '@/components/Hero'
import Menu from '@/components/Menu'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <Cocktails />
            <About />
            <Art />
            <Menu />
            <Contact />
        </main>
    )
}
