// import React, { useState } from 'react';
// import { Sparkles } from "lucide-react";
// import { ThemeProvider } from './components/ThemeProvider';
// import { Header } from './components/Header';
// import { Toaster } from './components/ui/sonner';
// import  {HomePage}  from './components/HomePage';
// import { AboutLogo, DeanMessage, History, Location, VisionMission, Achievements } from './components/AboutPages';
// import { CoursesOffered, AdmissionProcedure, AdmissionRules, Bond, Instructions } from './components/AdmissionPages';
// import { AnatomyDepartment, PhysiologyDepartment, BiochemistryDepartment, PharmacologyDepartment, MicrobiologyDepartment, MedicineDepartment, SurgeryDepartment, GenericDepartment } from './components/DepartmentPages';
// import { CollegePhotos, HospitalPhotos, EventsPhotos } from './components/PhotoGallery';
// import { AffiliatedInstitutes } from './components/AffiliatedInstitutes';
// import { ContactPage } from './components/ContactPage';
// import { AdminPanel } from './components/AdminPanel';

// export default function App() {
//   const [currentPage, setCurrentPage] = useState('home');

//   const handleNavigation = (page: string) => {
//     setCurrentPage(page);
//   };

//   const renderCurrentPage = () => {
//     switch (currentPage) {
//       case 'home':
//         return <HomePage />;
      
//       // About Us pages
//       case 'about-logo':
//         return <AboutLogo />;
//       case 'dean-message':
//         return <DeanMessage />;
//       case 'history':
//         return <History />;
//       case 'location':
//         return <Location />;
//       case 'vision-mission':
//         return <VisionMission />;
//       case 'achievements':
//         return <Achievements />;
      
//       // Admission pages
//       case 'courses':
//         return <CoursesOffered />;
//       case 'admission-procedure':
//         return <AdmissionProcedure />;
//       case 'admission-rules':
//         return <AdmissionRules />;
//       case 'bond':
//         return <Bond />;
//       case 'instructions':
//         return <Instructions />;
      
//       // Department pages - Preclinical
//       case 'department-anatomy':
//         return <AnatomyDepartment />;
//       case 'department-physiology':
//         return <PhysiologyDepartment />;
//       case 'department-biochemistry':
//         return <BiochemistryDepartment />;
      
//       // Department pages - Paraclinical
//       case 'department-pharmacology':
//         return <PharmacologyDepartment />;
//       case 'department-microbiology':
//         return <MicrobiologyDepartment />;
//       case 'department-forensic-medicine':
//         return <GenericDepartment deptName="Forensic Medicine" category="Paraclinical Department" />;
//       case 'department-pathology':
//         return <GenericDepartment deptName="Pathology" category="Paraclinical Department" />;
//       case 'department-community-medicine':
//         return <GenericDepartment deptName="Community Medicine" category="Paraclinical Department" />;
      
//       // Department pages - Clinical
//       case 'department-ent':
//         return <GenericDepartment deptName="ENT" category="Clinical Department" />;
//       case 'department-ophthalmology':
//         return <GenericDepartment deptName="Ophthalmology" category="Clinical Department" />;
//       case 'department-medicine':
//         return <MedicineDepartment />;
//       case 'department-skin-and-vd':
//         return <GenericDepartment deptName="Skin & VD" category="Clinical Department" />;
//       case 'department-paediatrics':
//         return <GenericDepartment deptName="Paediatrics" category="Clinical Department" />;
//       case 'department-surgery':
//         return <SurgeryDepartment />;
//       case 'department-orthopedics':
//         return <GenericDepartment deptName="Orthopedics" category="Clinical Department" />;
//       case 'department-anesthesia':
//         return <GenericDepartment deptName="Anesthesia" category="Clinical Department" />;
//       case 'department-obstetrics-and-gynecology':
//         return <GenericDepartment deptName="Obstetrics & Gynecology" category="Clinical Department" />;
//       case 'department-psychiatry':
//         return <GenericDepartment deptName="Psychiatry" category="Clinical Department" />;
//       case 'department-tb-and-chest':
//         return <GenericDepartment deptName="TB & Chest" category="Clinical Department" />;
//       case 'department-radiology':
//         return <GenericDepartment deptName="Radiology" category="Clinical Department" />;
//       case 'department-ihbt':
//         return <GenericDepartment deptName="IHBT" category="Clinical Department" />;
//       case 'department-emergency-medicine':
//         return <GenericDepartment deptName="Emergency Medicine" category="Clinical Department" />;
//       case 'department-plastic-surgery':
//         return <GenericDepartment deptName="Plastic Surgery" category="Clinical Department" />;
//       case 'department-pediatric-surgery':
//         return <GenericDepartment deptName="Pediatric Surgery" category="Clinical Department" />;
//       case 'department-neurosurgery':
//         return <GenericDepartment deptName="Neurosurgery" category="Clinical Department" />;
//       case 'department-urology':
//         return <GenericDepartment deptName="Urology" category="Clinical Department" />;
      
//       // Photo Gallery pages
//       case 'college-photos':
//         return <CollegePhotos />;
//       case 'hospital-photos':
//         return <HospitalPhotos />;
//       case 'events-photos':
//         return <EventsPhotos />;
      
//       // Other pages
//       case 'affiliated-institutes':
//         return <AffiliatedInstitutes />;
//       case 'contact':
//         return <ContactPage />;
//       case 'admin':
//         return <AdminPanel />;
      
//       default:
//         return <HomePage />;
//     }
//   };

//   return (
//     <ThemeProvider>
//       <div className="min-h-screen bg-background">
//         <Header currentPage={currentPage} onNavigate={handleNavigation} />
//         <main>
//           {renderCurrentPage()}
//         </main>
      
//       {/* Footer */}
//       <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F59E0B' }}>
//                   <Sparkles className="text-white w-5 h-5" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg">Government Medical College</h3>
//                   <p className="text-xs text-gray-400">Estd. 1960</p>
//                 </div>
//               </div>
//               <p className="text-gray-300 leading-relaxed text-sm mb-4">
//                 Excellence in Medical Education & Healthcare Services. NAAC 'A+' Accredited institution committed to producing competent medical professionals.
//               </p>
//               <div className="flex space-x-3">
//                 <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
//                   <span className="text-sm">📘</span>
//                 </div>
//                 <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
//                   <span className="text-sm">🐦</span>
//                 </div>
//                 <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
//                   <span className="text-sm">📷</span>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
//               <div className="space-y-3">
//                 <button onClick={() => handleNavigation('home')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Home</button>
//                 <button onClick={() => handleNavigation('dean-message')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Dean's Message</button>
//                 <button onClick={() => handleNavigation('admission-procedure')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Admissions</button>
//                 <button onClick={() => handleNavigation('courses')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Courses</button>
//                 <button onClick={() => handleNavigation('achievements')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Achievements</button>
//               </div>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4 text-lg">Academic</h4>
//               <div className="space-y-3">
//                 <button onClick={() => handleNavigation('department-medicine')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Medicine</button>
//                 <button onClick={() => handleNavigation('department-surgery')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Surgery</button>
//                 <button onClick={() => handleNavigation('department-paediatrics')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Paediatrics</button>
//                 <button onClick={() => handleNavigation('department-anatomy')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Anatomy</button>
//                 <button onClick={() => handleNavigation('college-photos')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Gallery</button>
//               </div>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4 text-lg">Contact Information</h4>
//               <div className="space-y-3 text-gray-300">
//                 <div className="flex items-start space-x-3">
//                   <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#F59E0B' }}>
//                     <span className="text-white text-xs">🏢</span>
//                   </div>
//                   <span className="text-sm">Civil Hospital Campus, Asarwa, Ahmedabad - 380016, Gujarat, India</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: '#F59E0B' }}>
//                     <span className="text-white text-xs">📞</span>
//                   </div>
//                   <span className="text-sm">+91-79-2268-0000</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: '#F59E0B' }}>
//                     <span className="text-white text-xs">✉️</span>
//                   </div>
//                   <span className="text-sm">info@medicalcollege.edu</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-400 text-center md:text-left text-sm">
//               &copy; 2024 Government Medical College, Ahmedabad. All rights reserved.
//             </p>
//             <div className="flex space-x-6 mt-4 md:mt-0 text-gray-400 text-sm">
//               <button className="hover:text-white transition-colors">Privacy Policy</button>
//               <button className="hover:text-white transition-colors">Terms of Service</button>
//               <button className="hover:text-white transition-colors">Academic Calendar</button>
//             </div>
//           </div>
//         </div>
//       </footer>
//       </div>
//       <Toaster />
//     </ThemeProvider>
//   );
// }

import React, { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import {Header} from './components/Header';
import { Toaster } from './components/ui/sonner';
import gineraLogo2 from './images/ginera-logo2.png';

import HomePage from './components/HomePage.jsx';

import { AboutLogo, DeanMessage, History, Location, VisionMission, Achievements } from './components/AboutPages';
import { CoursesOffered, AdmissionProcedure, AdmissionRules, Bond, Instructions } from './components/AdmissionPages';

import { GenericDepartment } from './components/DepartmentPages';

import { CollegePhotos, HospitalPhotos, EventsPhotos } from './components/PhotoGallery';
import { AffiliatedInstitutes } from './components/AffiliatedInstitutes';
import { ContactPage } from './components/ContactPage';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      
      // About Us pages
      case 'about-logo':
        return <AboutLogo />;
      case 'dean-message':
        return <DeanMessage />;
      case 'history':
        return <History />;
      case 'location':
        return <Location />;
      case 'vision-mission':
        return <VisionMission />;
      case 'achievements':
        return <Achievements />;
      
      // Admission pages
      case 'courses':
        return <CoursesOffered />;
      case 'admission-procedure':
        return <AdmissionProcedure />;
      case 'admission-rules':
        return <AdmissionRules />;
      case 'bond':
        return <Bond />;
      case 'instructions':
        return <Instructions />;
      
      // Nursing Department pages
      case 'department-department-of-fundamentals-of-nursing':
        return <GenericDepartment deptName="Department of Fundamentals Of Nursing" category="Nursing Department" />;
      case 'department-department-of-medical-surgical-nursing':
        return <GenericDepartment deptName="Department of Medical Surgical Nursing" category="Nursing Department" />;
      case 'department-department-of-obstetric-and-gynaecological-nursing':
        return <GenericDepartment deptName="Department of Obstetric and Gynaecological Nursing" category="Nursing Department" />;
      case 'department-department-of-child-health-nursing':
        return <GenericDepartment deptName="Department of Child Health Nursing" category="Nursing Department" />;
      case 'department-department-of-community-health-nursing':
        return <GenericDepartment deptName="Department of Community Health Nursing" category="Nursing Department" />;
      case 'department-department-of-mental-health-nursing':
        return <GenericDepartment deptName="Department of Mental Health Nursing" category="Nursing Department" />;
      
      // Photo Gallery pages
      case 'college-photos':
        return <CollegePhotos />;
      case 'hospital-photos':
        return <HospitalPhotos />;
      case 'events-photos':
        return <EventsPhotos />;
      
      // Other pages
      case 'affiliated-institutes':
        return <AffiliatedInstitutes />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminPanel />;
      
      default:
        return <HomePage  onNavigate={handleNavigation}/>;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header currentPage={currentPage} onNavigate={handleNavigation} />
        <main>
          {renderCurrentPage()}
        </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F59E0B' }}>
                  <img src={gineraLogo2} alt="College Logo" className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Nursing College</h3>
                  <p className="text-xs text-gray-400">Estd. 1960</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm mb-4">
                Excellence in Nursing Education & Healthcare Services. NAAC 'A+' Accredited institution committed to producing competent nursing professionals.
              </p>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm">📘</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm">🐦</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm">📷</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
              <div className="space-y-3">
                <button onClick={() => handleNavigation('home')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Home</button>
                <button onClick={() => handleNavigation('dean-message')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Dean's Message</button>
                <button onClick={() => handleNavigation('admission-procedure')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Admissions</button>
                <button onClick={() => handleNavigation('courses')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Courses</button>
                <button onClick={() => handleNavigation('achievements')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Achievements</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Nursing Departments</h4>
              <div className="space-y-3">
                <button onClick={() => handleNavigation('department-department-of-fundamentals-of-nursing')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Fundamentals of Nursing</button>
                <button onClick={() => handleNavigation('department-department-of-medical-surgical-nursing')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Medical Surgical Nursing</button>
                <button onClick={() => handleNavigation('department-department-of-obstetric-and-gynaecological-nursing')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Obstetric & Gynaecological Nursing</button>
                <button onClick={() => handleNavigation('department-department-of-child-health-nursing')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Child Health Nursing</button>
                <button onClick={() => handleNavigation('department-department-of-community-health-nursing')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Community Health Nursing</button>
                <button onClick={() => handleNavigation('department-department-of-mental-health-nursing')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Mental Health Nursing</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Contact Information</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#F59E0B' }}>
                    <span className="text-white text-xs">🏢</span>
                  </div>
                  <span className="text-sm">Nursing College Campus, Ahmedabad - 380016, Gujarat, India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: '#F59E0B' }}>
                    <span className="text-white text-xs">📞</span>
                  </div>
                  <span className="text-sm">+91-79-2268-0000</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: '#F59E0B' }}>
                    <span className="text-white text-xs">✉️</span>
                  </div>
                  <span className="text-sm">info@nursingcollege.edu</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left text-sm">
              &copy; 2024 Nursing College, Ahmedabad. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-gray-400 text-sm">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
              <button className="hover:text-white transition-colors">Academic Calendar</button>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
      </div>
    </ThemeProvider>
  );
}