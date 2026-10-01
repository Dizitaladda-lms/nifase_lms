"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./footer2.module.css";

const DEFAULT_FOOTER_HEIGHT_PX = 700;

export default function FixedFooterReveal({ children }) {
  const footerRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(DEFAULT_FOOTER_HEIGHT_PX);
  const mapSrc =
    "https://www.google.com/maps?q=28.5415141,77.240201&z=17&output=embed";

  useEffect(() => {
    const footerEl = footerRef.current;
    if (!footerEl) return;

    const updateHeight = () => {
      const next = Math.ceil(footerEl.getBoundingClientRect().height);
      if (Number.isFinite(next) && next > 0) setFooterHeight(next);
    };

    updateHeight();

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(footerEl);
    }

    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <div
      className={styles.revealRoot}
      style={{ "--footer-h": `${footerHeight}px` }}
    >
      <div className={styles.content}>{children}</div>

      <footer
        ref={footerRef}
        className={styles.footer}
        aria-label="NIFASE footer"
      >
        <div className={styles.inner}>
          <div className={styles.top}>
            <div className={styles.leftColumn}>
              <div className={styles.brandBlock}>
                <div className={styles.wordmark} aria-label="NIFASE">
                  NIFASE
                </div>
                <div className={styles.subwordmark}>
                  National Institute of Finance and Stock Education
                </div>
              </div>

              <div className={styles.mapBlock} aria-label="Company location">
                <div className={styles.mapWrap}>
                  <iframe
                    className={styles.map}
                    src={mapSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="National Institute of Finance and Stock Education"
                  />
                </div>
              </div>

              <div className={styles.bottom}>
                <div className={styles.social} aria-label="Social links">
                  <a className={styles.iconLink} href="#" aria-label="LinkedIn" target=" ">
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M20.45 20.45h-3.55v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.65H9.38V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"
                      />
                    </svg>
                  </a>
                  <a className={styles.iconLink} href="https://www.instagram.com/nifase.official?igsh=ZTJkb2R1aHZ3b3Vn" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm0 2A1.5 1.5 0 1 0 13.5 12 1.5 1.5 0 0 0 12 10.5zM18 6.75a.75.75 0 1 1-.75.75.75.75 0 0 1 .75-.75z"
                      />
                    </svg>
                  </a>
                  <a className={styles.iconLink} href="https://www.youtube.com/@nifase.official" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M21.6 7.2a3 3 0 0 0-2.1-2.12C17.64 4.5 12 4.5 12 4.5s-5.64 0-7.5.58A3 3 0 0 0 2.4 7.2 31.3 31.3 0 0 0 2 12a31.3 31.3 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.12c1.86.58 7.5.58 7.5.58s5.64 0 7.5-.58a3 3 0 0 0 2.1-2.12A31.3 31.3 0 0 0 22 12a31.3 31.3 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z"
                      />
                    </svg>
                  </a>
                  <a className={styles.iconLink} href="https://www.facebook.com/profile.php?id=61586810825429" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.24-1.46 1.5-1.46H16.7V5c-.3-.04-1.35-.12-2.57-.12-2.54 0-4.28 1.55-4.28 4.4V11H7.3v3h2.55v8h3.65z"
                      />
                    </svg>
                  </a>
                </div>

                <div className={styles.note}>
                  <div className={styles.noteLine}>Proudly created in India.</div>
                  <div className={styles.noteLine}>
                    All Right Reserved, All Wrong Reversed.
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.linksColumns}>
              <div className={styles.linkColumn}>
                <h3 className={styles.columnTitle}>Our Company</h3>
                <nav className={styles.columnLinks}>
                  <Link className={styles.columnLink} href="/">
                    Home
                  </Link>
                  <Link className={styles.columnLink} href="/about">
                    About
                  </Link>
                  <Link className={styles.columnLink} href="/blog">
                    Blog
                  </Link>
                  <Link className={styles.columnLink} href="/contact-us">
                    Contact
                  </Link>
                  {/* ✅ Privacy Policy link added here */}
                  <Link className={styles.columnLink} href="/privacy">
                    Privacy Policy
                  </Link>
                    <Link className={styles.columnLink} href="/disclaimer">
                   Disclaimer
                  </Link>
                </nav>
              </div>

              <div className={styles.linkColumn}>
                <h3 className={styles.columnTitle}>Courses</h3>
                <nav className={styles.columnLinks}>
                  <Link className={styles.columnLink} href="/courses/certificate-in-stock-markets">
                    Certificate in Stock Markets
                  </Link>
                  <Link className={styles.columnLink} href="/courses/adfmm">
                    Advance Diploma (ADFMM)
                  </Link>
                  <Link className={styles.columnLink} href="/courses/technical-course-for-professional-traders">
                    Technical Analysis
                  </Link>
                  <Link className={styles.columnLink} href="/courses/fundamental-course-for-traders">
                    Fundamental Analysis
                  </Link>
                  <Link className={styles.columnLink} href="/courses/option-strategies-course">
                    Options Trading
                  </Link>
                  <Link className={styles.columnLink} href="/courses/investment-analyst-portfolio-management-program">
                    Portfolio Management
                  </Link>
                </nav>
              </div>
            </div>

            <div className={styles.emptyColumn}>
              <h3 className={styles.columnTitle}>Contact us</h3>
              <p className={styles.addresstext}>
                Savitri Cinema Complex, Block E, Greater Kailash II, Greater
                Kailash, New Delhi, Delhi 110048
              </p>
              <a href="tel:+918743912102" className={styles.phn}>
                +91 8743912102
              </a>
              <br />
              <a href="mailto:info@nifase.com" className={styles.gmail}>
                info@nifase.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}