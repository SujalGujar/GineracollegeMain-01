import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const SectionVisibilityContext = createContext();

export const SectionVisibilityProvider = ({ children }) => {
  const [visibilityMap, setVisibilityMap] = useState(() => {
    try {
      const cached = localStorage.getItem('ginera_section_visibility');
      return cached ? JSON.parse(cached) : {};
    } catch {
      return {};
    }
  });
  const [sectionsList, setSectionsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const inFlightPromiseRef = React.useRef(null);
  const lastFetchTimeRef = React.useRef(0);

  const fetchVisibility = async (force = false) => {
    const now = Date.now();
    if (!force && inFlightPromiseRef.current) {
      return inFlightPromiseRef.current;
    }
    if (!force && now - lastFetchTimeRef.current < 15000) {
      return;
    }

    inFlightPromiseRef.current = (async () => {
      try {
        const res = await axiosInstance.get('/section-visibility');
        lastFetchTimeRef.current = Date.now();
        if (Array.isArray(res.data) && res.data.length > 0) {
          setSectionsList(res.data);
          const map = {};
          res.data.forEach(item => {
            map[item.sectionKey] = item.isVisible !== false;
          });
          setVisibilityMap(map);
          try {
            localStorage.setItem('ginera_section_visibility', JSON.stringify(map));
          } catch { }
        }
      } catch (err) {
        console.error('Failed to fetch section visibility:', err);
      } finally {
        setLoading(false);
        inFlightPromiseRef.current = null;
      }
    })();

    return inFlightPromiseRef.current;
  };

  useEffect(() => {
    fetchVisibility();

    const handleStorageChange = (e) => {
      if (e.key === 'ginera_section_visibility' && e.newValue) {
        try {
          setVisibilityMap(JSON.parse(e.newValue));
        } catch { }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const isSectionVisible = (sectionKey) => {
    if (visibilityMap && visibilityMap[sectionKey] === false) {
      return false;
    }
    return true; // Default to true so pages never open blank
  };

  const toggleSection = async (sectionKey, isVisible) => {
    // Optimistic UI update
    setVisibilityMap(prev => {
      const updated = { ...prev, [sectionKey]: isVisible };
      try {
        localStorage.setItem('ginera_section_visibility', JSON.stringify(updated));
      } catch { }
      return updated;
    });
    setSectionsList(prev => prev.map(s => s.sectionKey === sectionKey ? { ...s, isVisible } : s));

    try {
      await axiosInstance.put(`/section-visibility/${sectionKey}`, { isVisible });
    } catch (err) {
      console.error(`Failed to update visibility for ${sectionKey}:`, err);
      // Revert on error
      fetchVisibility();
      throw err;
    }
  };

  const togglePageSections = async (pageName, isVisible) => {
    // Optimistic UI update
    setVisibilityMap(prev => {
      const next = { ...prev };
      sectionsList.filter(s => s.page === pageName).forEach(s => {
        next[s.sectionKey] = isVisible;
      });
      try {
        localStorage.setItem('ginera_section_visibility', JSON.stringify(next));
      } catch { }
      return next;
    });

    setSectionsList(prev => prev.map(s => s.page === pageName ? { ...s, isVisible } : s));

    try {
      await axiosInstance.put('/section-visibility/bulk', { page: pageName, isVisible });
    } catch (err) {
      console.error(`Failed to update bulk page visibility for ${pageName}:`, err);
      fetchVisibility();
      throw err;
    }
  };

  const toggleDepartmentSections = async (departmentSlug, isVisible) => {
    const slugKey = (departmentSlug || '').toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_');
    // Optimistic UI update
    setVisibilityMap(prev => {
      const next = { ...prev };
      sectionsList.forEach(s => {
        if (s.departmentSlug === departmentSlug || (s.sectionKey && s.sectionKey.startsWith(`dept_${slugKey}`))) {
          next[s.sectionKey] = isVisible;
        }
      });
      try {
        localStorage.setItem('ginera_section_visibility', JSON.stringify(next));
      } catch { }
      return next;
    });

    setSectionsList(prev => prev.map(s => {
      if (s.departmentSlug === departmentSlug || (s.sectionKey && s.sectionKey.startsWith(`dept_${slugKey}`))) {
        return { ...s, isVisible };
      }
      return s;
    }));

    try {
      await axiosInstance.put('/section-visibility/bulk', { departmentSlug, isVisible });
    } catch (err) {
      console.error(`Failed to update bulk department visibility for ${departmentSlug}:`, err);
      fetchVisibility();
      throw err;
    }
  };

  return (
    <SectionVisibilityContext.Provider value={{
      visibilityMap,
      sectionsList,
      loading,
      isSectionVisible,
      toggleSection,
      togglePageSections,
      toggleDepartmentSections,
      refreshVisibility: fetchVisibility
    }}>
      {children}
    </SectionVisibilityContext.Provider>
  );
};

export const useSectionVisibility = () => {
  const context = useContext(SectionVisibilityContext);
  if (!context) {
    throw new Error('useSectionVisibility must be used within a SectionVisibilityProvider');
  }
  return context;
};
