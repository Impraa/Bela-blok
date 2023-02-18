import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "../styles/pages/Contact.scss";

function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const Roll = require("react-reveal/Roll");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    const formData = new FormData(form.current);
    const formDataAsObject = Object.fromEntries(formData.entries());

    emailjs
      .send(
        "service_f12ewwb",
        "template_zpohk2q",
        formDataAsObject,
        "sEqLHkB2SmXsWMfEl"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Roll left>
      <form className="contact" ref={form} onSubmit={sendEmail}>
        <label className="form-label">Ime</label>
        <input type="text" name="user_name" className="form-control" />
        <label className="form-label">Email</label>
        <input type="email" name="user_email" className="form-control" />
        <label className="form-label">Poruka</label>
        <textarea name="message" className="form-textarea" />
        <input type="submit" value="Pošalji e-mail" className="form-button" />
      </form>
    </Roll>
  );
}

export default Contact;
