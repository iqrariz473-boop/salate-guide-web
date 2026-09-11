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
    description: "Share an idea or suggestion with us.",
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
   FAQ DATA
========================================================= */

const FAQS = [
  {
    question: "How accurate are the prayer times?",
    answer:
      "Our prayer times are calculated using reliable astronomical methods and the selected calculation method for your location.",
  },
  {
    question: "Can I search prayer times for another city?",
    answer:
      "Yes. You can search for cities and countries from the Prayer Times section and view their daily and monthly prayer schedules.",
  },
  {
    question: "How does the Qibla finder work?",
    answer:
      "The Qibla finder uses your location to calculate the direction of the Kaaba and can provide a compass-based direction on supported devices.",
  },
  {
    question: "Can I suggest a new feature?",
    answer:
      "Absolutely. Choose Feedback from the contact topics and tell us what you would like to see improved or added.",
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
  const [openFaq, setOpenFaq] = useState(0);

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
     SELECT TOPIC
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
     SUBMIT
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
                Your message has been received successfully.
                We appreciate your feedback and will continue
                working to make Salat Guide more helpful for
                your daily prayer journey.
              </p>

              <button
                type="button"
                className="contact-success__button"
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
     MAIN PAGE
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
        <div className="contact-page__overlay" />

        <div className="container contact-page__content">

          {/* =================================================
              TOP HERO
          ================================================= */}

          <section className="contact-hero">

            <span className="contact-hero__eyebrow">
              GET IN TOUCH
            </span>

            <h1>
              We'd Love to Hear
              <span> From You</span>
            </h1>

            <p>
              Have a question about prayer times, need help
              with the Qibla finder, or simply want to share
              an idea? We're always happy to hear from you.
            </p>

          </section>


          {/* =================================================
              CONTACT AREA
          ================================================= */}

          <section className="contact-main-grid">

            {/* =================================================
                FORM
            ================================================= */}

            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
            >

              <div className="contact-form__heading">

                <span>
                  SEND US A MESSAGE
                </span>

                <h2>
                  How Can We Help?
                </h2>

                <p>
                  Fill in the form below and our team will
                  receive your message.
                </p>

              </div>


              {/* =================================================
                  NAME + EMAIL
              ================================================= */}

              <div className="contact-form__row">

                <div
                  className={`contact-field ${
                    errors.name
                      ? "contact-field--error"
                      : ""
                  }`}
                >

                  <label htmlFor="contact-name">
                    Full Name
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(event) =>
                      handleChange(
                        "name",
                        event.target.value
                      )
                    }
                    aria-invalid={Boolean(errors.name)}
                  />

                  {errors.name && (
                    <span className="contact-error">
                      <span>!</span>
                      {errors.name}
                    </span>
                  )}

                </div>


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
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(event) =>
                      handleChange(
                        "email",
                        event.target.value
                      )
                    }
                    aria-invalid={Boolean(errors.email)}
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
                  aria-invalid={Boolean(errors.subject)}
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
                  placeholder="Tell us how we can help..."
                  value={form.message}
                  onChange={(event) =>
                    handleChange(
                      "message",
                      event.target.value
                    )
                  }
                  aria-invalid={Boolean(errors.message)}
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
                className="contact-submit"
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


              <p className="contact-form__privacy">
                We respect your privacy and will only use
                your information to respond to your message.
              </p>

            </form>


            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <aside className="contact-side">

              {/* =================================================
                  CONTACT CARDS
              ================================================= */}

              <div className="contact-details">

                <div className="contact-detail-card">

                  <div className="contact-detail-card__icon">
                    ☎
                  </div>

                  <div>
                    <span>
                      CALL US
                    </span>

                    <strong>
                      +92 321 9835232
                    </strong>

                    <small>
                      Mon – Fri, 9 AM – 6 PM
                    </small>
                  </div>

                </div>


                <div className="contact-detail-card">

                  <div className="contact-detail-card__icon">
                    ✉
                  </div>

                  <div>
                    <span>
                      EMAIL US
                    </span>

                    <strong>
                      contact@salatguide.com
                    </strong>

                    <small>
                      We reply within 24–48 hours
                    </small>
                  </div>

                </div>


                <div className="contact-detail-card">

                  <div className="contact-detail-card__icon">
                    ◎
                  </div>

                  <div>
                    <span>
                      ONLINE SUPPORT
                    </span>

                    <strong>
                      Salat Guide Community
                    </strong>

                    <small>
                      Questions, feedback & suggestions
                    </small>
                  </div>

                </div>


                <div className="contact-detail-card">

                  <div className="contact-detail-card__icon">
                    ◷
                  </div>

                  <div>
                    <span>
                      OFFICE HOURS
                    </span>

                    <strong>
                      9:00 AM – 6:00 PM
                    </strong>

                    <small>
                      Monday – Friday
                    </small>
                  </div>

                </div>

              </div>


              {/* =================================================
                  QUICK TOPICS
              ================================================= */}

              <div className="contact-topics-box">

                <div className="contact-topics-box__heading">
                  <span>
                    QUICK HELP
                  </span>

                  <h3>
                    Choose a Topic
                  </h3>
                </div>


                <div className="contact-topics">

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

              </div>

            </aside>

          </section>


          {/* =================================================
              FAQ
          ================================================= */}

          <section className="contact-faq">

            <div className="contact-section-heading">

              <span>
                COMMON QUESTIONS
              </span>

              <h2>
                Before You Write
              </h2>

              <p>
                You may find the answer you're looking for
                in these frequently asked questions.
              </p>

            </div>


            <div className="faq-list">

              {FAQS.map((faq, index) => {

                const isOpen =
                  openFaq === index;

                return (
                  <div
                    key={faq.question}
                    className={`faq-item ${
                      isOpen
                        ? "faq-item--open"
                        : ""
                    }`}
                  >

                    <button
                      type="button"
                      className="faq-question"
                      onClick={() =>
                        setOpenFaq(
                          isOpen
                            ? -1
                            : index
                        )
                      }
                    >

                      <span>
                        {faq.question}
                      </span>

                      <span className="faq-icon">
                        {isOpen ? "−" : "+"}
                      </span>

                    </button>


                    {isOpen && (
                      <div className="faq-answer">
                        <p>
                          {faq.answer}
                        </p>
                      </div>
                    )}

                  </div>
                );
              })}

            </div>

          </section>


          {/* =================================================
              NEWSLETTER
          ================================================= */}

          <section className="contact-newsletter">

            <div>

              <span>
                STAY CONNECTED
              </span>

              <h2>
                Prayer & Ramadan Updates
              </h2>

              <p>
                Get useful Islamic reminders, prayer resources,
                and important updates from Salat Guide.
              </p>

            </div>


            <div className="newsletter-form">

              <input
                type="email"
                placeholder="Enter your email address"
              />

              <button type="button">
                Subscribe
              </button>

            </div>

          </section>

        </div>
      </main>
    </>
  );
}

export default Contact;