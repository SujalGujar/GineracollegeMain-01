import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Header } from './components/Header';
import { Toaster } from './components/ui/sonner';
import gineraLogo2 from './images/ginera-logo2.png';

import HomePage from './components/HomePage.jsx';

import { AboutLogo, DeanMessage, History, Location, VisionMission, Achievements } from './components/AboutPages';
import { CoursesOffered, AdmissionProcedure, AdmissionRules, Instructions } from './components/AdmissionPages';
import HeroSection from './Homepages/HeroSection';

import { GenericDepartment } from './components/DepartmentPages';

import { CollegePhotos, HospitalPhotos, EventsPhotos } from './components/PhotoGallery';
import { AffiliatedInstitutes } from './components/AffiliatedInstitutes';
import { ContactPage } from './components/ContactPage';
import AdminPanel from './components/AdminPanel';
import { LoginPage } from './components/LoginPage';
import LoadingScreen from './components/LoadingScreen';
import { StudentCorner } from './components/StudentCorner';
import { waitForApiIdle } from './api/axiosInstance';

export default function App() {
  const getPageFromLocation = () => {
    const hash = window.location.hash;
    if (window.location.pathname === '/admin' || hash === '#/admin') {
      return 'admin';
    }
    if (hash && hash.startsWith('#/')) {
      let raw = hash.substring(2);
      try {
        raw = decodeURIComponent(raw);
      } catch (e) {}
      const pageKey = raw.trim().toLowerCase().replace(/\s+/g, '-');
      return pageKey || 'home';
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(() => {
    return getPageFromLocation();
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('adminAuthenticated') === 'true';
  });

  const [pageLoading, setPageLoading] = useState(true);
  const navigationId = useRef(0);

  const openPageWithLoader = (page: string, updateUrl = true) => {
    const requestId = ++navigationId.current;
    setPageLoading(true);
    if (updateUrl) {
      if (page === 'home') {
        window.history.pushState(null, '', window.location.pathname);
      } else {
        window.history.pushState(null, '', '#/' + page);
      }
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);

    const minLoadTimer = new Promise((resolve) => setTimeout(resolve, 650));
    Promise.all([waitForApiIdle(), minLoadTimer]).then(() => {
      if (navigationId.current === requestId) {
        setPageLoading(false);
      }
    });
  };

  useEffect(() => {
    const requestId = ++navigationId.current;
    const minLoadTimer = new Promise((resolve) => setTimeout(resolve, 650));
    Promise.all([waitForApiIdle(), minLoadTimer]).then(() => {
      if (navigationId.current === requestId) setPageLoading(false);
    });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      openPageWithLoader(getPageFromLocation(), false);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigation = (page: string) => {
    openPageWithLoader(page);
  };

  const renderCurrentPage = () => {
    if (currentPage.startsWith('department-')) {
      return <GenericDepartment slug={currentPage.replace('department-', '')} category="Nursing Department" />;
    }
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;

      // About Us pages
      case 'about-logo':
        return <AboutLogo onNavigate={handleNavigation} />;
      case 'dean-message':
        return <DeanMessage onNavigate={handleNavigation} />;
      case 'history':
        return <History onNavigate={handleNavigation} />;
      case 'location':
        return <Location onNavigate={handleNavigation} />;
      case 'vision-mission':
        return <VisionMission onNavigate={handleNavigation} />;
      case 'achievements':
        return <Achievements onNavigate={handleNavigation} />;

      // Admission pages
      case 'courses':
        return <CoursesOffered onNavigate={handleNavigation} />;
      case 'admission-procedure':
        return <AdmissionProcedure onNavigate={handleNavigation} />;
      case 'admission-rules':
        return <AdmissionRules onNavigate={handleNavigation} />;
      case 'instructions':
        return <Instructions onNavigate={handleNavigation} />;

      // Nursing Department pages
      case 'department-fundamentals':
        return <GenericDepartment slug="fundamentals" category="Nursing Department" />;
      case 'department-medical-surgical':
        return <GenericDepartment slug="medical-surgical" category="Nursing Department" />;
      case 'department-obstetric':
        return <GenericDepartment slug="obstetric" category="Nursing Department" />;
      case 'department-child-health':
        return <GenericDepartment slug="child-health" category="Nursing Department" />;
      case 'department-community':
        return <GenericDepartment slug="community" category="Nursing Department" />;
      case 'department-mental-health':
        return <GenericDepartment slug="mental-health" category="Nursing Department" />;

      // Photo Gallery pages
      case 'college-photos':
        return <CollegePhotos onNavigate={handleNavigation} />;
      case 'hospital-photos':
        return <HospitalPhotos onNavigate={handleNavigation} />;
      case 'events-photos':
        return <EventsPhotos onNavigate={handleNavigation} />;

      // Other pages
      case 'affiliated-institutes':
      case 'institutes':
        return <AffiliatedInstitutes onNavigate={handleNavigation} />;
      case 'student-corner':
        return <StudentCorner onNavigate={handleNavigation} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigation} />;
      case 'admin':
        if (isLoggedIn) {
          return <AdminPanel onLogout={() => {
            setIsLoggedIn(false);
            localStorage.removeItem('adminAuthenticated');
            handleNavigation('home');
          }} />;
        }
        return <LoginPage onLogin={() => {
          setIsLoggedIn(true);
          localStorage.setItem('adminAuthenticated', 'true');
        }} />;

      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  // For admin page: use a fully isolated full-screen layout
  const isAdmin = currentPage === 'admin';
  const showLoader = pageLoading;

  return (
    <ThemeProvider>
      {isAdmin ? (
        // Admin layout: fill the viewport and let admin panel handle its own scrolling
        <>
          {showLoader && <LoadingScreen />}
          <div
            className="flex flex-col w-screen h-screen overflow-hidden bg-gray-50"
            style={{
              display: showLoader ? 'none' : 'flex',
              width: '100vw',
              height: '100dvh',
              minHeight: '100dvh',
              maxHeight: '100dvh',
              overflow: 'hidden',
            }}>
            <main
              className="flex-1 min-h-0 flex flex-col overflow-hidden w-full"
              style={{ minHeight: 0, height: '100%' }}>
              {renderCurrentPage()}
            </main>
            <Toaster />
          </div>
        </>
      ) : (
        <>
          {showLoader && <LoadingScreen />}
          <div 
            className="min-h-screen bg-background flex flex-col"
            style={{ display: showLoader ? 'none' : 'flex' }}
          >
            <Header currentPage={currentPage} onNavigate={handleNavigation} />
            <main className="flex-1">
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
                      <button onClick={() => handleNavigation('department-fundamentals')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Fundamentals of Nursing</button>
                      <button onClick={() => handleNavigation('department-medical-surgical')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Medical Surgical Nursing</button>
                      <button onClick={() => handleNavigation('department-obstetric')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Obstetric & Gynaecological Nursing</button>
                      <button onClick={() => handleNavigation('department-child-health')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Child Health Nursing</button>
                      <button onClick={() => handleNavigation('department-community')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Community Health Nursing</button>
                      <button onClick={() => handleNavigation('department-mental-health')} className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all text-sm">Mental Health Nursing</button>
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
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#F59E0B' }}>
                          <span className="text-white text-xs">✉️</span>
                        </div>
                        <div className="flex flex-col text-sm space-y-1.5">
                          <div>
                            <span className="text-xs text-gray-400 block font-medium">College of Nursing :</span>
                            <span className="text-white">prin-gcona-adm@gujarat.gov.in</span>
                          </div>
                          <div>
                            <span className="text-xs text-gray-400 block font-medium">College of Nursing :</span>
                            <span className="text-white">principalgcona@gmail.com</span>
                          </div>
                          <div>
                            <span className="text-xs text-gray-400 block font-medium">School of Nursing:</span>
                            <span className="text-white">principalgsona@gmail.com</span>
                          </div>
                        </div>
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
        </>
      )}
    </ThemeProvider>
  );
}
