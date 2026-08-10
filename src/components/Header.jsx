import React from "react";
import { Button } from "./ui/button.jsx";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet.jsx";
import { Menu, User, ChevronDown } from "lucide-react";
import gineraLogo2 from "../images/ginera-logo2.png";
import gineraLogo from "../images/ginera-logo.png";
import axiosInstance from "../api/axiosInstance";
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

  "courses": "admissions",
  "admission-procedure": "admissions",
  "admission-rules": "admissions",
  "instructions": "admissions",

  "college-photos": "gallery",
  "hospital-photos": "gallery",
  "events-photos": "gallery",

  "student-corner": "student-corner",
};

export function Header({ currentPage, onNavigate }) {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(null);
  const [mobileOpenSections, setMobileOpenSections] = React.useState({});
  const dropdownRef = React.useRef(null);
  const [dynamicNavItems, setDynamicNavItems] = React.useState(NAV_ITEMS);
  const { isSectionVisible } = useSectionVisibility();

  // Filter nav items based on section visibility
  const visibleNavItems = dynamicNavItems.filter(item => {
    if (item.key === 'student-corner') return isSectionVisible('student_corner');
    return true;
  });

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
  };

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const toggleMobileSection = (key) => {
    setMobileOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
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
                <img src={gineraLogo2} alt="College Logo" className="w-12 h-12 object-contain" />
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
                          isContact
                            ? "text-white"
                            : isActive
                              ? "bg-orange-50 text-orange-600"
                              : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
                          isOpen && !isContact
                            ? "bg-orange-50 text-orange-600"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        style={
                          isContact
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
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 overflow-y-auto">
                  <div className="mt-6 space-y-2">

                    {/* Mobile Logo */}
                    <div
                      className="flex items-center space-x-3 p-4 border-b border-border cursor-pointer"
                      onClick={() => handleNavigation("home")}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full">
                        <img src={gineraLogo} alt="College Logo" className="w-8 h-8 object-contain" />
                      </div>
                      <div>
                        <h1 className="text-lg font-bold text-gray-900">Medical College</h1>
                        <p className="text-xs text-gray-600">Excellence in Medical Education</p>
                      </div>
                    </div>

                    {/* Mobile Nav Items */}
                    {visibleNavItems.map((item) => {
                      const hasSubpages = item.subpages.length > 0;
                      const isMobileOpen = mobileOpenSections[item.key];
                      const isActive =
                        currentPage === item.key || activeSection === item.key;
                      const isContact = item.key === "contact";

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
                              isContact
                                ? "text-white rounded-md"
                                : isActive
                                  ? "bg-orange-50 text-orange-600"
                                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            style={
                              isContact
                                ? {
                                    backgroundColor:
                                      currentPage === "contact"
                                        ? "#D97706"
                                        : "#F59E0B",
                                  }
                                : undefined
                            }
                          >
                            {item.label}
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
