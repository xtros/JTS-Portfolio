import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle } from 'lucide-react';
import './Contact.css';

// To receive real emails from this form:
// 1. Create a free account at https://formspree.io/
// 2. Create a form and paste its endpoint URL below:
const FORM_ENDPOINT = "https://formspree.io/f/mgogeypz"; // e.g., "https://formspree.io/f/your_form_id"

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    category: 'Web Development',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (FORM_ENDPOINT) {
      setIsSubmitting(true);
      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          setIsSubmitted(true);
        } else {
          alert("Submission failed. Please check your FORM_ENDPOINT configuration.");
        }
      } catch (error) {
        console.error("Form submission error:", error);
        alert("A network error occurred. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Simulate submission in development when no endpoint is configured
      setIsSubmitted(true);
    }
  };

  return (
    <div className="contact-page animate-fade-in">
      <header className="contact-header border-bottom">
        <div className="container contact-header-container">
          <span className="section-number reveal">004 / INQUIRIES</span>
          <h1 className="contact-title reveal delay-1">GET IN TOUCH</h1>
          <p className="contact-subtitle reveal delay-2">
            Submit a job request, pick a design project framework, or inquire about automation tools.
          </p>
        </div>
      </header>

      <section className="contact-form-section">
        <div className="container form-layout-container">
          {isSubmitted ? (
            <div className="success-message">
              <CheckCircle size={48} className="success-icon" />
              <h2>MESSAGE TRANSMITTED</h2>
              <p>Thank you, {formData.firstName}. Your inquiry regarding {formData.category} has been received. JTS will get back to you shortly.</p>
              <button className="btn-outline" onClick={() => setIsSubmitted(false)}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-grid">
                <div className="form-group reveal">
                  <label htmlFor="firstName" className="form-label">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="Enter first name"
                  />
                </div>

                <div className="form-group reveal">
                  <label htmlFor="lastName" className="form-label">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="Enter last name"
                  />
                </div>

                <div className="form-group full-width reveal">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="Enter email address"
                  />
                </div>

                <div className="form-group full-width reveal">
                  <label htmlFor="category" className="form-label">What are you looking to build?</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Web Development">Web Development (React, PHP, Django)</option>
                    <option value="Bot Development">Bot Development (Discord/Telegram Bot)</option>
                    <option value="Automation">Automation & AI workflows (Python Scripts)</option>
                    <option value="Other">Other General Work</option>
                  </select>
                </div>

                <div className="form-group full-width reveal">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="6"
                    required
                    placeholder="Describe your project, timeline, and goals..."
                  ></textarea>
                </div>
              </div>

              <div className="form-submit-row reveal">
                <button type="submit" className="btn-outline submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Transmitting...' : 'Submit Inquiry'} <ArrowUpRight size={18} />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
