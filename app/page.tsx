import FlashIntro from '@/components/FlashIntro'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Collection from '@/components/Collection'
import EnhancementSliders from '@/components/EnhancementSliders'
import TheWork from '@/components/TheWork'
import Reel from '@/components/Reel'
import Arsenal from '@/components/Arsenal'
import Pricing from '@/components/Pricing'
import Commission from '@/components/Commission'
import Footer from '@/components/Footer'
import ScrollRevealProvider from '@/components/ScrollRevealProvider'
import BackToTop from '@/components/BackToTop'

export default function Home() {
  return (
    <>
      <FlashIntro />
      <ScrollRevealProvider />
      <Nav />
      <Hero />
      <Collection />
      <EnhancementSliders />
      <Reel />
      <TheWork />
      <Arsenal />
      <Pricing />
      <Commission />
      <Footer />
      <BackToTop />
    </>
  )
}
