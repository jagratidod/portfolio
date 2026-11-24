import { useEffect, useState } from 'react'
import { initLenis } from './hooks/useLenis'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Ambient from './components/Ambient'
import Intro from './components/Intro'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Work from './components/Work'
import ProjectIndex from './components/ProjectIndex'
import Skills from './components/Skills'
import Process from './components/Process'
import Experience from './components/Experience'
import Contact from './components/Contact'

export default function App() {
  const [ready, setReady] = useState(false)
  useEffect(() => { initLenis() }, [])

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <Ambient />
      <div className="noise" aria-hidden />
      <Nav />
      <main>
        <Intro />
        <Hero ready={ready} />
        <About />
        <Services />
        <Work />
        <ProjectIndex />
        <Skills />
        <Process />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
