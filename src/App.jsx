import { useState, useEffect } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { posts } from './blogPosts'
import './App.css'

const BASE = import.meta.env.BASE_URL
const img = (name) => `${BASE}images/${name}`
const EMPTY_FORM = { name: '', email: '', phone: '', town: '', workRequired: '', budget: '', message: '' }

const workTypes = [
  { title: 'Full bathrooms', desc: 'Strip-out and refit from floor to ceiling' },
  { title: 'Wet rooms and walk-in showers', desc: 'Tanked floors and walls, graded to the drain' },
  { title: 'En suites', desc: 'Small rooms planned to fit a proper shower' },
  { title: 'Tiling', desc: 'Large format porcelain, stone, metro and herringbone' },
  { title: 'Plumbing', desc: 'Shower valves, underfloor heating, towel rails and pipework' },
  { title: 'Supply and fit', desc: 'Sanitaryware, furniture and tiles at trade price' },
  { title: 'Kitchen fitting', desc: 'Units, worktops and splashbacks' },
  { title: 'Carpentry and joinery', desc: 'Stud walls, boxing in, fitted furniture, skirting and architrave' },
  { title: 'Plastering', desc: 'Skims, patching and full replasters, left ready for tiles or paint' },
  { title: 'Painting and decorating', desc: 'Full rooms and feature walls' },
  { title: 'New build snagging', desc: 'RPSA-qualified inspections from £325, report within 24 hours', href: `${BASE}book-snagging/` },
]

const facts = [
  { value: '100+', label: 'bathrooms fitted and handed over' },
  { value: '10+ years', label: 'in the trade' },
  { value: '2 to 3 weeks', label: 'for a typical full bathroom refit' },
  { value: 'Fixed price', label: 'agreed before we start, with no extras added later' },
]

const steps = [
  { title: 'Survey', desc: 'We visit, measure and listen to what you want. No pressure and no hard sell.' },
  { title: 'Design', desc: 'We plan the layout with you, choose materials and agree the scope and the price.' },
  { title: 'Supply', desc: 'We buy everything at trade price, so you save on materials without the running around.' },
  { title: 'Install', desc: 'Our own team fits it, tidies up every day and stays until you have signed it off.' },
]

const gallery = [
  { src: 'IMG_4581.jpeg', alt: 'Black marble en suite with lit shelves', large: true },
  { src: 'IMG_4301.png', alt: 'Walk-in shower in onyx-effect stone' },
  { src: 'IMG_3767.jpeg', alt: 'Freestanding bath beside a walk-in shower' },
  { src: 'IMG_3078.jpeg', alt: 'Dark grey en suite' },
  { src: 'IMG_4531.jpeg', alt: 'Fitted family bathroom' },
  { src: 'IMG_4072.jpeg', alt: 'Walk-in shower with a recessed niche' },
  { src: 'IMG_3720.jpeg', alt: 'Cream marble shower enclosure' },
  { src: 'IMG_4563.jpeg', alt: 'Cloakroom with wall-hung basin' },
  { src: 'IMG_3410.jpeg', alt: 'Family bathroom with a rainfall shower' },
  { src: 'IMG_3085.jpeg', alt: 'Close-up of dark grey shower tiling' },
  { src: 'IMG_3256.jpeg', alt: 'Cloakroom with patterned floor tiles' },
  { src: 'bath-grey-ensuite.png', alt: 'Grey tiled en suite with walk-in shower' },
]

// Copied word for word from Google. Keep the customers' own wording.
const reviews = [
  {
    name: 'Andrew Tagg',
    text: 'So good we decided to have our third en-suite installed within months. George and his team are knowledgeable craftsmen, very tidy, polite, punctual. Could not recommend highly enough.',
  },
  {
    name: 'Roger Frampton',
    text: 'After a house move I recently had Ready For Refurb take out a bath and replace it with a large, tiled shower. From the very first contact they were professional and helpful throughout. The finished result is excellent and I have received many compliments. Would definitely recommend.',
  },
  {
    name: 'Michelle Mitchell',
    text: 'Just had Ready for Refurb finish replacing our leaking shower with a brand new one! The guys did a fantastic job, were polite, friendly, kept everything clean and tidy. Work was top notch and of really good quality! Would definitely recommend them!!',
  },
  {
    name: 'Suzanne Halpin',
    text: "Incredible service from start to finish. I've used Ready For Refurb to renovate a full bungalow also bathrooms and other rooms at my own home. The work is to such a high standard I can't recommend George and the team enough. Wouldn't use anyone else. Perfection along with trustworthy companies are hard to find but this is one.",
  },
]

const GOOGLE_REVIEWS = 'https://www.google.com/search?q=Ready+For+Refurb+LTD+reviews'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)
    setFormError(false)
    try {
      const res = await fetch('https://formsubmit.co/ajax/info@battleplanmedia.co.uk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setFormSubmitted(true)
      } else {
        setFormError(true)
      }
    } catch {
      setFormError(true)
    } finally {
      setFormLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="app">

      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-container">
          <a href={BASE} className="nav-logo">
            <img src={img('r4r-logo.png')} alt="" className="nav-logo-icon" width="36" height="36" style={{ borderRadius: '50%', objectFit: 'cover' }} />
            <span className="nav-logo-text">Ready For Refurb</span>
          </a>
          <div className="nav-links">
            <a href={`${BASE}book-snagging/`} className="nav-blog-link">Snagging</a>
            <a href={`${BASE}blog/`} className="nav-blog-link">Advice</a>
            <a href="tel:+447734024192" className="nav-blog-link nav-phone">07734 024192</a>
            <a href="#contact" className="nav-cta">Get a quote</a>
          </div>
        </div>
      </nav>

      <section className="hero hero-split">
        <div className="hero-split-panel" style={{ backgroundImage: `url(${img('hero-grey-shower.png')})` }} />
        <div className="hero-split-panel" style={{ backgroundImage: `url(${img('hero-kitchen.png')})` }} />
        <div className="hero-split-panel" style={{ backgroundImage: `url(${img('hero-led-mirror.png')})` }} />
        <div className="hero-split-overlay" />
        <div className="hero-left">
          <p className="hero-title" aria-hidden="true">Are<br />you<br /><span style={{ color: '#3FB8E0' }}>R4R?</span></p>
          <h1 className="hero-tagline">Bathroom fitters in Towcester, Northampton and Milton Keynes</h1>
          <div className="hero-cta-wrap">
            <a href="#contact" className="hero-cta">Get my free quote <ArrowRight size={18} /></a>
          </div>
        </div>
        <div className="hero-right">
          <p className="hero-right-headline">Kitchens, tiling, plastering and carpentry too.</p>
          <p className="hero-right-sub">One team for the whole job, at a fixed price.</p>
        </div>
      </section>

      <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer" className="google-strip">
        <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
        <span className="google-stars" aria-hidden="true">★★★★★</span>
        <span className="google-score">5.0</span>
        <span className="google-divider" aria-hidden="true">·</span>
        <span className="google-count">15 Google reviews</span>
        <span className="google-cta">Read them on Google</span>
      </a>

      <a href={`${BASE}book-snagging/`} className="snag-strip">
        <span className="snag-strip-text">
          <strong>Buying a new build?</strong> Book a snagging inspection with an RPSA-qualified inspector, from £325.
        </span>
        <span className="snag-strip-cta">Book an inspection</span>
      </a>

      <section className="use-cases">
        <div className="use-cases-container">
          <div className="section-header">
            <h2 className="section-title">What we fit</h2>
          </div>
          <ul className="use-cases-grid">
            {workTypes.map((u) => {
              const Tag = u.href ? 'a' : 'div'
              return (
                <li key={u.title} className={u.href ? 'use-case-wide' : undefined}>
                  <Tag href={u.href} className={`use-case-card${u.href ? ' use-case-card--link' : ''}`}>
                    <h3 className="use-case-title">{u.title}</h3>
                    <p className="use-case-desc">{u.desc}</p>
                  </Tag>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="stats" aria-label="Ready For Refurb in numbers">
        <dl className="stats-container">
          {facts.map((f) => (
            <div key={f.value} className="stat-item">
              <dt className="stat-value">{f.value}</dt>
              <dd className="stat-label">{f.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="process">
        <div className="process-container">
          <div className="section-header">
            <h2 className="section-title">How a job runs</h2>
          </div>
          <ol className="process-grid">
            {steps.map((p, i) => (
              <li key={p.title} className="process-card">
                <div className="process-number">{i + 1}</div>
                <h3 className="process-title">{p.title}</h3>
                <p className="process-desc">{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-band-container">
          <h2 className="cta-band-title">Get a fixed price for your bathroom</h2>
          <p className="cta-band-sub">We survey for free, then give you one price with no extras added later.</p>
          <a href="#contact" className="cta-band-btn">Get my free quote</a>
        </div>
      </section>

      <section id="gallery" className="gallery">
        <div className="gallery-container">
          <div className="section-header">
            <h2 className="section-title">Recent bathrooms we have fitted</h2>
          </div>
          <div className="gallery-grid">
            {gallery.map((g) => (
              <div key={g.src} className={`gallery-item${g.large ? ' gallery-item--large' : ''}`}>
                <img src={img(g.src)} alt={g.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="scenarios">
        <div className="scenarios-container">
          <div className="section-header">
            <h2 className="section-title">What customers say on Google</h2>
            <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer" className="google-reviews-link">
              <strong>5.0</strong> from 15 Google reviews. Read them all on Google
            </a>
          </div>
          <div className="scenarios-grid">
            {reviews.map((r) => (
              <figure key={r.name} className="scenario-card review-card">
                <div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote className="review-text">{r.text}</blockquote>
                <figcaption className="review-footer">
                  <span className="review-name">{r.name}</span>
                  <span className="review-when">Google review</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-teaser">
        <div className="blog-teaser-container">
          <div className="section-header">
            <h2 className="section-title">Renovation advice</h2>
            <p className="section-subtitle">What a bathroom costs in Northamptonshire, wet room or walk-in shower, and how to pick a fitter.</p>
          </div>
          <div className="blog-teaser-grid">
            {posts.map((p) => (
              <a key={p.slug} href={`${BASE}blog/${p.slug}/`} className="blog-teaser-card">
                <span className="blog-teaser-cat">{p.category}</span>
                <h3 className="blog-teaser-title">{p.title}</h3>
                <span className="blog-teaser-link">Read the guide</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-container">
          <div className="contact-header">
            <h2 className="contact-title">Get a free quote</h2>
            <p className="contact-subtitle">Tell us about the job and we will come back to you within 24 hours.</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <p className="contact-item"><a href="tel:+447734024192">Call George on 07734 024192</a></p>
              <p className="contact-item"><a href="mailto:ready4refurb@gmail.com">ready4refurb@gmail.com</a></p>
              <p className="contact-item">Based in Towcester. We cover Northamptonshire, Buckinghamshire and Oxfordshire.</p>
              <ul className="contact-reassurance">
                <li className="reassurance-item">Free survey with no obligation</li>
                <li className="reassurance-item">Fixed-price quote with no extras</li>
                <li className="reassurance-item">Fully insured</li>
              </ul>
            </div>
            <div className="contact-form-container">
              {!formSubmitted ? (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="q-name">Full name</label>
                      <input id="q-name" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="q-phone">Phone number</label>
                      <input id="q-phone" type="tel" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="q-email">Email</label>
                      <input id="q-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="q-town">Town</label>
                      <input id="q-town" type="text" name="town" autoComplete="address-level2" value={formData.town} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="q-work">What do you need doing?</label>
                    <select id="q-work" name="workRequired" value={formData.workRequired} onChange={handleChange} required className={formData.workRequired ? '' : 'select-placeholder'}>
                      <option value="" disabled>Choose a job</option>
                      <option value="Full bathroom installation">Full bathroom installation</option>
                      <option value="Wet room / walk-in shower">Wet room or walk-in shower</option>
                      <option value="En suite">En suite</option>
                      <option value="Bathroom refurbishment">Refresh an existing bathroom</option>
                      <option value="Tiling only">Tiling only</option>
                      <option value="Plumbing only">Plumbing only</option>
                      <option value="Kitchen fitting">Kitchen fitting</option>
                      <option value="Carpentry / joinery">Carpentry or joinery</option>
                      <option value="Plastering">Plastering</option>
                      <option value="General home improvement">Other home improvement</option>
                      <option value="Multiple / not sure">Several jobs, or not sure yet</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="q-budget">Rough budget</label>
                    <select id="q-budget" name="budget" value={formData.budget} onChange={handleChange} required className={formData.budget ? '' : 'select-placeholder'}>
                      <option value="" disabled>Choose a range</option>
                      <option value="Under £3,000">Under £3,000</option>
                      <option value="£3,000 to £5,000">£3,000 to £5,000</option>
                      <option value="£5,000 to £8,000">£5,000 to £8,000</option>
                      <option value="£8,000 to £12,000">£8,000 to £12,000</option>
                      <option value="£12,000 to £20,000">£12,000 to £20,000</option>
                      <option value="£20,000+">Over £20,000</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="q-message">Anything else? (optional)</label>
                    <textarea id="q-message" name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Room size, when you want it done, ideas you have" />
                  </div>
                  <button type="submit" className="form-submit" disabled={formLoading}>
                    {formLoading ? 'Sending…' : 'Get my free quote'}
                  </button>
                  {formError && (
                    <p className="form-error" role="alert">Your enquiry did not send. Call George on <a href="tel:+447734024192">07734 024192</a> or email <a href="mailto:ready4refurb@gmail.com">ready4refurb@gmail.com</a>.</p>
                  )}
                </form>
              ) : (
                <div className="form-success" role="status">
                  <CheckCircle2 size={48} />
                  <h3>Enquiry received</h3>
                  <p>We will get back to you within 24 hours to arrange your free survey.</p>
                  <button onClick={() => { setFormSubmitted(false); setFormData(EMPTY_FORM) }} className="form-reset">
                    Send another enquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div>
            <div className="footer-logo">Ready For Refurb</div>
            <p className="footer-text">
              Ready For Refurb LTD, registered in England and Wales, company number 16343003.
              Registered office: Chandos House, School Lane, Buckingham MK18 1HD.
            </p>
          </div>
          <p className="footer-text footer-links">
            <a href={`${BASE}privacy/`}>Privacy and cookies</a>
            <button type="button" className="footer-cookie-btn" onClick={() => window.r4rCookieSettings?.()}>Cookie settings</button>
          </p>
        </div>
      </footer>

      <div className="mobile-bar">
        <a href="tel:+447734024192">Call George</a>
        <a href="#contact">Get a quote</a>
      </div>

    </div>
  )
}

export default App
