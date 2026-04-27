import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  ChevronRight,
  Upload,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Layers,
  ArrowRight
} from "lucide-react";
import axiosInstance from "../api/axiosInstance";

const AdminPanel = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("Home Page");
  const [aboutActiveSubTab, setAboutActiveSubTab] = useState("Branding");
  const [sliders, setSliders] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [academicContent, setAcademicContent] = useState({ title: "", description1: "", description2: "" });
  const [testimonials, setTestimonials] = useState([]);
  // About Us
  const [milestones, setMilestones] = useState([]);
  const [deanMessage, setDeanMessage] = useState({ name: '', title: '', greeting: '', paragraphs: [], highlight: '', photoUrl: '', stats: [] });
  const [collegeLogo, setCollegeLogo] = useState({ logoUrl: '', collegeName: '', tagline: '' });
  const [milestoneForm, setMilestoneForm] = useState({ year: '', event: '', icon: '🎯', color: '#1e3a8a', description: '' });
  const [deanPhotoFile, setDeanPhotoFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // slider, program, testimonial, milestone
  const [editItem, setEditItem] = useState(null);
  const [notification, setNotification] = useState(null);

  // Vision & Mission
  const [visionMission, setVisionMission] = useState([]);
  const [vmForm, setVmForm] = useState({ type: 'vision', content: '', order: 0 });

  // Core Values
  const [coreValues, setCoreValues] = useState([]);
  const [cvForm, setCvForm] = useState({ icon: '🌟', title: '', description: '', color: 'from-amber-500 to-orange-500', order: 0 });

  // Form States
  const [programForm, setProgramForm] = useState({
    title: "",
    description: "",
    duration: "",
    category: "",
    courses: "",
    image: null
  });

  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
    image: null
  });

  const [sliderFiles, setSliderFiles] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [slidersRes, programsRes, testimonialsRes, contentRes, milestonesRes, deanRes, logoRes, vmRes, cvRes] = await Promise.all([
        axiosInstance.get("/sliders"),
        axiosInstance.get("/programs"),
        axiosInstance.get("/testimonials"),
        axiosInstance.get("/content/academic"),
        axiosInstance.get("/about/milestones"),
        axiosInstance.get("/about/dean"),
        axiosInstance.get("/about/college-logo"),
        axiosInstance.get("/about/vision-mission"),
        axiosInstance.get("/about/core-values")
      ]);
      setSliders(slidersRes.data);
      setPrograms(programsRes.data);
      setTestimonials(testimonialsRes.data);
      setAcademicContent(contentRes.data);
      setMilestones(milestonesRes.data);
      setDeanMessage(deanRes.data);
      setCollegeLogo(logoRes.data);
      setVisionMission(vmRes.data);
      setCoreValues(cvRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      showNotify("Error fetching data", "error");
    } finally {
      setLoading(false);
    }
  };

  const showNotify = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // --- SLIDER ACTIONS ---
  const handleSliderUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach(file => formData.append("images", file));

    try {
      await axiosInstance.post("/sliders/upload", formData);
      showNotify("Images uploaded successfully");
      fetchData();
    } catch (error) {
      showNotify("Upload failed", "error");
    }
  };

  const deleteSlider = async (id) => {
    if (!window.confirm("Delete this slider image?")) return;
    try {
      await axiosInstance.delete(`/sliders/${id}`);
      showNotify("Slider deleted");
      fetchData();
    } catch (error) {
      showNotify("Delete failed", "error");
    }
  };

  const updateSliderImage = async (id, file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      await axiosInstance.put(`/sliders/${id}`, formData);
      showNotify("Slider updated");
      fetchData();
    } catch (error) {
      showNotify("Update failed", "error");
    }
  };

  // --- PROGRAM ACTIONS ---
  const handleProgramSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(programForm).forEach(key => {
      if (key === "courses") {
        const coursesArray = programForm[key].split(",").map(c => c.trim()).filter(c => c);
        formData.append(key, JSON.stringify(coursesArray));
      } else if (key === "image" && programForm[key]) {
        formData.append("image", programForm[key]);
      } else {
        formData.append(key, programForm[key]);
      }
    });

    try {
      if (editItem) {
        await axiosInstance.put(`/programs/${editItem._id}`, formData);
        showNotify("Program updated");
      } else {
        await axiosInstance.post("/programs", formData);
        showNotify("Program created");
      }
      setShowModal(false);
      setEditItem(null);
      resetProgramForm();
      fetchData();
    } catch (error) {
      showNotify("Operation failed", "error");
    }
  };

  const deleteProgram = async (id) => {
    if (!window.confirm("Delete this program?")) return;
    try {
      await axiosInstance.delete(`/programs/${id}`);
      showNotify("Program removed");
      fetchData();
    } catch (error) {
      showNotify("Delete failed", "error");
    }
  };

  const resetProgramForm = () => {
    setProgramForm({
      title: "",
      description: "",
      duration: "",
      category: "Undergraduate",
      courses: "",
      image: null
    });
  };

  const openProgramEdit = (prog) => {
    setEditItem(prog);
    setProgramForm({
      title: prog.title,
      description: prog.description,
      duration: prog.duration,
      category: prog.category,
      courses: prog.courses ? prog.courses.join(", ") : "",
      image: null
    });
    setModalType("program");
    setShowModal(true);
  };

  const saveAcademicContent = async () => {
    try {
      await axiosInstance.put("/content/academic", academicContent);
      showNotify("Academic Section Content Updated");
    } catch (error) {
      showNotify("Update failed", "error");
    }
  };

  // --- TESTIMONIAL ACTIONS ---
  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(testimonialForm).forEach(key => {
      if (key === "image" && testimonialForm[key]) {
        formData.append("image", testimonialForm[key]);
      } else {
        formData.append(key, testimonialForm[key]);
      }
    });

    try {
      if (editItem) {
        await axiosInstance.put(`/testimonials/${editItem._id}`, formData);
        showNotify("Testimonial updated");
      } else {
        await axiosInstance.post("/testimonials", formData);
        showNotify("Testimonial created");
      }
      setShowModal(false);
      setEditItem(null);
      resetTestimonialForm();
      fetchData();
    } catch (error) {
      showNotify("Operation failed", "error");
    }
  };

  const deleteTestimonial = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await axiosInstance.delete(`/testimonials/${id}`);
      showNotify("Testimonial removed");
      fetchData();
    } catch (error) {
      showNotify("Delete failed", "error");
    }
  };

  const resetTestimonialForm = () => {
    setTestimonialForm({
      name: "",
      role: "",
      content: "",
      rating: 5,
      image: null
    });
  };

  const openTestimonialEdit = (testi) => {
    setEditItem(testi);
    setTestimonialForm({
      name: testi.name,
      role: testi.role,
      content: testi.content,
      rating: testi.rating,
      image: null
    });
    setModalType("testimonial");
    setShowModal(true);
  };

  // ─── ABOUT US HANDLERS ────────────────────────────────────────────────────────
  const handleMilestoneSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        const res = await axiosInstance.put(`/about/milestones/${editItem._id}`, milestoneForm);
        setMilestones(milestones.map(m => m._id === editItem._id ? res.data : m));
        showNotify("Milestone updated!");
      } else {
        const res = await axiosInstance.post("/about/milestones", milestoneForm);
        setMilestones([...milestones, res.data]);
        showNotify("Milestone added!");
      }
      setShowModal(false);
      setEditItem(null);
      setMilestoneForm({ year: '', event: '', icon: '🎯', color: '#1e3a8a', description: '' });
    } catch (err) { showNotify("Save failed", "error"); }
  };

  const deleteMilestone = async (id) => {
    try {
      await axiosInstance.delete(`/about/milestones/${id}`);
      setMilestones(milestones.filter(m => m._id !== id));
      showNotify("Milestone deleted");
    } catch (err) { showNotify("Delete failed", "error"); }
  };

  // --- Vision & Mission HANDLERS ---
  const handleVmSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await axiosInstance.put(`/about/vision-mission/${editItem._id}`, vmForm);
        showNotify("Updated!");
      } else {
        await axiosInstance.post("/about/vision-mission", vmForm);
        showNotify("Added!");
      }
      setShowModal(false);
      setEditItem(null);
      setVmForm({ type: 'vision', content: '', order: 0 });
      fetchData();
    } catch (err) { showNotify("Save failed", "error"); }
  };

  const deleteVm = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axiosInstance.delete(`/about/vision-mission/${id}`);
      showNotify("Deleted");
      fetchData();
    } catch (err) { showNotify("Delete failed", "error"); }
  };

  // --- Core Values HANDLERS ---
  const handleCvSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await axiosInstance.put(`/about/core-values/${editItem._id}`, cvForm);
        showNotify("Updated!");
      } else {
        await axiosInstance.post("/about/core-values", cvForm);
        showNotify("Added!");
      }
      setShowModal(false);
      setEditItem(null);
      setCvForm({ icon: '🌟', title: '', description: '', color: 'from-amber-500 to-orange-500', order: 0 });
      fetchData();
    } catch (err) { showNotify("Save failed", "error"); }
  };

  const deleteCv = async (id) => {
    if (!window.confirm("Delete this core value?")) return;
    try {
      await axiosInstance.delete(`/about/core-values/${id}`);
      showNotify("Deleted");
      fetchData();
    } catch (err) { showNotify("Delete failed", "error"); }
  };

  const saveDeanMessage = async () => {
    try {
      const formData = new FormData();
      formData.append('name', deanMessage.name || '');
      formData.append('title', deanMessage.title || '');
      formData.append('greeting', deanMessage.greeting || '');
      formData.append('paragraphs', JSON.stringify(deanMessage.paragraphs || []));
      formData.append('highlight', deanMessage.highlight || '');
      formData.append('stats', JSON.stringify(deanMessage.stats || []));
      if (deanPhotoFile) formData.append('photo', deanPhotoFile);
      const res = await axiosInstance.put('/about/dean', formData);
      setDeanMessage(res.data);
      setDeanPhotoFile(null);
      showNotify("Dean's message updated!");
    } catch (err) { showNotify("Update failed", "error"); }
  };

  const saveCollegeLogo = async () => {
    try {
      const formData = new FormData();
      formData.append('collegeName', collegeLogo.collegeName || '');
      formData.append('tagline', collegeLogo.tagline || '');
      if (logoFile) formData.append('logo', logoFile);
      const res = await axiosInstance.put('/about/college-logo', formData);
      setCollegeLogo(res.data);
      setLogoFile(null);
      showNotify("College logo updated!");
    } catch (err) { showNotify("Update failed", "error"); }
  };

  const themeColors = {
    primary: "#6B3F1D",
    accent: "#E07B39",
    bg: "#FFFFFF",
    text: "#000000"
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
        
        .sidebar-item {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sidebar-item.active {
          background: #FFF;
          color: #8B4513;
          box-shadow: 0 4px 12px rgba(139, 69, 19, 0.08);
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
      `}</style>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 20, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className={`fixed top-0 left-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl ${
              notification.type === "error" ? "bg-red-50 text-red-600 border border-red-100" : "bg-white text-green-600 border border-green-100"
            }`}
          >
            {notification.type === "error" ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
            <span className="font-semibold">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="w-72 bg-[#FFFFFF] border-r border-slate-200 flex flex-col p-6 shadow-sm z-10">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-900/20" style={{ backgroundColor: themeColors.primary }}>
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight" style={{ color: themeColors.text }}>Ginera Admin</h1>
            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: themeColors.accent }}>Management Console</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { name: "Home Page", icon: ImageIcon },
            { name: "Academic", icon: BookOpen },
            { name: "Testimonials", icon: Users },
            { name: "About Us", icon: Layers },
            { name: "Gallery", icon: ImageIcon },
            { name: "Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`sidebar-item w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all ${
                activeTab === item.name 
                  ? "shadow-md" 
                  : "hover:bg-orange-50"
              }`}
              style={{ 
                backgroundColor: activeTab === item.name ? themeColors.primary : "transparent",
                color: activeTab === item.name ? "#FFFFFF" : themeColors.text
              }}
            >
              <item.icon size={20} />
              {item.name}
              {activeTab === item.name && (
                <motion.div layoutId="active-pill" className="ml-auto">
                  <ChevronRight size={16} />
                </motion.div>
              )}
            </button>
          ))}
        </nav>

        <button
          onClick={onLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col bg-[#F8FAFC]">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 shrink-0 shadow-sm z-10">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: themeColors.text }}>{activeTab}</h2>
            <p className="text-sm font-medium" style={{ color: themeColors.accent }}>Manage your website's {activeTab.toLowerCase()} content</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {activeTab === "Home Page" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700">
                      <ImageIcon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Hero Section Sliders</h3>
                      <p className="text-sm text-slate-500">Add, update, or delete homepage banner images ({sliders.length} active)</p>
                    </div>
                  </div>
                  
                  <label 
                    className="text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 cursor-pointer transition-all shadow-md active:scale-95 hover:opacity-90"
                    style={{ backgroundColor: themeColors.primary }}
                  >
                    <Upload size={20} /> Upload Images
                    <input type="file" multiple className="hidden" onChange={handleSliderUpload} />
                  </label>
                </div>

                {sliders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-sm">
                    <ImageIcon size={64} className="text-slate-300 mb-6" />
                    <h3 className="text-xl font-bold text-slate-800 mb-2">No Slider Images Found</h3>
                    <p className="text-slate-500 mb-8 max-w-md text-center">Your homepage hero section currently has no images. Upload high-quality images to create a dynamic slider.</p>
                    <label 
                      className="text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 cursor-pointer transition-all shadow-lg active:scale-95 hover:opacity-90"
                      style={{ backgroundColor: themeColors.primary }}
                    >
                      <Upload size={24} /> Click to Upload First Images
                      <input type="file" multiple className="hidden" onChange={handleSliderUpload} />
                    </label>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                      {sliders.map((slider) => (
                        <motion.div
                          key={slider._id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="group relative bg-white rounded-2xl overflow-hidden aspect-[16/10] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200"
                        >
                          <img 
                            src={slider.imageUrl.startsWith('http') ? slider.imageUrl : `http://localhost:8080${slider.imageUrl}`} 
                            alt={slider.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                            <p className="text-white font-medium text-sm px-4 text-center">Update or Delete Image</p>
                            <div className="flex gap-3">
                              <label className="p-3 bg-white hover:bg-slate-100 rounded-xl text-slate-800 cursor-pointer transition-all hover:scale-110 active:scale-95 shadow-lg flex items-center gap-2">
                                <Edit3 size={18} /> <span className="text-sm font-bold">Update</span>
                                <input 
                                  type="file" 
                                  className="hidden" 
                                  onChange={(e) => updateSliderImage(slider._id, e.target.files[0])} 
                                />
                              </label>
                              <button 
                                onClick={() => deleteSlider(slider._id)}
                                className="p-3 bg-red-500 hover:bg-red-600 rounded-xl text-white transition-all hover:scale-110 active:scale-95 shadow-lg flex items-center gap-2"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            )}

            {activeTab === "Academic" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-700" style={{ color: themeColors.accent }}>
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Academic Programs</h3>
                      <p className="text-sm text-slate-500">Manage courses and degrees ({programs.length} active)</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => { resetProgramForm(); setEditItem(null); setModalType("program"); setShowModal(true); }}
                    className="text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95 hover:opacity-90"
                    style={{ backgroundColor: themeColors.primary }}
                  >
                    <Plus size={20} /> Add New Program
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h4 className="text-lg font-bold text-slate-800 mb-4">Edit Section Details</h4>
                  <div className="space-y-4">
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-700 transition-all"
                      placeholder="Section Title"
                      value={academicContent.title}
                      onChange={(e) => setAcademicContent({...academicContent, title: e.target.value})}
                    />
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-700 transition-all h-24 resize-none"
                      placeholder="Description Line 1"
                      value={academicContent.description1}
                      onChange={(e) => setAcademicContent({...academicContent, description1: e.target.value})}
                    />
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-700 transition-all h-20 resize-none"
                      placeholder="Description Line 2"
                      value={academicContent.description2}
                      onChange={(e) => setAcademicContent({...academicContent, description2: e.target.value})}
                    />
                    <button 
                      onClick={saveAcademicContent}
                      className="px-6 py-3 rounded-xl text-white font-bold transition-all shadow-md active:scale-95"
                      style={{ backgroundColor: themeColors.primary }}
                    >
                      Save Section Content
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                {programs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                    <BookOpen size={48} className="text-slate-300 mb-4" />
                    <p className="text-slate-500 font-medium text-lg">No academic programs added yet</p>
                    <button 
                      onClick={() => { resetProgramForm(); setEditItem(null); setModalType("program"); setShowModal(true); }}
                      className="mt-4 font-bold hover:underline"
                      style={{ color: themeColors.primary }}
                    >
                      Click here to add your first program
                    </button>
                  </div>
                ) : (
                  programs.map((prog) => (
                    <motion.div
                      key={prog._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white p-6 rounded-2xl flex items-center gap-6 group hover:shadow-md transition-all border border-slate-100"
                    >
                      <div className="w-32 h-24 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                        <img 
                          src={prog.imageUrl ? (prog.imageUrl.startsWith('http') ? prog.imageUrl : `http://localhost:8080${prog.imageUrl}`) : "/placeholder.png"} 
                          className="w-full h-full object-cover" 
                          alt=""
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span 
                            className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md tracking-wider"
                            style={{ backgroundColor: themeColors.accent + "20", color: themeColors.accent }}
                          >
                            {prog.category || "General"}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">• {prog.duration}</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 truncate">{prog.title}</h4>
                        <p className="text-sm text-slate-500 line-clamp-1">{prog.description}</p>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openProgramEdit(prog)}
                          className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 transition-all hover:scale-105 active:scale-95"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => deleteProgram(prog._id)}
                          className="p-3 bg-red-50 hover:bg-red-100 rounded-xl text-red-500 transition-all hover:scale-105 active:scale-95"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
                </div>
              </div>
            )}

            {activeTab === "Testimonials" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700" style={{ color: themeColors.primary }}>
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Student Testimonials</h3>
                      <p className="text-sm text-slate-500">Manage student reviews ({testimonials.length} active)</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => { resetTestimonialForm(); setEditItem(null); setModalType("testimonial"); setShowModal(true); }}
                    className="text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95 hover:opacity-90"
                    style={{ backgroundColor: themeColors.primary }}
                  >
                    <Plus size={20} /> Add Testimonial
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                    <Users size={48} className="text-slate-300 mb-4" />
                    <p className="text-slate-500 font-medium text-lg">No testimonials added yet</p>
                    <button 
                      onClick={() => { resetTestimonialForm(); setEditItem(null); setModalType("testimonial"); setShowModal(true); }}
                      className="mt-4 font-bold hover:underline"
                      style={{ color: themeColors.primary }}
                    >
                      Click here to add the first testimonial
                    </button>
                  </div>
                ) : (
                  testimonials.map((testi) => (
                    <motion.div
                      key={testi._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col hover:shadow-md transition-shadow relative group"
                    >
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openTestimonialEdit(testi)}
                          className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button 
                          onClick={() => deleteTestimonial(testi._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100 shrink-0">
                          <img 
                            src={testi.imageUrl ? (testi.imageUrl.startsWith('http') ? testi.imageUrl : `http://localhost:8080${testi.imageUrl}`) : "/placeholder.png"} 
                            alt={testi.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{testi.name}</h4>
                          <p className="text-xs font-medium text-slate-500">{testi.role}</p>
                          <div className="flex gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-3 h-3 ${i < testi.rating ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 italic line-clamp-4">"{testi.content}"</p>
                    </motion.div>
                  ))
                )}
                </div>
              </div>
            )}

            {activeTab === "About Us" && (
              <div className="space-y-8">
                {/* Sub-Navigation for About Us */}
                <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
                  {["Branding", "Principal", "Timeline", "Vision & Mission", "Core Values"].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setAboutActiveSubTab(sub)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        aboutActiveSubTab === sub
                          ? "bg-white text-slate-800 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>

                {/* College Logo */}
                {aboutActiveSubTab === "Branding" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h4 className="text-lg font-bold text-slate-800 mb-4">College Logo & Branding</h4>
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-24 h-24 rounded-full border-4 border-amber-100 overflow-hidden bg-amber-50 flex items-center justify-center">
                        {collegeLogo.logoUrl ? (
                          <img src={collegeLogo.logoUrl.startsWith('http') ? collegeLogo.logoUrl : `http://localhost:8080${collegeLogo.logoUrl}`} alt="Logo" className="w-full h-full object-cover" />
                        ) : <ImageIcon size={32} className="text-amber-300" />}
                      </div>
                      <div className="flex-1 space-y-3">
                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none" placeholder="College Name" value={collegeLogo.collegeName || ''} onChange={e => setCollegeLogo({...collegeLogo, collegeName: e.target.value})} />
                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none" placeholder="Tagline" value={collegeLogo.tagline || ''} onChange={e => setCollegeLogo({...collegeLogo, tagline: e.target.value})} />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 text-sm font-medium text-slate-600">
                        <Upload size={16} /> {logoFile ? logoFile.name : "Upload New Logo"}
                        <input type="file" className="hidden" accept="image/*" onChange={e => setLogoFile(e.target.files[0])} />
                      </label>
                      <button onClick={saveCollegeLogo} className="px-6 py-2.5 rounded-xl text-white font-bold text-sm transition-all shadow active:scale-95" style={{backgroundColor: themeColors.primary}}>Save Logo</button>
                    </div>
                  </motion.div>
                )}

                {/* Dean's Message */}
                {aboutActiveSubTab === "Principal" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h4 className="text-lg font-bold text-slate-800 mb-4">Dean / Principal Message</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input type="text" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none" placeholder="Principal Name" value={deanMessage.name || ''} onChange={e => setDeanMessage({...deanMessage, name: e.target.value})} />
                      <input type="text" className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none" placeholder="Title (e.g. Principal)" value={deanMessage.title || ''} onChange={e => setDeanMessage({...deanMessage, title: e.target.value})} />
                    </div>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none mb-4" placeholder="Greeting line" value={deanMessage.greeting || ''} onChange={e => setDeanMessage({...deanMessage, greeting: e.target.value})} />
                    <label className="text-sm font-bold text-slate-600 block mb-2">Message Paragraphs (one per line)</label>
                    <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none h-32 resize-none mb-4" placeholder="Each line = one paragraph" value={(deanMessage.paragraphs || []).join('\n')} onChange={e => setDeanMessage({...deanMessage, paragraphs: e.target.value.split('\n')})} />
                    <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none h-16 resize-none mb-4" placeholder="Highlight quote at the bottom" value={deanMessage.highlight || ''} onChange={e => setDeanMessage({...deanMessage, highlight: e.target.value})} />
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100">
                        {deanMessage.photoUrl ? <img src={deanMessage.photoUrl.startsWith('http') ? deanMessage.photoUrl : `http://localhost:8080${deanMessage.photoUrl}`} alt="Principal" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-100 flex items-center justify-center"><Users size={24} className="text-slate-300" /></div>}
                      </div>
                      <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 text-sm font-medium text-slate-600">
                        <Upload size={16} /> {deanPhotoFile ? deanPhotoFile.name : "Upload Principal Photo"}
                        <input type="file" className="hidden" accept="image/*" onChange={e => setDeanPhotoFile(e.target.files[0])} />
                      </label>
                    </div>
                    <button onClick={saveDeanMessage} className="px-6 py-3 rounded-xl text-white font-bold transition-all shadow active:scale-95" style={{backgroundColor: themeColors.primary}}>Save Dean's Message</button>
                  </motion.div>
                )}

                {aboutActiveSubTab === "Timeline" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="text-lg font-bold text-slate-800">Institutional Timeline</h4>
                        <p className="text-sm text-slate-500">Manage {milestones.length} milestones</p>
                      </div>
                      <button onClick={() => { setEditItem(null); setMilestoneForm({ year: '', event: '', icon: '🎯', color: '#1e3a8a', description: '' }); setModalType('milestone'); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-900 transition-all shadow-md active:scale-95">
                        <Plus size={16} /> Add Milestone
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {milestones.map((m) => (
                        <div key={m._id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group relative">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm bg-white" style={{ borderLeft: `4px solid ${m.color}` }}>{m.icon}</div>
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{m.year}</span>
                              <h5 className="font-bold text-slate-800 mb-1 text-sm">{m.event}</h5>
                              <p className="text-xs text-slate-500 line-clamp-2">{m.description}</p>
                              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => { setEditItem(m); setMilestoneForm({ year: m.year, event: m.event, icon: m.icon, color: m.color, description: m.description }); setModalType('milestone'); setShowModal(true); }} className="p-1.5 bg-white rounded-lg border text-slate-600 hover:bg-slate-50"><Edit3 size={13} /></button>
                                <button onClick={() => deleteMilestone(m._id)} className="p-1.5 bg-red-50 rounded-lg border border-red-100 text-red-500 hover:bg-red-100"><Trash2 size={13} /></button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {aboutActiveSubTab === "Vision & Mission" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="text-lg font-bold text-slate-800">Vision & Mission</h4>
                        <p className="text-sm text-slate-500">Manage your college goals</p>
                      </div>
                      <button onClick={() => { setEditItem(null); setVmForm({ type: 'vision', content: '', order: 0 }); setModalType('visionMission'); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-xl text-sm font-bold hover:bg-amber-700 transition-all shadow-md active:scale-95">
                        <Plus size={16} /> Add Point
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h5 className="font-bold text-amber-700 text-sm flex items-center gap-2"><CheckCircle2 size={14} /> Vision</h5>
                        {visionMission.filter(v => v.type === 'vision').map(v => (
                          <div key={v._id} className="p-3 bg-white rounded-xl border border-slate-200 group relative">
                            <p className="text-xs text-slate-600 pr-12">{v.content}</p>
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => { setEditItem(v); setVmForm({ type: v.type, content: v.content, order: v.order }); setModalType('visionMission'); setShowModal(true); }} className="p-1 bg-slate-50 rounded border text-slate-400 hover:text-slate-600"><Edit3 size={12} /></button>
                              <button onClick={() => deleteVm(v._id)} className="p-1 bg-red-50 rounded border border-red-100 text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        <h5 className="font-bold text-orange-700 text-sm flex items-center gap-2"><CheckCircle2 size={14} /> Mission</h5>
                        {visionMission.filter(v => v.type === 'mission').map(v => (
                          <div key={v._id} className="p-3 bg-white rounded-xl border border-slate-200 group relative">
                            <p className="text-xs text-slate-600 pr-12">{v.content}</p>
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => { setEditItem(v); setVmForm({ type: v.type, content: v.content, order: v.order }); setModalType('visionMission'); setShowModal(true); }} className="p-1 bg-slate-50 rounded border text-slate-400 hover:text-slate-600"><Edit3 size={12} /></button>
                              <button onClick={() => deleteVm(v._id)} className="p-1 bg-red-50 rounded border border-red-100 text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {aboutActiveSubTab === "Core Values" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="text-lg font-bold text-slate-800">Core Values</h4>
                        <p className="text-sm text-slate-500">The heart of your institution</p>
                      </div>
                      <button onClick={() => { setEditItem(null); setCvForm({ icon: '🌟', title: '', description: '', color: 'from-amber-500 to-orange-500', order: 0 }); setModalType('coreValue'); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-900 transition-all shadow-md active:scale-95">
                        <Plus size={16} /> Add Value
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {coreValues.map(cv => (
                        <div key={cv._id} className="p-4 bg-white rounded-2xl border border-slate-200 group relative flex flex-col items-center text-center">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${cv.color} flex items-center justify-center text-white mb-2 shadow-sm`}>{cv.icon}</div>
                          <h6 className="font-bold text-slate-800 text-xs mb-1">{cv.title}</h6>
                          <p className="text-[10px] text-slate-500 line-clamp-2">{cv.description}</p>
                          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setEditItem(cv); setCvForm({ icon: cv.icon, title: cv.title, description: cv.description, color: cv.color, order: cv.order }); setModalType('coreValue'); setShowModal(true); }} className="p-1 bg-slate-50 rounded border text-slate-400 hover:text-slate-600"><Edit3 size={11} /></button>
                            <button onClick={() => deleteCv(cv._id)} className="p-1 bg-red-50 rounded border border-red-100 text-red-400 hover:text-red-600"><Trash2 size={11} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {activeTab !== "Home Page" && activeTab !== "Academic" && activeTab !== "Testimonials" && activeTab !== "About Us" && (
              <div className="flex flex-col items-center justify-center py-32 text-slate-400">
                <Settings size={64} strokeWidth={1} className="animate-spin-slow mb-4" />
                <p className="text-lg font-medium tracking-tight">{activeTab} section is under development</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-[#F8FAFC]">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">{editItem ? "Edit" : "Add"} {modalType === "program" ? "Program" : modalType === "testimonial" ? "Testimonial" : "Item"}</h3>
                  <p className="text-sm text-slate-500 mt-1">Fill in the details to update your website</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2.5 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {modalType === "program" ? (
              <form onSubmit={handleProgramSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Program Title</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#8B4513] focus:ring-4 focus:ring-amber-900/5 outline-none transition-all"
                      placeholder="e.g. B.Sc. Nursing"
                      value={programForm.title}
                      onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Category</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none transition-all"
                      style={{ '--tw-ring-color': '#E07B3930' }}
                      value={programForm.category}
                      onChange={(e) => setProgramForm({ ...programForm, category: e.target.value })}
                      required
                    >
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Postgraduate">Postgraduate</option>
                      <option value="Diploma">Diploma</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Description</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#8B4513] focus:ring-4 focus:ring-amber-900/5 outline-none transition-all h-24 resize-none"
                    placeholder="Briefly describe the program..."
                    value={programForm.description}
                    onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Duration</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#8B4513] focus:ring-4 focus:ring-amber-900/5 outline-none transition-all"
                      placeholder="e.g. 4 Years"
                      value={programForm.duration}
                      onChange={(e) => setProgramForm({ ...programForm, duration: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Program Image</label>
                    <label className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                      <ImageIcon size={18} className="text-slate-400" />
                      <span className="text-sm text-slate-500 font-medium truncate">
                        {programForm.image ? programForm.image.name : "Select cover image"}
                      </span>
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => setProgramForm({ ...programForm, image: e.target.files[0] })} 
                        required={!editItem}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Courses (Comma separated)</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#8B4513] focus:ring-4 focus:ring-amber-900/5 outline-none transition-all h-24 resize-none"
                    placeholder="B.Sc. Nursing, Post-Basic B.Sc., etc."
                    value={programForm.courses}
                    onChange={(e) => setProgramForm({ ...programForm, courses: e.target.value })}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] px-6 py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 hover:opacity-90"
                    style={{ backgroundColor: themeColors.primary }}
                  >
                    <Save size={20} />
                    {editItem ? "Save Changes" : "Create Program"}
                  </button>
                </div>
              </form>
              ) : modalType === "testimonial" ? (
                <form onSubmit={handleTestimonialSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Student Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#8B4513] focus:ring-4 focus:ring-amber-900/5 outline-none transition-all"
                      placeholder="e.g. John Doe"
                      value={testimonialForm.name}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Role/Batch</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#8B4513] focus:ring-4 focus:ring-amber-900/5 outline-none transition-all"
                      placeholder="e.g. B.Sc. Nursing 2023"
                      value={testimonialForm.role}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Testimonial Content</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#8B4513] focus:ring-4 focus:ring-amber-900/5 outline-none transition-all h-24 resize-none"
                    placeholder="What did they say?"
                    value={testimonialForm.content}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Rating (1-5)</label>
                    <input
                      type="number"
                      min="1" max="5"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#8B4513] focus:ring-4 focus:ring-amber-900/5 outline-none transition-all"
                      value={testimonialForm.rating}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Student Photo</label>
                    <label className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                      <ImageIcon size={18} className="text-slate-400" />
                      <span className="text-sm text-slate-500 font-medium truncate">
                        {testimonialForm.image ? testimonialForm.image.name : "Select photo"}
                      </span>
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, image: e.target.files[0] })} 
                        required={!editItem}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] px-6 py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 hover:opacity-90"
                    style={{ backgroundColor: themeColors.primary }}
                  >
                    <Save size={20} />
                    {editItem ? "Save Changes" : "Create Testimonial"}
                  </button>
                </div>
              </form>
              ) : modalType === "milestone" ? (
                <form onSubmit={handleMilestoneSubmit} className="p-8 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Year</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none" placeholder="e.g. 1963" value={milestoneForm.year} onChange={e => setMilestoneForm({...milestoneForm, year: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Icon (emoji)</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none" placeholder="🎯" value={milestoneForm.icon} onChange={e => setMilestoneForm({...milestoneForm, icon: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Event / Achievement Title</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none" placeholder="e.g. College established" value={milestoneForm.event} onChange={e => setMilestoneForm({...milestoneForm, event: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Accent Color</label>
                    <div className="flex items-center gap-3">
                      <input type="color" className="w-12 h-12 rounded-xl border cursor-pointer" value={milestoneForm.color} onChange={e => setMilestoneForm({...milestoneForm, color: e.target.value})} />
                      <input type="text" className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none" value={milestoneForm.color} onChange={e => setMilestoneForm({...milestoneForm, color: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Description</label>
                    <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none h-28 resize-none" placeholder="Describe this milestone..." value={milestoneForm.description} onChange={e => setMilestoneForm({...milestoneForm, description: e.target.value})} required />
                  </div>
                  <div className="flex gap-4 pt-2">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                    <button type="submit" className="flex-[2] px-6 py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 shadow-xl active:scale-95" style={{backgroundColor: themeColors.primary}}><Save size={20} />{editItem ? 'Save Changes' : 'Add Milestone'}</button>
                  </div>
                </form>
              ) : modalType === "visionMission" ? (
                <form onSubmit={handleVmSubmit} className="p-8 space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Type</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500/20" value={vmForm.type} onChange={e => setVmForm({...vmForm, type: e.target.value})}>
                      <option value="vision">Vision Point</option>
                      <option value="mission">Mission Point</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Content</label>
                    <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none h-32 resize-none" placeholder="Enter the vision or mission statement..." value={vmForm.content} onChange={e => setVmForm({...vmForm, content: e.target.value})} required />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                    <button type="submit" className="flex-[2] px-6 py-4 rounded-2xl text-white font-bold bg-amber-600 shadow-xl">{editItem ? 'Update' : 'Add'}</button>
                  </div>
                </form>
              ) : modalType === "coreValue" ? (
                <form onSubmit={handleCvSubmit} className="p-8 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Title</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" placeholder="e.g. Integrity" value={cvForm.title} onChange={e => setCvForm({...cvForm, title: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Icon (emoji)</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" placeholder="🌟" value={cvForm.icon} onChange={e => setCvForm({...cvForm, icon: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Description</label>
                    <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none h-24 resize-none" placeholder="Value description..." value={cvForm.description} onChange={e => setCvForm({...cvForm, description: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Gradient Color (Tailwind classes)</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" placeholder="from-amber-500 to-orange-500" value={cvForm.color} onChange={e => setCvForm({...cvForm, color: e.target.value})} />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                    <button type="submit" className="flex-[2] px-6 py-4 rounded-2xl text-white font-bold bg-slate-800 shadow-xl">{editItem ? 'Update' : 'Add'}</button>
                  </div>
                </form>
              ) : null}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;