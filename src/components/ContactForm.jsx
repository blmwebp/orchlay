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

const API_URL = import.meta.env.VITE_API_URL?.trim() || '/api/contact'

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
  event.preventDefault();

  if (busy) return;

  setBusy(true);

  setStatus({
    type: "idle",
    text: "",
  });

  try {
    const normalizedValues = {
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim(),
      country: values.country.trim(),
      message: values.message.trim(),
    }

    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(normalizedValues),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message ||
        "Unable to submit your enquiry."
      );
    }

    /* Clear form after successful submission */
    setValues({ ...initial });

    setStatus({
      type: "success",
      text:
        "Thank you! Your enquiry has been submitted successfully. Our team will get back to you soon.",
    });

  } catch (error) {
    setStatus({
      type: "error",
      text:
        error.message ||
        "Something went wrong. Please try again.",
    });

  } finally {
    setBusy(false);
  }
}


  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-head">
        <span className="form-kicker">START A CONVERSATION</span>
        <h3>Tell us about your requirement.</h3>
      </div>
      <div className="form-grid">
        <label>
          <span>Name <em>*</em></span>
          <input name="name" autoComplete="name" value={values.name} onChange={update} required maxLength={100} placeholder="Your name" />
        </label>
        <label>
          <span>Business email <em>*</em></span>
          <input name="email" type="email" autoComplete="email" value={values.email} onChange={update} required maxLength={254} placeholder="you@company.com" />
        </label>
        <label>
          <span>Company</span>
          <input name="company" autoComplete="organization" value={values.company} onChange={update} maxLength={150} placeholder="Company name" />
        </label>
        <label>
          <span>Country</span>
          <input name="country" autoComplete="country-name" value={values.country} onChange={update} maxLength={100} placeholder="Country" />
        </label>
        <label className="full-field">
          <span>Service of interest <em>*</em></span>
          <select name="interest" value={values.interest} onChange={update} required>
            <option value="">Select a service</option>
            {enquiryInterests.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label className="full-field">
          <span>How can we help? <em>*</em></span>
          <textarea name="message" rows="4" value={values.message} onChange={update} required maxLength={5000} placeholder="Tell us a little about what you're working on..." />
        </label>
      </div>
      <div className="form-bottom">
        <button
          type="submit"
          className="button button-purple"
          disabled={busy}
        >
          {busy ? "Submitting..." : "Submit Enquiry"}

          {!busy && <Icon name="arrow" size={18} />}
        </button>
        <p className="form-privacy">
          Your information will be shared with the Orchlay Solutions
          team solely to respond to your enquiry.
        </p>
      </div>
      {status.type !== 'idle' && <p className={`form-status ${status.type}`} role="status">{status.text}</p>}
    </form>
  )
}
