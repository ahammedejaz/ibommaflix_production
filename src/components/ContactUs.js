import React, { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
  };

  return (
    <div className="contact-container" id="contact-us">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Your Email" required onChange={handleChange} />
        <textarea name="message" placeholder="Your Message" required onChange={handleChange}></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactUs;