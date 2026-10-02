"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./header.module.css";

const COUNTRIES = [
  { code: "IN", name: "India", flag: "🇮🇳", lang: "en", label: "English" },
  { code: "US", name: "United States", flag: "🇺🇸", lang: "en", label: "English" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", lang: "en", label: "English" },
  { code: "AE", name: "UAE", flag: "🇦🇪", lang: "ar", label: "العربية" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", lang: "ar", label: "العربية" },
  { code: "FR", name: "France", flag: "🇫🇷", lang: "fr", label: "Français" },
  { code: "DE", name: "Germany", flag: "🇩🇪", lang: "de", label: "Deutsch" },
  { code: "ES", name: "Spain", flag: "🇪🇸", lang: "es", label: "Español" },
  { code: "IT", name: "Italy", flag: "🇮🇹", lang: "it", label: "Italiano" },
  { code: "JP", name: "Japan", flag: "🇯🇵", lang: "ja", label: "日本語" },
  { code: "CN", name: "China", flag: "🇨🇳", lang: "zh-CN", label: "中文" },
  { code: "RU", name: "Russia", flag: "🇷🇺", lang: "ru", label: "Русский" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", lang: "pt", label: "Português" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", lang: "ko", label: "한국어" },
];

export default function CountrySelector() {
  const [selected, setSelected] = useState(COUNTRIES[0]); // Default India
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Read saved country preference
    const savedCode = localStorage.getItem("nifase_user_country");
    if (savedCode) {
      const match = COUNTRIES.find((c) => c.code === savedCode);
      if (match) {
        setSelected(match);
      }
    }
  }, []);

  useEffect(() => {
    // Load Google Translate script dynamically if not present
    if (!document.getElementById("google-translate-script")) {
      const addScript = document.createElement("script");
      addScript.id = "google-translate-script";
      addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(addScript);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (country) => {
    setSelected(country);
    setOpen(false);
    localStorage.setItem("nifase_user_country", country.code);

    const langCode = country.lang;

    // Set Google translate cookies for main domain and root path
    const domain = window.location.hostname;
    const cookieValue = `/en/${langCode}`;

    if (langCode === "en") {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}`;
    } else {
      document.cookie = `googtrans=${cookieValue}; path=/;`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=.${domain}`;
    }

    // Trigger translate or reload page to apply new language
    window.location.reload();
  };

  return (
    <div className={styles.countrySelectorContainer} ref={dropdownRef}>
      {/* Hidden google translate element container */}
      <div id="google_translate_element" style={{ display: "none" }} />

      <button
        type="button"
        className={styles.countryBtn}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Select Country and Language"
        title={`${selected.name} (${selected.label})`}
      >
        <span className={styles.flagIcon}>{selected.flag}</span>
        <span className={styles.countryCodeText}>{selected.code}</span>
        <svg
          className={`${styles.countryChevron} ${open ? styles.chevronOpen : ""}`}
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
        </svg>
      </button>

      {open && (
        <div className={styles.countryDropdown}>
          <div className={styles.dropdownHeader}>Select Country / Region</div>
          <div className={styles.countryList}>
            {COUNTRIES.map((country) => (
              <button
                key={country.code}
                type="button"
                className={`${styles.countryOption} ${
                  country.code === selected.code ? styles.countryOptionActive : ""
                }`}
                onClick={() => changeLanguage(country)}
              >
                <span className={styles.flagIcon}>{country.flag}</span>
                <div className={styles.countryMeta}>
                  <span className={styles.countryName}>{country.name}</span>
                  <span className={styles.langName}>{country.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
