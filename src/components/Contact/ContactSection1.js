"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./contactSection1.module.css";

gsap.registerPlugin(ScrollTrigger);

const ContactSection1 = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoCardsRef = useRef([]);

  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form: "contact-us",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        console.error("Contact form submission failed", err);
        window.alert(err?.error || "Unable to send message right now. Please try again.");
        return;
      }

      window.alert("Message sent. We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    let mm;
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 768px)",
          isDesktop: "(min-width: 769px)",
        },
        (context) => {
          const { isMobile } = context.conditions;
          const headingY = isMobile ? 36 : 80;
          const subHeadingY = isMobile ? 26 : 60;
          const cardY = isMobile ? 18 : 50;

          // Image animation
          gsap.fromTo(
            ".contactImage",
            { scale: 0.9, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".contactSection",
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
              },
            },
          );

          gsap.fromTo(
            ".contactHeading",
            { y: headingY, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".contactSection",
                start: "top 80%",
                toggleActions: "play none none none",
                once: true,
              },
            },
          );

          gsap.fromTo(
            ".contactSubHeading",
            { y: subHeadingY, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".contactSection",
                start: "top 75%",
                toggleActions: "play none none none",
                once: true,
              },
            },
          );

          gsap.fromTo(
            ".contactCard",
            { y: cardY, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.14,
              scrollTrigger: {
                trigger: ".contactCardsWrap",
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
              },
            },
          );
        },
      );
    }, sectionEl);

    return () => {
      mm?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className={`${styles.section} contactSection`}>
      {/* Background Effects */}
      <div className={styles.bgGradient1}></div>
      <div className={styles.bgGradient2}></div>

      {/* Hero Image — now using <img> */}
      <div className={`${styles.imageContainer} contactImage`}>
        <img
          src="/contactbg.jpeg"
          alt="Contact Us"
          className={styles.heroImage}
          loading="eager"
          decoding="async"
        />

        <p className={`${styles.parawords}`}>
          Start Your <span className={`${styles.highlight2}`}>Financial</span>{" "}
          Learning Journey <br />
          <span className={`${styles.parawords1}`}>
            Reach out to NIFASE for expert guidance in finance and stock market
            education.
          </span>
        </p>

        {/* Green animated scroll indicator
        <div
          style={{
            position: "absolute",
            bottom: "52px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "68px",
            height: "68px",
            borderRadius: "50%",
            backgroundColor: "#00C853", // Material green 400
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            animation: "bounce 2s infinite",
            zIndex: 10,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              color: "white",
              animation: "pulseArrow 2s infinite",
            }}
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div> */}

        <div className={`${styles.imageshade}`}></div>

        {/* Inline keyframe animations */}
        <style jsx>{`
          @keyframes bounce {
            0%,
            20%,
            50%,
            80%,
            100% {
              transform: translateX(-50%) translateY(0);
            }
            40% {
              transform: translateX(-50%) translateY(-10px);
            }
            60% {
              transform: translateX(-50%) translateY(-5px);
            }
          }

          @keyframes pulseArrow {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            div[style*="position: absolute"] {
              bottom: 24px;
              width: 40px;
              height: 40px;
            }
            div[style*="position: absolute"] svg {
              width: 16px;
              height: 16px;
            }
          }

          @media (max-width: 480px) {
            div[style*="position: absolute"] {
              bottom: 16px;
              width: 36px;
              height: 36px;
            }
            div[style*="position: absolute"] svg {
              width: 14px;
              height: 14px;
            }
          }
        `}</style>
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            Get In Touch
          </div>
          <h1 className={`${styles.title} contactHeading`}>
            Let's Start a <span className={styles.highlight}>Conversation</span>
          </h1>
          <p className={`${styles.subtitle} contactSubHeading`}>
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        {/* content grid */}
        <div className={styles.grid}>
          {/* Contact Form */}
          <div ref={formRef} className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form} aria-busy={submitting}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="+91 9876543210"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="Tell us more about your inquiry..."
                  rows="6"
                  required
                />
              </div>

              <button type="submit" className={styles.submitButton} disabled={submitting}>
                <span>Send Message</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14m0 0l-6-6m6 6l-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Contact Info Cards */}
          <div className={styles.infoContainer}>
            {/* Email Card */}
            <div
              ref={(el) => (infoCardsRef.current[0] = el)}
              className={styles.infoCard}
            >
              <div className={styles.iconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className={styles.infoTitle}>Email Us</h3>
              <p className={styles.infoText}>info@nifase.com</p>
              {/* <p className={styles.infoText}>hello@linkify.com</p> */}
            </div>

            {/* Phone Card */}
            <div
              ref={(el) => (infoCardsRef.current[1] = el)}
              className={styles.infoCard}
            >
              <div className={styles.iconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className={styles.infoTitle}>Call Us</h3>
              <p className={styles.infoText}>+91 8743912102</p>
              <p className={styles.infoText}>Mon-Sat 10am-6pm IST</p>
            </div>

            {/* Location Card */}
            <a
              ref={(el) => (infoCardsRef.current[2] = el)}
              className={styles.infoCard}
              href="https://maps.app.goo.gl/ZAyPynLT9YD6KLpf7"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open location in Google"
            >
              <div className={styles.iconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className={styles.infoTitle}>Visit Us</h3>
              <p className={styles.infoText}>
                Savitri Cinema Complex, Block E, Greater Kailash II, Greater
                Kailash
              </p>
              <p className={styles.infoText}> New Delhi, Delhi 110048</p>
            </a>

            {/* Social Card */}
            <div
              ref={(el) => (infoCardsRef.current[3] = el)}
              className={styles.infoCard}
            >
              <h3 className={styles.infoTitle}>Follow Us</h3>
              <div className={styles.socialLinks}>
                <a
                  href="https://www.facebook.com/profile.php?id=61586810825429"
                  className={styles.socialLink}
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className={styles.socialLink}
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="2"
                      y="9"
                      width="4"
                      height="12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="4"
                      cy="4"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/nifase.official?igsh=ZTJkb2R1aHZ3b3Vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                      ry="5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.5 6.5h.01"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
                <a
                  href="https://wa.me/918743912102"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 3.5a8.5 8.5 0 00-7.3 12.9L4 21l4.8-1.3A8.5 8.5 0 1012 3.5z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 9.2c.2-.5.6-.7 1.1-.7h.6c.4 0 .8.2 1 .6l.8 1.8c.2.4.1.9-.2 1.2l-.8.8c.6 1.1 1.5 2 2.6 2.6l.8-.8c.3-.3.8-.4 1.2-.2l1.8.8c.4.2.6.6.6 1v.6c0 .5-.2.9-.7 1.1-.8.3-1.8.3-2.6 0-1.7-.6-3.2-1.6-4.5-2.9-1.3-1.3-2.3-2.8-2.9-4.5-.3-.8-.3-1.8 0-2.6z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Map
            <div className={styles.mapBleed}>
                <div className={styles.mapShell}>
                    <iframe
                        className={styles.mapFrame}
                        title="National Institute of Finance and Stock Education"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps?q=28.5415141,77.240201&z=17&output=embed"
                        allowFullScreen
                    />
                </div>
            </div> */}
    </div>
  );
};

export default ContactSection1;
