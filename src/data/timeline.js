// Companies are grouped so promotions at the same company nest together, LinkedIn-style.
export const EXPERIENCE_GROUPS = [
  {
    company: "Teakwood Global",
    initials: "TG",
    logo: "logo_teakwood",
    span: "Jun 2026 – Present",
    current: true,
    roles: [
      { role: "AR Executive, Medical Billing", period: "Sep 2026 – Present", tag: "Current" },
      { role: "MTO Medical Biller, Medical Billing", period: "Jun 2026 – Sep 2026", promoted: true },
    ],
  },
  {
    company: "Alkhidmat Foundation — IT Dept",
    initials: "AK",
    logo: "logo_alkhidmat",
    span: "Aug 2025 – Oct 2025",
    roles: [
      { role: "Web Developer", period: "Aug 2025 – Oct 2025" },
    ],
  },
  {
    company: "Erudite Coaching Center",
    initials: "EC",
    logo: "logo_erudite",
    span: "Aug 2025 – Nov 2025",
    roles: [
      { role: "Web Development Intern (Remote)", period: "Aug 2025 – Nov 2025" },
    ],
  },
  {
    company: "Explosion Services",
    initials: "ES",
    logo: "logo_explosion",
    span: "Aug 2024 – Apr 2026",
    roles: [
      { role: "Team Lead, Medical Documentation QA", period: "Feb 2025 – Apr 2026", promoted: true },
      { role: "QA, Medical Documentation QA", period: "Nov/Dec 2024 – Mar 2025", promoted: true },
      { role: "CSR — DME Sales, Medical Documentation QA", period: "Aug 2024 – Jan 2025" },
    ],
  },
  {
    company: "Brothers Mobiles & Computers",
    initials: "BM",
    span: "Feb 2021 – Nov 2023",
    roles: [
      { role: "Graphic Designer / Software Installer / Cashier", period: "Feb 2021 – Nov 2023" },
    ],
  },
];

export const EDUCATION = [
  { org: "Iqra University, Karachi", role: "BS Computer Science", period: "Oct 2025 – Present", initials: "IU", logo: "logo_iqra" },
  { org: "Saylani Mass IT Training (SMIT)", role: "Web Development Certification", period: "May 2024 – Jul 2025", initials: "SM", logo: "logo_smit" },
  { org: "Bano Qabil, Karachi", role: "Computer Programming", period: "2023 – 2024", initials: "BQ", logo: "logo_bano" },
  { org: "The Citizens Foundation College", role: "Intermediate, Pre-Engineering", period: "Jun 2022 – Jul 2024", initials: "TC", logo: "logo_tcf" },
  { org: "The Citizens Foundation School", role: "Matriculation, Computer Science", period: "Jul 2018 – Jul 2022", initials: "TC", logo: "logo_tcf" },
];
