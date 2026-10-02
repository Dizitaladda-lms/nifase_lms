"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./header.module.css";

const COUNTRIES = [
  { code: "IN", name: "India", flagUrl: "https://flagcdn.com/w40/in.png", lang: "en", label: "English" },
  { code: "US", name: "United States", flagUrl: "https://flagcdn.com/w40/us.png", lang: "en", label: "English" },
  { code: "GB", name: "United Kingdom", flagUrl: "https://flagcdn.com/w40/gb.png", lang: "en", label: "English" },
  { code: "AE", name: "UAE", flagUrl: "https://flagcdn.com/w40/ae.png", lang: "ar", label: "العربية" },
  { code: "SA", name: "Saudi Arabia", flagUrl: "https://flagcdn.com/w40/sa.png", lang: "ar", label: "العربية" },
  { code: "FR", name: "France", flagUrl: "https://flagcdn.com/w40/fr.png", lang: "fr", label: "Français" },
  { code: "DE", name: "Germany", flagUrl: "https://flagcdn.com/w40/de.png", lang: "de", label: "Deutsch" },
  { code: "ES", name: "Spain", flagUrl: "https://flagcdn.com/w40/es.png", lang: "es", label: "Español" },
  { code: "IT", name: "Italy", flagUrl: "https://flagcdn.com/w40/it.png", lang: "it", label: "Italiano" },
  { code: "JP", name: "Japan", flagUrl: "https://flagcdn.com/w40/jp.png", lang: "ja", label: "日本語" },
  { code: "CN", name: "China", flagUrl: "https://flagcdn.com/w40/cn.png", lang: "zh-CN", label: "中文" },
  { code: "RU", name: "Russia", flagUrl: "https://flagcdn.com/w40/ru.png", lang: "ru", label: "Русский" },
  { code: "BR", name: "Brazil", flagUrl: "https://flagcdn.com/w40/br.png", lang: "pt", label: "Português" },
  { code: "KR", name: "South Korea", flagUrl: "https://flagcdn.com/w40/kr.png", lang: "ko", label: "한국어" },
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

    // Active cleaner to prevent Google Translate top bar from pushing header down
    const cleanGoogleBar = () => {
      if (document.body.style.top && document.body.style.top !== "0px") {
        document.body.style.top = "0px";
      }
      const banner = document.querySelector(".goog-te-banner-frame, iframe.goog-te-banner-frame, .VIpgJd-ZGain-xl0Sfd-v4vhHf-WWrpSp");
      if (banner) {
        banner.style.display = "none";
        banner.style.visibility = "hidden";
        banner.style.height = "0px";
      }
    };

    cleanGoogleBar();
    const interval = setInterval(cleanGoogleBar, 300);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearInterval(interval);
    };
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
        <img
          src={selected.flagUrl}
          alt={selected.name}
          className={styles.flagImg}
        />
        <span className={styles.countryNameText}>{selected.name}</span>
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
                <img
                  src={country.flagUrl}
                  alt={country.name}
                  className={styles.flagImgDropdown}
                />
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
