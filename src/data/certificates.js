// CERT_ORG maps a short logo key (used on each certificate below) to the
// initials fallback + the actual logo image key in data/images.js.
export const CERT_ORG = {
  habib: { initials: "HU", img: "logo_habib" },
  coursera: { initials: "CR", img: "logo_coursera" },
  alkhidmat: { initials: "AK", img: "logo_alkhidmat" },
  great: { initials: "GL", img: "logo_great" },
  baitussalam: { initials: "BS", img: "logo_baitussalam" },
  zvmg: { initials: "ZR", img: "logo_zvmg" },
  gumun: { initials: "GU", img: "logo_greenwich" },
  tcf: { initials: "TC", img: "logo_tcf" },
  tcfq: { initials: "TC", img: "logo_tcfq" },
  bano: { initials: "BQ", img: "logo_bano" },
  smit: { initials: "SM", img: "logo_smit" },
  iqra: { initials: "IU", img: "logo_iqra" },
};

export const CERT_CATEGORIES = [
  "All", "Courses & Training", "Leadership & Volunteering", "Competitions & Olympiads", "Internships",
];

export const CERTIFICATES = [
  { img: "cert1", title: "Certificate of Participation", org: "Habib University Winter Camp '23", date: "2023", logo: "habib", cat: "Leadership & Volunteering" },
  { img: "cert2", title: "Introduction to Microsoft Excel", org: "Coursera Project Network", date: "Feb 23, 2024", logo: "coursera", cat: "Courses & Training" },
  { img: "cert3", title: "Certificate of Participation", org: "Alkhidmat Bano Qabil Graduation Ceremony", date: "Dec 5, 2024 · Rangoonwala Hall, Karachi", logo: "alkhidmat", cat: "Leadership & Volunteering" },
  { img: "cert4", title: "Introduction to Cyber Security", org: "Great Learning Academy", date: "Oct 2022", logo: "great", cat: "Courses & Training" },
  { img: "cert5", title: "Certificate of Participation", org: "Baitussalam Olympiad '23", date: "Nov 2023 · TCF College", logo: "baitussalam", cat: "Competitions & Olympiads" },
  { img: "cert6", title: "Vocational Education Programme — Graphic Designing", org: "ZVMG Rangoonwala Community Centre", date: "9–12 Jan 2023", logo: "zvmg", cat: "Courses & Training" },
  { img: "cert7", title: "Certificate of Appreciation — National Delegate", org: "GUMUN 2022, Greenwich University MUN", date: "28–30 Dec 2022", logo: "gumun", cat: "Leadership & Volunteering" },
  { img: "cert8", title: "Certificate of Appreciation — Declamation Urdu", org: "The Citizens Foundation College", date: "29 Aug 2023", logo: "tcf", cat: "Leadership & Volunteering" },
  { img: "cert9", title: "Certificate of Appreciation — Bait Bazi", org: "TCF College Qayyumabad (Aliph programme)", date: "2023", logo: "tcfq", cat: "Leadership & Volunteering" },
  { img: "cert10", title: "Certificate of Appreciation — Bait Bazi", org: "The Citizens Foundation College", date: "29 Aug 2023", logo: "tcf", cat: "Leadership & Volunteering" },
  { img: "cert11", title: "CIT with Introduction to Python", org: "Alkhidmat / Bano Qabil Certificate Course", date: "Dec 2023 – Mar 2024", logo: "bano", cat: "Courses & Training" },
  { img: "cert12", title: "Volunteer Programme Internship Letter", org: "Alkhidmat Karachi — IT Department", date: "Jul 14 – Sep 8, 2025", logo: "alkhidmat", cat: "Internships" },
  { img: "cert13", title: "8-Week Summer Internship Programme 2025", org: "Alkhidmat Volunteers Programme", date: "2025", logo: "alkhidmat", cat: "Internships" },
  { img: "cert14", title: "TCF Rahbar Programme Certificate", org: "The Citizens Foundation", date: "2019 – 20", logo: "tcf", cat: "Leadership & Volunteering" },
  { img: "cert15", title: "Certificate of Merit — Math Olympiad", org: "The Citizens Foundation, Class VIII-B", date: "2019 – 2020", logo: "tcf", cat: "Competitions & Olympiads" },
  { img: "cert16", title: "Coding Night 2025 (Hackathon)", org: "Saylani Mass Training Programme (SMIT)", date: "2025 · 12-hour hackathon", logo: "smit", cat: "Competitions & Olympiads" },
  { img: "cert17", title: "Dev 2: Buildathon — SkillVerse 2026", org: "IU FEST, Iqra University", date: "15–17 June 2026", logo: "iqra", cat: "Competitions & Olympiads" },
];

// Any certs you've earned but haven't scanned yet — leave empty once everything is pictured.
export const CERT_UNPICTURED = [];
