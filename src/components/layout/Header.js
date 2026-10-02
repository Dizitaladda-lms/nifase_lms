'use client'
import React, { useState, useEffect } from 'react';
import styles from './header.module.css';
import CoursePopupForm from "@/components/CoursePopupForm";
import CountrySelector from "./CountrySelector";

const MenuToggleIcon = ({ open }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.menuIcon}
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  );
};

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [leadOpen, setLeadOpen] = useState(false);

  const navLinks = [
    { title: 'Home', href: '/' },
    {
      title: 'Blog',href: '/blog'
      // menu: [
      //   { title: 'Support', href: '#support', tagline: 'Get help when you need it' },
      //   { title: 'FAQ', href: '#faq', tagline: 'Common questions answered' },
      //   { title: 'Documentation', href: '#docs', tagline: 'Detailed guides and docs' },
      //   { title: 'Blog', href: '#blog', tagline: 'Latest news and updates' },
      // ]
    },
    // { title: 'Contact', href: '/contact-us' },
    { title: 'About', href: '/about' },
    { title: 'Courses', href: '/courses' },
  ];

  const handleScroll = () => {
    setScroll(window.scrollY > 8);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleDropdown = (title) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  return (
    <header className={`${styles.header} ${scroll ? styles.headerScrolled : ''}`}>
      <div className={styles.maxWidth}>
        <div className={styles.container}>
          {/* Logo */}
          <div className={styles.leftSection}>
            <a href="/#home" className={styles.logo}>
              <img src="/NIFASE_Logo-removebg-preview.png" alt="Nifase Logo" className={styles.logoImg} height="40" />
            </a>

            {/* Desktop Navigation */}
            <nav className={styles.desktopNav}>
              {navLinks.map((link) => (
                <div key={link.title} className={styles.navItem}>
                  {link.menu ? (
                    <div className={styles.dropdown}>
                      <button className={styles.navLink}>
                        {link.title}
                        <svg className={styles.chevron} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
                        </svg>
                      </button>
                      <div className={styles.dropdownContent}>
                        <div className={styles.dropdownGrid}>
                          {link.title === 'Features' && (
                            <div className={styles.featuredItem}>
                              <a href="/" className={styles.featuredLink}>
                                <h6 className={styles.featuredTitle}>All Features</h6>
                                <p className={styles.featuredTagline}>
                                  Manage links, track performance, and more.
                                </p>
                              </a>
                            </div>
                          )}
                          {link.menu.map((item) => (
                            <a key={item.title} href={item.href} className={styles.dropdownItem}>
                              <div className={styles.dropdownItemTitle}>{item.title}</div>
                              <p className={styles.dropdownItemTagline}>{item.tagline}</p>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a href={link.href} className={styles.navLink}>
                      {link.title}
                    </a>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Desktop Auth Buttons & Country Selector */}
          <div className={styles.desktopAuth}>
            <CountrySelector />
            <a href="/contact-us" className={styles.signInBtn}>
              Contact
            </a>
            <button
              type="button"
              className={styles.getStartedBtn}
              onClick={() => setLeadOpen(true)}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <MenuToggleIcon open={mobileMenuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            {/* Mobile Auth Buttons & Country Selector */}
            <div className={styles.mobileAuthButtons}>
              <CountrySelector />
              <a href="/contact-us" className={styles.mobileSignInBtn}>
                Contact
              </a>
              <button
                type="button"
                className={styles.mobileGetStartedBtn}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLeadOpen(true);
                }}
              >
                Get Started
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className={styles.mobileNavLinks}>
              {navLinks.map((link) => (
                <div key={link.title} className={styles.mobileNavItem}>
                  {link.menu ? (
                    <>
                      <button
                        className={styles.mobileNavTrigger}
                        onClick={() => toggleDropdown(link.title)}
                      >
                        <span>{link.title}</span>
                        <svg
                          className={`${styles.mobileChevron} ${openDropdown === link.title ? styles.mobileChevronOpen : ''}`}
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
                        </svg>
                      </button>
                      {openDropdown === link.title && (
                        <div className={styles.mobileDropdownContent}>
                          {link.menu.map((item) => (
                            <a
                              key={item.title}
                              href={item.href}
                              className={styles.mobileDropdownItem}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className={styles.mobileDropdownTitle}>{item.title}</div>
                              <p className={styles.mobileDropdownTagline}>{item.tagline}</p>
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={link.href}
                      className={styles.mobileNavLink}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.title}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <CoursePopupForm open={leadOpen} onClose={() => setLeadOpen(false)} />
    </header>
  );
};

export default Header;