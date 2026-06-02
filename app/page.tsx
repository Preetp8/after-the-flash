import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Collection from '@/components/Collection'
import TheWork from '@/components/TheWork'
import Arsenal from '@/components/Arsenal'
import Commission from '@/components/Commission'
import Footer from '@/components/Footer'
import ScrollRevealProvider from '@/components/ScrollRevealProvider'

export default function Home() {
  return (
    <>
      <ScrollRevealProvider />
      <Nav />
      <Hero />
      <Collection />
      <TheWork />
      <Arsenal />
      <Commission />
      <Footer />
    </>
  )
}
