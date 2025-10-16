import { useState, useRef } from "react";
import emailjs from "emailjs-com";
import '../Styles/Contact.css';

const Contact = () => {
  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .sendForm(
        "service_qbhimqu",   // your EmailJS service ID
        "template_0fa0ve4",  // your EmailJS template ID
        form.current,
        "RnTz3vgezSLZiSTYj"  // your EmailJS public key
      )
      .then(() => {
        setStatus("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch(() => {
        setStatus("Failed to send message. Try again later.");
      });
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p className="contact-subtitle">
        Have questions or feedback? We'd love to hear from you!
      </p>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <div className="info-item">
            <h3>Email</h3>
            <p>90score.ke@gmail.com</p>
          </div>
          <div className="info-item">
            <h3>Follow Us</h3>
            <p>@90Scores on Twitter</p>
          </div>
        </div>

        <form ref={form} className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Send Message
          </button>

          {status && <p className="status-message">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
