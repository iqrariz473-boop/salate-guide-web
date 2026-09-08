import { useState } from "react";

import Seo from "../components/Seo.jsx";

import {
  MailIcon,
  CheckIcon,
} from "../components/Icons.jsx";

import contactBanner from "../assets/images/contact-banner.jpg";

import "./pages.css";
import "./Contact.css";

/* =========================================================
   INITIAL FORM
========================================================= */

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

/* =========================================================
   CONTACT TOPICS
========================================================= */

const CONTACT_TOPICS = [
  {
    number: "01",
    title: "Prayer Times",
    description: "Questions about prayer timings or locations.",
    subject: "Prayer Times",
  },
  {
    number: "02",
    title: "Qibla Direction",
    description: "Need help with the Qibla finder or compass?",
    subject: "Qibla Direction",
  },
  {
    number: "03",
    title: "Feedback",
    description: "Share an idea or tell us how we can improve.",
    subject: "Feedback",
  },
  {
    number: "04",
    title: "Report an Issue",
    description: "Found something that isn't working correctly?",
    subject: "Report an Issue",
  },
];

/* =========================================================
   EMAIL VALIDATION
========================================================= */

const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* =========================================================
   FORM VALIDATION
========================================================= */

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
    errors.message =
      "Your message should be at least 10 characters.";
  }

  return errors;
}

/* =========================================================
   CONTACT PAGE
========================================================= */

function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  /* =======================================================
     HANDLE INPUT CHANGE
  ======================================================= */

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

  /* =======================================================
     SELECT CONTACT TOPIC
  ======================================================= */

  function handleTopicSelect(subject) {
    setForm((previous) => ({
      ...previous,
      subject,
    }));

    if (errors.subject) {
      setErrors((previous) => ({
        ...previous,
        subject: "",
      }));
    }
  }

  /* =======================================================
     HANDLE FORM SUBMIT
  ======================================================= */

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

  /* =======================================================
     NEW MESSAGE
  ======================================================= */

  function handleNewMessage() {
    setStatus("idle");
    setForm(INITIAL_FORM);
    setErrors({});
  }

  /* =========================================================
     SUCCESS SCREEN
  ========================================================= */

  if (status === "success") {
    return (
      <>
        <Seo
          title="Contact"
          description="Get in touch with the Salat Guide team."
        />

        <main
          className="contact-page"
          style={{
            "--contact-bg": `url(${contactBanner})`,
          }}
        >
          <div className="contact-page__overlay" />

          <div className="container contact-page__content">
            <section className="contact-success">
              <div className="contact-success__icon">
                <CheckIcon
                  width={34}
                  height={34}
                />
              </div>

              <span className="contact-success__small">
                MESSAGE SENT
              </span>

              <h1>
                Thank You for Reaching Out
              </h1>

              <p>
                Your message has been received
                successfully. We appreciate your
                feedback and will continue working
                to make Salat Guide more helpful
                for your daily prayer journey.
              </p>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNewMessage}
              >
                <MailIcon
                  width={17}
                  height={17}
                />

                Send Another Message
              </button>
            </section>
          </div>
        </main>
      </>
    );
  }

  /* =========================================================
     MAIN CONTACT PAGE
  ========================================================= */

  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with the Salat Guide team."
      />

      <main
        className="contact-page"
        style={{
          "--contact-bg": `url(${contactBanner})`,
        }}
      >
        {/* =================================================
            BACKGROUND OVERLAY
        ================================================= */}

        <div className="contact-page__overlay" />

        <div className="container contact-page__content">

          {/* =================================================
              CONTACT HEADER
          ================================================= */}

          <section className="contact-header">

            <div className="contact-header__icon">
              <MailIcon
                width={28}
                height={28}
              />
            </div>

            <div className="contact-header__content">

              <span className="contact-header__label">
                SALAT GUIDE
              </span>

              <h1>
                Contact Us
              </h1>

              <p>
                Questions, suggestions, or feedback?
                We're here to listen and help.
              </p>

            </div>
          </section>

          {/* =================================================
              CONTACT GRID
          ================================================= */}

          <section className="contact-wrapper">

            {/* =================================================
                LEFT ISLAMIC PANEL
            ================================================= */}

            <div className="contact-info">

              <div className="contact-info__top">

                <div className="contact-info__icon">
                  <MailIcon
                    width={25}
                    height={25}
                  />
                </div>

                <span>
                  CONTACT SALAT GUIDE
                </span>

              </div>

              <h2>
                Your Questions
                <br />

                <strong>
                  Matter to Us.
                </strong>
              </h2>

              <p className="contact-info__description">
                We're always happy to hear from
                our users. Whether you have feedback,
                found something that needs improvement,
                or simply have a question, feel free
                to reach out.
              </p>

              <div className="contact-info__line" />

              {/* =================================================
                  TOPICS
              ================================================= */}

              <div className="contact-topics">

                <span className="contact-topics__label">
                  CHOOSE A TOPIC
                </span>

                {CONTACT_TOPICS.map((topic) => (
                  <button
                    key={topic.number}
                    type="button"
                    className={`contact-topic ${
                      form.subject === topic.subject
                        ? "contact-topic--active"
                        : ""
                    }`}
                    onClick={() =>
                      handleTopicSelect(
                        topic.subject
                      )
                    }
                  >

                    <span className="contact-topic__number">
                      {topic.number}
                    </span>

                    <span className="contact-topic__content">

                      <strong>
                        {topic.title}
                      </strong>

                      <small>
                        {topic.description}
                      </small>

                    </span>

                    <span className="contact-topic__arrow">
                      →
                    </span>

                  </button>
                ))}

              </div>

              {/* =================================================
                  ISLAMIC MESSAGE
              ================================================= */}

              <div className="contact-quote">

                <span className="contact-quote__symbol">
                  ✦
                </span>

                <p>
                  Every message matters.
                  Your feedback helps us build
                  a more useful prayer companion.
                </p>

              </div>

            </div>

            {/* =================================================
                RIGHT FORM
            ================================================= */}

            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
            >

              <div className="contact-form__heading">

                <span>
                  WRITE TO US
                </span>

                <h2>
                  Send a Message
                </h2>

                <p>
                  Complete the form below and
                  we'll receive your message.
                </p>

              </div>

              {/* =================================================
                  NAME + EMAIL
              ================================================= */}

              <div className="contact-form__row">

                {/* NAME */}

                <div
                  className={`contact-field ${
                    errors.name
                      ? "contact-field--error"
                      : ""
                  }`}
                >

                  <label htmlFor="contact-name">
                    Your Name
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(event) =>
                      handleChange(
                        "name",
                        event.target.value
                      )
                    }
                    aria-invalid={Boolean(
                      errors.name
                    )}
                  />

                  {errors.name && (
                    <span className="contact-error">
                      <span>!</span>
                      {errors.name}
                    </span>
                  )}

                </div>

                {/* EMAIL */}

                <div
                  className={`contact-field ${
                    errors.email
                      ? "contact-field--error"
                      : ""
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
                      handleChange(
                        "email",
                        event.target.value
                      )
                    }
                    aria-invalid={Boolean(
                      errors.email
                    )}
                  />

                  {errors.email && (
                    <span className="contact-error">
                      <span>!</span>
                      {errors.email}
                    </span>
                  )}

                </div>

              </div>

              {/* =================================================
                  SUBJECT
              ================================================= */}

              <div
                className={`contact-field ${
                  errors.subject
                    ? "contact-field--error"
                    : ""
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
                    handleChange(
                      "subject",
                      event.target.value
                    )
                  }
                  aria-invalid={Boolean(
                    errors.subject
                  )}
                />

                {errors.subject && (
                  <span className="contact-error">
                    <span>!</span>
                    {errors.subject}
                  </span>
                )}

              </div>

              {/* =================================================
                  MESSAGE
              ================================================= */}

              <div
                className={`contact-field ${
                  errors.message
                    ? "contact-field--error"
                    : ""
                }`}
              >

                <div className="contact-message-label">

                  <label htmlFor="contact-message">
                    Message
                  </label>

                  <span>
                    {form.message.length}/500
                  </span>

                </div>

                <textarea
                  id="contact-message"
                  rows={6}
                  maxLength={500}
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={(event) =>
                    handleChange(
                      "message",
                      event.target.value
                    )
                  }
                  aria-invalid={Boolean(
                    errors.message
                  )}
                />

                {errors.message && (
                  <span className="contact-error">
                    <span>!</span>
                    {errors.message}
                  </span>
                )}

              </div>

              {/* =================================================
                  SUBMIT
              ================================================= */}

              <button
                type="submit"
                className="btn btn-primary contact-submit"
                disabled={status === "submitting"}
              >

                <MailIcon
                  width={18}
                  height={18}
                />

                {status === "submitting"
                  ? "Sending..."
                  : "Send Message"}

              </button>

              <div className="contact-form__note">

                <span />

                <p>
                  We appreciate your time
                  and feedback.
                </p>

                <span />

              </div>

            </form>

          </section>

        </div>
      </main>
    </>
  );
}

export default Contact;