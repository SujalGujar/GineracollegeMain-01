

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu.jsx";
import { Button } from "./ui/button.jsx";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet.jsx";
import { Menu, GraduationCap, Phone, Mail, User } from "lucide-react";
import gineraLogo2 from "../images/ginera-logo2.png";
import gineraLogo from "../images/ginera-logo.png";

const departmentItems = [
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

export function Header({ currentPage, onNavigate }) {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  
  const handleNavigation = (page, event) => {
    if (event) {
      event.preventDefault();
    }
    onNavigate(page);
    setIsSheetOpen(false); // Close sheet after navigation
  };
  // Add this helper at the top of your component, inside Header():
const getActiveSection = () => {
  if (["about-logo","dean-message","history","location","vision-mission","achievements"].includes(currentPage)) return "about";
  if (["courses","admission-procedure","admission-rules","bond","instructions"].includes(currentPage)) return "admissions";
  if (currentPage?.startsWith("department-")) return "departments";
  if (["college-photos","hospital-photos","events-photos"].includes(currentPage)) return "gallery";
  return null;
};
const activeSection = getActiveSection();

  return (
    <>
      {/* Main Header */}
      <header className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-full cursor-pointer"
                onClick={(e) => handleNavigation("home", e)}
              >
                <img
                  src={gineraLogo2}
                  alt="College Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div
                className="hidden md:block cursor-pointer"
                onClick={(e) => handleNavigation("home", e)}
              >
                <h1 className="text-xl font-bold text-gray-900">
                  Medical College
                </h1>
                <p className="text-sm text-gray-600">
                  Excellence in Medical Education
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              <NavigationMenu viewport={false}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-orange-50 hover:text-orange-600 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
                      onClick={(e) => handleNavigation("home", e)}
                    >
                      Home
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={`bg-transparent hover:bg-orange-50 hover:text-orange-600 
                    data-[state=open]:bg-orange-50 data-[state=open]:text-orange-600
                    ${activeSection === "about" ? "bg-orange-50 text-orange-600" : ""}`}>
                    About Us
                  </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-56 p-1 flex flex-col bg-white">
                        <NavigationMenuLink
                          onClick={() => handleNavigation("about-logo")}
                          className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                        >
                          College Logo
                        </NavigationMenuLink>
                        <NavigationMenuLink
  onClick={() => handleNavigation("dean-message")}
  className={`block rounded-md px-3 py-2 text-sm transition-colors cursor-pointer
    ${currentPage === "dean-message" 
      ? "bg-orange-100 text-orange-700 font-medium" 
      : "hover:bg-orange-50 hover:text-orange-600"}`}
>
  Dean's Message
</NavigationMenuLink>
                        <NavigationMenuLink
                          onClick={() => handleNavigation("history")}
                          className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                        >
                          Our History
                        </NavigationMenuLink>
                        <NavigationMenuLink 
                          onClick={() => handleNavigation("location")}
                          className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                        >
                          Campus Location
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          onClick={() => handleNavigation("vision-mission")}
                          className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                        >
                          Vision & Mission
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          onClick={() => handleNavigation("achievements")}
                          className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                        >
                          Achievements
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-orange-50 hover:text-orange-600 data-[state=open]:bg-orange-50 data-[state=open]:text-orange-600">
                      Admissions
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-56 p-1 flex flex-col bg-white">
                        <NavigationMenuLink
                          onClick={() => handleNavigation("courses")}
                          className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                        >
                          Courses Offered
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          onClick={() => handleNavigation("admission-procedure")}
                          className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                        >
                          Admission Procedure
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          onClick={() => handleNavigation("admission-rules")}
                          className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                        >
                          Admission Rules
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          onClick={() => handleNavigation("bond")}
                          className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                        >
                          Service Bond
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          onClick={() => handleNavigation("instructions")}
                          className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                        >
                          Student Guidelines
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-orange-50 hover:text-orange-600 data-[state=open]:bg-orange-50 data-[state=open]:text-orange-600">
                      Departments
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[350px] p-1 flex flex-col bg-white">
                        {departmentItems.map((dept, index) => (
                          <div key={index} className="flex flex-col">
                            <div className="px-3 py-2 text-sm font-semibold text-gray-900 bg-gray-50 rounded-t-md">
                              {dept.title}
                            </div>
                            {dept.items.map((item, itemIndex) => (
                              <NavigationMenuLink
                                key={itemIndex}
                                onClick={() =>
                                  handleNavigation(
                                    `department-${item
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")
                                      .replace(/[()&]/g, "")
                                      .replace(/,/g, "")}`
                                  )
                                }
                                className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                              >
                                {item}
                              </NavigationMenuLink>
                            ))}
                          </div>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-orange-50 hover:text-orange-600 data-[state=open]:bg-orange-50 data-[state=open]:text-orange-600">
                      Gallery
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-48 p-1 flex flex-col bg-white">
                        <NavigationMenuLink
                          onClick={() => handleNavigation("college-photos")}
                          className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                        >
                          College Photos
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          onClick={() => handleNavigation("hospital-photos")}
                          className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                        >
                          Hospital Photos
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          onClick={() => handleNavigation("events-photos")}
                          className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                        >
                          Events Photos
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-orange-50 hover:text-orange-600 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
                      onClick={(e) => handleNavigation("affiliated-institutes", e)}
                    >
                      Affiliated Institutes
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md text-white px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
                      style={{ backgroundColor: "#F59E0B" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#D97706")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#F59E0B")
                      }
                      onClick={(e) => handleNavigation("contact", e)}
                    >
                      Contact Us
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Admin Panel Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigation("admin")}
                className="ml-2 border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
              >
                <User className="h-4 w-4 mr-2" />
                Admin Panel
              </Button>
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
                  <div className="mt-6 space-y-6">
                    {/* Mobile Logo */}
                    <div
                      className="flex items-center space-x-3 p-4 border-b border-border cursor-pointer"
                      onClick={() => handleNavigation("home")}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full">
                        <img
                          src={gineraLogo}
                          alt="College Logo"
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <h1 className="text-lg font-bold text-gray-900">
                          Medical College
                        </h1>
                        <p className="text-xs text-gray-600">
                          Excellence in Medical Education
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      className="w-full justify-start hover:bg-orange-50"
                      onClick={() => handleNavigation("home")}
                    >
                      Home
                    </Button>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">About Us</h4>
                      <div className="pl-4 space-y-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start hover:bg-orange-50"
                          onClick={() => handleNavigation("about-logo")}
                        >
                          College Logo
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start hover:bg-orange-50"
                          onClick={() => handleNavigation("dean-message")}
                        >
                          Dean's Message
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start hover:bg-orange-50"
                          onClick={() => handleNavigation("history")}
                        >
                          Our History
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start hover:bg-orange-50"
                          onClick={() => handleNavigation("location")}
                        >
                          Campus Location
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start hover:bg-orange-50"
                          onClick={() => handleNavigation("vision-mission")}
                        >
                          Vision & Mission
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start hover:bg-orange-50"
                          onClick={() => handleNavigation("achievements")}
                        >
                          Achievements
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Admissions</h4>
                      <div className="pl-4 space-y-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start hover:bg-orange-50"
                          onClick={() => handleNavigation("courses")}
                        >
                          Courses Offered
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start hover:bg-orange-50"
                          onClick={() => handleNavigation("admission-procedure")}
                        >
                          Admission Procedure
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start hover:bg-orange-50"
                          onClick={() => handleNavigation("admission-rules")}
                        >
                          Admission Rules
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start hover:bg-orange-50"
                          onClick={() => handleNavigation("bond")}
                        >
                          Service Bond
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start hover:bg-orange-50"
                          onClick={() => handleNavigation("instructions")}
                        >
                          Student Guidelines
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Departments</h4>
                      <div className="pl-4 space-y-2">
                        {departmentItems[0].items.map((item, itemIndex) => (
                          <Button
                            key={itemIndex}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start hover:bg-orange-50 whitespace-normal text-left"
                            onClick={() =>
                              handleNavigation(
                                `department-${item
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")
                                  .replace(/[()&]/g, "")
                                  .replace(/,/g, "")}`
                              )
                            }
                          >
                            {item}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Gallery</h4>
                      <div className="pl-4 space-y-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start hover:bg-orange-50"
                          onClick={() => handleNavigation("college-photos")}
                        >
                          College Photos
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start hover:bg-orange-50"
                          onClick={() => handleNavigation("hospital-photos")}
                        >
                          Hospital Photos
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start hover:bg-orange-50"
                          onClick={() => handleNavigation("events-photos")}
                        >
                          Events Photos
                        </Button>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      className="w-full justify-start hover:bg-orange-50"
                      onClick={() => handleNavigation("affiliated-institutes")}
                    >
                      Affiliated Institutes
                    </Button>

                    <Button
                      className="w-full justify-start text-white"
                      style={{ backgroundColor: "#F59E0B" }}
                      onClick={() => handleNavigation("contact")}
                    >
                      Contact Us
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start border-orange-500 text-orange-600 hover:bg-orange-50"
                      onClick={() => handleNavigation("admin")}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Admin Panel
                    </Button>
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