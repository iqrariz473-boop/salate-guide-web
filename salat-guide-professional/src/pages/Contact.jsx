import { useState } from "react";
import Seo from "../components/Seo.jsx";
import PageBanner from "../components/PageBanner.jsx";
import { MailIcon, CheckIcon } from "../components/Icons.jsx";
import contactBanner from "../assets/images/contact-banner.jpg";

import "./pages.css";
import "./Contact.css";

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!form.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.subject.trim()) {
    errors.subject = "Please enter a subject.";
  }

  if (!form.message.trim()) {
    errors.message = "Please enter your message.";
  } else if (form.message.trim().length < 10) {
    errors.message = "Your message should be at least 10 characters.";
  }

  return errors;
}

function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function handleChange(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((previous) => ({
        ...previous,
        [field]: "",
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate(form);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
      setForm(INITIAL_FORM);
      setErrors({});
    }, 900);
  }

  function handleNewMessage() {
    setStatus("idle");
    setForm(INITIAL_FORM);
    setErrors({});
  }

  if (status === "success") {
    return (
      <>
        <Seo
          title="Contact"
          description="Get in touch with the Salat Guide team."
        />

        <PageBanner
          image={contactBanner}
          icon={MailIcon}
          title="Contact Us"
          description="We're here to listen and help."
          variant="light"
        />

        <main className="contact-page">
          <div className="container">
            <div className="contact-success">
              <div className="contact-success__icon">
                <CheckIcon width={34} height={34} />
              </div>

              <span className="contact-success__small">
                MESSAGE SENT
              </span>

              <h2>Thank You for Reaching Out</h2>

              <p>
                Your message has been received successfully. We appreciate
                your feedback and will continue working to make Salat Guide
                more helpful for your daily prayer journey.
              </p>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNewMessage}
              >
                <MailIcon width={17} height={17} />
                Send Another Message
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with the Salat Guide team."
      />

      <PageBanner
        image={contactBanner}
        icon={MailIcon}
        title="Contact Us"
        description="Questions, suggestions, or feedback? We're here to help."
        variant="light"
      />

      <main className="contact-page">
        <div className="container">

          {/* Intro */}
          <section className="contact-intro">
            <span className="contact-intro__label">
              GET IN TOUCH
            </span>

            <h2>We'd Love to Hear From You</h2>

            <p>
              Have a question about prayer times, Qibla direction, or any
              Salat Guide feature? Send us a message and share your thoughts.
            </p>
          </section>

          {/* Main Contact Area */}
          <section className="contact-wrapper">

            {/* Left Content */}
            <div className="contact-info">

              <div className="contact-info__top">
                <div className="contact-info__icon">
                  <MailIcon width={25} height={25} />
                </div>

                <span>CONTACT SALAT GUIDE</span>
              </div>

              <h2>
                Your Questions
                <br />
                <strong>Matter to Us.</strong>
              </h2>

              <p className="contact-info__description">
                We're always happy to hear from our users. Whether you have
                feedback, found something that needs improvement, or simply
                have a question, feel free to reach out.
              </p>

              <div className="contact-info__line" />

              <div className="contact-feature">
                <div className="contact-feature__number">
                  01
                </div>

                <div>
                  <h4>Questions & Support</h4>
                  <p>
                    Ask anything about using Salat Guide.
                  </p>
                </div>
              </div>

              <div className="contact-feature">
                <div className="contact-feature__number">
                  02
                </div>

                <div>
                  <h4>Share Feedback</h4>
                  <p>
                    Tell us how we can improve your experience.
                  </p>
                </div>
              </div>

              <div className="contact-feature">
                <div className="contact-feature__number">
                  03
                </div>

                <div>
                  <h4>Report an Issue</h4>
                  <p>
                    Help us identify and fix problems.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Form */}
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
            >

              <div className="contact-form__heading">
                <span>WRITE TO US</span>

                <h2>Send a Message</h2>

                <p>
                  Complete the form below and we'll receive your message.
                </p>
              </div>

              {/* Name */}
              <div
                className={`contact-field ${
                  errors.name ? "contact-field--error" : ""
                }`}
              >
                <label htmlFor="contact-name">
                  Name
                </label>

                <input
                  id="contact-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(event) =>
                    handleChange("name", event.target.value)
                  }
                  aria-invalid={Boolean(errors.name)}
                />

                {errors.name && (
                  <span className="contact-error">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div
                className={`contact-field ${
                  errors.email ? "contact-field--error" : ""
                }`}
              >
                <label htmlFor="contact-email">
                  Email Address
                </label>

                <input
                  id="contact-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={form.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  aria-invalid={Boolean(errors.email)}
                />

                {errors.email && (
                  <span className="contact-error">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Subject */}
              <div
                className={`contact-field ${
                  errors.subject ? "contact-field--error" : ""
                }`}
              >
                <label htmlFor="contact-subject">
                  Subject
                </label>

                <input
                  id="contact-subject"
                  type="text"
                  placeholder="What is your message about?"
                  value={form.subject}
                  onChange={(event) =>
                    handleChange("subject", event.target.value)
                  }
                  aria-invalid={Boolean(errors.subject)}
                />

                {errors.subject && (
                  <span className="contact-error">
                    {errors.subject}
                  </span>
                )}
              </div>

              {/* Message */}
              <div
                className={`contact-field ${
                  errors.message ? "contact-field--error" : ""
                }`}
              >
                <label htmlFor="contact-message">
                  Message
                </label>

                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={(event) =>
                    handleChange("message", event.target.value)
                  }
                  aria-invalid={Boolean(errors.message)}
                />

                {errors.message && (
                  <span className="contact-error">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary contact-submit"
                disabled={status === "submitting"}
              >
                <MailIcon width={17} height={17} />

                {status === "submitting"
                  ? "Sending..."
                  : "Send Message"}
              </button>

              <p className="contact-form__note">
                We appreciate your time and feedback.
              </p>

            </form>
          </section>

        </div>
      </main>
    </>
  );
}

export default Contact;