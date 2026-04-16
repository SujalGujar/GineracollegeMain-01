// import React from "react";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "./ui/navigation-menu.jsx";
// import { Button } from "./ui/button.jsx";
// import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet.jsx";
// import { Menu, GraduationCap, Phone, Mail, Sun, Moon } from "lucide-react";
// import { useTheme } from "./ThemeProvider.jsx";

// const departmentItems = [
//   { 
//     title: "Preclinical Departments",
//     items: ["Anatomy", "Physiology", "Biochemistry"],
//     color: "border-l-blue-600",
//   },
//   {
//     title: "Paraclinical Departments",
//     items: [
//       "Pharmacology",
//       "Microbiology",
//       "Forensic Medicine",
//       "Pathology",
//       "Community Medicine",
//     ],
//     color: "border-l-teal-600",
//   },
//   {
//     title: "Clinical Departments",
//     items: [
//       "ENT",
//       "Ophthalmology",
//       "Medicine",
//       "Skin & VD",
//       "Paediatrics",
//       "Surgery",
//       "Orthopedics",
//       "Anesthesia",
//       "Obstetrics & Gynecology",
//       "Psychiatry",
//       "TB & Chest",
//       "Radiology",
//       "IHBT",
//       "Emergency Medicine",
//       "Plastic Surgery",
//       "Pediatric Surgery",
//       "Neurosurgery",
//       "Urology",
//     ],
//     color: "border-l-green-600",
//   },
// ];

// export function Header({ currentPage, onNavigate }) {
//   const { theme, toggleTheme } = useTheme();

//   const handleNavigation = (page, event) => {
//     if (event) {
//       event.preventDefault();
//     }
//     onNavigate(page);
//   };

//   return (
//     <>
//       {/* Top Header Bar */}
//       <div className="bg-slate-800 text-white py-2 px-4">
//         <div className="container mx-auto flex justify-between items-center text-sm">
//           <div className="flex items-center space-x-6">
//             <div className="flex items-center space-x-2">
//               <Mail className="h-4 w-4" />
//               <span>info@medicalcollege.edu</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Phone className="h-4 w-4" />
//               <span>+91-79-2268-0000</span>
//             </div>
//           </div>
//           <div className="hidden md:flex items-center space-x-4">
//             <button
//               onClick={() => handleNavigation("admin")}
//               className="hover:text-orange-300 transition-colors text-xs"
//             >
//               Admin
//             </button>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={toggleTheme}
//               className="text-white hover:text-orange-300 hover:bg-transparent"
//             >
//               {theme === "light" ? (
//                 <Moon className="h-4 w-4" />
//               ) : (
//                 <Sun className="h-4 w-4" />
//               )}
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Main Header */}
//       <header className="bg-transparent border-b border-border absolute top-8 right-0 left-0 z-50">
//         <div className="container mx-auto px-4">
//           <div className="flex h-16 items-center justify-between">
//             {/* Logo */}
//             <div className="flex items-center space-x-3">
//               <div
//                 className="flex items-center justify-center w-12 h-12  rounded-full cursor-pointer"
//                 onClick={(e) => handleNavigation("home", e)}
//               >
//                 <img
//                   src="/src/images/ginera-logo2.png" // Update this path to your logo
//                   alt="College Logo"
//                   className="w-12 h-12 object-contain bg-transparent"
//                 />
//               </div>
//               <div
//                 className="hidden md:block cursor-pointer"
//                 onClick={(e) => handleNavigation("home", e)}
//               >
//                 <h1 className="text-xl font-bold text-gray-900">
//                   Medical College
//                 </h1>
//                 <p className="text-sm text-gray-600">
//                   Excellence in Medical Education
//                 </p>
//               </div>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex">
//               <NavigationMenu>
//                 <NavigationMenuList>
//                   <NavigationMenuItem>
//                     <NavigationMenuLink
//                       className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors  focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
//                       onClick={(e) => handleNavigation("home", e)}
//                     >
//                       Home
//                     </NavigationMenuLink>
//                   </NavigationMenuItem>

//                   <NavigationMenuItem>
//                     <NavigationMenuTrigger className="bg-transparent">
//                       About Us
//                     </NavigationMenuTrigger>
//                     <NavigationMenuContent>
//                       <div className="w-[500px] p-2 bg-transparent shadow-none">
//                         <div className="grid grid-cols-2 gap-1 bg-background rounded-lg border p-4">
//                           <NavigationMenuLink
//                             onClick={() => handleNavigation("about-logo")}
//                             className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 focus:bg-accent focus:text-accent-foreground"
//                           >
//                             <div className="text-sm font-medium leading-none text-foreground">
//                               College Logo
//                             </div>
//                             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                               Official institutional branding
//                             </p>
//                           </NavigationMenuLink>
//                           <NavigationMenuLink
//                             onClick={() => handleNavigation("dean-message")}
//                             className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 focus:bg-accent focus:text-accent-foreground"
//                           >
//                             <div className="text-sm font-medium leading-none text-foreground">
//                               Dean's Message
//                             </div>
//                             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                               Welcome from the Dean
//                             </p>
//                           </NavigationMenuLink>
//                           <NavigationMenuLink
//                             onClick={() => handleNavigation("history")}
//                             className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 focus:bg-accent focus:text-accent-foreground"
//                           >
//                             <div className="text-sm font-medium leading-none text-foreground">
//                               Our History
//                             </div>
//                             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                               Institutional timeline
//                             </p>
//                           </NavigationMenuLink>
//                           <NavigationMenuLink
//                             onClick={() => handleNavigation("location")}
//                             className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 focus:bg-accent focus:text-accent-foreground"
//                           >
//                             <div className="text-sm font-medium leading-none text-foreground">
//                               Campus Location
//                             </div>
//                             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                               Find us on map
//                             </p>
//                           </NavigationMenuLink>
//                           <NavigationMenuLink
//                             onClick={() => handleNavigation("vision-mission")}
//                             className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 focus:bg-accent focus:text-accent-foreground"
//                           >
//                             <div className="text-sm font-medium leading-none text-foreground">
//                               Vision & Mission
//                             </div>
//                             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                               Our core values
//                             </p>
//                           </NavigationMenuLink>
//                           <NavigationMenuLink
//                             onClick={() => handleNavigation("achievements")}
//                             className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 focus:bg-accent focus:text-accent-foreground"
//                           >
//                             <div className="text-sm font-medium leading-none text-foreground">
//                               Achievements
//                             </div>
//                             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                               Awards & recognitions
//                             </p>
//                           </NavigationMenuLink>
//                         </div>
//                       </div>
//                     </NavigationMenuContent>
//                   </NavigationMenuItem>

//                   <NavigationMenuItem>
//                     <NavigationMenuTrigger className="bg-transparent">
//                       Admissions
//                     </NavigationMenuTrigger>
//                     <NavigationMenuContent>
//                       <div className="w-[450px] p-2 bg-transparent shadow-none">
//                         <div className="bg-background rounded-lg border p-4 space-y-2">
//                           <NavigationMenuLink
//                             onClick={() => handleNavigation("courses")}
//                             className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 focus:bg-accent focus:text-accent-foreground"
//                           >
//                             <div className="text-sm font-medium leading-none text-foreground">
//                               Courses Offered
//                             </div>
//                             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                               MBBS and PG programs
//                             </p>
//                           </NavigationMenuLink>
//                           <NavigationMenuLink
//                             onClick={() =>
//                               handleNavigation("admission-procedure")
//                             }
//                             className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 focus:bg-accent focus:text-accent-foreground"
//                           >
//                             <div className="text-sm font-medium leading-none text-foreground">
//                               Admission Procedure
//                             </div>
//                             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                               Step-by-step process
//                             </p>
//                           </NavigationMenuLink>
//                           <NavigationMenuLink
//                             onClick={() => handleNavigation("admission-rules")}
//                             className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 focus:bg-accent focus:text-accent-foreground"
//                           >
//                             <div className="text-sm font-medium leading-none text-foreground">
//                               Admission Rules
//                             </div>
//                             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                               Eligibility criteria
//                             </p>
//                           </NavigationMenuLink>
//                           <NavigationMenuLink
//                             onClick={() => handleNavigation("bond")}
//                             className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 focus:bg-accent focus:text-accent-foreground"
//                           >
//                             <div className="text-sm font-medium leading-none text-foreground">
//                               Service Bond
//                             </div>
//                             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                               Commitment details
//                             </p>
//                           </NavigationMenuLink>
//                           <NavigationMenuLink
//                             onClick={() => handleNavigation("instructions")}
//                             className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 focus:bg-accent focus:text-accent-foreground"
//                           >
//                             <div className="text-sm font-medium leading-none text-foreground">
//                               Student Guidelines
//                             </div>
//                             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                               Important instructions
//                             </p>
//                           </NavigationMenuLink>
//                         </div>
//                       </div>
//                     </NavigationMenuContent>
//                   </NavigationMenuItem>

//                   <NavigationMenuItem>
//                     <NavigationMenuTrigger className="bg-transparent">
//                       Departments
//                     </NavigationMenuTrigger>
//                     <NavigationMenuContent>
//                       <div className="w-[700px] p-2 bg-transparent shadow-none">
//                         <div className="bg-background rounded-lg border p-4 space-y-4">
//                           {departmentItems.map((dept, index) => (
//                             <div
//                               key={index}
//                               className={`border-l-4 ${dept.color} pl-4 space-y-2`}
//                             >
//                               <h4 className="font-semibold text-foreground">
//                                 {dept.title}
//                               </h4>
//                               <div className="grid grid-cols-3 gap-2">
//                                 {dept.items.map((item, itemIndex) => (
//                                   <NavigationMenuLink
//                                     key={itemIndex}
//                                     onClick={() =>
//                                       handleNavigation(
//                                         `department-${item
//                                           .toLowerCase()
//                                           .replace(/\s+/g, "-")
//                                           .replace("&", "and")}`
//                                       )
//                                     }
//                                     className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors  focus:bg-accent focus:text-accent-foreground"
//                                   >
//                                     {item}
//                                   </NavigationMenuLink>
//                                 ))}
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </NavigationMenuContent>
//                   </NavigationMenuItem>

//                   <NavigationMenuItem>
//                     <NavigationMenuTrigger className="bg-transparent">
//                       Gallery
//                     </NavigationMenuTrigger>
//                     <NavigationMenuContent>
//                       <div className="w-[300px] p-2 bg-transparent shadow-none">
//                         <div className="bg-background rounded-lg border p-4 space-y-2">
//                           <NavigationMenuLink
//                             onClick={() => handleNavigation("college-photos")}
//                             className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 focus:bg-accent focus:text-accent-foreground"
//                           >
//                             <div className="text-sm font-medium leading-none text-foreground">
//                               College Photos
//                             </div>
//                             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                               Campus infrastructure
//                             </p>
//                           </NavigationMenuLink>
//                           <NavigationMenuLink
//                             onClick={() => handleNavigation("hospital-photos")}
//                             className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 focus:bg-accent focus:text-accent-foreground"
//                           >
//                             <div className="text-sm font-medium leading-none text-foreground">
//                               Hospital Photos
//                             </div>
//                             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                               Clinical facilities
//                             </p>
//                           </NavigationMenuLink>
//                           <NavigationMenuLink
//                             onClick={() => handleNavigation("events-photos")}
//                             className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 focus:bg-accent focus:text-accent-foreground"
//                           >
//                             <div className="text-sm font-medium leading-none text-foreground">
//                               Events Photos
//                             </div>
//                             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                               Academic & cultural events
//                             </p>
//                           </NavigationMenuLink>
//                         </div>
//                       </div>
//                     </NavigationMenuContent>
//                   </NavigationMenuItem>

//                   <NavigationMenuItem>
//                     <NavigationMenuLink
//                       className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors  focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
//                       onClick={(e) =>
//                         handleNavigation("affiliated-institutes", e)
//                       }
//                     >
//                       Affiliated Institutes
//                     </NavigationMenuLink>
//                   </NavigationMenuItem>

//                   <NavigationMenuItem>
//                     <NavigationMenuLink
//                       className="group inline-flex h-10 w-max items-center justify-center rounded-md text-white px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
//                       style={{ backgroundColor: "#F59E0B" }}
//                       onMouseEnter={(e) =>
//                         (e.currentTarget.style.backgroundColor = "#D97706")
//                       }
//                       onMouseLeave={(e) =>
//                         (e.currentTarget.style.backgroundColor = "#F59E0B")
//                       }
//                       onClick={(e) => handleNavigation("contact", e)}
//                     >
//                       Contact Us
//                     </NavigationMenuLink>
//                   </NavigationMenuItem>
//                 </NavigationMenuList>
//               </NavigationMenu>
//             </div>

//             {/* Mobile Navigation */}
//             <div className="lg:hidden">
//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button variant="ghost" size="icon">
//                     <Menu className="h-6 w-6" />
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="right" className="w-80">
//                   <div className="mt-6 space-y-6">
//                     {/* Mobile Logo */}
//                     <div
//                       className="flex items-center space-x-3 p-4 border-b border-border cursor-pointer"
//                       onClick={() => handleNavigation("home")}
//                     >
//                       <div className="flex items-center justify-center w-10 h-10 rounded-full">
//                         <img
//                           src="/src/images/ginera-logo.png" // Update this path to your logo
//                           alt="College Logo"
//                           className="w-6 h-6 object-contain"
//                         />
//                       </div>
//                       <div>
//                         <h1 className="text-lg font-bold text-gray-900">
//                           Medical College
//                         </h1>
//                         <p className="text-xs text-gray-600">
//                           Excellence in Medical Education
//                         </p>
//                       </div>
//                     </div>

//                     <Button
//                       variant="ghost"
//                       className="w-full justify-start"
//                       onClick={() => handleNavigation("home")}
//                     >
//                       Home
//                     </Button>

//                     <div className="space-y-3">
//                       <h4 className="font-medium text-gray-900">About Us</h4>
//                       <div className="pl-4 space-y-2">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="w-full justify-start"
//                           onClick={() => handleNavigation("about-logo")}
//                         >
//                           College Logo
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="w-full justify-start"
//                           onClick={() => handleNavigation("dean-message")}
//                         >
//                           Dean's Message
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="w-full justify-start"
//                           onClick={() => handleNavigation("history")}
//                         >
//                           Our History
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="w-full justify-start"
//                           onClick={() => handleNavigation("location")}
//                         >
//                           Campus Location
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="w-full justify-start"
//                           onClick={() => handleNavigation("vision-mission")}
//                         >
//                           Vision & Mission
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="w-full justify-start"
//                           onClick={() => handleNavigation("achievements")}
//                         >
//                           Achievements
//                         </Button>
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       <h4 className="font-medium text-gray-900">Admissions</h4>
//                       <div className="pl-4 space-y-2">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="w-full justify-start"
//                           onClick={() => handleNavigation("courses")}
//                         >
//                           Courses Offered
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="w-full justify-start"
//                           onClick={() =>
//                             handleNavigation("admission-procedure")
//                           }
//                         >
//                           Admission Procedure
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="w-full justify-start"
//                           onClick={() => handleNavigation("admission-rules")}
//                         >
//                           Admission Rules
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="w-full justify-start"
//                           onClick={() => handleNavigation("bond")}
//                         >
//                           Service Bond
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="w-full justify-start"
//                           onClick={() => handleNavigation("instructions")}
//                         >
//                           Student Guidelines
//                         </Button>
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       <h4 className="font-medium text-gray-900">Departments</h4>
//                       <div className="pl-4 space-y-2">
//                         {departmentItems.flatMap((dept, index) =>
//                           dept.items.map((item, itemIndex) => (
//                             <Button
//                               key={`${index}-${itemIndex}`}
//                               variant="ghost"
//                               size="sm"
//                               className="w-full justify-start"
//                               onClick={() =>
//                                 handleNavigation(
//                                   `department-${item
//                                     .toLowerCase()
//                                     .replace(/\s+/g, "-")
//                                     .replace("&", "and")}`
//                                 )
//                               }
//                             >
//                               {item}
//                             </Button>
//                           ))
//                         )}
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       <h4 className="font-medium text-gray-900">Gallery</h4>
//                       <div className="pl-4 space-y-2">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="w-full justify-start"
//                           onClick={() => handleNavigation("college-photos")}
//                         >
//                           College Photos
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="w-full justify-start"
//                           onClick={() => handleNavigation("hospital-photos")}
//                         >
//                           Hospital Photos
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="w-full justify-start"
//                           onClick={() => handleNavigation("events-photos")}
//                         >
//                           Events Photos
//                         </Button>
//                       </div>
//                     </div>

//                     <Button
//                       variant="ghost"
//                       className="w-full justify-start"
//                       onClick={() => handleNavigation("affiliated-institutes")}
//                     >
//                       Affiliated Institutes
//                     </Button>

//                     <Button
//                       className="w-full justify-start text-white"
//                       style={{ backgroundColor: "#F59E0B" }}
//                       onClick={() => handleNavigation("contact")}
//                     >
//                       Contact Us
//                     </Button>

//                     <div className="mt-6 pt-6 border-t border-border space-y-2">
//                       <Button
//                         variant="ghost"
//                         className="w-full justify-start"
//                         onClick={() => handleNavigation("admin")}
//                       >
//                         Admin Panel
//                       </Button>
                     
//                     </div>
//                   </div>
//                 </SheetContent>
//               </Sheet>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// }

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
  const handleNavigation = (page, event) => {
    if (event) {
      event.preventDefault();
    }
    onNavigate(page);
  };

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
                    <NavigationMenuTrigger className="bg-transparent hover:bg-orange-50 hover:text-orange-600 data-[state=open]:bg-orange-50 data-[state=open]:text-orange-600">
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
                          className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
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
              <Sheet>
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