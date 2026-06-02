import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Collection from '@/components/Collection'
import TheWork from '@/components/TheWork'
import Artists from '@/components/Artists'
import Commission from '@/components/Commission'
import Footer from '@/components/Footer'
import TweaksPanel from '@/components/TweaksPanel'
import ScrollRevealProvider from '@/components/ScrollRevealProvider'

export default function Home() {
  return (
    <>
      <ScrollRevealProvider />
      <Nav />
      <Hero />
      <Collection />
      <TheWork />
      <Artists />
      <Commission />
      <Footer />
      <TweaksPanel />
    </>
  )
}
