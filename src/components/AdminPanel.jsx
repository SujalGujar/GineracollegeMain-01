import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Image as ImageIcon, BookOpen, Users, Settings,
  LogOut, Plus, Trash2, Edit3, ChevronRight, Upload, FileText,
  X, Menu, Save, CheckCircle2, AlertCircle, Layers, Info,
  ArrowLeft, Building2, Zap, ChevronDown, ChevronUp, Eye, EyeOff,
  GraduationCap, Phone, MapPin, Sliders, Search, Clock
} from "lucide-react";
import axiosInstance, { getMediaUrl } from "../api/axiosInstance";
import { useSectionVisibility } from "../context/SectionVisibilityContext";

/* ─── Design Tokens ─────────────────────────────────────── */
const C = {
  brand:    "#6B3F1D",
  accent:   "#E07B39",
  accentSoft: "#FDF0E6",
  surface:  "#FFFFFF",
  bg:       "#F4F1EE",
  border:   "#E8E0D8",
  text:     "#1A1208",
  muted:    "#8A7A6A",
  danger:   "#DC2626",
  dangerSoft: "#FEF2F2",
  success:  "#16A34A",
  successSoft: "#F0FDF4",
};

/* ─── Tiny helpers ───────────────────────────────────────── */
const imgUrl = (url) =>
  !url ? "/placeholder.png"
       : url.startsWith("http") ? url
       : getMediaUrl(url);

const Pill = ({ children, color = C.accent }) => (
  <span style={{ background: color + "20", color }}
        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
    {children}
  </span>
);

const IconBtn = ({ onClick, danger, children, className = "" }) => (
  <button onClick={onClick}
    className={`p-2 rounded-lg transition-all hover:scale-105 active:scale-95 ${
      danger
        ? "bg-red-50 text-red-500 hover:bg-red-100"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    } ${className}`}>
    {children}
  </button>
);

const Toast = ({ note }) => (
  <AnimatePresence>
    {note && (
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border text-sm font-semibold"
        style={{
          background: note.type === "error" ? C.dangerSoft : C.successSoft,
          borderColor: note.type === "error" ? "#FCA5A5" : "#86EFAC",
          color: note.type === "error" ? C.danger : C.success,
        }}>
        {note.type === "error" ? <AlertCircle size={18}/> : <CheckCircle2 size={18}/>}
        {note.message}
      </motion.div>
    )}
  </AnimatePresence>
);

const Field = ({ label, hint, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center gap-1.5">
      <label className="text-[13px] font-bold tracking-wide" style={{ color: C.text }}>{label}</label>
      {required && <span className="text-red-500 text-xs font-bold">*</span>}
    </div>
    {hint && <p className="text-[11px] leading-relaxed" style={{ color: C.muted }}>{hint}</p>}
    {children}
  </div>
);

// Form section wrapper for visual grouping
const FormSection = ({ title, children }) => (
  <div className="space-y-4">
    {title && (
      <div className="flex items-center gap-3">
        <div className="h-px flex-1" style={{ background: C.border }}/>
        <span className="text-[10px] font-extrabold uppercase tracking-[0.18em]" style={{ color: C.muted }}>{title}</span>
        <div className="h-px flex-1" style={{ background: C.border }}/>
      </div>
    )}
    {children}
  </div>
);

const inputCls = "w-full px-4 py-3 rounded-xl border-2 bg-white text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400";
const inputStyle = { borderColor: "#E8E4DF" };
const inputFocusStyle = { borderColor: C.accent };
const formBtnPrimary = "w-full py-3.5 rounded-xl text-sm font-bold text-white tracking-wide shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2";
const formBtnSecondary = "flex-1 py-3.5 rounded-xl border-2 text-sm font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-all";

// Styled input with built-in focus state
const FInput = ({ className = '', style = {}, ...props }) => (
  <input
    {...props}
    className={`${inputCls} ${className} focus:border-amber-500 focus:ring-0`}
    style={{ ...inputStyle, ...style }}
  />
);
const FTextarea = ({ className = '', style = {}, ...props }) => (
  <textarea
    {...props}
    className={`${inputCls} resize-none ${className} focus:border-amber-500 focus:ring-0`}
    style={{ ...inputStyle, ...style }}
  />
);
const FSelect = ({ className = '', style = {}, ...props }) => (
  <select
    {...props}
    className={`${inputCls} ${className} focus:border-amber-500 focus:ring-0 cursor-pointer`}
    style={{ ...inputStyle, ...style }}
  />
);

const Modal = ({ show, onClose, title, subtitle, children }) => {
  if (typeof document === 'undefined') return null;
  return createPortal(
    <AnimatePresence>
      {show && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {/* Custom style for Modal Form Scrollbar */}
          <style>{`
            .form-scroll-container::-webkit-scrollbar {
              width: 8px !important;
              display: block !important;
            }
            .form-scroll-container::-webkit-scrollbar-track {
              background: #F0ECE7 !important;
              border-radius: 8px !important;
            }
            .form-scroll-container::-webkit-scrollbar-thumb {
              background: #6B3F1D !important;
              border-radius: 8px !important;
              border: 2px solid #F0ECE7 !important;
            }
            .form-scroll-container::-webkit-scrollbar-thumb:hover {
              background: #4A2B14 !important;
            }
            .form-scroll-container {
              scrollbar-width: thin !important;
              scrollbar-color: #6B3F1D #F0ECE7 !important;
              -webkit-overflow-scrolling: touch;
            }
          `}</style>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-[3px]"
            style={{ zIndex: 0 }}
          />
          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -20 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh]"
            style={{ background: '#fff', zIndex: 1, maxWidth: '680px' }}>
            {/* Header (Fixed at top) */}
            <div
              className="flex items-start justify-between px-7 py-5 border-b shrink-0"
              style={{ borderColor: '#EDE9E4', background: 'linear-gradient(135deg, #6B3F1D 0%, #8B5E3C 100%)' }}>
              <div>
                <h3 className="text-[17px] font-bold text-white leading-tight">{title}</h3>
                {subtitle && <p className="text-sm mt-1 text-white/70">{subtitle}</p>}
              </div>
              <button onClick={onClose}
                className="p-2 rounded-xl border border-white/20 hover:bg-white/10 transition shrink-0 ml-4 mt-0.5">
                <X size={18} className="text-white"/>
              </button>
            </div>
            {/* Scrollable Form Body (Internal scroll forced) */}
            <div className="px-6 sm:px-7 py-6 overflow-y-scroll form-scroll-container flex-1" style={{ background: '#FAFAF9' }}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

// ── MODAL FORM COMPONENTS ───────────────────────────────
// ── shared file-upload label style ──────────────────────
const fileLabelCls = "flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed bg-white cursor-pointer hover:bg-amber-50 hover:border-amber-400 transition-all text-sm font-medium";

const FormActions = ({ onCancel, submitLabel = "Save Changes" }) => (
  <div className="flex gap-3 pt-5 mt-1 border-t" style={{ borderColor: '#EDE9E4' }}>
    <button type="button" onClick={onCancel}
      className={formBtnSecondary} style={{ borderColor: '#D1C7BC', minWidth: '110px' }}>
      Cancel
    </button>
    <button type="submit" className={`${formBtnPrimary} flex-[2]`}
      style={{ background: 'linear-gradient(135deg, #6B3F1D 0%, #9B6A43 100%)' }}>
      <Save size={16}/>{submitLabel}
    </button>
  </div>
);

// ── PROGRAM FORM ─────────────────────────────────────────
const ProgramForm = ({ editItem, programForm, setProgramForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => {
    e.preventDefault();
    if (!editItem && !programForm.image) return notify("Please select a cover image", "error");
    const fd = new FormData();
    fd.append("title", programForm.title || "");
    fd.append("description", programForm.description || "");
    fd.append("duration", programForm.duration || "");
    fd.append("category", programForm.category || "Undergraduate");
    fd.append("courses", JSON.stringify(typeof programForm.courses === 'string'
      ? programForm.courses.split(",").map(c => c.trim()).filter(Boolean)
      : (programForm.courses || [])));
    if (programForm.image instanceof File) fd.append("image", programForm.image);
    const url = editItem ? `/programs/${editItem._id}` : "/programs";
    try {
      if (editItem) await axiosInstance.put(url, fd);
      else await axiosInstance.post(url, fd);
      notify(editItem ? "Updated" : "Created"); closeModal(); fetchData();
    } catch { notify("Failed", "error"); }
  }} className="space-y-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Program Title" required>
        <FInput required value={programForm.title} onChange={e=>setProgramForm({...programForm,title:e.target.value})} placeholder="e.g. B.Sc. Nursing"/>
      </Field>
      <Field label="Category">
        <FSelect value={programForm.category} onChange={e=>setProgramForm({...programForm,category:e.target.value})}>
          <option>Undergraduate</option><option>Postgraduate</option><option>Diploma</option>
        </FSelect>
      </Field>
    </div>
    <Field label="Description" required>
      <FTextarea required rows={3} value={programForm.description} onChange={e=>setProgramForm({...programForm,description:e.target.value})} placeholder="Describe the program objectives, curriculum overview…"/>
    </Field>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Duration">
        <FInput value={programForm.duration} onChange={e=>setProgramForm({...programForm,duration:e.target.value})} placeholder="e.g. 4 Years"/>
      </Field>
      <Field label="Cover Image">
        <label className={fileLabelCls} style={{ color: '#6B7280' }}>
          <ImageIcon size={16} style={{ color: C.accent }}/>
          <span>{programForm.image instanceof File ? programForm.image.name : "Choose image file"}</span>
          <input type="file" className="hidden" onChange={e=>setProgramForm({...programForm,image:e.target.files[0]})}/>
        </label>
        {programForm.image instanceof File
          ? <img src={URL.createObjectURL(programForm.image)} className="mt-2 h-16 w-16 object-cover rounded-xl border-2 shadow-sm" alt="preview"/>
          : editItem?.imageUrl ? <img src={imgUrl(editItem.imageUrl)} className="mt-2 h-16 w-16 object-cover rounded-xl border-2 shadow-sm" alt="current"/> : null}
      </Field>
    </div>
    <Field label="Courses (comma separated)" hint="e.g.  Anatomy, Physiology, Microbiology">
      <FTextarea rows={2} value={programForm.courses} onChange={e=>setProgramForm({...programForm,courses:e.target.value})}/>
    </Field>
    <FormActions onCancel={closeModal} submitLabel={editItem ? "Save Changes" : "Create Program"}/>
  </form>
);

// ── TESTIMONIAL FORM ─────────────────────────────────────
const TestimonialForm = ({ editItem, testimonialForm, setTestimonialForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => {
    e.preventDefault();
    if (!editItem && !testimonialForm.image) return notify("Please select a photo", "error");
    const fd = new FormData();
    Object.entries(testimonialForm).forEach(([k,v]) => {
      if (k==="image" && v instanceof File) fd.append("image",v);
      else if (k!=="image") fd.append(k,v);
    });
    const url = editItem ? `/testimonials/${editItem._id}` : "/testimonials";
    try {
      if (editItem) await axiosInstance.put(url,fd);
      else await axiosInstance.post(url,fd);
      notify(editItem?"Updated":"Created"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Student Name" required>
        <FInput required value={testimonialForm.name} onChange={e=>setTestimonialForm({...testimonialForm,name:e.target.value})} placeholder="Full name"/>
      </Field>
      <Field label="Role / Batch" required>
        <FInput required value={testimonialForm.role} onChange={e=>setTestimonialForm({...testimonialForm,role:e.target.value})} placeholder="e.g. B.Sc. Nursing 2023"/>
      </Field>
    </div>
    <Field label="Testimonial" required>
      <FTextarea required rows={4} value={testimonialForm.content} onChange={e=>setTestimonialForm({...testimonialForm,content:e.target.value})} placeholder="Student's review about the college…"/>
    </Field>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Rating (1–5)">
        <FInput type="number" min={1} max={5} value={testimonialForm.rating} onChange={e=>setTestimonialForm({...testimonialForm,rating:parseInt(e.target.value)})}/>
      </Field>
      <Field label="Student Photo">
        <label className={fileLabelCls} style={{ color: '#6B7280' }}>
          <ImageIcon size={16} style={{ color: C.accent }}/>
          <span>{testimonialForm.image instanceof File ? testimonialForm.image.name : "Choose photo file"}</span>
          <input type="file" className="hidden" onChange={e=>setTestimonialForm({...testimonialForm,image:e.target.files[0]})}/>
        </label>
      </Field>
    </div>
    <FormActions onCancel={closeModal} submitLabel={editItem ? "Save Changes" : "Add Testimonial"}/>
  </form>
);

// ── MILESTONE FORM ───────────────────────────────────────
const MilestoneForm = ({ editItem, milestoneForm, setMilestoneForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => {
    e.preventDefault();
    const url = editItem ? `/about/milestones/${editItem._id}` : "/about/milestones";
    try {
      if (editItem) await axiosInstance.put(url,milestoneForm);
      else await axiosInstance.post(url,milestoneForm);
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-5">
    <div className="grid grid-cols-3 gap-4">
      <Field label="Year" required>
        <FInput required value={milestoneForm.year} onChange={e=>setMilestoneForm({...milestoneForm,year:e.target.value})} placeholder="1963"/>
      </Field>
      <Field label="Icon (emoji)">
        <FInput value={milestoneForm.icon} onChange={e=>setMilestoneForm({...milestoneForm,icon:e.target.value})}/>
      </Field>
      <Field label="Sort Order">
        <FInput type="number" value={milestoneForm.order} onChange={e=>setMilestoneForm({...milestoneForm,order:parseInt(e.target.value)||0})}/>
      </Field>
    </div>
    <Field label="Event Title" required>
      <FInput required value={milestoneForm.event} onChange={e=>setMilestoneForm({...milestoneForm,event:e.target.value})} placeholder="e.g. College Established"/>
    </Field>
    <Field label="Accent Color">
      <div className="flex gap-3 items-center">
        <input type="color" value={milestoneForm.color} onChange={e=>setMilestoneForm({...milestoneForm,color:e.target.value})} className="w-12 h-11 rounded-xl border-2 cursor-pointer shrink-0" style={{ borderColor: '#E8E4DF' }}/>
        <FInput value={milestoneForm.color} onChange={e=>setMilestoneForm({...milestoneForm,color:e.target.value})}/>
      </div>
    </Field>
    <Field label="Description" required>
      <FTextarea required rows={3} value={milestoneForm.description} onChange={e=>setMilestoneForm({...milestoneForm,description:e.target.value})} placeholder="Brief description of this milestone…"/>
    </Field>
    <FormActions onCancel={closeModal} submitLabel={editItem ? "Save Changes" : "Add Milestone"}/>
  </form>
);

// ── VISION / MISSION FORM ────────────────────────────────
const VisionMissionForm = ({ editItem, vmForm, setVmForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => {
    e.preventDefault();
    const url = editItem ? `/about/vision-mission/${editItem._id}` : "/about/vision-mission";
    try {
      if (editItem) await axiosInstance.put(url,vmForm);
      else await axiosInstance.post(url,vmForm);
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-5">
    <div className="grid grid-cols-2 gap-4">
      <Field label="Statement Type">
        <FSelect value={vmForm.type} onChange={e=>setVmForm({...vmForm,type:e.target.value})}>
          <option value="vision">🔭 Vision</option>
          <option value="mission">🎯 Mission</option>
        </FSelect>
      </Field>
      <Field label="Sort Order">
        <FInput type="number" value={vmForm.order||0} onChange={e=>setVmForm({...vmForm,order:parseInt(e.target.value)||0})}/>
      </Field>
    </div>
    <Field label="Content" required>
      <FTextarea required rows={5} value={vmForm.content} onChange={e=>setVmForm({...vmForm,content:e.target.value})} placeholder="Enter the statement content…"/>
    </Field>
    <FormActions onCancel={closeModal} submitLabel={editItem ? "Save Changes" : "Add Statement"}/>
  </form>
);

// ── CORE VALUE FORM ──────────────────────────────────────
const CoreValueForm = ({ editItem, cvForm, setCvForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => {
    e.preventDefault();
    const url = editItem ? `/about/core-values/${editItem._id}` : "/about/core-values";
    try {
      if (editItem) await axiosInstance.put(url,cvForm);
      else await axiosInstance.post(url,cvForm);
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-5">
    <div className="grid grid-cols-2 gap-4">
      <Field label="Value Title" required>
        <FInput required value={cvForm.title} onChange={e=>setCvForm({...cvForm,title:e.target.value})} placeholder="e.g. Excellence"/>
      </Field>
      <Field label="Icon (emoji)">
        <FInput value={cvForm.icon} onChange={e=>setCvForm({...cvForm,icon:e.target.value})}/>
      </Field>
    </div>
    <Field label="Description" required>
      <FTextarea required rows={3} value={cvForm.description} onChange={e=>setCvForm({...cvForm,description:e.target.value})} placeholder="Brief description of this value…"/>
    </Field>
    <Field label="Gradient" hint="Tailwind gradient classes, e.g. from-amber-500 to-orange-500">
      <FInput value={cvForm.color} onChange={e=>setCvForm({...cvForm,color:e.target.value})} placeholder="from-amber-500 to-orange-500"/>
    </Field>
    <FormActions onCancel={closeModal} submitLabel={editItem ? "Save Changes" : "Add Core Value"}/>
  </form>
);

// ── COURSE FORM ──────────────────────────────────────────
const CourseForm = ({ editItem, courseForm, setCourseForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => {
    e.preventDefault();
    const url = editItem ? `/courses/${editItem._id}` : "/courses";
    const formattedForm = {
      ...courseForm,
      highlights: typeof courseForm.highlights === "string"
        ? courseForm.highlights.split(",").map(h => h.trim()).filter(Boolean)
        : courseForm.highlights
    };
    try {
      if (editItem) await axiosInstance.put(url,formattedForm);
      else await axiosInstance.post(url,formattedForm);
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-5">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="sm:col-span-2">
        <Field label="Course Name" required>
          <FInput required value={courseForm.name} onChange={e=>setCourseForm({...courseForm,name:e.target.value})} placeholder="e.g. B.Sc. Nursing"/>
        </Field>
      </div>
      <Field label="Icon">
        <FInput value={courseForm.icon} onChange={e=>setCourseForm({...courseForm,icon:e.target.value})}/>
      </Field>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Field label="Category">
        <FSelect value={courseForm.category} onChange={e=>setCourseForm({...courseForm,category:e.target.value})}>
          <option>Undergraduate Programs</option>
          <option>Postgraduate Programs</option>
          <option>Diploma Programs</option>
        </FSelect>
      </Field>
      <Field label="Duration">
        <FInput value={courseForm.duration} onChange={e=>setCourseForm({...courseForm,duration:e.target.value})} placeholder="e.g. 4 Years"/>
      </Field>
      <Field label="Seats">
        <FInput value={courseForm.seats} onChange={e=>setCourseForm({...courseForm,seats:e.target.value})} placeholder="e.g. 60"/>
      </Field>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Annual Fees">
        <FInput value={courseForm.fees} onChange={e=>setCourseForm({...courseForm,fees:e.target.value})} placeholder="e.g. ₹50,000"/>
      </Field>
      <Field label="Official Website Link">
        <FInput value={courseForm.websiteLink} onChange={e=>setCourseForm({...courseForm,websiteLink:e.target.value})} placeholder="https://…"/>
      </Field>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Brief Description">
        <FTextarea rows={3} value={courseForm.description||""} onChange={e=>setCourseForm({...courseForm,description:e.target.value})} placeholder="Short overview of the course…"/>
      </Field>
      <Field label="Eligibility">
        <FTextarea rows={3} value={courseForm.eligibility} onChange={e=>setCourseForm({...courseForm,eligibility:e.target.value})} placeholder="Who can apply…"/>
      </Field>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Highlights" hint="Comma separated">
        <FTextarea rows={2} value={courseForm.highlights} onChange={e=>setCourseForm({...courseForm,highlights:e.target.value})}/>
      </Field>
      <Field label="Admission Method">
        <FTextarea rows={2} value={courseForm.admission||""} onChange={e=>setCourseForm({...courseForm,admission:e.target.value})}/>
      </Field>
    </div>
    <FormActions onCancel={closeModal} submitLabel={editItem ? "Save Changes" : "Add Course"}/>
  </form>
);

// ── STEP FORM ────────────────────────────────────────────
const StepForm = ({ editItem, stepForm, setStepForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => {
    e.preventDefault();
    const url = editItem ? `/admission-steps/${editItem._id}` : "/admission-steps";
    try {
      if (editItem) await axiosInstance.put(url,stepForm);
      else await axiosInstance.post(url,stepForm);
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-5">
    <div className="grid grid-cols-2 gap-4">
      <Field label="Step Number" required>
        <FInput type="number" required value={stepForm.step} onChange={e=>setStepForm({...stepForm,step:parseInt(e.target.value)})}/>
      </Field>
      <Field label="Icon">
        <FSelect value={stepForm.icon} onChange={e=>setStepForm({...stepForm,icon:e.target.value})}>
          {["Calendar","Users","CheckCircle","GraduationCap","FileText","Download"].map(i=><option key={i}>{i}</option>)}
        </FSelect>
      </Field>
    </div>
    <Field label="Step Title" required>
      <FInput required value={stepForm.title} onChange={e=>setStepForm({...stepForm,title:e.target.value})} placeholder="e.g. Submit Application Form"/>
    </Field>
    <Field label="Description" required>
      <FTextarea required rows={4} value={stepForm.description} onChange={e=>setStepForm({...stepForm,description:e.target.value})} placeholder="Explain what the applicant needs to do in this step…"/>
    </Field>
    <FormActions onCancel={closeModal} submitLabel={editItem ? "Save Changes" : "Add Step"}/>
  </form>
);

// ── RULE FORM ────────────────────────────────────────────
const RuleForm = ({ editItem, ruleForm, setRuleForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => {
    e.preventDefault();
    const url = editItem ? `/admission-rules/${editItem._id}` : "/admission-rules";
    try {
      if (editItem) await axiosInstance.put(url,ruleForm);
      else await axiosInstance.post(url,ruleForm);
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Category">
        <FSelect value={ruleForm.category} onChange={e=>setRuleForm({...ruleForm,category:e.target.value})}>
          <option>UnderGraduated Programs</option>
          <option>PostGraduated Programs</option>
          <option>General Rules</option>
        </FSelect>
      </Field>
      <Field label="Icon">
        <FSelect value={ruleForm.icon} onChange={e=>setRuleForm({...ruleForm,icon:e.target.value})}>
          {["CheckCircle","Calendar","Stethoscope","GraduationCap","Info"].map(i=><option key={i}>{i}</option>)}
        </FSelect>
      </Field>
    </div>
    <Field label="Rule Title" required>
      <FInput required value={ruleForm.title} onChange={e=>setRuleForm({...ruleForm,title:e.target.value})} placeholder="e.g. Minimum Percentage Required"/>
    </Field>
    <Field label="Description" required>
      <FTextarea required rows={4} value={ruleForm.description} onChange={e=>setRuleForm({...ruleForm,description:e.target.value})} placeholder="Full explanation of this rule…"/>
    </Field>
    <FormActions onCancel={closeModal} submitLabel={editItem ? "Save Changes" : "Add Rule"}/>
  </form>
);

// ── BOND FORM ────────────────────────────────────────────
const BondForm = ({ editItem, bondForm, setBondForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => {
    e.preventDefault();
    const url = editItem ? `/bonds/${editItem._id}` : "/bonds";
    try {
      if (editItem) await axiosInstance.put(url,bondForm);
      else await axiosInstance.post(url,bondForm);
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-5">
    <Field label="Title" required>
      <FInput required value={bondForm.title} onChange={e=>setBondForm({...bondForm,title:e.target.value})} placeholder="e.g. Government Bond Agreement"/>
    </Field>
    <Field label="Content" required>
      <FTextarea required rows={5} value={bondForm.content} onChange={e=>setBondForm({...bondForm,content:e.target.value})} placeholder="Bond details and conditions…"/>
    </Field>
    <Field label="Display Order">
      <FInput type="number" value={bondForm.order} onChange={e=>setBondForm({...bondForm,order:parseInt(e.target.value)||0})}/>
    </Field>
    <FormActions onCancel={closeModal} submitLabel={editItem ? "Save Changes" : "Add Bond"}/>
  </form>
);

// ── GUIDELINE FORM ───────────────────────────────────────
const GuidelineForm = ({ editItem, guidelineForm, setGuidelineForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => {
    e.preventDefault();
    const data = {...guidelineForm, points: typeof guidelineForm.points==="string"
      ? guidelineForm.points.split("\n").map(p=>p.trim()).filter(Boolean)
      : guidelineForm.points};
    const url = editItem ? `/guidelines/${editItem._id}` : "/guidelines";
    try {
      if (editItem) await axiosInstance.put(url,data);
      else await axiosInstance.post(url,data);
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Category">
        <FSelect value={guidelineForm.category} onChange={e=>setGuidelineForm({...guidelineForm,category:e.target.value})}>
          {["General Guidelines","Code of Conduct","Academic Requirements","For Parents/Guardians","Contact Information"].map(c=><option key={c}>{c}</option>)}
        </FSelect>
      </Field>
      <Field label="Sub-Category / Title" required>
        <FInput required value={guidelineForm.subCategory} onChange={e=>setGuidelineForm({...guidelineForm,subCategory:e.target.value})} placeholder="e.g. Dress Code Policy"/>
      </Field>
    </div>
    <Field label="Points" hint="Enter one point per line — each line becomes a separate bullet">
      <FTextarea required rows={7} value={guidelineForm.points} onChange={e=>setGuidelineForm({...guidelineForm,points:e.target.value})} placeholder="Guideline point 1&#10;Guideline point 2&#10;Guideline point 3"/>
    </Field>
    <FormActions onCancel={closeModal} submitLabel={editItem ? "Save Changes" : "Add Guideline"}/>
  </form>
);

// ── DEPT FORM ─────────────────────────────────────────────
const DeptForm = ({ editItem, deptForm, setDeptForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", deptForm.name||"");
    fd.append("slug", deptForm.slug||"");
    fd.append("category", deptForm.category||"Nursing Department");
    fd.append("description", deptForm.description||"");
    if (deptForm.logo instanceof File) fd.append("logo", deptForm.logo);
    const url = editItem ? `/departments/${editItem._id}` : "/departments";
    try {
      if (editItem) await axiosInstance.put(url, fd);
      else await axiosInstance.post(url, fd);
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-5">
    {/* Logo upload */}
    <div className="flex flex-col items-center gap-3 py-5 px-6 rounded-2xl border-2 border-dashed" style={{ borderColor: '#D1C7BC', background: '#FDFCFB' }}>
      {deptForm.logo instanceof File
        ? <img src={URL.createObjectURL(deptForm.logo)} className="w-20 h-20 rounded-2xl object-cover border-2 shadow-md" alt="preview"/>
        : editItem?.logoUrl
          ? <img src={imgUrl(editItem.logoUrl)} className="w-20 h-20 rounded-2xl object-cover border-2 shadow-md" alt="logo"/>
          : <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl" style={{ background: C.accentSoft }}>🏥</div>
      }
      <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl cursor-pointer text-sm font-semibold text-white shadow hover:opacity-90 transition-all" style={{ background: C.brand }}>
        <Upload size={15}/>
        {deptForm.logo instanceof File ? "Change Logo" : editItem?.logoUrl ? "Replace Logo" : "Upload Department Logo"}
        <input type="file" accept="image/*" className="hidden" onChange={e=>setDeptForm({...deptForm,logo:e.target.files[0]})}/>
      </label>
      <p className="text-xs" style={{ color: C.muted }}>PNG, JPG or WEBP · Recommended 200×200px</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Department Name" required>
        <FInput required value={deptForm.name} onChange={e=>setDeptForm({...deptForm,name:e.target.value})} placeholder="e.g. Fundamentals of Nursing"/>
      </Field>
      <Field label="URL Slug" hint="Unique ID — no spaces">
        <FInput required value={deptForm.slug} onChange={e=>setDeptForm({...deptForm,slug:e.target.value.toLowerCase().replace(/\s+/g,'-')})} placeholder="e.g. fundamentals"/>
      </Field>
    </div>
    <Field label="Category">
      <FInput required value={deptForm.category} onChange={e=>setDeptForm({...deptForm,category:e.target.value})} placeholder="e.g. Nursing Department"/>
    </Field>
    <Field label="Short Description">
      <FInput value={deptForm.description} onChange={e=>setDeptForm({...deptForm,description:e.target.value})} placeholder="Brief description of the department"/>
    </Field>
    <FormActions onCancel={closeModal} submitLabel={editItem ? "Update Department" : "Create Department"}/>
  </form>
);


const SubTabs = ({ tabs, active, onChange }) => (
  <div className="flex gap-1.5 p-1.5 rounded-2xl overflow-x-auto scrollbar-hide" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
    {tabs.map(t => (
      <button key={t} onClick={() => onChange(t)}
        className="shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap"
        style={{
          background: active === t ? C.surface : "transparent",
          color: active === t ? C.text : C.muted,
          boxShadow: active === t ? "0 1px 6px rgba(0,0,0,0.08)" : "none",
        }}>
        {t}
      </button>
    ))}
  </div>
);

const SectionHeader = ({ icon: Icon, title, subtitle, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl"
       style={{ background: C.surface, border: `1px solid ${C.border}` }}>
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
           style={{ background: C.accentSoft }}>
        <Icon size={20} style={{ color: C.accent }}/>
      </div>
      <div className="min-w-0">
        <h3 className="font-bold text-base truncate" style={{ color: C.text }}>{title}</h3>
        {subtitle && <p className="text-xs mt-0.5 truncate" style={{ color: C.muted }}>{subtitle}</p>}
      </div>
    </div>
    {action}
  </div>
);

const AddBtn = ({ onClick, label = "Add New" }) => (
  <button onClick={onClick}
    className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow hover:opacity-90 active:scale-95"
    style={{ background: C.brand }}>
    <Plus size={16}/>{label}
  </button>
);

const RowItem = ({ icon, badge, title, sub, onEdit, onDelete, left }) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl group transition-all hover:shadow-sm"
       style={{ background: C.surface, border: `1px solid ${C.border}` }}>
    {left || (
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
           style={{ background: C.accentSoft }}>
        {icon || "📌"}
      </div>
    )}
    <div className="flex-1 min-w-0">
      {badge && <div className="mb-0.5"><Pill>{badge}</Pill></div>}
      <p className="font-bold text-sm truncate" style={{ color: C.text }}>{title}</p>
      {sub && <p className="text-xs truncate mt-0.5" style={{ color: C.muted }}>{sub}</p>}
    </div>
    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity shrink-0">
      {onEdit && <IconBtn onClick={onEdit}><Edit3 size={15}/></IconBtn>}
      {onDelete && <IconBtn onClick={onDelete} danger><Trash2 size={15}/></IconBtn>}
    </div>
  </div>
);

const EmptyState = ({ icon: Icon, text }) => (
  <div className="flex flex-col items-center justify-center py-20 rounded-3xl border-2 border-dashed shadow-inner" style={{ borderColor: C.border, background: C.surface }}>
    <Icon size={48} style={{ color: C.muted }} className="mb-4 opacity-10"/>
    <p className="text-sm font-bold tracking-tight" style={{ color: C.muted }}>{text}</p>
  </div>
);

// ── SIDEBAR COMPONENTS ───────────────────────────────────

const SidebarContent = ({ onClose, activeTab, setActiveTab, selectedDept, setSelectedDept, navItems, onLogout }) => (
  <div className="flex flex-col h-full min-h-0">
    <div className="flex items-center gap-3 p-6 border-b border-white/10 shrink-0">
      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shadow-inner">
        <LayoutDashboard size={20} className="text-white"/>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-bold text-sm leading-tight truncate">Ginera Admin</p>
        <p className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5 font-medium">Dashboard Console</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="lg:hidden p-2 text-white/40 hover:text-white transition-colors">
          <X size={20}/>
        </button>
      )}
    </div>

    <nav className="flex-1 min-h-0 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
      {navItems.map(({ name, icon: Icon }) => {
        const active = activeTab === name && !selectedDept;
        return (
          <button key={name}
            onClick={() => { setActiveTab(name); setSelectedDept(null); if (onClose) onClose(); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group"
            style={{
              background: active ? "rgba(255,255,255,0.12)" : "transparent",
              color: active ? "#fff" : "rgba(255,255,255,0.55)",
            }}>
            <Icon size={18} className={`transition-transform ${active ? "scale-110" : "group-hover:scale-110"}`}/>
            <span className="truncate">{name}</span>
            {active && <ChevronRight size={14} className="ml-auto opacity-60"/>}
          </button>
        );
      })}

      {selectedDept && (
        <div className="mt-8 pt-6 border-t border-white/5 px-2">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-3 px-2">Active Editor</p>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"/>
              <p className="text-white text-xs font-bold truncate">{selectedDept.name}</p>
            </div>
            <button onClick={() => setSelectedDept(null)} className="w-full py-2.5 rounded-lg bg-white/10 text-[10px] font-bold text-white/70 hover:bg-white/20 transition-all border border-white/5 uppercase tracking-wider">
              Exit Management
            </button>
          </div>
        </div>
      )}
    </nav>

    <div className="p-5 border-t border-white/10 shrink-0">
      <button onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold text-red-300 hover:bg-red-500/20 transition-all active:scale-95">
        <LogOut size={18}/> Sign Out
      </button>
    </div>
  </div>
);

const Sidebar = ({ isMobile, sidebarOpen, setSidebarOpen, ...props }) => (
  <>
    {/* Desktop Sidebar */}
    {!isMobile && (
      <aside className="flex flex-col w-80 shrink-0 self-stretch border-r border-black/10"
             style={{ background: C.brand }}>
        <SidebarContent onClose={null} {...props} />
      </aside>
    )}

    {/* Mobile Sidebar */}
    {isMobile && typeof document !== 'undefined' && createPortal(
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}/>
            <motion.aside
              initial={{ x: -340 }} animate={{ x: 0 }} exit={{ x: -340 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-[10000] w-80 flex flex-col shadow-2xl"
              style={{ background: C.brand, position: 'fixed', top: 0, bottom: 0, left: 0 }}>
              <SidebarContent onClose={() => setSidebarOpen(false)} {...props} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>,
      document.body
    )}
  </>
);

const Header = ({ setSidebarOpen, selectedDept, activeTab }) => (
  <header className="h-14 lg:h-16 flex items-center px-4 lg:px-6 border-b shrink-0 z-10"
          style={{ background: C.surface, borderColor: C.border }}>
    <button onClick={() => setSidebarOpen(true)}
      className="p-2 rounded-xl hover:bg-gray-100 lg:hidden mr-3 transition"
      style={{ color: C.muted }}>
      <Menu size={22}/>
    </button>
    <div className="min-w-0">
      <h2 className="font-bold text-base lg:text-lg truncate" style={{ color: C.text }}>
        {selectedDept ? selectedDept.name : activeTab}
      </h2>
      <p className="text-xs hidden sm:block" style={{ color: C.muted }}>
        {selectedDept ? "Department management console" : `Manage ${activeTab.toLowerCase()} system content`}
      </p>
    </div>
  </header>
);

// ── TAB COMPONENTS ───────────────────────────────────────

const HomeTab = ({ selectedDeptForSlider, setSelectedDeptForSlider, departments, sliders, handleSliderUpload, updateSliderImage, del }) => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row gap-3 p-5 rounded-2xl shadow-sm" style={{ background: C.surface, border:`1px solid ${C.border}` }}>
      <div className="flex-1">
        <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 ml-1">Target Section</label>
        <select value={selectedDeptForSlider} onChange={e => setSelectedDeptForSlider(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none transition-all focus:border-amber-500"
          style={{ borderColor: C.border, background: C.bg, color: C.text }}>
          <option value="null">Homepage Sliders</option>
          {departments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
        </select>
      </div>
      <div className="flex items-end">
        <label className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer transition-all hover:opacity-90 active:scale-95 shadow-md"
               style={{ background: C.brand }}>
          <Upload size={16}/> Upload Images
          <input type="file" multiple className="hidden" onChange={handleSliderUpload}/>
        </label>
      </div>
    </div>

    {sliders.length === 0 ? (
      <EmptyState icon={ImageIcon} text="No slider images yet. Upload images to populate the section."/>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        <AnimatePresence>
          {sliders.filter(s => selectedDeptForSlider === "null" ? !s.department : s.department?._id === selectedDeptForSlider).map(s => (
            <motion.div key={s._id} layout initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.9 }}
              className="group relative aspect-video rounded-2xl overflow-hidden border-2 shadow-sm"
              style={{ borderColor: C.border }}>
              <img src={imgUrl(s.imageUrl)} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-[2px]">
                <label className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-xs font-bold cursor-pointer hover:bg-gray-50 text-gray-800 shadow-lg">
                  <Edit3 size={14}/> Replace
                  <input type="file" className="hidden" onChange={e => updateSliderImage(s._id, e.target.files[0])}/>
                </label>
                <button onClick={() => del(`/sliders/${s._id}`)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl text-xs font-bold hover:bg-red-600 shadow-lg">
                  <Trash2 size={14}/> Remove
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    )}
  </div>
);

const AcademicTab = ({ programs, academicContent, setAcademicContent, axiosInstance, notify, openModal, setProgramForm, del }) => (
  <div className="space-y-6">
    <SectionHeader icon={BookOpen} title="Academic Programs"
      subtitle={`${programs.length} programs currently active`}
      action={<AddBtn onClick={() => { setProgramForm({title:"",description:"",duration:"",category:"Undergraduate",courses:"",image:null}); openModal("program"); }} label="Add New Program"/>}/>

    <div className="p-6 rounded-2xl space-y-4 shadow-sm" style={{ background: C.surface, border:`1px solid ${C.border}` }}>
      <p className="text-sm font-bold uppercase tracking-widest" style={{ color: C.muted }}>Section Banner Content</p>
      <input value={academicContent.title} onChange={e => setAcademicContent({...academicContent, title:e.target.value})}
        placeholder="Section Display Title" className={inputCls} style={inputStyle}/>
      <textarea value={academicContent.description1} onChange={e => setAcademicContent({...academicContent, description1:e.target.value})}
        placeholder="Primary Description Paragraph" rows={3} className={`${inputCls} resize-none`} style={inputStyle}/>
      <textarea value={academicContent.description2} onChange={e => setAcademicContent({...academicContent, description2:e.target.value})}
        placeholder="Secondary Description Paragraph (Optional)" rows={2} className={`${inputCls} resize-none`} style={inputStyle}/>
      <button onClick={async () => { try { await axiosInstance.put("/content/academic", academicContent); notify("Content Saved Successfully"); } catch { notify("Failed to save content","error"); }}}
        className="px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:opacity-90" style={{ background: C.brand }}>
        Update Content
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map(p => (
        <motion.div key={p._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl group relative shadow-md transition-all hover:shadow-lg flex flex-col h-full"
          style={{ background: C.surface, border:`1px solid ${C.border}` }}>
          
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 shadow-sm shrink-0" style={{ borderColor: C.accentSoft }}>
                <img src={imgUrl(p.imageUrl)} alt={p.title} className="w-full h-full object-cover"/>
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm leading-tight mb-1 truncate" style={{ color: C.text }}>{p.title}</p>
                <div className="flex flex-wrap gap-1.5 items-center">
                   <Pill color={C.brand}>{p.category}</Pill>
                   <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{p.duration}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <IconBtn onClick={() => { setProgramForm({ title:p.title,description:p.description,duration:p.duration,category:p.category,courses:p.courses?.join(", ")||"",image:null }); openModal("program",p); }}><Edit3 size={14}/></IconBtn>
              <IconBtn danger onClick={() => del(`/programs/${p._id}`)}><Trash2 size={14}/></IconBtn>
            </div>
          </div>

          <div className="mt-1 flex-1">
            <p className="text-xs leading-relaxed text-gray-500 line-clamp-3">
              {p.description}
            </p>
          </div>
        </motion.div>
      ))}
      {programs.length === 0 && <div className="col-span-full"><EmptyState icon={BookOpen} text="No programs registered yet"/></div>}
    </div>
  </div>
);

const TestimonialsTab = ({ testimonials, testimonialForm, setTestimonialForm, openModal, del }) => (
  <div className="space-y-6">
    <SectionHeader icon={Users} title="Student Testimonials" subtitle={`${testimonials.length} reviews published`}
      action={<AddBtn onClick={() => { setTestimonialForm({name:"",role:"",content:"",rating:5,image:null}); openModal("testimonial"); }}/>}/>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {testimonials.map(t => (
        <motion.div key={t._id} initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
          className="p-6 rounded-3xl group relative shadow-md transition-all hover:shadow-lg flex flex-col h-full" style={{ background: C.surface, border:`1px solid ${C.border}` }}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <img src={imgUrl(t.imageUrl)} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 shadow-inner" style={{ borderColor: C.accentSoft }}/>
              <div>
                <p className="font-bold text-sm leading-tight mb-1" style={{ color: C.text }}>{t.name}</p>
                <p className="text-xs font-medium" style={{ color: C.muted }}>{t.role}</p>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_,i) => <span key={i} className="text-sm" style={{ color: i < t.rating ? "#F59E0B" : C.border }}>★</span>)}
                </div>
              </div>
            </div>
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <IconBtn onClick={() => { setTestimonialForm({name:t.name,role:t.role,content:t.content,rating:t.rating,image:null}); openModal("testimonial",t); }}><Edit3 size={14}/></IconBtn>
              <IconBtn danger onClick={() => del(`/testimonials/${t._id}`)}><Trash2 size={14}/></IconBtn>
            </div>
          </div>
          <p className="text-sm leading-relaxed italic text-gray-600 line-clamp-4 mt-1 flex-1">"{t.content}"</p>
        </motion.div>
      ))}
      {testimonials.length === 0 && <div className="col-span-full"><EmptyState icon={Users} text="No testimonials available"/></div>}
    </div>
  </div>
);

const AboutImagesManager = ({ aboutImages, setAboutImages, aboutImageFiles, setAboutImageFiles, axiosInstance, notify, slotKeys, title = "About Page Images", subtitle = "Manage the images shown on the About Us and Vision & Mission pages" }) => {
  const updateLocal = (key, updates) => {
    setAboutImages(aboutImages.map(item => item.key === key ? { ...item, ...updates } : item));
  };

  const saveImage = async (slot) => {
    const fd = new FormData();
    fd.append("title", slot.title || "");
    fd.append("alt", slot.alt || "");
    if (aboutImageFiles[slot.key]) fd.append("image", aboutImageFiles[slot.key]);
    try {
      const r = await axiosInstance.put(`/about/images/${slot.key}`, fd);
      setAboutImages(aboutImages.map(item => item.key === slot.key ? r.data : item));
      setAboutImageFiles({ ...aboutImageFiles, [slot.key]: null });
      notify("About image saved");
    } catch {
      notify("Image update failed", "error");
    }
  };

  const clearImage = async (key) => {
    if (!window.confirm("Delete this About page image? The page will use the default image.")) return;
    try {
      const r = await axiosInstance.delete(`/about/images/${key}`);
      setAboutImages(aboutImages.map(item => item.key === key ? r.data : item));
      setAboutImageFiles({ ...aboutImageFiles, [key]: null });
      notify("Image deleted");
    } catch {
      notify("Delete failed", "error");
    }
  };

  const visibleImages = slotKeys?.length
    ? aboutImages.filter(slot => slotKeys.includes(slot.key))
    : aboutImages;

  return (
    <div className="space-y-6">
      <SectionHeader icon={ImageIcon} title={title} subtitle={subtitle}/>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ gap: '1.5rem' }}>
        {visibleImages.map(slot => {
          const selectedFile = aboutImageFiles[slot.key];
          const preview = selectedFile ? URL.createObjectURL(selectedFile) : (slot.imageUrl ? imgUrl(slot.imageUrl) : null);
          return (
            <div key={slot.key} className="p-5 rounded-3xl shadow-sm space-y-4" style={{ background: C.surface, border:`1px solid ${C.border}` }}>
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-gray-50 border border-dashed flex items-center justify-center" style={{ borderColor: C.border }}>
                {preview ? (
                  <img src={preview} alt={slot.alt || slot.title} className="w-full h-full object-cover"/>
                ) : (
                  <div className="text-center" style={{ color: C.muted }}>
                    <ImageIcon size={34} className="mx-auto mb-2 opacity-60"/>
                    <p className="text-xs font-bold uppercase tracking-wider">Default image active</p>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <Field label="Image Slot">
                  <input value={slot.title || ""} onChange={e=>updateLocal(slot.key, { title:e.target.value })} className={inputCls} style={inputStyle}/>
                </Field>
                <Field label="Alt Text">
                  <input value={slot.alt || ""} onChange={e=>updateLocal(slot.key, { alt:e.target.value })} className={inputCls} style={inputStyle}/>
                </Field>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-all"
                  style={{ borderColor: C.border, color: C.muted }}>
                  <Upload size={16}/> {selectedFile ? selectedFile.name : "Choose Image"}
                  <input type="file" className="hidden" accept="image/*" onChange={e=>setAboutImageFiles({ ...aboutImageFiles, [slot.key]: e.target.files[0] })}/>
                </label>
                <button onClick={()=>saveImage(slot)} className="px-5 py-3 rounded-xl text-sm font-bold text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2" style={{ background: C.brand }}>
                  <Save size={16}/> Save
                </button>
                <button onClick={()=>clearImage(slot.key)} className="px-4 py-3 rounded-xl text-sm font-bold bg-red-50 text-red-600 hover:bg-red-100 active:scale-95 transition-all flex items-center justify-center gap-2">
                  <Trash2 size={16}/> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AboutImageCard = ({ slot, linkedKey, label, aboutImages, setAboutImages, aboutImageFiles, setAboutImageFiles, axiosInstance, notify }) => {
  if (!slot) return null;

  const selectedFile = aboutImageFiles[slot.key];
  const preview = selectedFile ? URL.createObjectURL(selectedFile) : (slot.imageUrl ? imgUrl(slot.imageUrl) : null);

  const updateLocal = (updates) => {
    setAboutImages(aboutImages.map(item => (item.key === slot.key || item.key === linkedKey) ? { ...item, ...updates } : item));
  };

  const saveImage = async () => {
    const fd = new FormData();
    fd.append("title", slot.title || label);
    fd.append("alt", slot.alt || label);
    if (selectedFile) fd.append("image", selectedFile);
    try {
      const r = await axiosInstance.put(`/about/images/${slot.key}`, fd);
      let updatedImages = aboutImages.some(item => item.key === slot.key)
        ? aboutImages.map(item => item.key === slot.key ? r.data : item)
        : [...aboutImages, r.data];
      if (linkedKey) {
        const fd2 = new FormData();
        fd2.append("title", slot.title || label);
        fd2.append("alt", slot.alt || label);
        if (selectedFile) fd2.append("image", selectedFile);
        try {
          const r2 = await axiosInstance.put(`/about/images/${linkedKey}`, fd2);
          updatedImages = updatedImages.some(item => item.key === linkedKey)
            ? updatedImages.map(item => item.key === linkedKey ? r2.data : item)
            : [...updatedImages, r2.data];
        } catch { }
      }
      setAboutImages(updatedImages);
      setAboutImageFiles({ ...aboutImageFiles, [slot.key]: null, ...(linkedKey ? { [linkedKey]: null } : {}) });
      notify(`${label} image saved`);
    } catch {
      notify("Image update failed", "error");
    }
  };

  const clearImage = async () => {
    if (!window.confirm(`Delete ${label} image? The website will use the default image.`)) return;
    try {
      const r = await axiosInstance.delete(`/about/images/${slot.key}`);
      let updatedImages = aboutImages.some(item => item.key === slot.key)
        ? aboutImages.map(item => item.key === slot.key ? r.data : item)
        : [...aboutImages, r.data];
      if (linkedKey) {
        try {
          const r2 = await axiosInstance.delete(`/about/images/${linkedKey}`);
          updatedImages = updatedImages.some(item => item.key === linkedKey)
            ? updatedImages.map(item => item.key === linkedKey ? r2.data : item)
            : [...updatedImages, r2.data];
        } catch { }
      }
      setAboutImages(updatedImages);
      setAboutImageFiles({ ...aboutImageFiles, [slot.key]: null, ...(linkedKey ? { [linkedKey]: null } : {}) });
      notify(`${label} image deleted`);
    } catch {
      notify("Delete failed", "error");
    }
  };

  return (
    <div className="p-4 rounded-2xl shadow-sm space-y-3" style={{ background: C.surface, border:`1px solid ${C.border}` }}>
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: C.muted }}>{label} Image</p>
      <div className="rounded-xl overflow-hidden bg-gray-50 border border-dashed flex items-center justify-center" style={{ borderColor: C.border, maxHeight: '200px', minHeight: '120px' }}>
        {preview ? (
          <img src={preview} alt={slot.alt || label} className="w-full object-cover" style={{ maxHeight: '200px', width: '100%', display: 'block' }}/>
        ) : (
          <div className="text-center py-8" style={{ color: C.muted }}>
            <ImageIcon size={28} className="mx-auto mb-2 opacity-60"/>
            <p className="text-[11px] font-bold uppercase tracking-wider">Default image active</p>
          </div>
        )}
      </div>
      <Field label="Alt Text">
        <input value={slot.alt || ""} onChange={e=>updateLocal({ alt:e.target.value })} className={inputCls} style={inputStyle}/>
      </Field>
      <div className="flex flex-col sm:flex-row gap-2">
        <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border-2 border-dashed text-xs font-semibold cursor-pointer hover:bg-gray-50 transition-all"
          style={{ borderColor: C.border, color: C.muted }}>
          <Upload size={14}/> {selectedFile ? selectedFile.name : "Choose Image"}
          <input type="file" className="hidden" accept="image/*" onChange={e=>setAboutImageFiles({ ...aboutImageFiles, [slot.key]: e.target.files[0] })}/>
        </label>
        <button onClick={saveImage} className="px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2" style={{ background: C.brand }}>
          <Save size={14}/> Save
        </button>
        <button onClick={clearImage} className="px-3 py-2.5 rounded-xl text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 active:scale-95 transition-all flex items-center justify-center gap-2">
          <Trash2 size={14}/> Delete
        </button>
      </div>
    </div>
  );
};

const AboutTab = ({ aboutSub, setAboutSub, collegeLogo, setCollegeLogo, logoFile, setLogoFile, deanMessage, setDeanMessage, deanPhotoFile, setDeanPhotoFile, milestones, milestoneForm, setMilestoneForm, openModal, setMilestones, visionMission, setVmForm, coreValues, setCvForm, aboutImages, setAboutImages, aboutImageFiles, setAboutImageFiles, historyContent, setHistoryContent, axiosInstance, notify, del }) => (
  <div className="space-y-6">
    <SubTabs tabs={["Branding","Principal","Timeline","Vision & Mission","Core Values"]} active={aboutSub} onChange={setAboutSub}/>
    <AnimatePresence mode="wait">
      <motion.div key={aboutSub} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}>
        {aboutSub === "Branding" && (
          <div className="p-6 rounded-3xl space-y-6 shadow-sm" style={{ background: C.surface, border:`1px solid ${C.border}` }}>
            <p className="font-bold text-base" style={{ color: C.text }}>Institution Branding</p>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-24 h-24 rounded-3xl border-2 border-dashed overflow-hidden bg-gray-50 flex items-center justify-center shrink-0 shadow-inner"
                   style={{ borderColor: C.border }}>
                {collegeLogo.logoUrl ? <img src={imgUrl(collegeLogo.logoUrl)} className="w-full h-full object-contain p-2" alt=""/> : <ImageIcon size={32} style={{ color: C.muted }}/>}
              </div>
              <div className="flex-1 w-full space-y-4">
                <Field label="College Full Name">
                  <input value={collegeLogo.collegeName||""} onChange={e=>setCollegeLogo({...collegeLogo,collegeName:e.target.value})} placeholder="e.g. Ginera Nursing College" className={inputCls} style={inputStyle}/>
                </Field>
                <Field label="Tagline / Motto">
                  <input value={collegeLogo.tagline||""} onChange={e=>setCollegeLogo({...collegeLogo,tagline:e.target.value})} placeholder="e.g. Excellence in Healthcare" className={inputCls} style={inputStyle}/>
                </Field>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-all"
                     style={{ borderColor: C.border, color: C.muted }}>
                <Upload size={16}/> {logoFile ? logoFile.name : "Choose New Logo File"}
                <input type="file" className="hidden" accept="image/*" onChange={e=>setLogoFile(e.target.files[0])}/>
              </label>
              <button onClick={async()=>{ const fd=new FormData(); fd.append("collegeName",collegeLogo.collegeName||""); fd.append("tagline",collegeLogo.tagline||""); if(logoFile) fd.append("logo",logoFile); try{const r=await axiosInstance.put("/about/college-logo",fd); setCollegeLogo(r.data); setLogoFile(null); notify("Branding Updated Successfully");}catch{notify("Update failed","error");}}}
                className="px-8 py-3 rounded-xl text-sm font-bold text-white shadow-lg active:scale-95 transition-all" style={{ background: C.brand }}>Save Branding</button>
            </div>
          </div>
        )}

        {aboutSub === "Principal" && (
          <div className="p-6 rounded-3xl space-y-5 shadow-sm" style={{ background: C.surface, border:`1px solid ${C.border}` }}>
            <p className="font-bold text-base" style={{ color: C.text }}>Dean / Principal's Message</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Full Name"><input value={deanMessage.name||""} onChange={e=>setDeanMessage({...deanMessage,name:e.target.value})} placeholder="e.g. Dr. Jane Doe" className={inputCls} style={inputStyle}/></Field>
              <Field label="Official Title"><input value={deanMessage.title||""} onChange={e=>setDeanMessage({...deanMessage,title:e.target.value})} placeholder="e.g. Dean of Nursing" className={inputCls} style={inputStyle}/></Field>
            </div>
            <Field label="Opening Greeting"><input value={deanMessage.greeting||""} onChange={e=>setDeanMessage({...deanMessage,greeting:e.target.value})} placeholder="e.g. Welcome to Ginera..." className={inputCls} style={inputStyle}/></Field>
            <Field label="Message Content (New line for each paragraph)">
              <textarea rows={6} className={`${inputCls} resize-none`} style={inputStyle}
                value={(deanMessage.paragraphs||[]).join("\n")} onChange={e=>setDeanMessage({...deanMessage,paragraphs:e.target.value.split("\n")})}/>
            </Field>
            <Field label="Highlight Quote">
              <textarea rows={2} className={`${inputCls} resize-none font-medium italic`} style={inputStyle}
                placeholder="A powerful summary statement..." value={deanMessage.highlight||""} onChange={e=>setDeanMessage({...deanMessage,highlight:e.target.value})}/>
            </Field>
            <div className="flex items-center gap-5 p-4 rounded-2xl bg-gray-50 border border-dashed" style={{ borderColor: C.border }}>
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 shadow-sm shrink-0" style={{ borderColor: C.brand + "40" }}>
                {deanMessage.photoUrl ? <img src={imgUrl(deanMessage.photoUrl)} className="w-full h-full object-cover" alt=""/> : <div className="w-full h-full bg-white flex items-center justify-center"><Users size={24} style={{ color: C.muted }}/></div>}
              </div>
              <label className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border text-xs font-bold cursor-pointer hover:shadow-sm transition-all shadow-sm"
                     style={{ borderColor: C.border, color: C.text }}>
                <Upload size={14}/> {deanPhotoFile ? deanPhotoFile.name : "Replace Official Photo"}
                <input type="file" className="hidden" accept="image/*" onChange={e=>setDeanPhotoFile(e.target.files[0])}/>
              </label>
            </div>
            <button onClick={async()=>{ const fd=new FormData(); ["name","title","greeting","highlight"].forEach(k=>fd.append(k,deanMessage[k]||"")); fd.append("paragraphs",JSON.stringify((deanMessage.paragraphs||[]).filter(p=>p&&p.trim()!==""))); fd.append("stats",JSON.stringify(deanMessage.stats||[])); if(deanPhotoFile) fd.append("photo",deanPhotoFile); try{const r=await axiosInstance.put("/about/dean",fd); setDeanMessage(r.data); setDeanPhotoFile(null); notify("Message Updated Successfully");}catch{notify("Update failed","error");}}}
              className="w-full sm:w-auto px-10 py-3.5 rounded-xl text-sm font-bold text-white shadow-xl active:scale-95 transition-all" style={{ background: C.brand }}>Publish Message</button>
          </div>
        )}

        {aboutSub === "Timeline" && (
          <div className="space-y-8">
            {/* History Images Section */}
            <div className="p-6 rounded-3xl space-y-6 shadow-sm border" style={{ background: C.surface, borderColor: C.border }}>
              <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: C.border }}>
                <div>
                  <h3 className="font-bold text-base" style={{ color: C.text }}>History Page Images Management</h3>
                  <p className="text-xs mt-0.5" style={{ color: C.muted }}>Upload, update, or delete images for Hero Banner, Institutional Timeline, and Legacy of Excellence sections</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. History Hero Banner */}
                <AboutImageCard
                  slot={aboutImages.find(img => img.key === 'historyHero') || { key: 'historyHero', title: 'History Hero Banner Image', alt: 'Our History Banner' }}
                  label="History Hero Banner"
                  aboutImages={aboutImages}
                  setAboutImages={setAboutImages}
                  aboutImageFiles={aboutImageFiles}
                  setAboutImageFiles={setAboutImageFiles}
                  axiosInstance={axiosInstance}
                  notify={notify}
                />

                {/* 2. Institutional Timeline Image */}
                <AboutImageCard
                  slot={aboutImages.find(img => img.key === 'historyTimeline') || { key: 'historyTimeline', title: 'Institutional Timeline Image', alt: 'Institutional Timeline' }}
                  label="Institutional Timeline Section"
                  aboutImages={aboutImages}
                  setAboutImages={setAboutImages}
                  aboutImageFiles={aboutImageFiles}
                  setAboutImageFiles={setAboutImageFiles}
                  axiosInstance={axiosInstance}
                  notify={notify}
                />

                {/* 3. Legacy of Excellence Image */}
                <AboutImageCard
                  slot={aboutImages.find(img => img.key === 'historyLegacy') || { key: 'historyLegacy', title: 'Legacy of Excellence Image', alt: 'Legacy of Excellence' }}
                  label="Legacy of Excellence Section"
                  aboutImages={aboutImages}
                  setAboutImages={setAboutImages}
                  aboutImageFiles={aboutImageFiles}
                  setAboutImageFiles={setAboutImageFiles}
                  axiosInstance={axiosInstance}
                  notify={notify}
                />
              </div>
            </div>

            {/* History Text Content Editor */}
            <div className="p-6 rounded-3xl space-y-6 shadow-sm border" style={{ background: C.surface, borderColor: C.border }}>
              <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: C.border }}>
                <div>
                  <h3 className="font-bold text-base" style={{ color: C.text }}>History Page Content & Section Titles</h3>
                  <p className="text-xs mt-0.5" style={{ color: C.muted }}>Edit main hero title, section headings, and history paragraphs</p>
                </div>
              </div>

              <Field label="Hero Banner Title">
                <FInput
                  value={historyContent.heroTitle || ""}
                  onChange={e => setHistoryContent({ ...historyContent, heroTitle: e.target.value })}
                  placeholder="e.g. Our History"
                />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Timeline Section */}
                <div className="p-4 rounded-2xl bg-gray-50/80 border space-y-4" style={{ borderColor: C.border }}>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">Institutional Timeline Section</p>
                  <Field label="Section Title">
                    <FInput
                      value={historyContent.timelineTitle || ""}
                      onChange={e => setHistoryContent({ ...historyContent, timelineTitle: e.target.value })}
                      placeholder="e.g. Institutional Timeline"
                    />
                  </Field>
                  <Field label="Paragraphs (One paragraph per line)">
                    <FTextarea
                      rows={6}
                      value={Array.isArray(historyContent.timelineParagraphs) ? historyContent.timelineParagraphs.join("\n") : (historyContent.timelineParagraphs || "")}
                      onChange={e => setHistoryContent({ ...historyContent, timelineParagraphs: e.target.value.split("\n") })}
                      placeholder="Enter timeline history paragraphs..."
                    />
                  </Field>
                </div>

                {/* Legacy Section */}
                <div className="p-4 rounded-2xl bg-gray-50/80 border space-y-4" style={{ borderColor: C.border }}>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">Legacy of Excellence Section</p>
                  <Field label="Section Title">
                    <FInput
                      value={historyContent.legacyTitle || ""}
                      onChange={e => setHistoryContent({ ...historyContent, legacyTitle: e.target.value })}
                      placeholder="e.g. Legacy of Excellence"
                    />
                  </Field>
                  <Field label="Paragraphs (One paragraph per line)">
                    <FTextarea
                      rows={6}
                      value={Array.isArray(historyContent.legacyParagraphs) ? historyContent.legacyParagraphs.join("\n") : (historyContent.legacyParagraphs || "")}
                      onChange={e => setHistoryContent({ ...historyContent, legacyParagraphs: e.target.value.split("\n") })}
                      placeholder="Enter legacy paragraphs..."
                    />
                  </Field>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={async () => {
                    try {
                      const payload = {
                        ...historyContent,
                        timelineParagraphs: (Array.isArray(historyContent.timelineParagraphs) ? historyContent.timelineParagraphs : (historyContent.timelineParagraphs || "").split("\n")).filter(p => p && p.trim() !== ""),
                        legacyParagraphs: (Array.isArray(historyContent.legacyParagraphs) ? historyContent.legacyParagraphs : (historyContent.legacyParagraphs || "").split("\n")).filter(p => p && p.trim() !== "")
                      };
                      const r = await axiosInstance.put("/about/history-content", payload);
                      setHistoryContent(r.data);
                      notify("History Page Content Updated Successfully!");
                    } catch {
                      notify("Failed to update history content", "error");
                    }
                  }}
                  className="px-8 py-3 rounded-xl text-sm font-bold text-white shadow-lg active:scale-95 transition-all flex items-center gap-2"
                  style={{ background: C.brand }}>
                  <Save size={16}/> Save History Page Content
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <SectionHeader icon={Clock} title="Institutional Milestones" subtitle="Timeline entries & historical achievements"
                action={<AddBtn onClick={() => { setMilestoneForm({year:"",event:"",icon:"🎯",color:"#1e3a8a",description:"",order:0}); openModal("milestone"); }} label="Add Milestone"/>}/>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {milestones.map(m => (
                  <div key={m._id} className="p-5 rounded-2xl group relative transition-all hover:shadow-md" style={{ background: C.surface, border:`1px solid ${C.border}`, borderLeft:`5px solid ${m.color}` }}>
                    <div className="flex items-start gap-4">
                      <span className="text-3xl filter grayscale group-hover:grayscale-0 transition-all">{m.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.15em]" style={{ color: m.color }}>{m.year}</p>
                        <p className="font-bold text-sm truncate mt-0.5" style={{ color: C.text }}>{m.event}</p>
                        <p className="text-xs line-clamp-2 mt-1.5 leading-relaxed" style={{ color: C.muted }}>{m.description}</p>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <IconBtn onClick={() => { setMilestoneForm({year:m.year,event:m.event,icon:m.icon,color:m.color,description:m.description,order:m.order||0}); openModal("milestone",m); }}><Edit3 size={13}/></IconBtn>
                      <IconBtn danger onClick={async()=>{ try{await axiosInstance.delete(`/about/milestones/${m._id}`); setMilestones(milestones.filter(x=>x._id!==m._id)); notify("Milestone Removed");}catch{notify("Delete failed","error");}}}><Trash2 size={13}/></IconBtn>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {aboutSub === "Vision & Mission" && (
           <div className="space-y-6">
             <SectionHeader icon={Info} title="Vision & Mission" subtitle="Strategic direction statements"
                action={<AddBtn onClick={() => { setVmForm({type:"vision",content:"",order:0}); openModal("visionMission"); }} label="Add Statement"/>}/>

             {/* ── Vision & Mission Images ── */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               <AboutImageCard
                 slot={aboutImages.find(item => item.key === "visionMain") || aboutImages.find(item => item.key === "visionGoals")}
                 linkedKey="visionGoals"
                 label="Vision"
                 aboutImages={aboutImages} setAboutImages={setAboutImages}
                 aboutImageFiles={aboutImageFiles} setAboutImageFiles={setAboutImageFiles}
                 axiosInstance={axiosInstance} notify={notify}
               />
               <AboutImageCard
                 slot={aboutImages.find(item => item.key === "missionMain") || aboutImages.find(item => item.key === "missionValues")}
                 linkedKey="missionValues"
                 label="Mission"
                 aboutImages={aboutImages} setAboutImages={setAboutImages}
                 aboutImageFiles={aboutImageFiles} setAboutImageFiles={setAboutImageFiles}
                 axiosInstance={axiosInstance} notify={notify}
               />
             </div>

             {/* ── Statements ── */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ gap: '1.5rem' }}>
                {["vision","mission"].map(type => (
                  <div key={type} className="flex flex-col gap-3 min-w-0" style={{ gap: '0.75rem' }}>
                    <p className="text-xs font-bold uppercase tracking-widest pl-2" style={{ color: C.muted }}>{type} Statement</p>
                    {visionMission.filter(v=>v.type===type).map(v => (
                      <div key={v._id} className="p-5 rounded-2xl relative group shadow-sm" style={{ background: C.surface, border:`1px solid ${C.border}` }}>
                        <p className="text-sm leading-relaxed" style={{ color: C.text }}>{v.content}</p>
                        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <IconBtn onClick={() => { setVmForm({type:v.type,content:v.content,order:v.order}); openModal("visionMission",v); }}><Edit3 size={13}/></IconBtn>
                          <IconBtn danger onClick={() => del(`/about/vision-mission/${v._id}`)}><Trash2 size={13}/></IconBtn>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
             </div>
           </div>
        )}

        {aboutSub === "Core Values" && (
           <div className="space-y-6">
             <SectionHeader icon={CheckCircle2} title="Institutional Values" subtitle="The pillars of our culture"
                action={<AddBtn onClick={() => { setCvForm({icon:"🌟",title:"",description:"",color:"from-amber-500 to-orange-500",order:0}); openModal("coreValue"); }} label="Add Core Value"/>}/>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ gap: '1.25rem' }}>
                {coreValues.map(v => (
                  <div key={v._id} className="p-6 rounded-3xl group relative transition-all hover:shadow-lg overflow-hidden" style={{ background: C.surface, border:`1px solid ${C.border}` }}>
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${v.color} opacity-[0.03] rounded-bl-[100px] transition-all group-hover:opacity-[0.08]`}/>
                    <span className="text-4xl block mb-4 filter drop-shadow-sm">{v.icon}</span>
                    <p className="font-bold text-base mb-2" style={{ color: C.text }}>{v.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{v.description}</p>
                    <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <IconBtn onClick={() => { setCvForm({icon:v.icon,title:v.title,description:v.description,color:v.color,order:v.order}); openModal("coreValue",v); }}><Edit3 size={13}/></IconBtn>
                      <IconBtn danger onClick={() => del(`/about/core-values/${v._id}`)}><Trash2 size={13}/></IconBtn>
                    </div>
                  </div>
                ))}
             </div>
           </div>
        )}
      </motion.div>
    </AnimatePresence>
  </div>
);

const AdmissionTab = ({ admSub, setAdmSub, courses, openModal, setCourseForm, del, admissionSteps, setStepForm, admissionRules, setRuleForm, bonds, setBondForm, guidelines, setGuidelineForm }) => (
  <div className="space-y-6">
    <SubTabs tabs={["Courses","Procedure","Eligibility","Guidelines"]} active={admSub} onChange={setAdmSub}/>
    
    {admSub === "Courses" && (
      <div className="space-y-6">
        <SectionHeader icon={GraduationCap} title="Program Offerings" subtitle={`${courses.length} courses listed`}
          action={<AddBtn onClick={() => { setCourseForm({category:"Undergraduate Programs",name:"",duration:"",seats:"",eligibility:"",description:"",icon:"👨‍⚕️",highlights:"",fees:"",admission:"",websiteLink:""}); openModal("course"); }} label="Add Course"/>}/>
        <div className="grid grid-cols-1 gap-3">
          {courses.map(c => <RowItem key={c._id} icon={c.icon} badge={c.category} title={c.name} sub={`${c.duration} | ${c.seats} Seats`}
            onEdit={() => { setCourseForm({...c,highlights:c.highlights?.join(", ")||""}); openModal("course",c); }} onDelete={() => del(`/courses/${c._id}`)}/>)}
        </div>
      </div>
    )}

    {admSub === "Procedure" && (
      <div className="space-y-6">
        <SectionHeader icon={Layers} title="Admission Steps" subtitle="Step-by-step guidance for applicants"
          action={<AddBtn onClick={() => { setStepForm({step:1,title:"",description:"",details:"",icon:"Calendar"}); openModal("step"); }} label="Add Step"/>}/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {admissionSteps.sort((a,b)=>a.step-b.step).map(s => (
            <div key={s._id} className="p-5 rounded-3xl group relative shadow-sm hover:shadow-md transition-all" style={{ background: C.surface, border:`1px solid ${C.border}` }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-md" style={{ background: C.brand }}>{s.step}</div>
                <div className="min-w-0">
                  <p className="font-bold text-sm truncate" style={{ color: C.text }}>{s.title}</p>
                  <p className="text-xs line-clamp-1" style={{ color: C.muted }}>{s.description}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <IconBtn onClick={() => { setStepForm({...s}); openModal("step",s); }}><Edit3 size={13}/></IconBtn>
                <IconBtn danger onClick={() => del(`/admission-steps/${s._id}`)}><Trash2 size={13}/></IconBtn>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {admSub === "Eligibility" && (
      <div className="space-y-6">
        <SectionHeader icon={AlertCircle} title="Admission Rules" subtitle="Criteria for selection"
          action={<AddBtn onClick={() => { setRuleForm({category:"UnderGraduated Programs",title:"",description:"",icon:"CheckCircle"}); openModal("rule"); }} label="Add Rule"/>}/>
        {["UnderGraduated Programs","PostGraduated Programs","General Rules"].map(cat => {
          const items = admissionRules.filter(r=>r.category===cat);
          if (!items.length) return null;
          return (
            <div key={cat} className="space-y-3">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] px-2" style={{ color: C.muted }}>{cat}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map(r => <RowItem key={r._id} icon={r.icon === "CheckCircle" ? "✅" : "📋"} title={r.title} sub={r.description?.slice(0,60)+"..."}
                  onEdit={() => { setRuleForm({...r}); openModal("rule",r); }} onDelete={() => del(`/admission-rules/${r._id}`)}/>)}
              </div>
            </div>
          );
        })}
      </div>
    )}



    {admSub === "Guidelines" && (
      <div className="space-y-6">
        <SectionHeader icon={Info} title="Guidelines & Conduct" subtitle="Rules for students and guardians"
          action={<AddBtn onClick={() => { setGuidelineForm({category:"General Guidelines",subCategory:"",points:"",order:0}); openModal("guideline"); }} label="Add Section"/>}/>
        {["General Guidelines","Code of Conduct","Academic Requirements","For Parents/Guardians","Contact Information"].map(cat => {
          const items = guidelines.filter(g=>g.category===cat);
          if (!items.length) return null;
          return (
            <div key={cat} className="rounded-3xl overflow-hidden shadow-sm border" style={{ borderColor: C.border }}>
              <div className="px-6 py-3.5 border-b" style={{ background: C.bg, borderColor: C.border }}>
                <p className="font-bold text-xs uppercase tracking-widest" style={{ color: C.text }}>{cat}</p>
              </div>
              <div className="divide-y divide-gray-100" style={{ background: C.surface }}>
                {items.map(g => (
                  <div key={g._id} className="flex items-start gap-5 p-5 group transition-all hover:bg-gray-50/50">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm mb-2" style={{ color: C.text }}>{g.subCategory}</p>
                      <ul className="space-y-1.5">
                        {g.points.map((p,i) => <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: C.muted }}><span className="mt-1.5 w-1 h-1 rounded-full bg-amber-500 shrink-0"/>{p}</li>)}
                      </ul>
                    </div>
                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <IconBtn onClick={() => { setGuidelineForm({...g,points:g.points.join("\n")}); openModal("guideline",g); }}><Edit3 size={14}/></IconBtn>
                      <IconBtn danger onClick={() => del(`/guidelines/${g._id}`)}><Trash2 size={14}/></IconBtn>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

const DepartmentsTab = ({ selectedDept, setSelectedDept, departments, deptForm, setDeptForm, deptSub, setDeptSub, deptFacultyForm, setDeptFacultyForm, deptFacilityInput, setDeptFacilityInput, deptActivityInput, setDeptActivityInput, sliders, axiosInstance, fetchData, notify, openModal, del, handleSliderUpload }) => {
  const [editingFacultyIdx, setEditingFacultyIdx] = useState(null);
  const [editingFacilityIdx, setEditingFacilityIdx] = useState(null);
  const [editingActivityIdx, setEditingActivityIdx] = useState(null);

  if (!selectedDept) return (
    <div className="space-y-6">
      <SectionHeader icon={Building2} title="Academic Departments" subtitle={`Managing ${departments.length} nursing specialties`}
        action={<AddBtn onClick={() => { setDeptForm({name:"",slug:"",category:"Nursing Department",description:"",overview:"",overview2:"",faculty:[],facilities:[],activities:[],logo:null}); openModal("department"); }} label="New Department"/>}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map(d => (
          <motion.div key={d._id} whileHover={{ y:-4 }}
            className="p-6 rounded-3xl group transition-all relative overflow-hidden"
            style={{ background: C.surface, border:`1px solid ${C.border}` }}>
            <div className={`absolute top-0 right-0 w-20 h-20 bg-amber-500 opacity-[0.02] rounded-bl-[80px] group-hover:opacity-[0.06] transition-all`}/>
            {/* Edit / Delete row */}
            <div className="flex justify-end gap-1.5 mb-3">
              <IconBtn onClick={e => { e.stopPropagation(); setDeptForm({...d, logo: null}); openModal("department", d); }}>
                <Edit3 size={14}/>
              </IconBtn>
              <IconBtn danger onClick={e => { e.stopPropagation(); del(`/departments/${d._id}`); }}>
                <Trash2 size={14}/>
              </IconBtn>
            </div>
            {/* Card body — click to open detail editor */}
            <div className="cursor-pointer" onClick={() => { setSelectedDept(d); setDeptForm({...d}); setDeptSub("Overview"); }}>
              <div className="flex items-center gap-4 mb-5">
                {d.logoUrl ? (
                  <img src={imgUrl(d.logoUrl)} className="w-12 h-12 rounded-xl object-cover shrink-0 border shadow-sm group-hover:scale-105 transition-transform duration-300" alt=""/>
                ) : (
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: C.accentSoft }}>🏥</div>
                )}
                <div className="min-w-0">
                  <p className="font-bold text-sm truncate leading-tight mb-1" style={{ color: C.text }}>{d.name}</p>
                  <Pill color={C.brand}>{d.category}</Pill>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider" style={{ color: C.muted }}>
                <div className="flex gap-3">
                  <span>{d.faculty?.length||0} Staff</span>
                  <span>{d.facilities?.length||0} Labs</span>
                </div>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" style={{ color: C.accent }}/>
              </div>
            </div>
          </motion.div>
        ))}
        {departments.length===0 && <div className="col-span-full"><EmptyState icon={Building2} text="No departments found"/></div>}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 p-6 rounded-3xl shadow-sm border overflow-hidden"
           style={{ background: C.surface, borderColor: C.border }}>
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <button onClick={() => { setSelectedDept(null); setEditingFacultyIdx(null); setEditingFacilityIdx(null); setEditingActivityIdx(null); }} className="p-3 rounded-2xl hover:bg-gray-50 transition-all shrink-0 border shadow-sm group" style={{ borderColor: C.border, color: C.muted }}>
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/>
          </button>
          {deptForm.logoUrl || selectedDept.logoUrl ? (
            <img src={imgUrl(deptForm.logoUrl || selectedDept.logoUrl)} className="w-12 h-12 rounded-xl object-cover shrink-0 border shadow-sm" alt=""/>
          ) : (
            <span className="text-3xl shrink-0 drop-shadow-sm">🏥</span>
          )}
          <div className="min-w-0 flex-1">
            <p className="font-bold text-base sm:text-xl whitespace-nowrap overflow-hidden text-ellipsis leading-tight" style={{ color: C.text }}>{selectedDept.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]" style={{ color: C.accent }}>{selectedDept.category}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"/>
              <span className="text-[11px] font-bold text-muted-foreground">Editor Mode</span>
            </div>
          </div>
        </div>
        <button
          onClick={async () => {
            try {
              const fd = new FormData();
              fd.append("name", deptForm.name || "");
              fd.append("category", deptForm.category || "");
              fd.append("description", deptForm.description || "");
              fd.append("overview", deptForm.overview || "");
              fd.append("overview2", deptForm.overview2 || "");
              if (deptForm.faculty) fd.append("faculty", JSON.stringify(deptForm.faculty));
              if (deptForm.facilities) fd.append("facilities", JSON.stringify(deptForm.facilities));
              if (deptForm.activities) fd.append("activities", JSON.stringify(deptForm.activities));
              if (deptForm.logo instanceof File) {
                fd.append("logo", deptForm.logo);
              }
              await axiosInstance.put(`/departments/${selectedDept._id}`, fd);
              notify("Department Updated Successfully");
              fetchData();
            } catch { notify("Failed to save changes","error"); }
          }}
          className="w-full lg:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold text-white shadow-xl hover:opacity-90 active:scale-95 transition-all"
          style={{ background: C.brand }}>
          <Save size={18}/> Save All Changes
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <SubTabs tabs={["Overview","Faculty","Facilities","Activities","Sliders"]} active={deptSub} onChange={setDeptSub}/>

        <div className="p-7 rounded-3xl shadow-sm border" style={{ background: C.surface, borderColor: C.border }}>
          {deptSub === "Overview" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
                <Field label="Department Display Name"><input value={deptForm.name} onChange={e=>setDeptForm({...deptForm,name:e.target.value})} className={inputCls} style={inputStyle}/></Field>
                <Field label="Academic Category"><input value={deptForm.category} onChange={e=>setDeptForm({...deptForm,category:e.target.value})} className={inputCls} style={inputStyle}/></Field>
                <Field label="Department Logo">
                  <div className="flex items-center gap-3">
                    {deptForm.logo instanceof File ? (
                      <img src={URL.createObjectURL(deptForm.logo)} className="h-12 w-12 object-cover rounded-xl border" alt="preview"/>
                    ) : deptForm.logoUrl || selectedDept.logoUrl ? (
                      <img src={imgUrl(deptForm.logoUrl || selectedDept.logoUrl)} className="h-12 w-12 object-cover rounded-xl border" alt="current logo"/>
                    ) : (
                      <div className="h-12 w-12 rounded-xl flex items-center justify-center text-xl bg-gray-100">🏥</div>
                    )}
                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border bg-white cursor-pointer hover:bg-gray-50 transition text-sm text-gray-500" style={{ borderColor: "#E2E8F0" }}>
                      <ImageIcon size={16}/>
                      {deptForm.logo instanceof File ? "Change Logo" : "Upload Image"}
                      <input type="file" accept="image/*" className="hidden" onChange={e => setDeptForm({...deptForm, logo: e.target.files[0]})}/>
                    </label>
                  </div>
                </Field>
              </div>
              <Field label="Short Introduction"><input value={deptForm.description} onChange={e=>setDeptForm({...deptForm,description:e.target.value})} className={inputCls} style={inputStyle}/></Field>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <Field label="Primary Overview Paragraph"><textarea rows={5} value={deptForm.overview} onChange={e=>setDeptForm({...deptForm,overview:e.target.value})} className={`${inputCls} resize-none`} style={inputStyle}/></Field>
                <Field label="Secondary Details (Optional)"><textarea rows={5} value={deptForm.overview2} onChange={e=>setDeptForm({...deptForm,overview2:e.target.value})} className={`${inputCls} resize-none`} style={inputStyle}/></Field>
              </div>
            </div>
          )}

          {deptSub === "Faculty" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-5 rounded-2xl shadow-inner border border-dashed" style={{ background: C.bg, borderColor: C.border }}>
                {["name","designation","qualification"].map(k => (
                  <input key={k} placeholder={k.charAt(0).toUpperCase()+k.slice(1)} value={deptFacultyForm[k] || ""}
                    onChange={e=>setDeptFacultyForm({...deptFacultyForm,[k]:e.target.value})}
                    className={inputCls} style={inputStyle}/>
                ))}
                <div className="flex gap-2">
                  <button onClick={() => {
                    if(!deptFacultyForm.name) return;
                    if (editingFacultyIdx !== null) {
                      const updated = [...deptForm.faculty];
                      updated[editingFacultyIdx] = deptFacultyForm;
                      setDeptForm({...deptForm, faculty: updated});
                      setEditingFacultyIdx(null);
                    } else {
                      setDeptForm({...deptForm, faculty:[...deptForm.faculty, deptFacultyForm]});
                    }
                    setDeptFacultyForm({name:"",designation:"",qualification:"",specialization:""});
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-white shadow hover:opacity-90 active:scale-95 transition-all" style={{ background: C.brand }}>
                    {editingFacultyIdx !== null ? "Update Staff" : "Add Staff"}
                  </button>
                  {editingFacultyIdx !== null && (
                    <button onClick={() => { setEditingFacultyIdx(null); setDeptFacultyForm({name:"",designation:"",qualification:"",specialization:""}); }}
                      className="px-3 py-2.5 rounded-xl text-xs font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deptForm.faculty.map((f,i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-2xl shadow-sm border group hover:border-amber-300 transition-all ${editingFacultyIdx === i ? 'ring-2 ring-amber-500 bg-amber-50/30' : ''}`} style={{ background: C.bg, borderColor: C.border }}>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm truncate" style={{ color: C.text }}>{f.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-[10px] font-bold uppercase text-amber-600">{f.designation}</p>
                        <span className="w-1 h-1 rounded-full bg-gray-300"/>
                        <p className="text-[10px] font-medium text-gray-500 truncate">{f.qualification}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 ml-2">
                      <IconBtn onClick={() => { setEditingFacultyIdx(i); setDeptFacultyForm({ name: f.name || "", designation: f.designation || "", qualification: f.qualification || "", specialization: f.specialization || "" }); }}>
                        <Edit3 size={15}/>
                      </IconBtn>
                      <IconBtn danger onClick={() => {
                        setDeptForm({...deptForm, faculty: deptForm.faculty.filter((_,idx)=>idx!==i)});
                        if (editingFacultyIdx === i) { setEditingFacultyIdx(null); setDeptFacultyForm({name:"",designation:"",qualification:"",specialization:""}); }
                      }}>
                        <Trash2 size={15}/>
                      </IconBtn>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(deptSub === "Facilities" || deptSub === "Activities") && (() => {
            const key = deptSub === "Facilities" ? "facilities" : "activities";
            const input = deptSub === "Facilities" ? deptFacilityInput : deptActivityInput;
            const setInput = deptSub === "Facilities" ? setDeptFacilityInput : setDeptActivityInput;
            const editingIdx = deptSub === "Facilities" ? editingFacilityIdx : editingActivityIdx;
            const setEditingIdx = deptSub === "Facilities" ? setEditingFacilityIdx : setEditingActivityIdx;

            const savePoint = () => {
              if(!input.trim()) return;
              if (editingIdx !== null) {
                const updated = [...deptForm[key]];
                updated[editingIdx] = input.trim();
                setDeptForm({...deptForm, [key]: updated});
                setEditingIdx(null);
              } else {
                setDeptForm({...deptForm, [key]: [...deptForm[key], input.trim()]});
              }
              setInput("");
            };

            return (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex gap-3">
                  <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&savePoint()}
                    placeholder={editingIdx !== null ? `Edit ${deptSub.toLowerCase()} point...` : `Describe new ${deptSub.toLowerCase()} point...`} className={`${inputCls} flex-1 shadow-sm`} style={inputStyle}/>
                  <button onClick={savePoint} className="px-6 py-2.5 rounded-xl font-bold text-white shadow-lg hover:opacity-90 active:scale-95 transition-all shrink-0" style={{ background: C.brand }}>
                    {editingIdx !== null ? "Update Point" : <Plus size={20}/>}
                  </button>
                  {editingIdx !== null && (
                    <button onClick={() => { setEditingIdx(null); setInput(""); }} className="px-4 py-2.5 rounded-xl font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition shrink-0 text-xs">
                      Cancel
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {deptForm[key].map((item,i) => (
                    <div key={i} className={`flex items-center justify-between p-4 rounded-2xl group transition-all border shadow-sm ${editingIdx === i ? 'ring-2 ring-amber-500 bg-amber-50/30' : 'hover:bg-gray-50'}`} style={{ background: C.bg, borderColor: C.border }}>
                      <div className="flex items-center gap-3 flex-1 min-w-0 pr-3">
                        <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0">
                          <span className="text-[10px] font-bold" style={{ color: C.accent }}>{i+1}</span>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: C.text }}>{item}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <IconBtn onClick={() => { setEditingIdx(i); setInput(item); }}>
                          <Edit3 size={14}/>
                        </IconBtn>
                        <IconBtn danger onClick={() => {
                          setDeptForm({...deptForm, [key]: deptForm[key].filter((_,idx)=>idx!==i)});
                          if (editingIdx === i) { setEditingIdx(null); setInput(""); }
                        }}>
                          <Trash2 size={14}/>
                        </IconBtn>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {deptSub === "Sliders" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl shadow-inner border border-dashed" style={{ background: C.bg, borderColor: C.border }}>
                <div>
                  <p className="font-bold text-sm" style={{ color: C.text }}>Department Hero Sliders</p>
                  <p className="text-[11px] font-medium mt-0.5" style={{ color: C.muted }}>High-resolution images for the department landing page</p>
                </div>
                <label className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white cursor-pointer shadow-lg active:scale-95 transition-all" style={{ background: C.brand }}>
                  <Upload size={16}/> Bulk Upload
                  <input type="file" className="hidden" onChange={e => { if(e.target.files[0]) handleSliderUpload(e, selectedDept._id); }}/>
                </label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {sliders.filter(s=>s.department?._id===selectedDept._id).map(s => (
                  <div key={s._id} className="group relative aspect-video rounded-2xl overflow-hidden shadow-md transition-all hover:shadow-xl" style={{ border:`2px solid ${C.border}` }}>
                    <img src={imgUrl(s.imageUrl)} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                      <button onClick={() => del(`/sliders/${s._id}`)} className="p-3 bg-red-500 text-white rounded-2xl shadow-xl hover:bg-red-600 transform transition-transform group-hover:scale-110"><Trash2 size={18}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const GalleryForm = ({ editItem, formState, setFormState, closeModal, fetchData, notify, axiosInstance }) => (
  <form onSubmit={async e => { 
    e.preventDefault(); 
    if (!editItem && !formState.media) {
      return notify(`Please select a ${formState.mediaType === 'video' ? 'video' : 'image'}`, "error");
    }
    const fd = new FormData(); 
    if(formState.media instanceof File) fd.append("image", formState.media); 
    fd.append("title", formState.title || "");
    fd.append("description", formState.description || "");
    fd.append("category", formState.category || "college_campus_view");
    fd.append("mediaType", formState.mediaType || "image");
    
    const url = editItem ? `/gallery/${editItem._id}` : "/gallery"; 
    try {
      if(editItem) await axiosInstance.put(url, fd); 
      else await axiosInstance.post(url, fd); 
      notify(editItem ? "Updated" : "Created"); closeModal(); fetchData();
    } catch (error) { 
      const errMsg = error.response?.data?.message || "Failed to save gallery item";
      notify(errMsg, "error"); 
    }
  }} className="space-y-5">

    {/* Media Type Toggle */}
    <div className="flex gap-1 p-1 rounded-2xl" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
      {['image', 'video'].map(type => (
        <button
          key={type}
          type="button"
          onClick={() => setFormState({ ...formState, mediaType: type, media: null })}
          className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all capitalize flex items-center justify-center gap-2"
          style={{
            background: formState.mediaType === type ? C.surface : 'transparent',
            color: formState.mediaType === type ? C.text : C.muted,
            boxShadow: formState.mediaType === type ? '0 1px 6px rgba(0,0,0,0.08)' : 'none',
          }}
        >
          {type === 'image' ? <ImageIcon size={15}/> : <span style={{fontSize:'15px'}}>🎬</span>}
          {type === 'image' ? 'Image' : 'Video'}
        </button>
      ))}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Title" required><FInput required value={formState.title} onChange={e=>setFormState({...formState,title:e.target.value})} placeholder="e.g. Main Academic Building"/></Field>
      <Field label="Category">
        <FSelect value={formState.category} onChange={e=>setFormState({...formState,category:e.target.value})}>
          <option value="college_campus_view">College Campus View</option>
          <option value="college_highlight">College Highlight</option>
          <option value="hospital">Hospital Main/Additional Images</option>
          <option value="hospital_facility">Hospital Facility &amp; Department</option>
          <option value="event">Main/Additional Event Images</option>
          <option value="event_academic">Academic Events</option>
          <option value="event_cultural">Cultural Events</option>
          <option value="event_sports">Sports Events</option>
          <option value="event_community">Community Service Events</option>
        </FSelect>
      </Field>
    </div>
    <Field label="Description"><FTextarea rows={3} value={formState.description} onChange={e=>setFormState({...formState,description:e.target.value})} placeholder="Media description..."/></Field>
    
    {/* File Upload Area */}
    <Field label={formState.mediaType === 'video' ? 'Video File' : 'Image File'}>
      <label className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer hover:bg-gray-50 transition" style={{ borderColor: formState.media ? C.accent : C.border }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: C.accentSoft }}>
          {formState.mediaType === 'video' ? <span>🎬</span> : <ImageIcon size={16} style={{ color: C.accent }}/>}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: formState.media ? C.text : C.muted }}>
            {formState.media && typeof formState.media === 'object' ? formState.media.name : `Select ${formState.mediaType === 'video' ? 'video' : 'image'} file`}
          </p>
          <p className="text-[11px]" style={{ color: C.muted }}>
            {formState.mediaType === 'video' ? 'MP4, WebM, OGG, MOV · Max 100MB' : 'JPG, PNG, WEBP · Max 100MB'}
          </p>
        </div>
        <input 
          type="file" 
          className="hidden" 
          accept={formState.mediaType === 'video' ? 'video/mp4,video/webm,video/ogg,video/quicktime' : 'image/*'}
          onChange={e=>setFormState({...formState, media: e.target.files[0]})} 
        />
      </label>
      {/* Preview */}
      {formState.media && formState.media instanceof File && (
        formState.mediaType === 'video' ? (
          <video src={URL.createObjectURL(formState.media)} controls className="mt-2 w-full rounded-xl border shadow-sm" style={{ maxHeight: '180px' }}/>
        ) : (
          <img src={URL.createObjectURL(formState.media)} className="mt-2 h-20 w-20 object-cover rounded-xl border shadow-sm" alt="preview"/>
        )
      )}
      {!formState.media && editItem && (
        editItem.mediaType === 'video' && editItem.videoUrl ? (
          <video src={imgUrl(editItem.videoUrl)} controls className="mt-2 w-full rounded-xl border shadow-sm" style={{ maxHeight: '150px' }}/>
        ) : editItem.imageUrl ? (
          <img src={imgUrl(editItem.imageUrl)} className="mt-2 h-16 w-16 object-cover rounded-xl border shadow-sm" alt="current"/>
        ) : null
      )}
    </Field>

    <FormActions onCancel={closeModal} submitLabel={editItem ? "Save Changes" : formState.mediaType === 'video' ? 'Upload Video' : 'Create Image'}/>
  </form>
);

const GalleryTab = ({ galleryImages, galleryForm, setGalleryForm, openModal, del }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: C.text }}>Photo &amp; Video Gallery</h2>
        <p className="text-sm mt-1" style={{ color: C.muted }}>Manage all photos and videos in the gallery</p>
      </div>
      <button onClick={() => { setGalleryForm({ title:"", description:"", category:"college_campus_view", mediaType:"image", media:null }); openModal("gallery"); }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition hover:opacity-90 shadow-sm" style={{ background: C.accent, color: "#fff" }}><Plus size={16}/>Add Media</button>
    </div>
    <div className="grid grid-cols-1 gap-3">
      {galleryImages.map(img => (
        <RowItem key={img._id}
          left={<div className="w-16 h-12 rounded-xl overflow-hidden border-2 shrink-0 shadow-sm relative" style={{ borderColor: C.border }}>
            {img.mediaType === 'video' ? (
              <div className="w-full h-full flex items-center justify-center" style={{ background: '#1a1a2e' }}>
                <span style={{ fontSize: '20px' }}>🎬</span>
              </div>
            ) : (
              <img src={imgUrl(img.imageUrl)} className="w-full h-full object-cover" alt=""/>
            )}
          </div>}
          badge={`${img.mediaType === 'video' ? '🎬 VIDEO · ' : ''}${img.category.replace(/_/g, ' ')}`} title={img.title} sub={img.description?.substring(0, 50) + "..."}
          onEdit={() => { setGalleryForm({ ...img, mediaType: img.mediaType || 'image', media: null }); openModal("gallery", img); }}
          onDelete={() => del(`/gallery/${img._id}`)}/>
      ))}
      {galleryImages.length === 0 && <EmptyState icon={ImageIcon} text="No gallery media yet. Add your first photo or video." />}
    </div>
  </div>
);

const InstitutesTab = ({ institutes, openModal, del }) => (
  <div className="space-y-6">
    <SectionHeader icon={Building2} title="Affiliated Institutes" subtitle={`${institutes.length} partners registered`}
      action={<AddBtn onClick={() => openModal("institute")} label="Add Institute"/>}/>
    <div className="grid grid-cols-1 gap-3">
      {institutes.map(inst => (
        <RowItem key={inst._id}
          left={<div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-2xl shadow-sm border border-amber-100">{inst.icon || "🏥"}</div>}
          badge={inst.type} title={inst.name} sub={inst.capacity}
          onEdit={() => openModal("institute", inst)}
          onDelete={() => del(`/institutes/${inst._id}`)}/>
      ))}
      {institutes.length === 0 && <EmptyState icon={Building2} text="No institutes registered yet"/>}
    </div>
  </div>
);

const InstituteForm = ({ editItem, closeModal, fetchData, notify }) => {
  const [form, setForm] = useState({
    name: "", type: "", description: "", description2: "", description3: "",
    established: "", capacity: "", icon: "🏥", order: 0,
    specialties: "", services: "",
    contact: { address: "", phone: "", website: "" }
  });

  useEffect(() => {
    if (editItem) {
      setForm({
        ...editItem,
        order: editItem.order || 0,
        specialties: Array.isArray(editItem.specialties) ? editItem.specialties.join(", ") : "",
        services: Array.isArray(editItem.services) ? editItem.services.join(", ") : "",
        contact: { address: editItem.contact?.address || "", phone: editItem.contact?.phone || "", website: editItem.contact?.website || "" }
      });
    }
  }, [editItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      specialties: form.specialties.split(",").map(s => s.trim()).filter(Boolean),
      services: form.services.split(",").map(s => s.trim()).filter(Boolean)
    };
    try {
      if (editItem) await axiosInstance.put(`/institutes/${editItem._id}`, payload);
      else await axiosInstance.post("/institutes", payload);
      notify(editItem ? "Updated" : "Created");
      closeModal();
      fetchData();
    } catch { notify("Operation failed", "error"); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Institute Name" required><FInput required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="e.g. Government Spine Institute"/></Field>
        <Field label="Type (e.g. Hospital)" required><FInput required value={form.type} onChange={e=>setForm({...form, type:e.target.value})} placeholder="e.g. Educational Institute"/></Field>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Field label="Established"><FInput value={form.established} onChange={e=>setForm({...form, established:e.target.value})} placeholder="e.g. 1980"/></Field>
        <Field label="Capacity"><FInput value={form.capacity} onChange={e=>setForm({...form, capacity:e.target.value})} placeholder="e.g. 80 Beds"/></Field>
        <Field label="Icon Emoji"><FInput value={form.icon} onChange={e=>setForm({...form, icon:e.target.value})}/></Field>
        <Field label="Sort Order"><FInput type="number" required value={form.order} onChange={e=>setForm({...form, order:parseInt(e.target.value)||0})}/></Field>
      </div>
      <Field label="Main Description" required><FTextarea required rows={3} value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Main description..."/></Field>
      <Field label="Additional Description"><FTextarea rows={2} value={form.description2} onChange={e=>setForm({...form, description2:e.target.value})} placeholder="Extra details..."/></Field>
      <Field label="Clinical Areas (comma separated)"><FTextarea rows={2} value={form.specialties} onChange={e=>setForm({...form, specialties:e.target.value})} placeholder="e.g. Orthopedics, Spine Surgery"/></Field>
      <Field label="Key Services (comma separated)"><FTextarea rows={2} value={form.services} onChange={e=>setForm({...form, services:e.target.value})} placeholder="e.g. Emergency, OPD, ICU"/></Field>
      
      <FormSection title="Contact Details">
        <div className="p-4 rounded-2xl bg-white space-y-4 border border-gray-200">
          <Field label="Address"><FInput value={form.contact.address} onChange={e=>setForm({...form, contact:{...form.contact, address:e.target.value}})} placeholder="Institute address..."/></Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Phone"><FInput value={form.contact.phone} onChange={e=>setForm({...form, contact:{...form.contact, phone:e.target.value}})} placeholder="Contact number..."/></Field>
            <Field label="Website"><FInput value={form.contact.website} onChange={e=>setForm({...form, contact:{...form.contact, website:e.target.value}})} placeholder="https://..."/></Field>
          </div>
        </div>
      </FormSection>

      <FormActions onCancel={closeModal} submitLabel={editItem ? "Save Changes" : "Create Institute"}/>
    </form>
  );
};

const KeyPersonForm = ({ editItem, keyPersonForm, setKeyPersonForm, closeModal, fetchData, notify, axiosInstance }) => (
  <form onSubmit={async e => { 
    e.preventDefault(); 
    const url=editItem?`/contact/key-persons/${editItem._id}`:"/contact/key-persons"; 
    const payload = {...keyPersonForm, responsibilities: typeof keyPersonForm.responsibilities==="string"?keyPersonForm.responsibilities.split("\n").filter(Boolean):keyPersonForm.responsibilities};
    try{
      if(editItem) await axiosInstance.put(url,payload); 
      else await axiosInstance.post(url,payload); 
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Name" required><FInput required value={keyPersonForm.name} onChange={e=>setKeyPersonForm({...keyPersonForm,name:e.target.value})} placeholder="Full name"/></Field>
      <Field label="Position" required><FInput required value={keyPersonForm.position} onChange={e=>setKeyPersonForm({...keyPersonForm,position:e.target.value})} placeholder="e.g. Principal"/></Field>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Qualification"><FInput value={keyPersonForm.qualification} onChange={e=>setKeyPersonForm({...keyPersonForm,qualification:e.target.value})} placeholder="e.g. M.Sc. Nursing, Ph.D."/></Field>
      <Field label="Phone"><FInput value={keyPersonForm.phone} onChange={e=>setKeyPersonForm({...keyPersonForm,phone:e.target.value})} placeholder="Phone number"/></Field>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Email"><FInput value={keyPersonForm.email} onChange={e=>setKeyPersonForm({...keyPersonForm,email:e.target.value})} placeholder="Email address"/></Field>
      <Field label="Office Hours"><FInput value={keyPersonForm.hours} onChange={e=>setKeyPersonForm({...keyPersonForm,hours:e.target.value})} placeholder="e.g. 9:00 AM - 5:00 PM"/></Field>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Icon Emoji"><FInput value={keyPersonForm.icon} onChange={e=>setKeyPersonForm({...keyPersonForm,icon:e.target.value})}/></Field>
      <Field label="Gradient Color" hint="e.g. from-blue-500 to-blue-600"><FInput value={keyPersonForm.color} onChange={e=>setKeyPersonForm({...keyPersonForm,color:e.target.value})}/></Field>
    </div>
    <Field label="Responsibilities (one per line)" required><FTextarea required rows={4} value={keyPersonForm.responsibilities} onChange={e=>setKeyPersonForm({...keyPersonForm,responsibilities:e.target.value})} placeholder="Responsibility 1&#10;Responsibility 2"/></Field>
    <FormActions onCancel={closeModal} submitLabel={editItem ? "Save Changes" : "Add Key Contact"}/>
  </form>
);

const ContactDeptForm = ({ editItem, contactDeptForm, setContactDeptForm, closeModal, fetchData, notify, axiosInstance }) => (
  <form onSubmit={async e => { 
    e.preventDefault(); 
    const url=editItem?`/contact/departments/${editItem._id}`:"/contact/departments"; 
    try{
      if(editItem) await axiosInstance.put(url,contactDeptForm); 
      else await axiosInstance.post(url,contactDeptForm); 
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Department Name" required><FInput required value={contactDeptForm.name} onChange={e=>setContactDeptForm({...contactDeptForm,name:e.target.value})} placeholder="e.g. Admission Office"/></Field>
      <Field label="Icon Emoji"><FInput value={contactDeptForm.icon} onChange={e=>setContactDeptForm({...contactDeptForm,icon:e.target.value})}/></Field>
    </div>
    <Field label="Phone"><FInput value={contactDeptForm.phone} onChange={e=>setContactDeptForm({...contactDeptForm,phone:e.target.value})} placeholder="Phone number"/></Field>
    <Field label="Email"><FInput value={contactDeptForm.email} onChange={e=>setContactDeptForm({...contactDeptForm,email:e.target.value})} placeholder="Email address"/></Field>
    <FormActions onCancel={closeModal} submitLabel={editItem ? "Save Changes" : "Add Department Contact"}/>
  </form>
);

const ContactTab = ({ contactSub, setContactSub, keyPersons, setKeyPersonForm, contactDepartments, setContactDeptForm, contactInfo, setContactInfo, openModal, del, notify, axiosInstance }) => (
  <div className="space-y-6">
    <SubTabs tabs={["Key Persons", "Departments", "College Info"]} active={contactSub} onChange={setContactSub}/>
    
    {contactSub === "Key Persons" && (
      <div className="space-y-6">
        <SectionHeader icon={Users} title="Key Administrative Contacts" subtitle="Manage main contacts shown on the contact page"
          action={<AddBtn onClick={() => { setKeyPersonForm({name:"",position:"",qualification:"",phone:"",email:"",hours:"",icon:"👨‍⚕️",color:"from-blue-500 to-blue-600",responsibilities:""}); openModal("keyPerson"); }} label="Add Person"/>}/>
        <div className="grid grid-cols-1 gap-3">
          {keyPersons.map(p => <RowItem key={p._id} icon={p.icon} title={p.name} sub={p.position}
            onEdit={() => { setKeyPersonForm({...p,responsibilities:p.responsibilities?.join("\n")||""}); openModal("keyPerson",p); }} onDelete={() => del(`/contact/key-persons/${p._id}`)}/>)}
        </div>
      </div>
    )}

    {contactSub === "Departments" && (
      <div className="space-y-6">
        <SectionHeader icon={Building2} title="Department Contact Directory" subtitle="Manage specific departments on the contact page"
          action={<AddBtn onClick={() => { setContactDeptForm({name:"",phone:"",email:"",icon:"📚"}); openModal("contactDept"); }} label="Add Department"/>}/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactDepartments.map(d => (
            <RowItem key={d._id} icon={d.icon} title={d.name} sub={d.phone + " | " + d.email}
              onEdit={() => { setContactDeptForm({...d}); openModal("contactDept",d); }} onDelete={() => del(`/contact/departments/${d._id}`)}/>
          ))}
        </div>
      </div>
    )}

    {contactSub === "College Info" && (
      <div className="space-y-6">
        <SectionHeader icon={MapPin} title="College Contact Information" subtitle="Address, phone, and general emails"/>
        <div className="p-6 rounded-2xl space-y-4 shadow-sm" style={{ background: C.surface, border:`1px solid ${C.border}` }}>
          <Field label="College Address"><textarea required rows={4} value={contactInfo.address||""} onChange={e=>setContactInfo({...contactInfo,address:e.target.value})} className={`${inputCls} resize-none`} style={inputStyle}/></Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Reception Phone"><input value={contactInfo.receptionPhone||""} onChange={e=>setContactInfo({...contactInfo,receptionPhone:e.target.value})} className={inputCls} style={inputStyle}/></Field>
            <Field label="Ambulance Phone"><input value={contactInfo.ambulancePhone||""} onChange={e=>setContactInfo({...contactInfo,ambulancePhone:e.target.value})} className={inputCls} style={inputStyle}/></Field>
          </div>
          <Field label="General Email"><input value={contactInfo.generalEmail||""} onChange={e=>setContactInfo({...contactInfo,generalEmail:e.target.value})} className={inputCls} style={inputStyle}/></Field>
          <button onClick={async () => { try { await axiosInstance.put("/contact/info", contactInfo); notify("Contact Info Saved"); } catch { notify("Failed to save","error"); }}}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:opacity-90" style={{ background: C.brand }}>
            Save College Info
          </button>
        </div>
      </div>
    )}
  </div>
);

const SectionControlTab = ({ notify }) => {
  const { sectionsList, loading, toggleSection, togglePageSections } = useSectionVisibility();
  const [selectedPage, setSelectedPage] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const pages = ["All", "Home Page", "About Us", "Admission", "Departments", "Gallery", "Institutes", "Contact Us"];

  const filteredSections = sectionsList.filter(s => {
    const matchesPage = selectedPage === "All" || s.page === selectedPage;
    const matchesSearch = (s.sectionName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (s.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (s.sectionKey || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPage && matchesSearch;
  });

  const grouped = filteredSections.reduce((acc, sec) => {
    acc[sec.page] = acc[sec.page] || [];
    acc[sec.page].push(sec);
    return acc;
  }, {});

  const totalSections = sectionsList.length;
  const activeSections = sectionsList.filter(s => s.isVisible !== false).length;
  const hiddenSections = totalSections - activeSections;

  return (
    <div className="space-y-6">
      {/* Top Header Banner matching Ginera Brand Colors */}
      <div className="p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden"
           style={{ background: "linear-gradient(135deg, #4A2B13 0%, #6B3F1D 50%, #8B4A26 100%)" }}>
        {/* Glow ambient background */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-amber-400/30 backdrop-blur-md">
                <Sliders size={14} /> Site Content Manager
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Section Visibility Control</h2>
            <p className="text-amber-100/80 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              Turn any website section ON (visible) or OFF (hidden) in real-time. Changes sync instantly across public pages.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-5 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center min-w-[95px] shadow-sm">
              <p className="text-2xl sm:text-3xl font-black text-emerald-400">{activeSections}</p>
              <p className="text-[10px] text-amber-200 uppercase font-bold tracking-wider mt-0.5">ON (Visible)</p>
            </div>
            <div className="px-5 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center min-w-[95px] shadow-sm">
              <p className="text-2xl sm:text-3xl font-black text-rose-300">{hiddenSections}</p>
              <p className="text-[10px] text-amber-200 uppercase font-bold tracking-wider mt-0.5">OFF (Hidden)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar & Search Box */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {pages.map(page => {
            const active = selectedPage === page;
            return (
              <button
                key={page}
                onClick={() => setSelectedPage(page)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  active
                    ? "text-white shadow-md scale-[1.02]"
                    : "bg-white text-gray-700 hover:bg-amber-50/60 border border-gray-200 hover:border-amber-300"
                }`}
                style={active ? { background: "linear-gradient(135deg, #6B3F1D 0%, #E07B39 100%)" } : {}}
              >
                {page}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-80 shrink-0">
          <input
            type="text"
            placeholder="Search section name or key..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-medium focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none shadow-xs transition-all placeholder:text-gray-400"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-amber-800/60" />
        </div>
      </div>

      {/* Sections List */}
      {loading ? (
        <div className="py-16 text-center text-gray-400 font-semibold text-sm">Loading visibility settings...</div>
      ) : Object.keys(grouped).length === 0 ? (
        <EmptyState icon={EyeOff} text="No sections found matching filter search." />
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([pageName, secs]) => {
            return (
              <div key={pageName} className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E8E0D8] shadow-sm space-y-4">
                {/* Page Group Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow-md"
                         style={{ background: "linear-gradient(135deg, #6B3F1D, #E07B39)" }}>
                      <Layers size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{pageName}</h3>
                      <p className="text-xs text-gray-400 font-medium">{secs.length} Sections configured</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={async () => {
                        try {
                          await togglePageSections(pageName, true);
                          notify(`Turned ALL sections ON for ${pageName}`);
                        } catch {
                          notify("Update failed", "error");
                        }
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-all border border-emerald-200 shadow-2xs flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={14} /> Turn All ON
                    </button>

                    <button
                      onClick={async () => {
                        try {
                          await togglePageSections(pageName, false);
                          notify(`Turned ALL sections OFF for ${pageName}`);
                        } catch {
                          notify("Update failed", "error");
                        }
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 transition-all border border-rose-200 shadow-2xs flex items-center gap-1.5"
                    >
                      <X size={14} /> Turn All OFF
                    </button>
                  </div>
                </div>

                {/* Section Toggle Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {secs.map(sec => {
                    const isVisible = sec.isVisible !== false;

                    return (
                      <div
                        key={sec.sectionKey}
                        className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                          isVisible
                            ? "bg-gradient-to-r from-emerald-50/40 to-emerald-50/10 border-emerald-300/70 shadow-2xs hover:shadow-xs"
                            : "bg-gray-50/80 border-gray-200/80 opacity-75"
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              isVisible ? "bg-emerald-100 text-emerald-800 border border-emerald-300/50" : "bg-rose-100 text-rose-800 border border-rose-300/50"
                            }`}>
                              {isVisible ? "VISIBLE (ON)" : "HIDDEN (OFF)"}
                            </span>
                            <span className="text-[10px] font-mono text-amber-950/50 truncate bg-amber-50/60 px-1.5 py-0.5 rounded-md border border-amber-200/40">{sec.sectionKey}</span>
                          </div>

                          <h4 className="font-bold text-sm text-gray-900 truncate">{sec.sectionName}</h4>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{sec.description}</p>
                        </div>

                        <button
                          onClick={async () => {
                            try {
                              await toggleSection(sec.sectionKey, !isVisible);
                              notify(`${sec.sectionName} is now ${!isVisible ? "ON (Visible)" : "OFF (Hidden)"}`);
                            } catch {
                              notify("Update failed", "error");
                            }
                          }}
                          className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            isVisible ? "bg-[#E07B39]" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out flex items-center justify-center ${
                              isVisible ? "translate-x-6" : "translate-x-0"
                            }`}
                          >
                            {isVisible ? (
                              <CheckCircle2 size={15} className="text-emerald-600" />
                            ) : (
                              <X size={15} className="text-gray-400" />
                            )}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const AdminPanel = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("Home Page");
  const [aboutSub, setAboutSub] = useState("Branding");
  const [admSub, setAdmSub] = useState("Courses");
  const [deptSub, setDeptSub] = useState("Overview");
  const [contactSub, setContactSub] = useState("Key Persons");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDeptForSlider, setSelectedDeptForSlider] = useState("null");
  const [selectedDept, setSelectedDept] = useState(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editItem, setEditItem] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Data
  const [sliders, setSliders] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [academicContent, setAcademicContent] = useState({ title: "", description1: "", description2: "" });
  const [milestones, setMilestones] = useState([]);
  const [deanMessage, setDeanMessage] = useState({ name:"",title:"",greeting:"",paragraphs:[],highlight:"",photoUrl:"",stats:[] });
  const [collegeLogo, setCollegeLogo] = useState({ logoUrl:"",collegeName:"",tagline:"" });
  const [aboutImages, setAboutImages] = useState([]);
  const [historyContent, setHistoryContent] = useState({ heroTitle: "Our History", timelineTitle: "Institutional Timeline", timelineParagraphs: [], legacyTitle: "Legacy of Excellence", legacyParagraphs: [] });
  const [visionMission, setVisionMission] = useState([]);
  const [coreValues, setCoreValues] = useState([]);
  const [courses, setCourses] = useState([]);
  const [admissionSteps, setAdmissionSteps] = useState([]);
  const [admissionRules, setAdmissionRules] = useState([]);
  const [bonds, setBonds] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [keyPersons, setKeyPersons] = useState([]);
  const [contactDepartments, setContactDepartments] = useState([]);
  const [contactInfo, setContactInfo] = useState({ address: "", receptionPhone: "", ambulancePhone: "", generalEmail: "" });

  // Form States
  const [programForm, setProgramForm] = useState({ title:"",description:"",duration:"",category:"Undergraduate",courses:"",image:null });
  const [testimonialForm, setTestimonialForm] = useState({ name:"",role:"",content:"",rating:5,image:null });
  const [milestoneForm, setMilestoneForm] = useState({ year:"",event:"",icon:"🎯",color:"#1e3a8a",description:"",order:0 });
  const [vmForm, setVmForm] = useState({ type:"vision",content:"",order:0 });
  const [cvForm, setCvForm] = useState({ icon:"🌟",title:"",description:"",color:"from-amber-500 to-orange-500",order:0 });
  const [courseForm, setCourseForm] = useState({ category:"Undergraduate Programs",name:"",duration:"",seats:"",eligibility:"",description:"",icon:"👨‍⚕️",highlights:"",fees:"",admission:"",websiteLink:"" });
  const [stepForm, setStepForm] = useState({ step:1,title:"",description:"",details:"",icon:"Calendar" });
  const [ruleForm, setRuleForm] = useState({ category:"UnderGraduated Programs",title:"",description:"",icon:"CheckCircle" });
  const [bondForm, setBondForm] = useState({ type:"student",title:"",content:"",order:0 });
  const [guidelineForm, setGuidelineForm] = useState({ category:"General Guidelines",subCategory:"",points:"",order:0 });
  const [deptForm, setDeptForm] = useState({ name:"",slug:"",category:"Nursing Department",description:"",overview:"",overview2:"",faculty:[],facilities:[],activities:[],icon:"🏥" });
  const [deptFacultyForm, setDeptFacultyForm] = useState({ name:"",designation:"",qualification:"",specialization:"" });
  const [deptFacilityInput, setDeptFacilityInput] = useState("");
  const [deptActivityInput, setDeptActivityInput] = useState("");
  const [deanPhotoFile, setDeanPhotoFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [aboutImageFiles, setAboutImageFiles] = useState({});

  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryForm, setGalleryForm] = useState({ title:"", description:"", category:"college_campus_view", image:null });
  const [keyPersonForm, setKeyPersonForm] = useState({ name:"",position:"",qualification:"",phone:"",email:"",hours:"",icon:"👨‍⚕️",color:"from-blue-500 to-blue-600",responsibilities:"" });
  const [contactDeptForm, setContactDeptForm] = useState({ name:"",phone:"",email:"",icon:"📚" });

  const notify = (message, type = "success") => {
    setNote({ message, type });
    setTimeout(() => setNote(null), 3000);
  };

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const r = await Promise.all([
        axiosInstance.get("/programs"),
        axiosInstance.get("/testimonials"),
        axiosInstance.get("/content/academic"),
        axiosInstance.get("/about/milestones"),
        axiosInstance.get("/about/dean"),
        axiosInstance.get("/about/college-logo"),
        axiosInstance.get("/about/images"),
        axiosInstance.get("/about/vision-mission"),
        axiosInstance.get("/about/core-values"),
        axiosInstance.get("/courses"),
        axiosInstance.get("/admission-steps"),
        axiosInstance.get("/admission-rules"),
        axiosInstance.get("/bonds"),
        axiosInstance.get("/guidelines"),
        axiosInstance.get("/departments"),
        axiosInstance.get("/sliders?department=all"),
        axiosInstance.get("/gallery"),
        axiosInstance.get("/institutes"),
        axiosInstance.get("/contact/key-persons"),
        axiosInstance.get("/contact/departments"),
        axiosInstance.get("/contact/info"),
        axiosInstance.get("/about/history-content"),
      ]);
      setPrograms(r[0].data); setTestimonials(r[1].data); setAcademicContent(r[2].data);
      setMilestones(r[3].data); setDeanMessage(r[4].data); setCollegeLogo(r[5].data);
      setAboutImages(r[6].data); setVisionMission(r[7].data); setCoreValues(r[8].data); setCourses(r[9].data);
      setAdmissionSteps(r[10].data); setAdmissionRules(r[11].data); setBonds(r[12].data);
      setGuidelines(r[13].data); setDepartments(r[14].data); setSliders(r[15].data); setGalleryImages(r[16].data);
      setInstitutes(r[17].data); setKeyPersons(r[18].data); setContactDepartments(r[19].data); setContactInfo(r[20].data);
      if (r[21]?.data) setHistoryContent(r[21].data);
    } catch { notify("Error fetching data", "error"); }
    finally { setLoading(false); }
  };

  const del = async (url, refetch = true) => {
    if (!window.confirm("Are you sure?")) return;
    try { await axiosInstance.delete(url); notify("Deleted"); if (refetch) fetchData(); }
    catch { notify("Delete failed", "error"); }
  };

  const handleSliderUpload = async (e, deptOverride) => {
    const files = Array.from(e.target?.files || [e]);
    if (!files.length) return;
    const fd = new FormData();
    files.forEach(f => fd.append("images", f));
    const dept = deptOverride || selectedDeptForSlider;
    if (dept !== "null") fd.append("department", dept);
    try { await axiosInstance.post("/sliders/upload", fd); notify("Uploaded"); fetchData(); }
    catch { notify("Upload failed", "error"); }
  };

  const updateSliderImage = async (id, file) => {
    const fd = new FormData(); fd.append("image", file);
    try { await axiosInstance.put(`/sliders/${id}`, fd); notify("Updated"); fetchData(); }
    catch { notify("Update failed", "error"); }
  };

  const openModal = (type, item = null) => {
    setModalType(type); setEditItem(item); setShowModal(true);
  };
  const closeModal = () => { setShowModal(false); setEditItem(null); };

  const navItems = [
    { name: "Section Control", icon: Sliders },
    { name: "Home Page",    icon: ImageIcon },
    { name: "Academic",     icon: BookOpen },
    { name: "Testimonials", icon: Users },
    { name: "About Us",     icon: Info },
    { name: "Admission",    icon: Layers },
    { name: "Departments",  icon: Building2 },
    { name: "Institutes",   icon: Building2 },
    { name: "Gallery",      icon: ImageIcon },
    { name: "Contact Us",   icon: Phone },
    { name: "Settings",     icon: Settings },
  ];

  const modalMeta = {
    program:      { title: editItem ? "Edit Program"    : "Add Program",    subtitle: "Academic program details" },
    testimonial:  { title: editItem ? "Edit Testimonial": "Add Testimonial",subtitle: "Student review" },
    milestone:    { title: editItem ? "Edit Milestone"  : "Add Milestone",  subtitle: "Timeline entry" },
    visionMission:{ title: editItem ? "Edit Point"      : "Add Point",      subtitle: "Vision or Mission statement" },
    coreValue:    { title: editItem ? "Edit Value"      : "Add Core Value", subtitle: "Institutional value" },
    course:       { title: editItem ? "Edit Course"     : "Add Course",     subtitle: "Admission course" },
    step:         { title: editItem ? "Edit Step"       : "Add Step",       subtitle: "Admission procedure step" },
    rule:         { title: editItem ? "Edit Rule"       : "Add Rule",       subtitle: "Eligibility rule" },
    bond:         { title: editItem ? "Edit Bond"       : "Add Bond Point", subtitle: "Student bond" },
    guideline:    { title: editItem ? "Edit Guidelines" : "Add Guidelines", subtitle: "Student / parent guidance" },
    department:   { title: editItem ? "Edit Dept"       : "Add Department", subtitle: "Create a new department" },
    gallery:      { title: editItem ? "Edit Photo"      : "Add Photo",      subtitle: "Gallery image" },
    institute:    { title: editItem ? "Edit Institute"  : "Add Institute",  subtitle: "Affiliated institute details" },
    keyPerson:    { title: editItem ? "Edit Contact"    : "Add Contact",    subtitle: "Key administrative contact" },
    contactDept:  { title: editItem ? "Edit Dept"       : "Add Dept",       subtitle: "Contact department" },
  }[modalType] || {};

  return (
    <div className="flex flex-1 h-full w-full min-h-0 bg-gray-50 text-gray-900 font-sans overflow-hidden relative items-stretch">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        /* Premium admin scrollbar */
        .admin-scroll::-webkit-scrollbar { width: 8px; }
        .admin-scroll::-webkit-scrollbar-track { background: #F4F1EE; border-radius: 10px; }
        .admin-scroll::-webkit-scrollbar-thumb { background: #C4A882; border-radius: 10px; border: 2px solid #F4F1EE; }
        .admin-scroll::-webkit-scrollbar-thumb:hover { background: #6B3F1D; }
        .admin-scroll { scrollbar-width: thin; scrollbar-color: #C4A882 #F4F1EE; -webkit-overflow-scrolling: touch; }
      `}</style>

      <Toast note={note}/>
      <Sidebar isMobile={isMobile} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} selectedDept={selectedDept} setSelectedDept={setSelectedDept} navItems={navItems} onLogout={onLogout} />
      
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-gray-50">
        <Header setSidebarOpen={setSidebarOpen} selectedDept={selectedDept} activeTab={activeTab}/>
        
        <div className="flex-1 min-h-0 overflow-y-auto admin-scroll p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto pb-24">
            {loading && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <AnimatePresence mode="wait">
                <motion.div key={activeTab + (selectedDept?._id || "")} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }} transition={{ duration:0.25 }}>
                  {activeTab === "Section Control" && <SectionControlTab notify={notify}/>}
                  {activeTab === "Home Page" && <HomeTab selectedDeptForSlider={selectedDeptForSlider} setSelectedDeptForSlider={setSelectedDeptForSlider} departments={departments} sliders={sliders} handleSliderUpload={handleSliderUpload} updateSliderImage={updateSliderImage} del={del}/>}
                  {activeTab === "Academic" && <AcademicTab programs={programs} academicContent={academicContent} setAcademicContent={setAcademicContent} axiosInstance={axiosInstance} notify={notify} openModal={openModal} setProgramForm={setProgramForm} del={del}/>}
                  {activeTab === "Testimonials" && <TestimonialsTab testimonials={testimonials} testimonialForm={testimonialForm} setTestimonialForm={setTestimonialForm} openModal={openModal} del={del}/>}
                  {activeTab === "About Us" && <AboutTab aboutSub={aboutSub} setAboutSub={setAboutSub} collegeLogo={collegeLogo} setCollegeLogo={setCollegeLogo} logoFile={logoFile} setLogoFile={setLogoFile} deanMessage={deanMessage} setDeanMessage={setDeanMessage} deanPhotoFile={deanPhotoFile} setDeanPhotoFile={setDeanPhotoFile} milestones={milestones} milestoneForm={milestoneForm} setMilestoneForm={setMilestoneForm} openModal={openModal} setMilestones={setMilestones} visionMission={visionMission} setVmForm={setVmForm} coreValues={coreValues} setCvForm={setCvForm} aboutImages={aboutImages} setAboutImages={setAboutImages} aboutImageFiles={aboutImageFiles} setAboutImageFiles={setAboutImageFiles} historyContent={historyContent} setHistoryContent={setHistoryContent} axiosInstance={axiosInstance} notify={notify} del={del}/>}
                  {activeTab === "Admission" && <AdmissionTab admSub={admSub} setAdmSub={setAdmSub} courses={courses} openModal={openModal} setCourseForm={setCourseForm} del={del} admissionSteps={admissionSteps} setStepForm={setStepForm} admissionRules={admissionRules} setRuleForm={setRuleForm} bonds={bonds} setBondForm={setBondForm} guidelines={guidelines} setGuidelineForm={setGuidelineForm}/>}
                  {activeTab === "Departments" && <DepartmentsTab selectedDept={selectedDept} setSelectedDept={setSelectedDept} departments={departments} deptForm={deptForm} setDeptForm={setDeptForm} deptSub={deptSub} setDeptSub={setDeptSub} deptFacultyForm={deptFacultyForm} setDeptFacultyForm={setDeptFacultyForm} deptFacilityInput={deptFacilityInput} setDeptFacilityInput={setDeptFacilityInput} deptActivityInput={deptActivityInput} setDeptActivityInput={setDeptActivityInput} sliders={sliders} axiosInstance={axiosInstance} fetchData={fetchData} notify={notify} openModal={openModal} del={del} handleSliderUpload={handleSliderUpload}/>}
                  {activeTab === "Gallery" && <GalleryTab galleryImages={galleryImages} galleryForm={galleryForm} setGalleryForm={setGalleryForm} openModal={openModal} del={del} />}
                  {activeTab === "Institutes" && <InstitutesTab institutes={institutes} openModal={openModal} del={del} />}
                  {activeTab === "Contact Us" && <ContactTab contactSub={contactSub} setContactSub={setContactSub} keyPersons={keyPersons} setKeyPersonForm={setKeyPersonForm} contactDepartments={contactDepartments} setContactDeptForm={setContactDeptForm} contactInfo={contactInfo} setContactInfo={setContactInfo} openModal={openModal} del={del} notify={notify} axiosInstance={axiosInstance} />}
                  {activeTab === "Settings" && (
                    <div className="flex flex-col items-center justify-center py-32 text-center text-slate-400">
                      <Settings size={48} className="mb-4 opacity-30"/>
                      <p className="font-semibold">Settings Console — feature coming soon</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
          </div>
        </div>
      </main>

      <Modal show={showModal} onClose={closeModal} title={modalMeta.title} subtitle={modalMeta.subtitle}>
        {modalType === "program" && <ProgramForm editItem={editItem} programForm={programForm} setProgramForm={setProgramForm} closeModal={closeModal} fetchData={fetchData} notify={notify}/>}
        {modalType === "testimonial" && <TestimonialForm editItem={editItem} testimonialForm={testimonialForm} setTestimonialForm={setTestimonialForm} closeModal={closeModal} fetchData={fetchData} notify={notify}/>}
        {modalType === "milestone" && <MilestoneForm editItem={editItem} milestoneForm={milestoneForm} setMilestoneForm={setMilestoneForm} closeModal={closeModal} fetchData={fetchData} notify={notify}/>}
        {modalType === "visionMission" && <VisionMissionForm editItem={editItem} vmForm={vmForm} setVmForm={setVmForm} closeModal={closeModal} fetchData={fetchData} notify={notify}/>}
        {modalType === "coreValue" && <CoreValueForm editItem={editItem} cvForm={cvForm} setCvForm={setCvForm} closeModal={closeModal} fetchData={fetchData} notify={notify}/>}
        {modalType === "course" && <CourseForm editItem={editItem} courseForm={courseForm} setCourseForm={setCourseForm} closeModal={closeModal} fetchData={fetchData} notify={notify}/>}
        {modalType === "step" && <StepForm editItem={editItem} stepForm={stepForm} setStepForm={setStepForm} closeModal={closeModal} fetchData={fetchData} notify={notify}/>}
        {modalType === "rule" && <RuleForm editItem={editItem} ruleForm={ruleForm} setRuleForm={setRuleForm} closeModal={closeModal} fetchData={fetchData} notify={notify}/>}
        {modalType === "bond" && <BondForm editItem={editItem} bondForm={bondForm} setBondForm={setBondForm} closeModal={closeModal} fetchData={fetchData} notify={notify}/>}
        {modalType === "guideline" && <GuidelineForm editItem={editItem} guidelineForm={guidelineForm} setGuidelineForm={setGuidelineForm} closeModal={closeModal} fetchData={fetchData} notify={notify}/>}
        {modalType === "department" && <DeptForm editItem={editItem} deptForm={deptForm} setDeptForm={setDeptForm} closeModal={closeModal} fetchData={fetchData} notify={notify}/>}
        {modalType === "gallery" && <GalleryForm editItem={editItem} formState={galleryForm} setFormState={setGalleryForm} closeModal={closeModal} fetchData={fetchData} notify={notify} axiosInstance={axiosInstance}/>}
        {modalType === "institute" && <InstituteForm editItem={editItem} closeModal={closeModal} fetchData={fetchData} notify={notify}/>}
        {modalType === "keyPerson" && <KeyPersonForm editItem={editItem} keyPersonForm={keyPersonForm} setKeyPersonForm={setKeyPersonForm} closeModal={closeModal} fetchData={fetchData} notify={notify} axiosInstance={axiosInstance}/>}
        {modalType === "contactDept" && <ContactDeptForm editItem={editItem} contactDeptForm={contactDeptForm} setContactDeptForm={setContactDeptForm} closeModal={closeModal} fetchData={fetchData} notify={notify} axiosInstance={axiosInstance}/>}
      </Modal>
    </div>
  );
};

export default AdminPanel;
