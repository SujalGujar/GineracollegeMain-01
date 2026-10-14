/**
 * SEO metadata and dynamic updater for GINERA - Gujarat Institute of Nursing Education and Research
 */

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
}

const DEFAULT_METADATA: PageMetadata = {
  title: "GINERA | Gujarat Institute of Nursing Education and Research, Ahmedabad - Government Nursing College",
  description: "Official portal of Government College of Nursing, GINERA Ahmedabad. Providing excellence in Nursing Education, Clinical Training, B.Sc & M.Sc Nursing at Civil Hospital campus.",
  keywords: "GINERA, GINERA Ahmedabad, Gujarat Institute of Nursing Education and Research, Government College of Nursing Ahmedabad, Nursing College Asarwa, B.Sc Nursing Gujarat, GNM Nursing",
};

export const PAGE_SEO_MAP: Record<string, PageMetadata> = {
  home: {
    title: "GINERA | Gujarat Institute of Nursing Education and Research, Ahmedabad - Government Nursing College",
    description: "Gujarat Institute of Nursing Education and Research (GINERA), Ahmedabad is a premier Government Nursing College located at Civil Hospital Campus, Asarwa. Offering B.Sc, M.Sc, and GNM programs with top clinical training.",
    keywords: "GINERA, GINERA Ahmedabad, Gujarat Institute of Nursing Education and Research, Government College of Nursing, Civil Hospital Asarwa, B.Sc Nursing Ahmedabad, M.Sc Nursing, GNM",
  },
  courses: {
    title: "Courses Offered & Eligibility | GINERA Ahmedabad - Government Nursing College",
    description: "Explore accredited B.Sc. Nursing, M.Sc. Nursing, and General Nursing & Midwifery (GNM) degree programs offered at GINERA Ahmedabad.",
    keywords: "GINERA courses, B.Sc Nursing Gujarat, M.Sc Nursing Ahmedabad, GNM diploma, nursing degrees India, nursing college admissions",
  },
  "admission-procedure": {
    title: "Admission Procedure & Guidelines | GINERA Ahmedabad",
    description: "Complete admission procedure, merit list criteria, counseling steps, and application instructions for GINERA Government College of Nursing.",
    keywords: "GINERA admission, nursing admission Gujarat, B.Sc nursing counseling, GNM admission procedure, Civil Hospital nursing college admission",
  },
  "admission-rules": {
    title: "Admission Rules & Regulatory Standards | GINERA Ahmedabad",
    description: "Official admission rules, regulatory codes, reservation policies, and fee structures for Government College of Nursing, GINERA.",
    keywords: "nursing admission rules, GINERA regulations, INC nursing rules, government nursing quota, Ahmedabad nursing fees",
  },
  instructions: {
    title: "Student Instructions & Code of Conduct | GINERA Ahmedabad",
    description: "Essential student instructions, campus etiquette, clinical attendance guidelines, and code of conduct for GINERA Nursing College students.",
    keywords: "GINERA student instructions, nursing college code of conduct, clinical practice rules, GINERA student portal",
  },
  "about-logo": {
    title: "College Logo & Emblem Heritage | GINERA Ahmedabad",
    description: "Discover the heritage, symbolism, and meaning behind the official emblem of Gujarat Institute of Nursing Education and Research (GINERA).",
    keywords: "GINERA logo, Government Nursing College emblem, Ginera heritage, nursing college identity",
  },
  "dean-message": {
    title: "Dean's Message | GINERA Ahmedabad - Government Nursing College",
    description: "Read the inspiring welcome message from the Dean / Principal of Government College of Nursing, GINERA Ahmedabad.",
    keywords: "Dean message GINERA, Principal Government College of Nursing Ahmedabad, GINERA leadership, nursing dean",
  },
  history: {
    title: "History & Legacy | GINERA Ahmedabad - Government Nursing College",
    description: "The distinguished history, growth, and legacy of Gujarat Institute of Nursing Education and Research at Civil Hospital Campus, Ahmedabad.",
    keywords: "GINERA history, Government College of Nursing legacy, Civil Hospital Ahmedabad nursing history, nursing education milestone",
  },
  location: {
    title: "Campus Location & Map Directions | GINERA Ahmedabad",
    description: "Find campus location, map, and directions to GINERA Government College of Nursing, Civil Hospital Campus, Asarwa, Ahmedabad - 380016, Gujarat.",
    keywords: "GINERA location, Government nursing college address, Civil Hospital Asarwa directions, Ahmedabad nursing college location",
  },
  "vision-mission": {
    title: "Vision & Mission | GINERA Ahmedabad",
    description: "Our vision, mission, and core values dedicated to advancing compassionate nursing healthcare, clinical competence, and research.",
    keywords: "GINERA vision, nursing college mission, healthcare education values, nursing ethics Gujarat",
  },
  achievements: {
    title: "Achievements & Academic Milestones | GINERA Ahmedabad",
    description: "Accreditations, state & national academic awards, university ranks, and student accomplishments at GINERA Nursing College.",
    keywords: "GINERA achievements, nursing college ranks, academic awards nursing Gujarat, student achievements GINERA",
  },
  "college-photos": {
    title: "College Infrastructure & Campus Gallery | GINERA Ahmedabad",
    description: "View photos of modern laboratories, lecture halls, campus library, and state-of-the-art facilities at GINERA Nursing College.",
    keywords: "GINERA photos, nursing college campus pictures, nursing lab photos, GINERA library",
  },
  "hospital-photos": {
    title: "Hospital & Clinical Training Photos | GINERA Ahmedabad",
    description: "Explore photos of hands-on clinical training and patient care at Asia's largest Civil Hospital Campus with GINERA students.",
    keywords: "Civil Hospital Ahmedabad photos, clinical training nursing photos, GINERA practical sessions",
  },
  "events-photos": {
    title: "Events, Seminars & Celebrations Gallery | GINERA Ahmedabad",
    description: "Photo gallery of annual functions, sports week, health awareness rallies, conferences, and student celebrations at GINERA.",
    keywords: "GINERA events photos, nursing college annual day, health rally Ahmedabad, student activities gallery",
  },
  "student-corner": {
    title: "Student Corner, Notices & Circulars | GINERA Ahmedabad",
    description: "Official notifications, examination schedules, academic calendars, timetables, and resources for GINERA students.",
    keywords: "GINERA student corner, exam notices, nursing circulars Gujarat, academic timetable GINERA",
  },
  "affiliated-institutes": {
    title: "Affiliated Teaching Hospitals & Institutes | GINERA Ahmedabad",
    description: "Premier affiliated institutes including Civil Hospital, UN Mehta Heart Institute, IKDRC Kidney Institute, GCRI Cancer Institute, and M&J Eye Hospital.",
    keywords: "GINERA affiliated hospitals, UN Mehta institute nursing, IKDRC Ahmedabad, GCRI cancer hospital nursing, Civil Hospital campus",
  },
  contact: {
    title: "Contact Us & Campus Helpdesk | GINERA Ahmedabad",
    description: "Get in touch with GINERA Government College of Nursing. Phone: +91-96011 11973, Email: principalgcona@gmail.com, Asarwa, Ahmedabad - 380016.",
    keywords: "contact GINERA, Government nursing college phone number, principal email GINERA, Ahmedabad nursing college inquiry",
  },
  admin: {
    title: "Administrator Portal | GINERA Ahmedabad",
    description: "Secure administrative management dashboard for GINERA Government College of Nursing.",
    keywords: "GINERA admin, portal login",
  },
  login: {
    title: "Staff & Admin Login | GINERA Ahmedabad",
    description: "Authorized access portal for GINERA staff and administration.",
    keywords: "GINERA login, staff portal",
  },
};

/**
 * Dynamically updates document title, meta description, and canonical link
 * whenever route changes. Ensures search engines and browser tabs always reflect
 * current page content.
 */
export function updatePageSEO(pageKey: string): void {
  const normalizedKey = (pageKey || "home").toLowerCase();

  let metadata: PageMetadata;

  if (PAGE_SEO_MAP[normalizedKey]) {
    metadata = PAGE_SEO_MAP[normalizedKey];
  } else if (normalizedKey.startsWith("department-")) {
    const rawDeptName = normalizedKey.replace("department-", "").replace(/-/g, " ");
    const deptTitle = rawDeptName
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    metadata = {
      title: `Department of ${deptTitle} | GINERA Ahmedabad`,
      description: `Explore the faculty, laboratory facilities, clinical training, and curriculum of the Department of ${deptTitle} at GINERA Government College of Nursing.`,
      keywords: `Department of ${deptTitle}, GINERA department, nursing faculty Ahmedabad, specialized clinical nursing`,
    };
  } else {
    metadata = DEFAULT_METADATA;
  }

  // 1. Update Title
  document.title = metadata.title;

  // 2. Update Meta Description
  let descMeta = document.querySelector('meta[name="description"]');
  if (!descMeta) {
    descMeta = document.createElement("meta");
    descMeta.setAttribute("name", "description");
    document.head.appendChild(descMeta);
  }
  descMeta.setAttribute("content", metadata.description);

  // 3. Update Meta Keywords
  if (metadata.keywords) {
    let kwMeta = document.querySelector('meta[name="keywords"]');
    if (!kwMeta) {
      kwMeta = document.createElement("meta");
      kwMeta.setAttribute("name", "keywords");
      document.head.appendChild(kwMeta);
    }
    kwMeta.setAttribute("content", metadata.keywords);
  }

  // 4. Update OpenGraph Title & Description
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", metadata.title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", metadata.description);

  const currentPath = normalizedKey === "home" ? "/" : `/${normalizedKey}`;
  const canonicalUrl = `https://gineracollegemain-01.onrender.com${currentPath}`;

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", canonicalUrl);

  // 5. Update Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute("href", canonicalUrl);
}
