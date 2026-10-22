import React from "react";
import { Button } from "./ui/button.jsx";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet.jsx";
import { Menu, User, ChevronDown, Bell, Megaphone, ArrowRight, X } from "lucide-react";
import gineraLogo2 from "../images/ginera-logo2.png";
import gineraLogo from "../images/ginera-logo.png";
import axiosInstance, { getMediaUrl } from "../api/axiosInstance";
import { useSectionVisibility } from "../context/SectionVisibilityContext";

let departmentItems = [
  {
    title: "Nursing Departments",
    items: [
      "Department of Fundamentals Of Nursing",
      "Department of Medical Surgical Nursing",
      "Department of Obstetric and Gynaecological Nursing",
      "Department of Child Health Nursing",
      "Department of Community Health Nursing",
      "Department of Mental Health Nursing",
    ],
    color: "border-l-blue-600",
  },
];

// Navigation structure with parent → subpages
const NAV_ITEMS = [
  { key: "home", label: "Home", subpages: [] },
  {
    key: "about",
    label: "About Us",
    subpages: [
      { label: "College Logo", page: "about-logo" },
      { label: "Dean's Message", page: "dean-message" },
      { label: "Our History", page: "history" },
      { label: "Campus Location", page: "location" },
      { label: "Vision & Mission", page: "vision-mission" },
      { label: "Achievements", page: "achievements" },
    ],
  },
  {
    key: "admissions",
    label: "Admissions",
    subpages: [
      { label: "Announcements", page: "announcements" },
      { label: "Courses Offered", page: "courses" },
      { label: "Admission Procedure", page: "admission-procedure" },
      { label: "Admission Rules", page: "admission-rules" },
      { label: "Student Guidelines", page: "instructions" },
    ],
  },
  {
    key: "departments",
    label: "Departments",
    subpages: [
      { label: "Department of Fundamentals Of Nursing", page: "department-fundamentals" },
      { label: "Department of Medical Surgical Nursing", page: "department-medical-surgical" },
      { label: "Department of Obstetric and Gynaecological Nursing", page: "department-obstetric" },
      { label: "Department of Child Health Nursing", page: "department-child-health" },
      { label: "Department of Community Health Nursing", page: "department-community" },
      { label: "Department of Mental Health Nursing", page: "department-mental-health" },
    ],
  },
  {
    key: "gallery",
    label: "Gallery",
    subpages: [
      { label: "College Photos", page: "college-photos" },
      { label: "Hospital Photos", page: "hospital-photos" },
      { label: "Events Photos", page: "events-photos" },
    ],
  },
  { key: "announcements", label: "Announcement", subpages: [] },
  { key: "student-corner", label: "Student Corner", subpages: [] },
  { key: "affiliated-institutes", label: "Affiliated Institutes", subpages: [] },
  { key: "contact", label: "Contact Us", subpages: [] },
];

// Map each page key to its parent section
const PAGE_SECTION_MAP = {
  "about-logo": "about",
  "dean-message": "about",
  "history": "about",
  "location": "about",
  "vision-mission": "about",
  "achievements": "about",

  "announcements": "announcements",
  "announcement": "announcements",
  "courses": "admissions",
  "admission-procedure": "admissions",
  "admission-rules": "admissions",
  "instructions": "admissions",

  "college-photos": "gallery",
  "hospital-photos": "gallery",
  "events-photos": "gallery",

  "student-corner": "student-corner",
};

// ── Announcement Ticker Banner (Displays on all pages) ─────────────────
function AnnouncementTicker({ onNavigate }) {
  const [tickerDismissed, setTickerDismissed] = React.useState(() => {
    try {
      return sessionStorage.getItem("ginera_ticker_dismissed") === "true";
    } catch {
      return false;
    }
  });

  const handleDismiss = () => {
    setTickerDismissed(true);
    try {
      sessionStorage.setItem("ginera_ticker_dismissed", "true");
    } catch {}
  };

  if (tickerDismissed) return null;

  return (
    <div
      className="relative z-50 text-white overflow-hidden py-2 px-3 sm:px-6 shadow-sm border-b"
      style={{
        background: "linear-gradient(90deg, #4E2B12 0%, #6B3F1D 30%, #B45309 70%, #D97706 100%)",
        borderColor: "rgba(253, 230, 138, 0.25)"
      }}
    >
      <div className="container mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Left Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-sm"
            style={{ background: "#F59E0B", color: "#4E2B12" }}
          >
            <Megaphone className="w-3.5 h-3.5 animate-bounce" />
            <span>Announcement</span>
          </span>
        </div>

        {/* Center Marquee / Ticker Text */}
        <div className="flex-1 overflow-hidden min-w-0">
          <div
            className="truncate font-semibold tracking-wide text-amber-50 hover:text-white transition-colors cursor-pointer text-left"
            onClick={() => onNavigate("announcements")}
          >
            Post Basic Diploma Course in Nursing (Government / GMERS Medical College) — Official Admission Notice & Application Form Available!
          </div>
        </div>

        {/* Right Actions: Click Button + Cancel Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate("announcements")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black shadow-md transition-all duration-150 transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
            style={{
              background: "#FFFFFF",
              color: "#92400E",
              border: "1px solid #FDE68A"
            }}
          >
            <span>Click Here</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            title="Remove announcement banner"
            aria-label="Remove announcement banner"
            className="p-1 rounded-full hover:bg-black/20 text-amber-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Header({ currentPage, onNavigate }) {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(null);
  const [openMobileSection, setOpenMobileSection] = React.useState(null);
  const [collegeLogoUrl, setCollegeLogoUrl] = React.useState(null);
  const dropdownRef = React.useRef(null);
  const [dynamicNavItems, setDynamicNavItems] = React.useState(NAV_ITEMS);
  const { isSectionVisible } = useSectionVisibility();

  // Filter nav items based on section visibility
  const visibleNavItems = dynamicNavItems.filter(item => {
    if (item.key === 'student-corner') return isSectionVisible('student_corner');
    if (item.key === 'announcements' || item.key === 'announcement') {
      return isSectionVisible('admission_announcements') && isSectionVisible('announcements_page');
    }
    return true;
  });

  // Automatically close mobile sidebar if viewport expands to desktop (e.g. exiting devtools mobile mode or resizing)
  React.useEffect(() => {
    const checkAndClose = () => {
      if (window.innerWidth >= 1024) {
        setIsSheetOpen(false);
      }
    };

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleMediaChange = (e) => {
      if (e.matches) {
        setIsSheetOpen(false);
      }
    };

    window.addEventListener("resize", checkAndClose);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      window.removeEventListener("resize", checkAndClose);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  // Fetch college logo
  React.useEffect(() => {
    axiosInstance.get("/about/college-logo")
      .then(res => {
        if (res.data?.logoUrl) setCollegeLogoUrl(getMediaUrl(res.data.logoUrl));
      })
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axiosInstance.get("/departments");
        if (response.data && response.data.length > 0) {
          const deptNames = response.data.map(d => d.name);
          // Create the dynamic subpages for departments
          const deptSubpages = response.data.map(dept => ({
            label: dept.name,
            page: `department-${dept.slug || dept.name.toLowerCase().replace(/\s+/g, "-")}`
          }));

          // Re-generate NAV_ITEMS with dynamic departments
          const newNavItems = NAV_ITEMS.map(item => {
            if (item.key === 'departments') {
              return { ...item, subpages: deptSubpages };
            }
            return item;
          });
          setDynamicNavItems(newNavItems);
        } else {
          setDynamicNavItems(NAV_ITEMS);
        }
      } catch (error) {
        console.error("Error fetching departments for header:", error);
        setDynamicNavItems(NAV_ITEMS);
      }
    };
    fetchDepartments();
  }, []);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine which top-level section is active
  const getActiveSection = () => {
    if (PAGE_SECTION_MAP[currentPage]) return PAGE_SECTION_MAP[currentPage];
    if (currentPage?.startsWith("department-")) return "departments";
    return null;
  };
  const activeSection = getActiveSection();

  const handleNavigation = (page, event) => {
    if (event) event.preventDefault();
    onNavigate(page);
    setIsSheetOpen(false);
    setOpenDropdown(null);
    setOpenMobileSection(null);
  };

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const toggleMobileSection = (key) => {
    setOpenMobileSection((prev) => (prev === key ? null : key));
  };

  return (
    <>
      {/* Top Announcement Slider / Ticker Banner (All Pages) */}
      <AnnouncementTicker onNavigate={handleNavigation} />

      {/* Main Header */}
      <header className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Nav Items List for usage */}
            {/* We'll use dynamicNavItems.length > 0 ? dynamicNavItems : dynamicNavItems */}


            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-full cursor-pointer"
                onClick={(e) => handleNavigation("home", e)}
              >
                <img src={collegeLogoUrl || gineraLogo2} alt="College Logo" className="w-12 h-12 object-contain" />
              </div>
              <div
                className="hidden md:block cursor-pointer"
                onClick={(e) => handleNavigation("home", e)}
              >
                <h1 className="text-xl font-bold text-gray-900">Medical College</h1>
                <p className="text-sm text-gray-600">Excellence in Medical Education</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
              <nav className="flex items-center space-x-1">
                {visibleNavItems.map((item) => {
                  const hasSubpages = item.subpages.length > 0;
                  const isOpen = openDropdown === item.key;
                  const isActive =
                    currentPage === item.key || activeSection === item.key;
                  const isContact = item.key === "contact";
                  const isAnnouncement = item.key === "announcements" || item.key === "announcement";

                  return (
                    <div key={item.key} className="relative">
                      {/* Nav button / trigger */}
                      <button
                        id={`nav-${item.key}`}
                        onClick={() => {
                          if (hasSubpages) {
                            toggleDropdown(item.key);
                          } else {
                            handleNavigation(item.key);
                          }
                        }}
                        className={[
                          "inline-flex items-center h-10 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none cursor-pointer",
                          isAnnouncement
                            ? "text-white rounded-xl"
                            : isContact
                              ? "text-white"
                              : isActive
                                ? "bg-orange-50 text-orange-600"
                                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
                          isOpen && !isContact && !isAnnouncement
                            ? "bg-orange-50 text-orange-600"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        style={
                          isAnnouncement
                            ? {
                                background: isActive
                                  ? "linear-gradient(135deg, #92400E 0%, #B45309 50%, #D97706 100%)"
                                  : "linear-gradient(135deg, #B45309 0%, #D97706 50%, #F59E0B 100%)",
                                color: "#FFFFFF",
                                border: "1.5px solid #FDE68A",
                                boxShadow: "0 4px 14px rgba(217, 119, 6, 0.4)",
                                fontWeight: "bold"
                              }
                            : isContact
                              ? {
                                  backgroundColor:
                                    currentPage === "contact" ? "#D97706" : "#F59E0B",
                                }
                              : undefined
                        }
                        onMouseEnter={(e) => {
                          if (isContact)
                            e.currentTarget.style.backgroundColor = "#D97706";
                        }}
                        onMouseLeave={(e) => {
                          if (isContact)
                            e.currentTarget.style.backgroundColor =
                              currentPage === "contact" ? "#D97706" : "#F59E0B";
                        }}
                      >
                        {item.label}
                        {hasSubpages && (
                          <ChevronDown
                            className={`ml-1 h-3.5 w-3.5 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </button>

                      {/* Dropdown panel */}
                      {hasSubpages && isOpen && (
                        <div
                          className="absolute top-full left-0 mt-1.5 bg-white rounded-lg border border-gray-200 shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
                          style={{
                            minWidth:
                              item.key === "departments" ? "340px" : "220px",
                          }}
                        >
                          <div className="py-1.5 px-1.5 flex flex-col gap-0.5">
                            {item.key === "departments" && (
                              <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 bg-gray-50 rounded-md mb-0.5">
                                Nursing Departments
                              </div>
                            )}
                            {item.subpages.map(({ label, page }) => (
                              <button
                                key={page}
                                id={`nav-link-${page}`}
                                onClick={() => handleNavigation(page)}
                                className={[
                                  "w-full text-left rounded-md px-3 py-2 text-sm transition-colors duration-150 cursor-pointer",
                                  currentPage === page
                                    ? "bg-orange-100 text-orange-700 font-medium"
                                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
                                ]
                                  .filter(Boolean)
                                  .join(" ")}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>


            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex items-center space-x-2">
              <Sheet open={isSheetOpen} onOpenChange={(open) => {
                setIsSheetOpen(open);
                if (!open) setOpenMobileSection(null);
              }}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="lg:hidden w-80 sm:w-96 p-0 flex flex-col h-[100dvh] max-h-screen overflow-hidden">
                  {/* Fixed Mobile Header */}
                  <div
                    className="flex items-center space-x-3 p-4 pr-12 border-b border-border bg-white shrink-0 cursor-pointer"
                    onClick={() => handleNavigation("home")}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0">
                      <img src={collegeLogoUrl || gineraLogo} alt="College Logo" className="w-8 h-8 object-contain" />
                    </div>
                    <div className="min-w-0">
                      <h1 className="text-lg font-bold text-gray-900 truncate">Medical College</h1>
                      <p className="text-xs text-gray-600 truncate">Excellence in Medical Education</p>
                    </div>
                  </div>

                  {/* Scrollable Mobile Nav Items */}
                  <div
                    className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-4 space-y-2 pb-32"
                    style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
                  >
                    {visibleNavItems.map((item) => {
                      const hasSubpages = item.subpages.length > 0;
                      const isMobileOpen = openMobileSection === item.key;
                      const isActive =
                        currentPage === item.key || activeSection === item.key;
                      const isContact = item.key === "contact";
                      const isAnnouncement = item.key === "announcements" || item.key === "announcement";

                      return (
                        <div key={item.key}>
                          <button
                            onClick={() => {
                              if (hasSubpages) {
                                toggleMobileSection(item.key);
                              } else {
                                handleNavigation(item.key);
                              }
                            }}
                            className={[
                              "w-full flex items-center justify-between px-4 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer",
                              isAnnouncement
                                ? "text-white rounded-xl font-bold"
                                : isContact
                                  ? "text-white rounded-md"
                                  : isActive
                                    ? "bg-orange-50 text-orange-600"
                                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            style={
                              isAnnouncement
                                ? {
                                    background: "linear-gradient(135deg, #B45309 0%, #D97706 50%, #F59E0B 100%)",
                                    color: "#FFFFFF",
                                    border: "1.5px solid #FDE68A",
                                    boxShadow: "0 3px 10px rgba(217, 119, 6, 0.35)",
                                  }
                                : isContact
                                  ? {
                                      backgroundColor:
                                        currentPage === "contact"
                                          ? "#D97706"
                                          : "#F59E0B",
                                    }
                                  : undefined
                            }
                          >
                            <span>{item.label}</span>
                            {hasSubpages && (
                              <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${
                                  isMobileOpen ? "rotate-180" : ""
                                }`}
                              />
                            )}
                          </button>

                          {/* Mobile subpages */}
                          {hasSubpages && isMobileOpen && (
                            <div className="ml-4 mt-1 mb-1 pl-3 border-l-2 border-orange-200 space-y-0.5">
                              {item.key === "departments" && (
                                <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                  Nursing Departments
                                </div>
                              )}
                              {item.subpages.map(({ label, page }) => (
                                <button
                                  key={page}
                                  onClick={() => handleNavigation(page)}
                                  className={[
                                    "w-full text-left px-3 py-2 rounded-md text-sm transition-colors cursor-pointer",
                                    currentPage === page
                                      ? "bg-orange-100 text-orange-700 font-medium"
                                      : "text-gray-600 hover:bg-orange-50 hover:text-orange-600",
                                  ]
                                    .filter(Boolean)
                                    .join(" ")}
                                >
                                  {label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

          </div>
        </div>
      </header>
    </>
  );
}
