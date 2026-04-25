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
  const [sliders, setSliders] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // slider, program
  const [editItem, setEditItem] = useState(null);
  const [notification, setNotification] = useState(null);

  // Form States
  const [programForm, setProgramForm] = useState({
    title: "",
    description: "",
    duration: "",
    category: "",
    courses: "",
    image: null
  });

  const [sliderFiles, setSliderFiles] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [slidersRes, programsRes] = await Promise.all([
        axiosInstance.get("/sliders"),
        axiosInstance.get("/programs")
      ]);
      setSliders(slidersRes.data);
      setPrograms(programsRes.data);
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
            { name: "About Us", icon: Users },
            { name: "Gallery", icon: Layers },
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

            {activeTab !== "Home Page" && activeTab !== "Academic" && (
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
                  <h3 className="text-2xl font-bold text-slate-800">{editItem ? "Edit" : "Add"} {modalType === "program" ? "Program" : "Item"}</h3>
                  <p className="text-sm text-slate-500 mt-1">Fill in the details to update your website</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2.5 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;