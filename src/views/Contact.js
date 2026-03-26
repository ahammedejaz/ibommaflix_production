"use client";
import React, { useState } from "react";
import CustomNavbar from "../components/Navbar";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`iBommaFlix Contact: ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:contact@ibommaflix.com?subject=${subject}&body=${body}`;
  };

  return (
    <div>
      <CustomNavbar />
      <div className="contact-page-container">
        <h1 className="contact-page-title">Contact Us</h1>
        <p className="contact-page-subtitle">Have a question or feedback? We'd love to hear from you.</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="contact-name" className="sr-only">Name</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="contact-email" className="sr-only">Email</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="contact-message" className="sr-only">Message</label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
          />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
