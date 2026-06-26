import type { Metadata } from 'next'
import Photo from '@/components/Photo'
import RealtorBooking from '@/components/RealtorBooking'
import RealtorGallery from '@/components/RealtorGallery'
import RealtorLightboxImage from '@/components/RealtorLightboxImage'
import RealtorStickyCta from '@/components/RealtorStickyCta'
import ScrollRevealProvider from '@/components/ScrollRevealProvider'

export const metadata: Metadata = {
  title: 'Listing Content for Birmingham Realtors | After the Flash',
  description:
    'Cinematic video walkthroughs, magazine-quality photography, and social-ready reels for Birmingham real estate. 24–48 hour turnaround. Book a discovery call.',
  alternates: { canonical: '/realtors' },
}

// Vulcan's Knee cinematic walkthrough. Blank = photo-only hero.
const HERO_VIDEO_ID = 'B478-HxW2so'

const work = [
  { src: '/photos/realestate/Vulcans%20Knee/AV101269-HDR.webp', cap: 'Billiard Room' },
  { src: '/photos/realestate/Vulcans%20Knee/AV101325-HDR.webp', cap: 'Kitchen' },
  { src: '/photos/realestate/Vulcans%20Knee/AV101388-HDR.webp', cap: 'Living Room' },
  { src: '/photos/realestate/Vulcans%20Knee/AV101371-HDR.webp', cap: 'Bedroom' },
]

const pricing = [
  { no: '01', name: 'Photos', price: 'from $100', desc: 'Magazine-quality stills, color-graded and ready for the MLS and every listing site.' },
  { no: '02', name: 'Cinematic Video', price: 'from $150', desc: 'A walkthrough that moves — the kind of film that makes a buyer book the showing.' },
  { no: '03', name: 'Vertical Reel', price: 'from $50', desc: 'Social-ready vertical cut you post straight to Instagram and TikTok.' },
]

export default function RealtorsPage() {
  return (
    <main className="realtors-page">
      <ScrollRevealProvider />
      {/* ---------- Hero ---------- */}
      <section className="rl-hero" id="top">
        <Photo
          src="/photos/realestate/Vulcans%20Knee/AV101272-HDR.webp"
          alt="Cinematic real estate interior by After the Flash"
          tone="211e19"
          pos="center 80%"
          mobilePos="50% 65%"
        />
        <div className="tint" />
        <div className="frame-inset" />
        <div className="rl-hero-content">
          <p className="eyebrow">Birmingham Realtors</p>
          <h1>
            <span className="accent">Elevate</span> every listing
          </h1>
          <p className="rl-hero-sub">
            Your listings deserve better than phone photos.
          </p>
          <div className="rl-hero-actions">
            <a className="rl-cta" href="#book">
              Book a Discovery Call <span className="arr" />
            </a>
            <span className="rl-hero-turn">24–48 hr turnaround</span>
          </div>
        </div>
      </section>

      {/* ---------- Cinematic film (renders when a video ID is set) ---------- */}
      {HERO_VIDEO_ID && (
        <section className="band">
          <div className="shell">
            <div className="section-head reveal" style={{ maxWidth: '46ch' }}>
              <span className="section-index">The Film</span>
              <h2 className="display" style={{ fontSize: 'clamp(2.4rem,5.6vw,4.6rem)' }}>
                See it move.
              </h2>
            </div>
            <div className="rl-video-wrap reveal">
              <iframe
                src={`https://www.youtube.com/embed/${HERO_VIDEO_ID}?rel=0`}
                title="After the Flash — cinematic listing walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </section>
      )}

      {/* ---------- The difference ---------- */}
      <section className="band rl-diff">
        <div className="shell">
          <div className="rl-diff-grid">
            <div className="reveal">
              <p className="eyebrow">The Difference</p>
              <h2>
                The first showing is the photos.{' '}
                <span className="accent">Make them count.</span>
              </h2>
              <p>
                Most listings still go up with phone pics and a basic slideshow, then the
                good ones sit. If your photos look flat, the house looks flat. We&apos;re
                After the Flash, a Birmingham studio doing listing content the right way:
                cinematic walkthroughs, magazine-quality photos, and vertical reels you can
                post straight to Instagram and TikTok.
              </p>
            </div>
            <RealtorLightboxImage
              src="/photos/realestate/Vulcans%20Knee/AV101413-HDR.webp"
              alt="Magazine-quality real estate photography"
              caption="Shot & graded by After the Flash"
            />
          </div>
        </div>
      </section>

      {/* ---------- Selected work ---------- */}
      <section className="band alt">
        <div className="shell">
          <div className="section-head reveal" style={{ maxWidth: '46ch' }}>
            <span className="section-index">Selected Work</span>
            <h2 className="display" style={{ fontSize: 'clamp(2.4rem,5.6vw,4.6rem)' }}>
              Recent listings.
            </h2>
            <p className="lede">
              A few frames from a recent Birmingham listing — shot, lit, and graded the way
              your next one will be.
            </p>
          </div>
          <RealtorGallery work={work} />
        </div>
      </section>

      {/* ---------- Pricing ---------- */}
      <section className="band pricing-section">
        <div className="shell">
          <div className="section-head pricing-head reveal">
            <span className="section-index">Pricing</span>
            <h2 className="display">Simple, flexible rates.</h2>
            <p className="lede">
              Clear places to start. Final quote flexes with the property and what you need.
            </p>
          </div>

          <div className="pricing-grid">
            {pricing.map(pkg => (
              <article className="pricing-card reveal" key={pkg.no}>
                <div className="pricing-top">
                  <span className="no">{pkg.no}</span>
                  <span className="price">{pkg.price}</span>
                </div>
                <h3>{pkg.name}</h3>
                <p>{pkg.desc}</p>
              </article>
            ))}
            <article className="pricing-card rl-price-featured reveal">
              <div className="pricing-top">
                <span className="no">04</span>
                <span className="rl-price-best">Best value · from $250</span>
              </div>
              <h3>Full Bundle</h3>
              <p>Photo + video + reel together — everything a listing needs to lead with.</p>
            </article>
          </div>

          <p className="rl-pricing-note reveal">
            Final quote flexes with the property and what you need — we&apos;d rather build
            something long-term with a few good agents than do one-off jobs.
          </p>
        </div>
      </section>

      {/* ---------- Book the call ---------- */}
      <RealtorBooking />

      {/* ---------- Footer (minimal, no funnel exits) ---------- */}
      <footer className="rl-footer">
        <div className="shell">
          <div className="rl-footer-top">
            <div className="mark">
              After<br />the <span className="accent">Flash</span>
            </div>
            <div className="rl-footer-meta">
              <a href="mailto:aftertheflashmedia@gmail.com">aftertheflashmedia@gmail.com</a>
              <a href="https://www.instagram.com/aftertheflashmedia/" target="_blank" rel="noopener noreferrer">
                @aftertheflashmedia
              </a>
              <span>Alabama &amp; the Southeast</span>
            </div>
          </div>
          <div className="rl-footer-base">
            <span>© 2026 After the Flash</span>
            <span>Every frame, a work of art</span>
          </div>
        </div>
      </footer>

      <RealtorStickyCta />
    </main>
  )
}
