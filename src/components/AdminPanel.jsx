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
  FileText,
  X,
  Menu,
  Save,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Layers,
  Info,
  ArrowRight,
  Building2,
  Zap
} from "lucide-react";
import axiosInstance from "../api/axiosInstance";

const AdminPanel = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("Home Page");
  const [aboutActiveSubTab, setAboutActiveSubTab] = useState("Branding");
  const [admissionActiveSubTab, setAdmissionActiveSubTab] = useState("Courses");
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

  // Admission States
  const [courses, setCourses] = useState([]);
  const [admissionSteps, setAdmissionSteps] = useState([]);
  const [admissionRules, setAdmissionRules] = useState([]);
  const [bonds, setBonds] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
  const [departments, setDepartments] = useState([]);
  
  const [courseForm, setCourseForm] = useState({
    category: "Undergraduate Programs",
    name: "",
    duration: "",
    seats: "",
    eligibility: "",
    description: "",
    icon: "👨‍⚕️",
    highlights: "",
    fees: "",
    admission: "",
    websiteLink: ""
  });

  const [admissionStepForm, setAdmissionStepForm] = useState({
    step: 1,
    title: "",
    description: "",
    details: "",
    icon: "Calendar"
  });

  const [admissionRuleForm, setAdmissionRuleForm] = useState({
    category: "UnderGraduated Programs",
    title: "",
    description: "",
    icon: "CheckCircle"
  });

  const [bondForm, setBondForm] = useState({
    type: "student",
    title: "",
    content: "",
    order: 0
  });

  const [guidelineForm, setGuidelineForm] = useState({
    category: "General Guidelines",
    subCategory: "",
    points: "",
    order: 0
  });

  const [deptForm, setDeptForm] = useState({
    name: "",
    category: "Nursing Department",
    description: "",
    overview: "",
    overview2: "",
    faculty: [],
    facilities: [],
    activities: [],
    icon: "🏥"
  });

  const [deptFacultyForm, setDeptFacultyForm] = useState({ name: '', designation: '', qualification: '', specialization: '' });
  const [deptFacilityInput, setDeptFacilityInput] = useState("");
  const [deptActivityInput, setDeptActivityInput] = useState("");
  const [selectedDeptForSlider, setSelectedDeptForSlider] = useState("null");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Department Management States
  const [selectedDeptForEdit, setSelectedDeptForEdit] = useState(null);
  const [deptActiveSubTab, setDeptActiveSubTab] = useState("Overview");

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
  }, [selectedDeptForSlider]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const results = await Promise.all([
        axiosInstance.get("/sliders"), // Home sliders fallback
        axiosInstance.get("/programs"),
        axiosInstance.get("/testimonials"),
        axiosInstance.get("/content/academic"),
        axiosInstance.get("/about/milestones"),
        axiosInstance.get("/about/dean"),
        axiosInstance.get("/about/college-logo"),
        axiosInstance.get("/about/vision-mission"),
        axiosInstance.get("/about/core-values"),
        axiosInstance.get("/courses"),
        axiosInstance.get("/admission-steps"),
        axiosInstance.get("/admission-rules"),
        axiosInstance.get("/bonds"),
        axiosInstance.get("/guidelines"),
        axiosInstance.get("/departments"),
        axiosInstance.get(`/sliders?department=${selectedDeptForSlider}`)
      ]);

      // setSliders(results[0].data); // Global sliders if needed
      setPrograms(results[1].data);
      setTestimonials(results[2].data);
      setAcademicContent(results[3].data);
      setMilestones(results[4].data);
      setDeanMessage(results[5].data);
      setCollegeLogo(results[6].data);
      setVisionMission(results[7].data);
      setCoreValues(results[8].data);
      setCourses(results[9].data);
      setAdmissionSteps(results[10].data);
      setAdmissionRules(results[11].data);
      setBonds(results[12].data);
      setGuidelines(results[13].data);
      setDepartments(results[14].data);
      setSliders(results[15].data); // Filtered sliders
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
  const handleSliderUpload = async (eOrFile, deptIdOverride = null) => {
    let files = [];
    if (eOrFile.target) {
      files = Array.from(eOrFile.target.files);
    } else {
      files = [eOrFile];
    }
    
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach(file => formData.append("images", file));
    
    const finalDeptId = deptIdOverride || selectedDeptForSlider;
    if (finalDeptId !== "null" && finalDeptId) {
      formData.append("department", finalDeptId);
    }

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

  // --- DEPARTMENT HANDLERS ---
  const handleDeptSubmit = async (e) => {
    e.preventDefault();
    try {
      const deptId = editItem?._id || selectedDeptForEdit?._id;
      if (deptId) {
        await axiosInstance.put(`/departments/${deptId}`, deptForm);
        showNotify("Department updated!");
      } else {
        await axiosInstance.post("/departments", deptForm);
        showNotify("Department added!");
      }
      setShowModal(false);
      setEditItem(null);
      setSelectedDeptForEdit(null);
      resetDeptForm();
      fetchData();
    } catch (err) { showNotify("Save failed", "error"); }
  };

  const deleteDepartment = async (id) => {
    if (!window.confirm("Delete this department?")) return;
    try {
      await axiosInstance.delete(`/departments/${id}`);
      showNotify("Deleted");
      fetchData();
    } catch (err) { showNotify("Delete failed", "error"); }
  };

  const resetDeptForm = () => {
    setDeptForm({
      name: "",
      category: "Nursing Department",
      description: "",
      overview: "",
      overview2: "",
      faculty: [],
      facilities: [],
      activities: [],
      icon: "🏥"
    });
    setDeptFacultyForm({ name: '', designation: '', qualification: '', specialization: '' });
    setDeptFacilityInput("");
    setDeptActivityInput("");
  };

  const openDeptEdit = (dept) => {
    setEditItem(dept);
    setDeptForm({
      name: dept.name,
      category: dept.category,
      description: dept.description,
      overview: dept.overview,
      overview2: dept.overview2 || "",
      faculty: dept.faculty || [],
      facilities: dept.facilities || [],
      activities: dept.activities || [],
      icon: dept.icon || "🏥"
    });
    setModalType("department");
    setShowModal(true);
  };

  const addDeptFaculty = () => {
    if (!deptFacultyForm.name) return;
    setDeptForm({ ...deptForm, faculty: [...deptForm.faculty, deptFacultyForm] });
    setDeptFacultyForm({ name: '', designation: '', qualification: '', specialization: '' });
  };

  const addDeptFacility = () => {
    if (!deptFacilityInput) return;
    setDeptForm({ ...deptForm, facilities: [...deptForm.facilities, deptFacilityInput] });
    setDeptFacilityInput("");
  };

  const addDeptActivity = () => {
    if (!deptActivityInput) return;
    setDeptForm({ ...deptForm, activities: [...deptForm.activities, deptActivityInput] });
    setDeptActivityInput("");
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

 

  // --- Admission HANDLERS ---
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await axiosInstance.put(`/courses/${editItem._id}`, courseForm);
        showNotify("Course updated!");
      } else {
        await axiosInstance.post("/courses", courseForm);
        showNotify("Course added!");
      }
      setShowModal(false);
      setEditItem(null);
      setCourseForm({ category: "Undergraduate Programs", name: "", duration: "", seats: "", eligibility: "", description: "", icon: "👨‍⚕️", highlights: "", fees: "", admission: "", websiteLink: "" });
      fetchData();
    } catch (err) { showNotify("Save failed", "error"); }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await axiosInstance.delete(`/courses/${id}`);
      showNotify("Deleted");
      fetchData();
    } catch (err) { showNotify("Delete failed", "error"); }
  };

  const handleStepSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await axiosInstance.put(`/admission-steps/${editItem._id}`, admissionStepForm);
        showNotify("Step updated!");
      } else {
        await axiosInstance.post("/admission-steps", admissionStepForm);
        showNotify("Step added!");
      }
      setShowModal(false);
      setEditItem(null);
      setAdmissionStepForm({ step: 1, title: "", description: "", details: "", icon: "Calendar" });
      fetchData();
    } catch (err) { showNotify("Save failed", "error"); }
  };

  const deleteStep = async (id) => {
    if (!window.confirm("Delete this step?")) return;
    try {
      await axiosInstance.delete(`/admission-steps/${id}`);
      showNotify("Deleted");
      fetchData();
    } catch (err) { showNotify("Delete failed", "error"); }
  };

  const handleRuleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await axiosInstance.put(`/admission-rules/${editItem._id}`, admissionRuleForm);
        showNotify("Rule updated!");
      } else {
        await axiosInstance.post("/admission-rules", admissionRuleForm);
        showNotify("Rule added!");
      }
      setShowModal(false);
      setEditItem(null);
      setAdmissionRuleForm({ category: "UnderGraduated Programs", title: "", description: "", icon: "CheckCircle" });
      fetchData();
    } catch (err) { showNotify("Save failed", "error"); }
  };

  const deleteRule = async (id) => {
    if (!window.confirm("Delete this rule?")) return;
    try {
      await axiosInstance.delete(`/admission-rules/${id}`);
      showNotify("Deleted");
      fetchData();
    } catch (err) { showNotify("Delete failed", "error"); }
  };

  const handleBondSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await axiosInstance.put(`/bonds/${editItem._id}`, bondForm);
        showNotify("Bond updated!");
      } else {
        await axiosInstance.post("/bonds", bondForm);
        showNotify("Bond added!");
      }
      setShowModal(false);
      setEditItem(null);
      setBondForm({ type: "student", title: "", content: "", order: 0 });
      fetchData();
    } catch (err) { showNotify("Save failed", "error"); }
  };

  const deleteBond = async (id) => {
    if (!window.confirm("Delete this bond item?")) return;
    try {
      await axiosInstance.delete(`/bonds/${id}`);
      showNotify("Deleted");
      fetchData();
    } catch (err) { showNotify("Delete failed", "error"); }
  };

  const handleGuidelineSubmit = async (e) => {
    e.preventDefault();
    const data = { 
      ...guidelineForm, 
      points: typeof guidelineForm.points === 'string' ? guidelineForm.points.split('\n').filter(p => p.trim()) : guidelineForm.points 
    };
    try {
      if (editItem) {
        await axiosInstance.put(`/guidelines/${editItem._id}`, data);
        showNotify("Guideline updated!");
      } else {
        await axiosInstance.post("/guidelines", data);
        showNotify("Guideline added!");
      }
      setShowModal(false);
      setEditItem(null);
      setGuidelineForm({ category: "General Guidelines", subCategory: "", points: "", order: 0 });
      fetchData();
    } catch (err) { showNotify("Save failed", "error"); }
  };

  const deleteGuideline = async (id) => {
    if (!window.confirm("Delete this guideline?")) return;
    try {
      await axiosInstance.delete(`/guidelines/${id}`);
      showNotify("Deleted");
      fetchData();
    } catch (err) { showNotify("Delete failed", "error"); }
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
    <div className="flex h-screen bg-[#F8FAFC] font-sans relative overflow-hidden">
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
            className={`fixed top-0 left-1/2 z-[100] flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl ${
              notification.type === "error" ? "bg-red-50 text-red-600 border border-red-100" : "bg-white text-green-600 border border-green-100"
            }`}
          >
            {notification.type === "error" ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
            <span className="font-semibold">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 flex flex-col p-6 shadow-xl z-[70] transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0 lg:shadow-none
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-900/20" style={{ backgroundColor: themeColors.primary }}>
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight" style={{ color: themeColors.text }}>Ginera Admin</h1>
            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: themeColors.accent }}>Management Console</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
          {[
            { name: "Home Page", icon: ImageIcon },
            { name: "Academic", icon: BookOpen },
            { name: "Testimonials", icon: Users },
            { name: "About Us", icon: Info },
            { name: "Admission", icon: Layers },
            { name: "Departments", icon: Building2 },
            { name: "Gallery", icon: ImageIcon },
            { name: "Settings", icon: Settings },
          ].map((item) => (
            <div key={item.name} className="space-y-1">
              <button
                onClick={() => {
                  setActiveTab(item.name);
                  if (item.name !== "Departments") setSelectedDeptForEdit(null);
                }}
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
              
              {item.name === "Departments" && activeTab === "Departments" && departments.length > 0 && (
                <div className="pl-10 space-y-1 py-1">
                  {departments.map(dept => (
                    <button
                      key={dept._id}
                      onClick={() => {
                        setSelectedDeptForEdit(dept);
                        setDeptForm(dept);
                        setDeptActiveSubTab("Overview");
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all border-l-2 ${
                        selectedDeptForEdit?._id === dept._id
                          ? "border-amber-600 bg-amber-50 text-amber-800 font-bold"
                          : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                    >
                      {dept.name.split('Department of ')[1] || dept.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
      <main className="flex-1 min-w-0 overflow-hidden flex flex-col bg-[#F8FAFC]">
        <header className="h-20 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 lg:px-10 shrink-0 shadow-sm z-20">
          <div className="flex items-center gap-4 truncate">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-xl lg:hidden text-slate-600 shrink-0"
            >
              <Menu size={24} />
            </button>
            <div className="truncate">
              <h2 className="text-lg lg:text-2xl font-bold truncate" style={{ color: themeColors.text }}>{activeTab}</h2>
              <p className="text-xs lg:text-sm font-medium text-slate-500 truncate">Manage your website's {activeTab.toLowerCase()} content</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {activeTab === "Home Page" && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <select 
                      className="flex-1 md:flex-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-amber-500/20"
                      value={selectedDeptForSlider}
                      onChange={(e) => setSelectedDeptForSlider(e.target.value)}
                    >
                      <option value="null">Homepage Sliders</option>
                      {departments.map(dept => (
                        <option key={dept._id} value={dept._id}>{dept.name}</option>
                      ))}
                    </select>
                    
                    <label 
                      className="text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 cursor-pointer transition-all shadow-md active:scale-95 hover:opacity-90"
                      style={{ backgroundColor: themeColors.primary }}
                    >
                      <Upload size={20} /> <span className="hidden md:inline">Upload Images</span>
                      <input type="file" multiple className="hidden" onChange={handleSliderUpload} />
                    </label>
                  </div>
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

            {activeTab === "Admission" && (
              <div className="space-y-8">
                {/* Sub-Navigation for Admission */}
                <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
                  {["Courses", "Procedure", "Rules", "Student Bond", "Guidelines"].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setAdmissionActiveSubTab(sub)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        admissionActiveSubTab === sub
                          ? "bg-white text-slate-800 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>

                {/* Courses Management */}
                {admissionActiveSubTab === "Courses" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                      <div>
                        <h4 className="text-lg font-bold text-slate-800">Admission Courses</h4>
                        <p className="text-sm text-slate-500">Manage all courses offered ({courses.length} active)</p>
                      </div>
                      <button 
                        onClick={() => { setEditItem(null); setCourseForm({ category: "Undergraduate Programs", name: "", duration: "", seats: "", eligibility: "", description: "", icon: "👨‍⚕️", highlights: "", fees: "", admission: "", websiteLink: "" }); setModalType("course"); setShowModal(true); }}
                        className="px-6 py-3 rounded-xl text-white font-bold transition-all shadow active:scale-95 flex items-center gap-2"
                        style={{backgroundColor: themeColors.primary}}
                      >
                        <Plus size={20} /> Add New Course
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {courses.map(course => (
                        <div key={course._id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 group">
                          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl shadow-sm">{course.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md tracking-wider bg-orange-100 text-orange-700">{course.category}</span>
                              <span className="text-xs text-slate-400 font-medium">• {course.duration}</span>
                            </div>
                            <h5 className="font-bold text-slate-800">{course.name}</h5>
                            <p className="text-xs text-slate-500 line-clamp-1">{course.description}</p>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setEditItem(course); setCourseForm(course); setModalType("course"); setShowModal(true); }} className="p-2 text-slate-500 hover:text-slate-800 transition-colors"><Edit3 size={18} /></button>
                            <button onClick={() => deleteCourse(course._id)} className="p-2 text-red-500 hover:text-red-700 transition-colors"><Trash2 size={18} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Procedure Management */}
                {admissionActiveSubTab === "Procedure" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                      <div>
                        <h4 className="text-lg font-bold text-slate-800">Admission Procedure</h4>
                        <p className="text-sm text-slate-500">Manage step-by-step procedure ({admissionSteps.length} steps)</p>
                      </div>
                      <button 
                        onClick={() => { setEditItem(null); setAdmissionStepForm({ step: admissionSteps.length + 1, title: "", description: "", details: "", icon: "Calendar" }); setModalType("step"); setShowModal(true); }}
                        className="px-6 py-3 rounded-xl text-white font-bold transition-all shadow active:scale-95 flex items-center gap-2"
                        style={{backgroundColor: themeColors.primary}}
                      >
                        <Plus size={20} /> Add New Step
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {admissionSteps.sort((a,b) => a.step - b.step).map(step => (
                        <div key={step._id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 group">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">{step.step}</div>
                          <div className="flex-1">
                            <h5 className="font-bold text-slate-800">{step.title}</h5>
                            <p className="text-xs text-slate-500 line-clamp-1">{step.description}</p>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setEditItem(step); setAdmissionStepForm(step); setModalType("step"); setShowModal(true); }} className="p-2 text-slate-500 hover:text-slate-800 transition-colors"><Edit3 size={18} /></button>
                            <button onClick={() => deleteStep(step._id)} className="p-2 text-red-500 hover:text-red-700 transition-colors"><Trash2 size={18} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rules Management */}
                {admissionActiveSubTab === "Rules" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                      <div>
                        <h4 className="text-lg font-bold text-slate-800">Admission Rules</h4>
                        <p className="text-sm text-slate-500">Manage eligibility and rules ({admissionRules.length} items)</p>
                      </div>
                      <button 
                        onClick={() => { setEditItem(null); setAdmissionRuleForm({ category: "UnderGraduated Programs", title: "", description: "", icon: "CheckCircle" }); setModalType("rule"); setShowModal(true); }}
                        className="px-6 py-3 rounded-xl text-white font-bold transition-all shadow active:scale-95 flex items-center gap-2"
                        style={{backgroundColor: themeColors.primary}}
                      >
                        <Plus size={20} /> Add New Rule
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {admissionRules.map(rule => (
                        <div key={rule._id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 group">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-xl shadow-sm">📍</div>
                          <div className="flex-1">
                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md tracking-wider bg-slate-100 text-slate-600 mb-1 inline-block">{rule.category}</span>
                            <h5 className="font-bold text-slate-800">{rule.title}</h5>
                            <p className="text-xs text-slate-500 line-clamp-1">{rule.description}</p>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setEditItem(rule); setAdmissionRuleForm(rule); setModalType("rule"); setShowModal(true); }} className="p-2 text-slate-500 hover:text-slate-800 transition-colors"><Edit3 size={18} /></button>
                            <button onClick={() => deleteRule(rule._id)} className="p-2 text-red-500 hover:text-red-700 transition-colors"><Trash2 size={18} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Student Bond Management */}
                {admissionActiveSubTab === "Student Bond" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                      <div>
                        <h4 className="text-lg font-bold text-slate-800">Student Bond Details</h4>
                        <p className="text-sm text-slate-500">Manage agreement points for student bonds</p>
                      </div>
                      <button 
                        onClick={() => { setEditItem(null); setBondForm({ type: "student", title: "", content: "", order: 0 }); setModalType("bond"); setShowModal(true); }}
                        className="px-6 py-3 rounded-xl text-white font-bold transition-all shadow active:scale-95 flex items-center gap-2"
                        style={{backgroundColor: themeColors.primary}}
                      >
                        <Plus size={20} /> Add Bond Point
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {bonds.filter(b => b.type === 'student').map(bond => (
                        <div key={bond._id} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 group">
                          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-amber-700 shadow-sm"><FileText size={24} /></div>
                          <div className="flex-1">
                            <h5 className="font-bold text-slate-800">{bond.title}</h5>
                            <p className="text-xs text-slate-500 line-clamp-1">{bond.content}</p>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setEditItem(bond); setBondForm({ type: bond.type, title: bond.title, content: bond.content, order: bond.order }); setModalType("bond"); setShowModal(true); }} className="p-2 text-slate-500 hover:text-slate-800 transition-colors"><Edit3 size={18} /></button>
                            <button onClick={() => deleteBond(bond._id)} className="p-2 text-red-500 hover:text-red-700 transition-colors"><Trash2 size={18} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}



                {/* Guidelines Management */}
                {admissionActiveSubTab === "Guidelines" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                      <div>
                        <h4 className="text-lg font-bold text-slate-800">Student & Parent Guidelines</h4>
                        <p className="text-sm text-slate-500">Manage instructions and code of conduct ({guidelines.length} categories)</p>
                      </div>
                      <button 
                        onClick={() => { setEditItem(null); setGuidelineForm({ category: "General Guidelines", subCategory: "", points: "", order: 0 }); setModalType("guideline"); setShowModal(true); }}
                        className="px-6 py-3 rounded-xl text-white font-bold transition-all shadow active:scale-95 flex items-center gap-2"
                        style={{backgroundColor: themeColors.primary}}
                      >
                        <Plus size={20} /> Add Guidelines
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                      {["General Guidelines", "Code of Conduct", "Academic Requirements", "For Parents/Guardians", "Contact Information"].map(cat => {
                        const catGuidelines = guidelines.filter(g => g.category === cat);
                        if (catGuidelines.length === 0) return null;
                        return (
                          <div key={cat} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                              <h5 className="font-bold text-slate-800">{cat}</h5>
                            </div>
                            <div className="divide-y divide-slate-100">
                              {catGuidelines.map(g => (
                                <div key={g._id} className="p-6 flex items-start gap-4 group hover:bg-slate-50/50 transition-colors">
                                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-amber-700 flex-shrink-0"><FileText size={20} /></div>
                                  <div className="flex-1">
                                    <h6 className="font-bold text-slate-800 mb-1">{g.subCategory || "General Information"}</h6>
                                    <ul className="space-y-1">
                                      {g.points.map((p, i) => (
                                        <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                                          <span className="mt-1 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                                          {p}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => { setEditItem(g); setGuidelineForm({ ...g, points: g.points.join('\n') }); setModalType("guideline"); setShowModal(true); }} className="p-2 text-slate-500 hover:text-slate-800 transition-colors"><Edit3 size={18} /></button>
                                    <button onClick={() => deleteGuideline(g._id)} className="p-2 text-red-500 hover:text-red-700 transition-colors"><Trash2 size={18} /></button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "Departments" && !selectedDeptForEdit && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 shadow-sm">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Academic Departments</h3>
                      <p className="text-sm text-slate-500">Manage {departments.length} departments</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    {departments.length === 0 && (
                      <button 
                        onClick={async () => {
                          if (window.confirm("This will populate the database with the 6 initial departments. Continue?")) {
                            try {
                              await axiosInstance.post("/departments/seed");
                              showNotify("Initial departments seeded!");
                              fetchData();
                            } catch (err) { showNotify("Seed failed", "error"); }
                          }
                        }}
                        className="px-6 py-3 rounded-xl border-2 border-amber-600 text-amber-700 font-bold transition-all hover:bg-amber-50 active:scale-95 text-sm"
                      >
                        Seed Initial Data
                      </button>
                    )}
                    <button 
                      onClick={() => { setEditItem(null); resetDeptForm(); setModalType("department"); setShowModal(true); }}
                      className="px-6 py-3 rounded-xl text-white font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 hover:opacity-90 text-sm"
                      style={{ backgroundColor: themeColors.primary }}
                    >
                      <Plus size={20} /> Add New
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {departments.map((dept) => (
                    <motion.div
                      key={dept._id}
                      whileHover={{ y: -5 }}
                      onClick={() => { setSelectedDeptForEdit(dept); setDeptForm(dept); setDeptActiveSubTab("Overview"); }}
                      className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                          {dept.icon || "🏥"}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 line-clamp-1">{dept.name}</h4>
                          <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">{dept.category}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <span className="flex items-center gap-2"><Users size={16} /> Faculty</span>
                          <span className="font-bold text-slate-700">{dept.faculty?.length || 0}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min((dept.faculty?.length || 0) * 10, 100)}%` }} />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex gap-2">
                          <div className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                            {dept.facilities?.length || 0} Facilities
                          </div>
                        </div>
                        <ArrowRight size={18} className="text-slate-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Departments" && selectedDeptForEdit && (
              <div className="space-y-6">
                {/* Header for Specific Department */}
                <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
                  <div className="flex items-center gap-4 w-full">
                    <button 
                      onClick={() => setSelectedDeptForEdit(null)}
                      className="p-2 hover:bg-slate-100 rounded-full transition-colors shrink-0"
                    >
                      <ArrowRight size={24} className="rotate-180" />
                    </button>
                    <div>
                      <h3 className="text-lg lg:text-xl font-bold text-slate-800 line-clamp-1">{selectedDeptForEdit.name}</h3>
                      <p className="text-xs text-slate-500">{selectedDeptForEdit.category} Management</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleDeptSubmit}
                    className="w-full md:w-auto px-6 py-2.5 rounded-xl text-white font-bold transition-all shadow active:scale-95 flex items-center justify-center gap-2"
                    style={{backgroundColor: themeColors.primary}}
                  >
                    <Save size={18} /> <span className="text-sm">Save Changes</span>
                  </button>
                </div>

                {/* Sub-navigation for Department - Scrollable on mobile */}
                <div className="flex gap-2 p-1 bg-slate-100/50 rounded-xl w-full border border-slate-200 overflow-x-auto custom-scrollbar whitespace-nowrap scroll-smooth">
                  {["Overview", "Faculty", "Facilities", "Activities", "Sliders"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setDeptActiveSubTab(tab)}
                      className={`px-4 lg:px-6 py-2.5 rounded-lg text-xs lg:text-sm font-bold transition-all ${
                        deptActiveSubTab === tab 
                          ? "bg-white text-slate-800 shadow-sm" 
                          : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Sub-tab Content */}
                <div className="bg-white p-4 lg:p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[400px]">
                  {deptActiveSubTab === "Overview" && (
                    <div className="space-y-6 w-full max-w-5xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Department Name</label>
                          <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500/20 text-sm transition-all" value={deptForm.name} onChange={e => setDeptForm({...deptForm, name: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Category</label>
                          <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500/20 text-sm transition-all" value={deptForm.category} onChange={e => setDeptForm({...deptForm, category: e.target.value})} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Icon (emoji)</label>
                          <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500/20 text-sm transition-all" value={deptForm.icon} onChange={e => setDeptForm({...deptForm, icon: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Short Description</label>
                          <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500/20 text-sm transition-all" value={deptForm.description} onChange={e => setDeptForm({...deptForm, description: e.target.value})} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Long Overview (Paragraph 1)</label>
                        <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none h-32 focus:ring-2 focus:ring-amber-500/20" value={deptForm.overview} onChange={e => setDeptForm({...deptForm, overview: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Long Overview (Paragraph 2 - Optional)</label>
                        <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none h-32 focus:ring-2 focus:ring-amber-500/20" value={deptForm.overview2} onChange={e => setDeptForm({...deptForm, overview2: e.target.value})} />
                      </div>
                    </div>
                  )}

                  {deptActiveSubTab === "Faculty" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                        <input type="text" placeholder="Name" className="px-4 py-2 rounded-lg border border-slate-200 outline-none text-sm" value={deptFacultyForm.name} onChange={e => setDeptFacultyForm({...deptFacultyForm, name: e.target.value})} />
                        <input type="text" placeholder="Designation" className="px-4 py-2 rounded-lg border border-slate-200 outline-none text-sm" value={deptFacultyForm.designation} onChange={e => setDeptFacultyForm({...deptFacultyForm, designation: e.target.value})} />
                        <input type="text" placeholder="Qualification" className="px-4 py-2 rounded-lg border border-slate-200 outline-none text-sm" value={deptFacultyForm.qualification} onChange={e => setDeptFacultyForm({...deptFacultyForm, qualification: e.target.value})} />
                        <button onClick={addDeptFaculty} className="px-4 py-2 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-700 transition-colors text-sm">Add Member</button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {deptForm.faculty.map((f, i) => (
                          <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                            <div>
                              <h5 className="font-bold text-slate-800">{f.name}</h5>
                              <p className="text-xs text-amber-600 font-semibold">{f.designation}</p>
                              <p className="text-xs text-slate-500">{f.qualification}</p>
                            </div>
                            <button 
                              onClick={() => setDeptForm({...deptForm, faculty: deptForm.faculty.filter((_, idx) => idx !== i)})}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {deptActiveSubTab === "Facilities" && (
                    <div className="space-y-6 max-w-3xl">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Add new facility point..." 
                          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500/20" 
                          value={deptFacilityInput} 
                          onChange={e => setDeptFacilityInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addDeptFacility()}
                        />
                        <button onClick={addDeptFacility} className="px-6 bg-slate-800 text-white rounded-xl font-bold"><Plus size={20} /></button>
                      </div>
                      <div className="space-y-3">
                        {deptForm.facilities.map((f, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl group border border-transparent hover:border-slate-200 transition-all">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-amber-500" />
                              <p className="text-slate-700 text-sm">{f}</p>
                            </div>
                            <button 
                              onClick={() => setDeptForm({...deptForm, facilities: deptForm.facilities.filter((_, idx) => idx !== i)})}
                              className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {deptActiveSubTab === "Activities" && (
                    <div className="space-y-6 max-w-3xl">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Add new activity point..." 
                          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500/20" 
                          value={deptActivityInput} 
                          onChange={e => setDeptActivityInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addDeptActivity()}
                        />
                        <button onClick={addDeptActivity} className="px-6 bg-slate-800 text-white rounded-xl font-bold"><Plus size={20} /></button>
                      </div>
                      <div className="space-y-3">
                        {deptForm.activities.map((a, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl group border border-transparent hover:border-slate-200 transition-all">
                            <div className="flex items-center gap-3">
                              <Zap size={16} className="text-amber-500" />
                              <p className="text-slate-700 text-sm">{a}</p>
                            </div>
                            <button 
                              onClick={() => setDeptForm({...deptForm, activities: deptForm.activities.filter((_, idx) => idx !== i)})}
                              className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {deptActiveSubTab === "Sliders" && (
                    <div className="space-y-8">
                      <div className="flex items-center justify-between p-6 bg-amber-50/50 rounded-2xl border border-dashed border-amber-200">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <ImageIcon className="text-amber-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">Department Hero Sliders</h4>
                            <p className="text-sm text-slate-500">Upload high-resolution images for this department's hero section</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <input 
                            type="file" 
                            id="dept-slider-upload" 
                            className="hidden" 
                            onChange={(e) => {
                              if (e.target.files[0]) handleSliderUpload(e.target.files[0], selectedDeptForEdit._id);
                            }} 
                          />
                          <button 
                            onClick={() => document.getElementById('dept-slider-upload').click()}
                            className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-700 transition-all"
                          >
                            <Upload size={18} /> Upload Image
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {sliders.filter(s => s.department?._id === selectedDeptForEdit._id).map((slider) => (
                          <div key={slider._id} className="group relative aspect-video bg-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                            <img src={slider.imageUrl.startsWith('http') ? slider.imageUrl : `http://localhost:8080${slider.imageUrl}`} alt={slider.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                              <button onClick={() => deleteSlider(slider._id)} className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"><Trash2 size={20} /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab !== "Home Page" && activeTab !== "Academic" && activeTab !== "Testimonials" && activeTab !== "About Us" && activeTab !== "Admission" && activeTab !== "Departments" && (
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
              ) : modalType === "course" ? (
                <form onSubmit={handleCourseSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Course Name</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={courseForm.name} onChange={e => setCourseForm({...courseForm, name: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Category</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={courseForm.category} onChange={e => setCourseForm({...courseForm, category: e.target.value})}>
                        <option>Undergraduate Programs</option>
                        <option>Postgraduate Programs</option>
                        <option>Diploma Programs</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Duration</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={courseForm.duration} onChange={e => setCourseForm({...courseForm, duration: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Seats</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={courseForm.seats} onChange={e => setCourseForm({...courseForm, seats: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Icon (Emoji)</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={courseForm.icon} onChange={e => setCourseForm({...courseForm, icon: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Eligibility</label>
                    <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none h-20" value={courseForm.eligibility} onChange={e => setCourseForm({...courseForm, eligibility: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Highlights (comma separated)</label>
                    <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none h-20" value={courseForm.highlights} onChange={e => setCourseForm({...courseForm, highlights: e.target.value})} />
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                    <button type="submit" className="flex-[2] px-6 py-4 rounded-2xl text-white font-bold transition-all shadow-xl active:scale-95 hover:opacity-90" style={{ backgroundColor: themeColors.primary }}>Save Course</button>
                  </div>
                </form>
              ) : modalType === "step" ? (
                <form onSubmit={handleStepSubmit} className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Step Number</label>
                      <input type="number" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={admissionStepForm.step} onChange={e => setAdmissionStepForm({...admissionStepForm, step: parseInt(e.target.value)})} required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Icon Name (Lucide)</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={admissionStepForm.icon} onChange={e => setAdmissionStepForm({...admissionStepForm, icon: e.target.value})}>
                        <option>Calendar</option>
                        <option>Users</option>
                        <option>CheckCircle</option>
                        <option>GraduationCap</option>
                        <option>FileText</option>
                        <option>Download</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Title</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={admissionStepForm.title} onChange={e => setAdmissionStepForm({...admissionStepForm, title: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Description</label>
                    <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none h-24" value={admissionStepForm.description} onChange={e => setAdmissionStepForm({...admissionStepForm, description: e.target.value})} required />
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                    <button type="submit" className="flex-[2] px-6 py-4 rounded-2xl text-white font-bold transition-all shadow-xl active:scale-95 hover:opacity-90" style={{ backgroundColor: themeColors.primary }}>Save Step</button>
                  </div>
                </form>
              ) : modalType === "rule" ? (
                <form onSubmit={handleRuleSubmit} className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Category</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={admissionRuleForm.category} onChange={e => setAdmissionRuleForm({...admissionRuleForm, category: e.target.value})}>
                        <option>UnderGraduated Programs</option>
                        <option>PostGraduated Programs</option>
                        <option>General Rules</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Icon Name</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={admissionRuleForm.icon} onChange={e => setAdmissionRuleForm({...admissionRuleForm, icon: e.target.value})}>
                        <option>CheckCircle</option>
                        <option>Calendar</option>
                        <option>Stethoscope</option>
                        <option>GraduationCap</option>
                        <option>Info</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Title</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={admissionRuleForm.title} onChange={e => setAdmissionRuleForm({...admissionRuleForm, title: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Description (Use . to separate points)</label>
                    <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none h-32" value={admissionRuleForm.description} onChange={e => setAdmissionRuleForm({...admissionRuleForm, description: e.target.value})} required />
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                    <button type="submit" className="flex-[2] px-6 py-4 rounded-2xl text-white font-bold transition-all shadow-xl active:scale-95 hover:opacity-90" style={{ backgroundColor: themeColors.primary }}>Save Rule</button>
                  </div>
                </form>
              ) : modalType === "bond" ? (
                <form onSubmit={handleBondSubmit} className="p-8 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Bond Type</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={bondForm.type} onChange={e => setBondForm({...bondForm, type: e.target.value})}>
                        <option value="student">Student Bond</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Title / Label</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" placeholder="e.g. Bond Amount" value={bondForm.title} onChange={e => setBondForm({...bondForm, title: e.target.value})} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Content / Value</label>
                    <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none h-32 resize-none" placeholder="Enter bond condition details..." value={bondForm.content} onChange={e => setBondForm({...bondForm, content: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Display Order</label>
                    <input type="number" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={bondForm.order} onChange={e => setBondForm({...bondForm, order: parseInt(e.target.value)})} />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                    <button type="submit" className="flex-[2] px-6 py-4 rounded-2xl text-white font-bold transition-all shadow-xl active:scale-95 hover:opacity-90" style={{ backgroundColor: themeColors.primary }}>{editItem ? 'Update Bond' : 'Add Bond Point'}</button>
                  </div>
                </form>
              ) : modalType === "guideline" ? (
                <form onSubmit={handleGuidelineSubmit} className="p-8 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Category</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={guidelineForm.category} onChange={e => setGuidelineForm({...guidelineForm, category: e.target.value})}>
                        <option value="General Guidelines">General Guidelines</option>
                        <option value="Code of Conduct">Code of Conduct</option>
                        <option value="Academic Requirements">Academic Requirements</option>
                        <option value="For Parents/Guardians">For Parents/Guardians</option>
                        <option value="Contact Information">Contact Information</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Sub-Category / Title</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" placeholder="e.g. Attendance Policy" value={guidelineForm.subCategory} onChange={e => setGuidelineForm({...guidelineForm, subCategory: e.target.value})} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Points (One per line)</label>
                    <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none h-48 resize-none" placeholder="Enter guideline points..." value={guidelineForm.points} onChange={e => setGuidelineForm({...guidelineForm, points: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Display Order</label>
                    <input type="number" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={guidelineForm.order} onChange={e => setGuidelineForm({...guidelineForm, order: parseInt(e.target.value)})} />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                    <button type="submit" className="flex-[2] px-6 py-4 rounded-2xl text-white font-bold transition-all shadow-xl active:scale-95 hover:opacity-90" style={{ backgroundColor: themeColors.primary }}>{editItem ? 'Update Guidelines' : 'Add Guidelines'}</button>
                  </div>
                </form>
              ) : modalType === "department" ? (
                <form onSubmit={handleDeptSubmit} className="p-8 space-y-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Department Name</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={deptForm.name} onChange={e => setDeptForm({...deptForm, name: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Category</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={deptForm.category} onChange={e => setDeptForm({...deptForm, category: e.target.value})} required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Icon (emoji)</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={deptForm.icon} onChange={e => setDeptForm({...deptForm, icon: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Short Description</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" value={deptForm.description} onChange={e => setDeptForm({...deptForm, description: e.target.value})} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Overview Paragraph 1</label>
                    <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none h-24" value={deptForm.overview} onChange={e => setDeptForm({...deptForm, overview: e.target.value})} required />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Overview Paragraph 2 (Optional)</label>
                    <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none h-24" value={deptForm.overview2} onChange={e => setDeptForm({...deptForm, overview2: e.target.value})} />
                  </div>

                  <div className="space-y-4 border-t border-slate-100 pt-6">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2"><Users size={18} /> Faculty Members</h4>
                    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl">
                      <input type="text" placeholder="Name" className="px-4 py-2 rounded-lg border border-slate-200" value={deptFacultyForm.name} onChange={e => setDeptFacultyForm({...deptFacultyForm, name: e.target.value})} />
                      <input type="text" placeholder="Designation" className="px-4 py-2 rounded-lg border border-slate-200" value={deptFacultyForm.designation} onChange={e => setDeptFacultyForm({...deptFacultyForm, designation: e.target.value})} />
                      <input type="text" placeholder="Qualification" className="px-4 py-2 rounded-lg border border-slate-200" value={deptFacultyForm.qualification} onChange={e => setDeptFacultyForm({...deptFacultyForm, qualification: e.target.value})} />
                      <button type="button" onClick={addDeptFaculty} className="bg-slate-800 text-white rounded-lg font-bold">Add Faculty</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {deptForm.faculty.map((f, i) => (
                        <div key={i} className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium flex items-center gap-2 shadow-sm">
                          {f.name} ({f.designation})
                          <button type="button" onClick={() => setDeptForm({...deptForm, faculty: deptForm.faculty.filter((_, idx) => idx !== i)})} className="text-red-500 hover:scale-110 transition-transform"><X size={14} /></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 border-t border-slate-100 pt-6">
                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-800 flex items-center gap-2"><Building2 size={18} /> Facilities</h4>
                      <div className="flex gap-2">
                        <input type="text" placeholder="New facility..." className="flex-1 px-4 py-2 rounded-lg border border-slate-200" value={deptFacilityInput} onChange={e => setDeptFacilityInput(e.target.value)} />
                        <button type="button" onClick={addDeptFacility} className="p-2 bg-slate-800 text-white rounded-lg"><Plus size={20} /></button>
                      </div>
                      <div className="space-y-2">
                        {deptForm.facilities.map((f, i) => (
                          <div key={i} className="bg-white p-2 rounded-lg border border-slate-200 text-xs flex items-center justify-between group">
                            <span className="line-clamp-1">{f}</span>
                            <button type="button" onClick={() => setDeptForm({...deptForm, facilities: deptForm.facilities.filter((_, idx) => idx !== i)})} className="text-red-500 opacity-0 group-hover:opacity-100"><Trash2 size={14} /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-800 flex items-center gap-2"><Zap size={18} /> Activities</h4>
                      <div className="flex gap-2">
                        <input type="text" placeholder="New activity..." className="flex-1 px-4 py-2 rounded-lg border border-slate-200" value={deptActivityInput} onChange={e => setDeptActivityInput(e.target.value)} />
                        <button type="button" onClick={addDeptActivity} className="p-2 bg-slate-800 text-white rounded-lg"><Plus size={20} /></button>
                      </div>
                      <div className="space-y-2">
                        {deptForm.activities.map((a, i) => (
                          <div key={i} className="bg-white p-2 rounded-lg border border-slate-200 text-xs flex items-center justify-between group">
                            <span className="line-clamp-1">{a}</span>
                            <button type="button" onClick={() => setDeptForm({...deptForm, activities: deptForm.activities.filter((_, idx) => idx !== i)})} className="text-red-500 opacity-0 group-hover:opacity-100"><Trash2 size={14} /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-slate-100">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                    <button type="submit" className="flex-[2] px-6 py-4 rounded-2xl text-white font-bold transition-all shadow-xl active:scale-95 hover:opacity-90" style={{ backgroundColor: themeColors.primary }}>{editItem ? 'Update Department' : 'Create Department'}</button>
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