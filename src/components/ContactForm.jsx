import React, { useState } from 'react'
import { enquiryInterests } from '../data/content.js'
import Icon from './Icon.jsx'

const initial = {
  name: '',
  email: '',
  company: '',
  country: '',
  interest: '',
  message: '',
}

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim()
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim()

function formatEnquiry(values) {
  return [
    'Orchlay Solutions enquiry',
    '',
    `Name: ${values.name}`,
    `Business email: ${values.email}`,
    `Company: ${values.company || 'Not supplied'}`,
    `Country: ${values.country || 'Not supplied'}`,
    `Area of interest: ${values.interest}`,
    '',
    'Message:',
    values.message,
  ].join('\n')
}

export default function ContactForm() {
  const [values, setValues] = useState(initial)
  const [status, setStatus] = useState({ type: 'idle', text: '' })
  const [busy, setBusy] = useState(false)

  function update(event) {
    const { name, value } = event.target
    setValues(current => ({ ...current, [name]: value }))
    if (status.type !== 'idle') setStatus({ type: 'idle', text: '' })
  }

  async function submit(event) {
    event.preventDefault()
    if (busy) return
    setBusy(true)
    setStatus({ type: 'idle', text: '' })
    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })
        if (!response.ok) throw new Error('Unable to send the enquiry. Please try again.')
        setValues(initial)
        setStatus({ type: 'success', text: 'Your enquiry has been submitted successfully.' })
      } else if (contactEmail) {
        const subject = encodeURIComponent(`Orchlay enquiry: ${values.interest}`)
        const body = encodeURIComponent(formatEnquiry(values))
        window.location.href = `mailto:${encodeURIComponent(contactEmail)}?subject=${subject}&body=${body}`
        setStatus({ type: 'info', text: 'Your email app should open with the enquiry ready to send. Please review and send it there.' })
      } else {
        const formatted = formatEnquiry(values)
        await navigator.clipboard.writeText(formatted)
        setStatus({ type: 'info', text: 'Enquiry copied. A contact email or submission endpoint can be configured before launching this site.' })
      }
    } catch (error) {
      setStatus({ type: 'error', text: error.message || 'Unable to complete this action.' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-head">
        <span className="form-kicker">START A CONVERSATION</span>
        <h3>Tell us about your project.</h3>
      </div>
      <div className="form-grid">
        <label>
          <span>Name <em>*</em></span>
          <input name="name" autoComplete="name" value={values.name} onChange={update} required placeholder="Your name" />
        </label>
        <label>
          <span>Business email <em>*</em></span>
          <input name="email" type="email" autoComplete="email" value={values.email} onChange={update} required placeholder="you@company.com" />
        </label>
        <label>
          <span>Company</span>
          <input name="company" autoComplete="organization" value={values.company} onChange={update} placeholder="Company name" />
        </label>
        <label>
          <span>Country</span>
          <input name="country" autoComplete="country-name" value={values.country} onChange={update} placeholder="Country" />
        </label>
        <label className="full-field">
          <span>Area of interest <em>*</em></span>
          <select name="interest" value={values.interest} onChange={update} required>
            <option value="">Select a service</option>
            {enquiryInterests.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label className="full-field">
          <span>How can we help? <em>*</em></span>
          <textarea name="message" rows="4" value={values.message} onChange={update} required placeholder="Tell us a little about what you're working on..." />
        </label>
      </div>
      <div className="form-bottom">
        <button type="submit" className="button button-purple" disabled={busy}>
          {busy ? 'Please wait...' : endpoint ? 'Submit Enquiry' : contactEmail ? 'Prepare Email' : 'Submit Demo'}
          <Icon name="arrow" size={18} />
        </button>
        <p className="form-privacy">
          {endpoint ? 'Your details are sent to the configured enquiry endpoint.' : contactEmail ? 'Your email app will handle sending the message.' : 'Preview mode: no details are sent or stored by this page.'}
        </p>
      </div>
      {status.type !== 'idle' && <p className={`form-status ${status.type}`} role="status">{status.text}</p>}
    </form>
  )
}
