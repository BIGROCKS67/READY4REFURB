import { useState } from 'react'
import { ArrowRight, CheckCircle2, ClipboardCheck, FileText, CalendarCheck, Search, Phone } from 'lucide-react'
import './QuotePage.css'
import './BookSnagging.css'

const PRE_COMPLETION = [
  '1 to 2 bed apartment, £325',
  '1 to 2 bed house, £350',
  '3 bed house, £400',
  '3 bed detached, £425',
  '4 bed house, £450',
  '5 bed house, £500',
  '5 bed+ house, £550',
]

const PRE_AND_POST = [
  '1 to 2 bed apartment, £575',
  '1 to 2 bed house, £625',
  '3 bed house, £650',
  '3 bed detached, £675',
  '4 bed house, £685',
  '5 bed house, £700',
  '5 bed+ house, £750',
]

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  developmentName: '',
  builder: '',
  plotNumber: '',
  preCompletion: '',
  postCompletion: '',
  preAndPost: '',
  drone: false,
  thermalImaging: false,
  completionDate: '',
  preferredDate: '',
}

const CALLBACK_EMPTY = { name: '', phone: '' }

export default function BookSnagging() {
  const [formData, setFormData]           = useState(EMPTY)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formLoading, setFormLoading]     = useState(false)
  const [formError, setFormError]         = useState(false)
  const [packageError, setPackageError]   = useState(false)

  const [callback, setCallback]               = useState(CALLBACK_EMPTY)
  const [callbackSubmitted, setCallbackSubmitted] = useState(false)
  const [callbackLoading, setCallbackLoading] = useState(false)
  const [callbackError, setCallbackError]     = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => {
      const next = { ...prev, [name]: type === 'checkbox' ? checked : value }
      // Only one package dropdown at a time
      if (name === 'preCompletion' && value) {
        next.postCompletion = ''
        next.preAndPost = ''
      }
      if (name === 'postCompletion' && value) {
        next.preCompletion = ''
        next.preAndPost = ''
      }
      if (name === 'preAndPost' && value) {
        next.preCompletion = ''
        next.postCompletion = ''
      }
      return next
    })
    if (name === 'preCompletion' || name === 'postCompletion' || name === 'preAndPost') {
      setPackageError(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.preCompletion && !formData.postCompletion && !formData.preAndPost) {
      setPackageError(true)
      return
    }
    setFormLoading(true)
    setFormError(false)
    try {
      let packageType = 'Pre Completion & Post Completion Snagging Survey'
      if (formData.preCompletion) packageType = 'Pre Completion Inspection'
      else if (formData.postCompletion) packageType = 'Post Completion Inspection'

      const packageChoice = formData.preCompletion || formData.postCompletion || formData.preAndPost

      const res = await fetch('https://formsubmit.co/ajax/ready4refurb@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          developmentName: formData.developmentName,
          builder: formData.builder,
          plotNumber: formData.plotNumber,
          packageType,
          packageChoice,
          drone: formData.drone ? 'Yes' : 'No',
          thermalImaging: formData.thermalImaging ? 'Yes' : 'No',
          completionDate: formData.completionDate,
          preferredDate: formData.preferredDate,
          _subject: 'New Build Snagging Inspection Booking',
          form: 'book-snagging',
        }),
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

  const handleCallbackSubmit = async (e) => {
    e.preventDefault()
    setCallbackLoading(true)
    setCallbackError(false)
    try {
      const res = await fetch('https://formsubmit.co/ajax/ready4refurb@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: callback.name,
          phone: callback.phone,
          _subject: 'Snagging Callback Request',
          form: 'snagging-callback',
        }),
      })
      if (res.ok) {
        setCallbackSubmitted(true)
      } else {
        setCallbackError(true)
      }
    } catch {
      setCallbackError(true)
    } finally {
      setCallbackLoading(false)
    }
  }

  return (
    <div className="qp-page">

      <header className="qp-header">
        <div className="qp-header-left">
          <img src={`${import.meta.env.BASE_URL}images/r4r-logo.png`} alt="Ready For Refurb" className="qp-logo" />
          <span className="qp-brand">Ready For Refurb</span>
        </div>
        <a href="https://ready4refurb.com" className="qp-site-btn">
          View full website <ArrowRight size={15} />
        </a>
      </header>

      <main className="qp-main snag-main">

        <div
          className="qp-left">
          <h1 className="qp-title">New Build Snagging Inspection</h1>
          <p className="qp-body">
            Independent new build snagging inspections in Towcester, Northampton, Milton Keynes
            and the surrounding areas. Fixed prices from £325, with your report within 24 hours.
          </p>

          <ul className="qp-trust">
            <li>Independent RPSA-qualified inspector</li>
            <li>Digital report within 24 hours</li>
            <li>Fixed prices for every size of home</li>
            <li>Book online in about a minute</li>
          </ul>

          <div className="snag-steps">
            <h2 className="snag-steps-title">What happens next</h2>
            <ol className="snag-timeline">
              <li>
                <span className="snag-step-icon"><ClipboardCheck size={18} /></span>
                <div>
                  <strong>Book online</strong>
                  <p>Fill in the short form. It takes about a minute.</p>
                </div>
              </li>
              <li>
                <span className="snag-step-icon"><CalendarCheck size={18} /></span>
                <div>
                  <strong>We confirm your appointment</strong>
                  <p>We'll be in touch to lock in your inspection date.</p>
                </div>
              </li>
              <li>
                <span className="snag-step-icon"><Search size={18} /></span>
                <div>
                  <strong>We inspect your property</strong>
                  <p>A thorough snagging inspection by an RPSA-qualified inspector.</p>
                </div>
              </li>
              <li>
                <span className="snag-step-icon"><FileText size={18} /></span>
                <div>
                  <strong>You receive your report</strong>
                  <p>Your professional snagging report within 24 hours.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <div
          className="qp-right">
          <div className="qp-form-card">
            {!formSubmitted ? (
              <>
                <h2 className="qp-form-title">Book your inspection</h2>
                <p className="qp-form-sub">Choose a package, then pick your preferred date.</p>
                <form onSubmit={handleSubmit} className="qp-form">
                  <div className="qp-row">
                    <div className="qp-field">
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Name" />
                    </div>
                    <div className="qp-field">
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Telephone" />
                    </div>
                  </div>
                  <div className="qp-field">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" />
                  </div>
                  <div className="qp-row">
                    <div className="qp-field">
                      <input type="text" name="developmentName" value={formData.developmentName} onChange={handleChange} required placeholder="Development Name" />
                    </div>
                    <div className="qp-field">
                      <input type="text" name="builder" value={formData.builder} onChange={handleChange} required placeholder="Builder" />
                    </div>
                  </div>
                  <div className="qp-field">
                    <input type="text" name="plotNumber" value={formData.plotNumber} onChange={handleChange} required placeholder="Plot Number" />
                  </div>

                  <div className="qp-field">
                    <label className="snag-label" htmlFor="preCompletion">Pre Completion Inspection</label>
                    <select
                      id="preCompletion"
                      name="preCompletion"
                      value={formData.preCompletion}
                      onChange={handleChange}
                      className={formData.preCompletion ? '' : 'ph'}
                    >
                      <option value="">Select property type &amp; price</option>
                      {PRE_COMPLETION.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="qp-field">
                    <label className="snag-label" htmlFor="postCompletion">Post Completion Inspection</label>
                    <select
                      id="postCompletion"
                      name="postCompletion"
                      value={formData.postCompletion}
                      onChange={handleChange}
                      className={formData.postCompletion ? '' : 'ph'}
                    >
                      <option value="">Select property type &amp; price</option>
                      {PRE_COMPLETION.map((opt) => (
                        <option key={`post-${opt}`} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="qp-field">
                    <label className="snag-label" htmlFor="preAndPost">Pre Completion &amp; Post Completion Survey</label>
                    <select
                      id="preAndPost"
                      name="preAndPost"
                      value={formData.preAndPost}
                      onChange={handleChange}
                      className={formData.preAndPost ? '' : 'ph'}
                    >
                      <option value="">Select property type &amp; price</option>
                      {PRE_AND_POST.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  {packageError && (
                    <p className="qp-error">Please choose a package from one of the dropdowns above.</p>
                  )}

                  <div className="snag-checks">
                    <label className="snag-check">
                      <input type="checkbox" name="drone" checked={formData.drone} onChange={handleChange} />
                      <span>Drone roof inspection, £75</span>
                    </label>
                    <label className="snag-check">
                      <input type="checkbox" name="thermalImaging" checked={formData.thermalImaging} onChange={handleChange} />
                      <span>Thermal imaging check, £50</span>
                    </label>
                  </div>

                  <div className="qp-row snag-dates">
                    <div className="qp-field">
                      <label className="snag-label" htmlFor="completionDate">Completion Date</label>
                      <input id="completionDate" type="date" name="completionDate" value={formData.completionDate} onChange={handleChange} required />
                    </div>
                    <div className="qp-field">
                      <label className="snag-label" htmlFor="preferredDate">Preferred Inspection Date</label>
                      <input id="preferredDate" type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required />
                    </div>
                  </div>
                  <button type="submit" className="qp-submit" disabled={formLoading}>
                    {formLoading ? 'Sending…' : <><span>Book Inspection</span><ArrowRight size={18} /></>}
                  </button>
                  {formError && (
                    <p className="qp-error" role="alert">Your booking did not send. Call George on <a href="tel:+447734024192">07734 024192</a>.</p>
                  )}
                </form>
              </>
            ) : (
              <div
                className="qp-success">
                <CheckCircle2 size={52} className="qp-success-icon" />
                <h3>Booking received</h3>
                <p>Thanks. We will be in touch to confirm your inspection date.</p>
                <button
                  className="qp-reset"
                  onClick={() => { setFormSubmitted(false); setFormData(EMPTY) }}
                >
                  Book another inspection
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Callback request */}
      <section className="snag-callback">
        <div className="snag-callback-inner">
          {!callbackSubmitted ? (
            <>
              <div className="snag-callback-copy">
                <Phone size={20} />
                <div>
                  <h2>Not sure which inspection you need?</h2>
                  <p>Leave your name and number and we will call you back.</p>
                </div>
              </div>
              <form className="snag-callback-form" onSubmit={handleCallbackSubmit}>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Name"
                  value={callback.name}
                  onChange={(e) => setCallback({ ...callback, name: e.target.value })}
                />
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone number"
                  value={callback.phone}
                  onChange={(e) => setCallback({ ...callback, phone: e.target.value })}
                />
                <button type="submit" disabled={callbackLoading}>
                  {callbackLoading ? 'Sending…' : 'Call me back'}
                </button>
              </form>
              {callbackError && (
                <p className="snag-callback-error" role="alert">Your request did not send. Call George on <a href="tel:+447734024192">07734 024192</a>.</p>
              )}
            </>
          ) : (
            <div className="snag-callback-success">
              <CheckCircle2 size={22} />
              <p>Thanks. We will call you back.</p>
            </div>
          )}
        </div>
      </section>

      <section className="snag-info" aria-labelledby="snag-prices">
        <div className="snag-info-inner">
          <h2 id="snag-prices">Snagging inspection prices</h2>
          <div className="snag-price-cols">
            {[['Pre completion inspection', PRE_COMPLETION], ['Pre and post completion', PRE_AND_POST]].map(([title, rows]) => (
              <table key={title} className="snag-price-table">
                <caption>{title}</caption>
                <tbody>
                  {rows.map((row) => {
                    const [home, price] = row.split(', ')
                    return <tr key={row}><th scope="row">{home}</th><td>{price}</td></tr>
                  })}
                </tbody>
              </table>
            ))}
          </div>
          <p className="snag-extras">Add a drone roof inspection for £75 or a thermal imaging check for £50.</p>

          <h2>Areas we cover</h2>
          <p>
            Based in Towcester, we inspect new builds in Northampton, Milton Keynes and across
            Northamptonshire, Buckinghamshire and Oxfordshire. Not sure if we cover your development?
            Call George on <a href="tel:+447734024192">07734 024192</a>.
          </p>

          <h2>Common questions</h2>
          <dl className="snag-faq">
            <dt>What is the difference between pre completion and post completion?</dt>
            <dd>
              A pre completion inspection happens before you legally complete, so the builder can put
              snags right before you move in. A post completion inspection happens after you have the
              keys, while the builder is still responsible for fixing defects.
            </dd>
            <dt>Who does the inspection?</dt>
            <dd>An independent RPSA-qualified inspector who works for you, not the builder.</dd>
            <dt>When do I get my report?</dt>
            <dd>Your digital report arrives within 24 hours of the inspection, ready to send to your builder.</dd>
          </dl>
        </div>
      </section>

      <footer className="qp-footer">
        © 2026 Ready For Refurb. New build snagging inspections in Towcester, Northampton and Milton Keynes.
      </footer>
    </div>
  )
}
