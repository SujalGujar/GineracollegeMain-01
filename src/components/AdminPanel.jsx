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
  brandDark:"#4E2B12",
  accent:   "#E07B39",
  accentSoft: "#FDF0E6",
  surface:  "#FFFFFF",
  bg:       "#F4F1EE",
  panel:    "#FBFAF8",
  border:   "#E8E0D8",
  text:     "#1A1208",
  muted:    "#8A7A6A",
  danger:   "#DC2626",
  dangerSoft: "#FEF2F2",
  success:  "#16A34A",
  successSoft: "#F0FDF4",
};

/* ─── Tiny helpers ───────────────────────────────────────── */
const imgUrl = (url) => getMediaUrl(url);

const Pill = ({ children, color = C.accent }) => (
  <span style={{ background: color + "20", color }}
        className="admin-pill text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
    {children}
  </span>
);

const IconBtn = ({ onClick, danger, children, className = "", title }) => (
  <button onClick={onClick}
    type="button"
    title={title}
    aria-label={title}
    className={`admin-icon-btn p-2 rounded-lg transition-all hover:scale-105 active:scale-95 ${
      danger
        ? "is-danger bg-red-50 text-red-500 hover:bg-red-100"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    } ${className}`}>
    {children}
  </button>
);

const Toast = ({ note, onDismiss }) => (
  <AnimatePresence>
    {note && (
      <motion.div
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, y: -18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -18, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className="mx-4 mt-4 flex max-w-2xl items-center gap-3 rounded-2xl border p-3 shadow-lg md:mx-6 lg:mx-8"
        style={{
          background: "#FFFFFF",
          borderColor: note.type === "error" ? "#FECACA" : "#BBF7D0",
          boxShadow: "0 18px 40px rgba(26, 18, 8, 0.18)",
        }}>
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: note.type === "error" ? C.dangerSoft : C.successSoft,
            color: note.type === "error" ? C.danger : C.success,
          }}>
          {note.type === "error" ? <AlertCircle size={21}/> : <CheckCircle2 size={21}/>}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-extrabold uppercase tracking-[0.12em]" style={{ color: note.type === "error" ? C.danger : C.success }}>
            {note.type === "error" ? "Action needs attention" : "Saved successfully"}
          </p>
          <p className="mt-0.5 break-words text-sm font-semibold leading-snug" style={{ color: C.text }}>{note.message}</p>
        </div>
        <button onClick={onDismiss} type="button" aria-label="Dismiss notification" className="shrink-0 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700">
          <X size={17}/>
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

const Field = ({ label, hint, required, children }) => (
  <div className="admin-field flex flex-col gap-1.5">
    <div className="admin-field-label flex items-center gap-1.5">
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
          className="admin-modal-overlay fixed inset-0 flex items-center justify-center p-4 sm:p-6"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            zIndex: 9999,
            minHeight: '100dvh',
            overflow: 'hidden',
            padding: 'clamp(14px, 2.4vw, 28px)',
          }}>
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
              overflow-y: auto !important;
              scrollbar-width: thin !important;
              scrollbar-color: #6B3F1D #F0ECE7 !important;
              -webkit-overflow-scrolling: touch;
              overscroll-behavior: contain;
              min-height: 0;
            }
            .admin-modal-overlay {
              align-items: center !important;
              justify-content: center !important;
              inset: 0 !important;
              width: 100vw !important;
              min-height: 100dvh !important;
            }
            .admin-modal-card {
              margin: 0 auto !important;
              width: min(720px, calc(100vw - 32px)) !important;
              max-height: calc(100dvh - 32px) !important;
              height: auto !important;
              border-radius: 18px !important;
              box-shadow: 0 30px 80px rgba(26, 18, 8, 0.32) !important;
            }
            .admin-modal-header {
              padding: 20px 24px !important;
              min-height: 78px;
              gap: 18px;
            }
            .admin-modal-header h3,
            .admin-modal-header p {
              margin: 0;
            }
            .admin-modal-header h3 {
              font-size: 18px !important;
              line-height: 1.2 !important;
            }
            .admin-modal-header p {
              margin-top: 6px !important;
              line-height: 1.35 !important;
            }
            .admin-modal-body {
              padding: 24px !important;
              max-height: calc(100dvh - 110px) !important;
              background: #FAFAF9 !important;
            }
            .admin-modal-body form .grid {
              display: grid !important;
              grid-template-columns: minmax(0, 1fr) !important;
              gap: 16px !important;
            }
            .admin-modal-body form {
              display: flex;
              flex-direction: column;
              gap: 22px;
            }
            .admin-modal-body form > * {
              margin-top: 0 !important;
              margin-bottom: 0 !important;
            }
            .admin-field {
              gap: 9px !important;
              min-width: 0;
            }
            .admin-field-label {
              min-height: 20px;
              align-items: center;
            }
            .admin-field-label label {
              line-height: 1.35 !important;
            }
            .admin-modal-body input,
            .admin-modal-body select,
            .admin-modal-body textarea,
            .admin-modal-body label {
              max-width: 100%;
            }
            .admin-modal-body input,
            .admin-modal-body select,
            .admin-modal-body textarea,
            .admin-modal-body .admin-field > label {
              min-height: 46px;
            }
            .admin-form-actions {
              position: sticky;
              bottom: -24px;
              z-index: 2;
              background: linear-gradient(180deg, rgba(250,250,249,0.88), #FAFAF9 35%);
              padding-top: 18px !important;
              padding-bottom: 2px;
            }
            .admin-form-actions button {
              min-height: 46px;
            }
            @media (min-width: 760px) {
              .admin-modal-body form .grid {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              }
              .admin-modal-body form .grid-cols-1 {
                grid-template-columns: minmax(0, 1fr) !important;
              }
            }
            @media (min-width: 1024px) {
              .admin-modal-overlay {
                padding: 28px !important;
              }
            }
            @media (max-width: 640px) {
              .admin-modal-card {
                border-radius: 14px !important;
                width: calc(100vw - 24px) !important;
                max-height: calc(100dvh - 24px) !important;
              }
              .admin-modal-header {
                padding: 16px !important;
                min-height: auto;
              }
              .admin-modal-body {
                padding: 16px !important;
                max-height: calc(100dvh - 88px) !important;
              }
              .admin-form-actions {
                flex-direction: column;
                bottom: -16px;
              }
              .admin-form-actions button {
                width: 100%;
                min-width: 0 !important;
              }
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
            className="admin-modal-card relative w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              background: '#fff',
              zIndex: 1,
              width: 'min(720px, calc(100vw - 32px))',
              maxWidth: '720px',
              maxHeight: 'calc(100dvh - 32px)',
              height: 'auto',
              minHeight: 0,
            }}>
            {/* Header (Fixed at top) */}
            <div
              className="admin-modal-header flex items-start justify-between px-7 py-5 border-b shrink-0"
              style={{ borderColor: '#EDE9E4', background: 'linear-gradient(135deg, #6B3F1D 0%, #8B5E3C 100%)' }}>
              <div>
                <h3 className="text-[17px] font-bold text-white leading-tight">{title}</h3>
                {subtitle && <p className="text-sm mt-1 text-white/70">{subtitle}</p>}
              </div>
              <button type="button" onClick={onClose}
                className="p-2 rounded-xl border border-white/20 hover:bg-white/10 transition shrink-0 ml-4 mt-0.5">
                <X size={18} className="text-white"/>
              </button>
            </div>
            {/* Scrollable Form Body (Internal scroll forced) */}
            <div
              className="admin-modal-body px-6 sm:px-7 py-6 overflow-y-auto form-scroll-container flex-1"
              style={{ background: '#FAFAF9', minHeight: 0 }}>
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
  <div className="admin-form-actions flex flex-col-reverse gap-3 pt-5 mt-2 border-t sm:flex-row sm:items-center sm:justify-end" style={{ borderColor: '#EDE9E4' }}>
    <button type="button" onClick={onCancel}
      className={`${formBtnSecondary} w-full sm:w-auto`} style={{ borderColor: '#D1C7BC', minWidth: '120px' }}>
      Cancel
    </button>
    <button type="submit" className={`${formBtnPrimary} w-full sm:w-auto sm:min-w-[180px]`}
      style={{ background: 'linear-gradient(135deg, #6B3F1D 0%, #9B6A43 100%)', justifyContent: 'center' }}>
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
        <FInput type="number" min="0" step="1" value={milestoneForm.order} onChange={e=>setMilestoneForm({...milestoneForm,order:Math.max(0, parseInt(e.target.value, 10) || 0)})}/>
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
      <FTextarea required rows={4} value={cvForm.description} onChange={e=>setCvForm({...cvForm,description:e.target.value})} placeholder="Brief description of this value…"/>
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
          {["General Guidelines","Code of Conduct","Academic Requirements","For Parents/Guardians","Contact Information","Required Documents","Additional Documents"].map(c=><option key={c}>{c}</option>)}
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

// ── STUDENT CORNER SECTION FORM ──────────────────────────────────────────────
const StudentCornerForm = ({ editItem, scForm, setScForm, closeModal, fetchData, notify }) => {
  const addItem = () => setScForm(f => ({ ...f, items: [...(f.items || []), ''] }));
  const removeItem = (i) => setScForm(f => ({ ...f, items: f.items.filter((_, idx) => idx !== i) }));
  const updateItem = (i, val) => setScForm(f => { const items = [...(f.items || [])]; items[i] = val; return { ...f, items }; });
  return (
    <form onSubmit={async e => {
      e.preventDefault();
      const url = editItem ? `/student-corner/${editItem._id}` : '/student-corner';
      try {
        if (editItem) await axiosInstance.put(url, scForm);
        else await axiosInstance.post(url, scForm);
        notify(editItem ? 'Section updated' : 'Section created');
        closeModal(); fetchData();
      } catch { notify('Failed to save section', 'error'); }
    }} className="space-y-5">
      <FormSection title="Section Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Section Title" required><FInput required value={scForm.title} onChange={e=>setScForm({...scForm,title:e.target.value})} placeholder="e.g. Documents for Transcript"/></Field>
          <Field label="Subtitle"><FInput value={scForm.subtitle} onChange={e=>setScForm({...scForm,subtitle:e.target.value})} placeholder="e.g. All Xerox Copies Required"/></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Tag / Badge Label"><FInput value={scForm.tag} onChange={e=>setScForm({...scForm,tag:e.target.value})} placeholder="e.g. GNM Students"/></Field>
          <Field label="Icon (emoji)"><FInput value={scForm.icon} onChange={e=>setScForm({...scForm,icon:e.target.value})} placeholder="📄"/></Field>
          <Field label="Sort Order"><FInput type="number" value={scForm.order} onChange={e=>setScForm({...scForm,order:parseInt(e.target.value)||0})}/></Field>
        </div>
        <Field label="Extra Description / Note" hint="Optional note shown below the badge on the public page">
          <FTextarea rows={2} value={scForm.description} onChange={e=>setScForm({...scForm,description:e.target.value})} placeholder="e.g. For GNM students completing their final year only"/>
        </Field>
      </FormSection>
      <FormSection title="Colors">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Main Color" hint="Card accent & icon background">
            <div className="flex gap-3 items-center">
              <input type="color" value={scForm.color} onChange={e=>setScForm({...scForm,color:e.target.value})} className="w-12 h-11 rounded-xl border-2 cursor-pointer shrink-0" style={{borderColor:'#E8E4DF'}}/>
              <FInput value={scForm.color} onChange={e=>setScForm({...scForm,color:e.target.value})}/>
            </div>
          </Field>
          <Field label="Border Color">
            <div className="flex gap-3 items-center">
              <input type="color" value={scForm.borderColor} onChange={e=>setScForm({...scForm,borderColor:e.target.value})} className="w-12 h-11 rounded-xl border-2 cursor-pointer shrink-0" style={{borderColor:'#E8E4DF'}}/>
              <FInput value={scForm.borderColor} onChange={e=>setScForm({...scForm,borderColor:e.target.value})}/>
            </div>
          </Field>
          <Field label="Badge Color">
            <div className="flex gap-3 items-center">
              <input type="color" value={scForm.badgeColor} onChange={e=>setScForm({...scForm,badgeColor:e.target.value})} className="w-12 h-11 rounded-xl border-2 cursor-pointer shrink-0" style={{borderColor:'#E8E4DF'}}/>
              <FInput value={scForm.badgeColor} onChange={e=>setScForm({...scForm,badgeColor:e.target.value})}/>
            </div>
          </Field>
        </div>
      </FormSection>
      <FormSection title="Document Items">
        <div className="space-y-2">
          {(scForm.items||[]).map((item,i)=>(
            <div key={i} className="flex gap-2 items-center">
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{background:scForm.color||'#F59E0B'}}>{i+1}</span>
              <FInput value={item} onChange={e=>updateItem(i,e.target.value)} placeholder={`Document item ${i+1}`} className="flex-1"/>
              <button type="button" onClick={()=>removeItem(i)} className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all shrink-0"><Trash2 size={15}/></button>
            </div>
          ))}
          <button type="button" onClick={addItem} className="w-full py-2.5 rounded-xl border-2 border-dashed text-sm font-semibold transition-all hover:bg-amber-50" style={{borderColor:'#D1C7BC',color:'#8A7A6A'}}>
            <Plus size={15} className="inline mr-1"/> Add Document Item
          </button>
        </div>
      </FormSection>
      <FormActions onCancel={closeModal} submitLabel={editItem?'Save Changes':'Create Section'}/>
    </form>
  );
};

// ── STUDENT CORNER TAB ────────────────────────────────────────────────────────
const StudentCornerTab = ({ sections, openModal, setScForm, del }) => {
  const DEFAULT_SC = {title:'',subtitle:'',tag:'',icon:'📄',color:'#F59E0B',borderColor:'#FCD34D',badgeColor:'#D97706',items:[],description:'',order:0};
  return (
    <div className="space-y-6">
      <SectionHeader icon={GraduationCap} title="Student Corner — Document Sections" subtitle="Manage document requirement notices shown on the Student Corner page"
        action={<AddBtn label="Add Section" onClick={()=>{setScForm({...DEFAULT_SC,order:sections.length+1});openModal('studentCorner');}}/>}
      />
      {sections.length===0 ? (
        <EmptyState icon={GraduationCap} text="No document sections yet — click 'Add Section' to create one"/>
      ) : (
        <div className="space-y-3">
          {sections.map((s,idx)=>(
            <div key={s._id} className="flex items-center gap-4 p-4 rounded-2xl group transition-all hover:shadow-sm" style={{background:'#FFFFFF',border:'1px solid #E8E0D8'}}>
              <div style={{width:'48px',height:'48px',borderRadius:'14px',background:s.color||'#F59E0B',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',flexShrink:0,boxShadow:`0 4px 12px ${(s.color||'#F59E0B')}44`}}>{s.icon||'📄'}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  {s.tag&&<span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md" style={{background:(s.badgeColor||'#D97706')+'22',color:s.badgeColor||'#D97706'}}>{s.tag}</span>}
                  <span className="text-[11px] font-semibold text-gray-400">#{idx+1} · {(s.items||[]).length} items</span>
                </div>
                <p className="font-bold text-sm truncate" style={{color:'#1A1208'}}>{s.title}</p>
                {s.subtitle&&<p className="text-xs truncate mt-0.5" style={{color:'#8A7A6A'}}>{s.subtitle}</p>}
              </div>
              <div className="hidden sm:flex gap-1.5 shrink-0">
                {['color','borderColor','badgeColor'].map(k=><div key={k} style={{width:16,height:16,borderRadius:'50%',background:s[k]||'#ccc',border:'2px solid #F4F1EE'}} title={k}/>)}
              </div>
              <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity shrink-0">
                <IconBtn title="Edit" onClick={()=>{setScForm({title:s.title||'',subtitle:s.subtitle||'',tag:s.tag||'',icon:s.icon||'📄',color:s.color||'#F59E0B',borderColor:s.borderColor||'#FCD34D',badgeColor:s.badgeColor||'#D97706',items:Array.isArray(s.items)?[...s.items]:[],description:s.description||'',order:s.order||0});openModal('studentCorner',s);}}><Edit3 size={15}/></IconBtn>
                <IconBtn danger title="Delete" onClick={()=>del(`/student-corner/${s._id}`)}><Trash2 size={15}/></IconBtn>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="p-4 rounded-2xl flex items-start gap-3" style={{background:'#FFF7ED',border:'1.5px solid #FDE68A'}}>
        <span className="text-xl shrink-0">💡</span>
        <div>
          <p className="text-sm font-bold" style={{color:'#92400e'}}>Tips</p>
          <ul className="text-xs mt-1 space-y-1" style={{color:'#78350f'}}>
            <li>• Use <strong>Sort Order</strong> when editing to control display order on the public page.</li>
            <li>• To hide Student Corner from the site, go to <strong>Section Control</strong> and toggle it off.</li>
            <li>• Each section supports its own emoji icon, custom colors, badge label, and unlimited document items.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const SubTabs = ({ tabs, active, onChange }) => (
  <div className="admin-subtabs">
    {tabs.map(t => (
      <button key={t} onClick={() => onChange(t)}
        type="button"
        className={active === t ? "is-active" : ""}>
        {t}
      </button>
    ))}
  </div>
);

const SectionHeader = ({ icon: Icon, title, subtitle, action }) => (
  <div className="admin-section-header flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl"
       style={{ background: C.surface, border: `1px solid ${C.border}` }}>
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div className="admin-section-icon w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
           style={{ background: C.accentSoft }}>
        <Icon size={20} style={{ color: C.accent }}/>
      </div>
      <div className="min-w-0">
        <h3 className="admin-section-title font-bold text-base truncate" style={{ color: C.text }}>{title}</h3>
        {subtitle && <p className="admin-section-subtitle text-xs mt-0.5 truncate" style={{ color: C.muted }}>{subtitle}</p>}
      </div>
    </div>
    {action}
  </div>
);

const AddBtn = ({ onClick, label = "Add New" }) => (
  <button onClick={onClick}
    className="admin-add-btn shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow hover:opacity-90 active:scale-95"
    style={{ background: C.brand }}>
    <Plus size={16}/>{label}
  </button>
);

const RowItem = ({ icon, badge, title, sub, onEdit, onDelete, left }) => (
  <div className="admin-row-item flex items-center gap-4 p-4 rounded-2xl group transition-all hover:shadow-sm"
       style={{ background: C.surface, border: `1px solid ${C.border}` }}>
    {left || (
      <div className="admin-row-icon w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
           style={{ background: C.accentSoft }}>
        {icon || "📌"}
      </div>
    )}
    <div className="flex-1 min-w-0">
      {badge && <div className="mb-0.5"><Pill>{badge}</Pill></div>}
      <p className="admin-row-title font-bold text-sm truncate" style={{ color: C.text }}>{title}</p>
      {sub && <p className="admin-row-subtitle text-xs truncate mt-0.5" style={{ color: C.muted }}>{sub}</p>}
    </div>
    <div className="admin-row-actions flex gap-1.5 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity shrink-0">
      {onEdit && <IconBtn onClick={onEdit} title="Edit"><Edit3 size={15}/></IconBtn>}
      {onDelete && <IconBtn onClick={onDelete} danger title="Delete"><Trash2 size={15}/></IconBtn>}
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
  <div className="flex flex-col min-h-0" style={{ height: '100dvh', maxHeight: '100dvh' }}>
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

    <nav className="flex-1 min-h-0 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide" style={{ overscrollBehavior: 'contain' }}>
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
      <aside className="admin-sidebar flex flex-col w-80 shrink-0 self-stretch border-r border-black/10"
             style={{
               background: C.brand,
               width: '320px',
               height: '100%',
               minHeight: '100dvh',
               maxHeight: '100dvh',
             }}>
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
              className="admin-sidebar fixed inset-y-0 left-0 z-[10000] w-80 flex flex-col shadow-2xl"
              style={{
                background: C.brand,
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                width: 'min(320px, 86vw)',
                height: '100dvh',
                maxHeight: '100dvh',
                zIndex: 10000,
              }}>
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
  <header className="admin-header h-14 lg:h-16 flex items-center px-4 lg:px-6 border-b shrink-0 z-10"
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
    <div className="ml-auto hidden md:flex items-center gap-2">
      <span className="admin-header-chip">
        <span className="admin-header-dot" />
        Live Admin
      </span>
    </div>
  </header>
);

// ── TAB COMPONENTS ───────────────────────────────────────

const HomeTab = ({ selectedDeptForSlider, setSelectedDeptForSlider, departments, sliders, handleSliderUpload, updateSliderImage, del }) => {
  const filteredSliders = sliders.filter(s => selectedDeptForSlider === "null" ? !s.department : s.department?._id === selectedDeptForSlider);
  const activeTarget = selectedDeptForSlider === "null"
    ? "Homepage Sliders"
    : departments.find(d => d._id === selectedDeptForSlider)?.name || "Department Sliders";

  const getFriendlyName = (s, index) => {
    const sectionName = selectedDeptForSlider === "null" 
      ? "Homepage Slider" 
      : `${departments.find(d => d._id === selectedDeptForSlider)?.name || "Department"} Slider`;
    return `${sectionName} #${index + 1}`;
  };

  const getUploadDate = (s) => {
    if (s.createdAt) {
      return new Date(s.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return "Recent Upload";
  };

  return (
    <div className="home-manager-shell">
      <style>{`
        .home-manager-shell {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .home-manager-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 22px;
          align-items: center;
          padding: 22px;
          border: 1px solid #E7DDD2;
          border-radius: 18px;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.97), rgba(255,249,243,0.94)),
            linear-gradient(135deg, #6B3F1D, #E07B39);
          box-shadow: 0 18px 42px rgba(65, 42, 22, 0.08);
        }
        .home-manager-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .home-manager-icon {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          background: linear-gradient(135deg, #6B3F1D 0%, #A85D2A 100%);
          box-shadow: 0 12px 26px rgba(107, 63, 29, 0.22);
          flex: 0 0 auto;
        }
        .home-manager-kicker {
          margin: 0 0 4px;
          color: #8A7A6A;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .home-manager-title {
          margin: 0;
          color: #1A1208;
          font-size: 26px;
          line-height: 1.14;
          font-weight: 900;
          letter-spacing: 0;
        }
        .home-manager-subtitle {
          margin: 8px 0 0;
          max-width: 620px;
          color: #786859;
          font-size: 13px;
          font-weight: 600;
          line-height: 1.55;
        }
        .home-manager-stats {
          display: grid;
          grid-template-columns: repeat(2, minmax(116px, 1fr));
          gap: 10px;
          min-width: 260px;
        }
        .home-manager-stat {
          padding: 14px;
          border: 1px solid #E8E0D8;
          border-radius: 14px;
          background: #FFFFFF;
          box-shadow: 0 10px 24px rgba(65, 42, 22, 0.06);
        }
        .home-manager-stat strong {
          display: block;
          color: #1A1208;
          font-size: 25px;
          line-height: 1;
          font-weight: 900;
        }
        .home-manager-stat span {
          display: block;
          margin-top: 7px;
          color: #7A6A5B;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .home-manager-panel {
          border: 1px solid #E8E0D8;
          border-radius: 18px;
          background: #FFFFFF;
          box-shadow: 0 16px 38px rgba(65, 42, 22, 0.06);
          overflow: hidden;
        }
        .home-manager-toolbar {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 16px;
          align-items: end;
          padding: 18px;
          border-bottom: 1px solid #EFE7DF;
          background: linear-gradient(180deg, #FFFFFF 0%, #FFFCFA 100%);
        }
        .home-manager-field label {
          display: block;
          margin: 0 0 8px 1px;
          color: #8A7A6A;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .home-manager-select-wrap {
          position: relative;
        }
        .home-manager-select-wrap select {
          width: 100%;
          height: 46px;
          appearance: none;
          border: 1px solid #E6DCD1;
          border-radius: 12px;
          background: #FBFAF8;
          color: #1A1208;
          font-size: 13px;
          font-weight: 750;
          outline: none;
          padding: 0 42px 0 14px;
          cursor: pointer;
          transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
        }
        .home-manager-select-wrap select:focus {
          border-color: #C7773D;
          background: #FFFFFF;
          box-shadow: 0 0 0 4px rgba(224, 123, 57, 0.13);
        }
        .home-manager-select-wrap svg {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #7A6A5B;
          pointer-events: none;
        }
        .home-manager-upload {
          height: 46px;
          min-width: 168px;
          border: 0;
          border-radius: 12px;
          padding: 0 16px;
          color: #FFFFFF;
          background: linear-gradient(135deg, #6B3F1D 0%, #9B5A2D 100%);
          box-shadow: 0 12px 24px rgba(107, 63, 29, 0.2);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
          transition: transform 160ms ease, box-shadow 160ms ease;
        }
        .home-manager-upload:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 30px rgba(107, 63, 29, 0.25);
        }
        .home-manager-upload input,
        .home-manager-action input {
          display: none;
        }
        .home-manager-content {
          padding: 18px;
        }
        .home-manager-section-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 16px;
        }
        .home-manager-section-head h3 {
          margin: 0;
          color: #1A1208;
          font-size: 18px;
          line-height: 1.2;
          font-weight: 900;
        }
        .home-manager-section-head p {
          margin: 5px 0 0;
          color: #8A7A6A;
          font-size: 13px;
          font-weight: 650;
        }
        .home-manager-target-badge {
          max-width: 260px;
          border: 1px solid #E7DDD2;
          border-radius: 999px;
          padding: 7px 11px;
          color: #6B3F1D;
          background: #FFF8F1;
          font-size: 12px;
          font-weight: 900;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 0 0 auto;
        }
        .home-manager-empty {
          min-height: 320px;
          border: 2px dashed #E6DCD1;
          border-radius: 16px;
          background: #FBFAF8;
          text-align: center;
          padding: 36px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .home-manager-empty-icon {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          color: #6B3F1D;
          background: #FDF0E6;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 0 1px rgba(107, 63, 29, 0.08);
          margin-bottom: 16px;
        }
        .home-manager-empty h4 {
          margin: 0;
          color: #1A1208;
          font-size: 18px;
          font-weight: 900;
        }
        .home-manager-empty p {
          margin: 8px 0 18px;
          max-width: 380px;
          color: #786859;
          font-size: 13px;
          font-weight: 600;
          line-height: 1.55;
        }
        .home-manager-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }
        .home-slider-card {
          min-width: 0;
          border: 1px solid #E8E0D8;
          border-radius: 16px;
          background: #FFFFFF;
          overflow: hidden;
          box-shadow: 0 12px 28px rgba(65, 42, 22, 0.06);
          display: flex;
          flex-direction: column;
          transition: transform 170ms ease, box-shadow 170ms ease, border-color 170ms ease;
        }
        .home-slider-card:hover {
          transform: translateY(-2px);
          border-color: #D7C3AE;
          box-shadow: 0 18px 36px rgba(65, 42, 22, 0.11);
        }
        .home-slider-media {
          position: relative;
          aspect-ratio: 16 / 10;
          background: #F3EFEA;
          overflow: hidden;
        }
        .home-slider-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 260ms ease;
        }
        .home-slider-card:hover .home-slider-media img {
          transform: scale(1.035);
        }
        .home-slider-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          background: rgba(26, 18, 8, 0.18);
          opacity: 0;
          transition: opacity 180ms ease;
          pointer-events: none;
        }
        .home-slider-card:hover .home-slider-overlay {
          opacity: 1;
        }
        .home-slider-overlay span {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(8px);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18);
        }
        .home-slider-body {
          padding: 14px;
          display: flex;
          flex: 1 1 auto;
          flex-direction: column;
          justify-content: space-between;
          gap: 14px;
        }
        .home-slider-body h4 {
          margin: 0;
          color: #1A1208;
          font-size: 14px;
          line-height: 1.25;
          font-weight: 900;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .home-slider-body p {
          margin: 5px 0 0;
          color: #8A7A6A;
          font-size: 12px;
          font-weight: 700;
        }
        .home-manager-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
          padding-top: 12px;
          border-top: 1px solid #EFE7DF;
        }
        .home-manager-action {
          height: 38px;
          border: 1px solid #E6DCD1;
          border-radius: 10px;
          background: #FBFAF8;
          color: #1A1208;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-size: 12px;
          font-weight: 900;
          cursor: pointer;
          transition: transform 160ms ease, background 160ms ease, border-color 160ms ease, color 160ms ease;
        }
        .home-manager-action:hover {
          transform: translateY(-1px);
          background: #6B3F1D;
          border-color: #6B3F1D;
          color: #FFFFFF;
        }
        .home-manager-action.danger:hover {
          background: #B42318;
          border-color: #B42318;
        }
        @media (max-width: 920px) {
          .home-manager-hero,
          .home-manager-toolbar {
            grid-template-columns: 1fr;
          }
          .home-manager-stats {
            min-width: 0;
          }
          .home-manager-upload {
            width: 100%;
          }
        }
        @media (max-width: 560px) {
          .home-manager-hero,
          .home-manager-toolbar,
          .home-manager-content {
            padding: 14px;
          }
          .home-manager-title {
            font-size: 21px;
          }
          .home-manager-title-row {
            align-items: flex-start;
          }
          .home-manager-stats {
            grid-template-columns: 1fr;
          }
          .home-manager-section-head {
            flex-direction: column;
          }
          .home-manager-target-badge {
            max-width: 100%;
          }
          .home-manager-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="home-manager-hero">
        <div>
          <div className="home-manager-title-row">
            <div className="home-manager-icon">
              <ImageIcon size={22} />
            </div>
            <div className="min-w-0">
              <p className="home-manager-kicker">Homepage Media</p>
              <h1 className="home-manager-title">Home Page Management</h1>
            </div>
          </div>
          <p className="home-manager-subtitle">
            Manage homepage banner and department slider images with a cleaner preview-first workflow.
          </p>
        </div>

        <div className="home-manager-stats">
          <div className="home-manager-stat">
            <strong>{filteredSliders.length}</strong>
            <span>Shown Here</span>
          </div>
          <div className="home-manager-stat">
            <strong>{sliders.length}</strong>
            <span>Total Images</span>
          </div>
        </div>
      </div>

      <div className="home-manager-panel">
        <div className="home-manager-toolbar">
          <div className="home-manager-field">
            <label>Target Section</label>
            <div className="home-manager-select-wrap">
              <select value={selectedDeptForSlider} onChange={e => setSelectedDeptForSlider(e.target.value)}>
                <option value="null">Homepage Sliders</option>
                {departments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
              </select>
              <ChevronDown size={17} />
            </div>
          </div>

          <label className="home-manager-upload">
            <Upload size={17} />
            Upload Images
            <input type="file" multiple onChange={handleSliderUpload} />
          </label>
        </div>

        <div className="home-manager-content">
          <div className="home-manager-section-head">
            <div>
              <h3>Gallery Images</h3>
              <p>Replace or remove images currently attached to this slider group.</p>
            </div>
            <span className="home-manager-target-badge">{activeTarget}</span>
          </div>

          {filteredSliders.length === 0 ? (
            <div className="home-manager-empty">
              <div className="home-manager-empty-icon">
                <Upload size={30} />
              </div>
              <h4>No Images Uploaded</h4>
              <p>Upload images for this section. A 16:9 image works best for public slider banners.</p>
              <label className="home-manager-upload">
                <Upload size={17} />
                Upload Images
                <input type="file" multiple onChange={handleSliderUpload} />
              </label>
            </div>
          ) : (
            <div className="home-manager-grid">
              <AnimatePresence>
                {filteredSliders.map((s, index) => (
                  <motion.div
                    key={s._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="home-slider-card"
                  >
                    <div className="home-slider-media">
                      <img src={imgUrl(s.imageUrl)} alt={getFriendlyName(s, index)} />
                      <div className="home-slider-overlay">
                        <span><ImageIcon size={18} /></span>
                      </div>
                    </div>

                    <div className="home-slider-body">
                      <div>
                        <h4 title={getFriendlyName(s, index)}>{getFriendlyName(s, index)}</h4>
                        <p>Uploaded: {getUploadDate(s)}</p>
                      </div>

                      <div className="home-manager-actions">
                        <label className="home-manager-action">
                          <Edit3 size={13} />
                          Replace
                          <input
                            type="file"
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) updateSliderImage(s._id, file);
                            }}
                          />
                        </label>
                        <button type="button" className="home-manager-action danger" onClick={() => del(`/sliders/${s._id}`)}>
                          <Trash2 size={13} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AcademicTab = ({ programs, academicContent, setAcademicContent, axiosInstance, notify, openModal, setProgramForm, del }) => {
  const categoryCount = new Set(programs.map(p => p.category).filter(Boolean)).size;

  const openCreateProgram = () => {
    setProgramForm({ title:"", description:"", duration:"", category:"Undergraduate", courses:"", image:null });
    openModal("program");
  };

  const openEditProgram = (p) => {
    setProgramForm({
      title: p.title,
      description: p.description,
      duration: p.duration,
      category: p.category,
      courses: p.courses?.join(", ") || "",
      image: null
    });
    openModal("program", p);
  };

  return (
    <div className="academic-manager-shell">
      <style>{`
        .academic-manager-shell {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .academic-manager-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 22px;
          align-items: center;
          padding: 22px;
          border: 1px solid #E7DDD2;
          border-radius: 18px;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.97), rgba(255,249,243,0.94)),
            linear-gradient(135deg, #6B3F1D, #E07B39);
          box-shadow: 0 18px 42px rgba(65, 42, 22, 0.08);
        }
        .academic-manager-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .academic-manager-icon {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          background: linear-gradient(135deg, #6B3F1D 0%, #A85D2A 100%);
          box-shadow: 0 12px 26px rgba(107, 63, 29, 0.22);
          flex: 0 0 auto;
        }
        .academic-manager-kicker {
          margin: 0 0 4px;
          color: #8A7A6A;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .academic-manager-title {
          margin: 0;
          color: #1A1208;
          font-size: 26px;
          line-height: 1.14;
          font-weight: 900;
          letter-spacing: 0;
        }
        .academic-manager-subtitle {
          margin: 8px 0 0;
          max-width: 650px;
          color: #786859;
          font-size: 13px;
          font-weight: 600;
          line-height: 1.55;
        }
        .academic-manager-top-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .academic-manager-add {
          height: 44px;
          border: 0;
          border-radius: 12px;
          padding: 0 16px;
          color: #FFFFFF;
          background: linear-gradient(135deg, #6B3F1D 0%, #9B5A2D 100%);
          box-shadow: 0 12px 24px rgba(107, 63, 29, 0.2);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 160ms ease, box-shadow 160ms ease;
        }
        .academic-manager-add:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 30px rgba(107, 63, 29, 0.25);
        }
        .academic-manager-stats {
          display: grid;
          grid-template-columns: repeat(2, minmax(116px, 1fr));
          gap: 10px;
          min-width: 260px;
        }
        .academic-manager-stat {
          padding: 14px;
          border: 1px solid #E8E0D8;
          border-radius: 14px;
          background: #FFFFFF;
          box-shadow: 0 10px 24px rgba(65, 42, 22, 0.06);
        }
        .academic-manager-stat strong {
          display: block;
          color: #1A1208;
          font-size: 25px;
          line-height: 1;
          font-weight: 900;
        }
        .academic-manager-stat span {
          display: block;
          margin-top: 7px;
          color: #7A6A5B;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .academic-manager-panel {
          border: 1px solid #E8E0D8;
          border-radius: 18px;
          background: #FFFFFF;
          box-shadow: 0 16px 38px rgba(65, 42, 22, 0.06);
          overflow: hidden;
        }
        .academic-manager-panel-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 18px;
          border-bottom: 1px solid #EFE7DF;
          background: linear-gradient(180deg, #FFFFFF 0%, #FFFCFA 100%);
        }
        .academic-manager-panel-title {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .academic-manager-panel-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          color: #6B3F1D;
          background: #FDF0E6;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }
        .academic-manager-panel-title h3 {
          margin: 0;
          color: #1A1208;
          font-size: 17px;
          line-height: 1.2;
          font-weight: 900;
        }
        .academic-manager-panel-title p {
          margin: 4px 0 0;
          color: #8A7A6A;
          font-size: 12px;
          font-weight: 700;
        }
        .academic-manager-form {
          padding: 18px;
          display: grid;
          gap: 14px;
        }
        .academic-manager-field label {
          display: block;
          margin: 0 0 8px 1px;
          color: #8A7A6A;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .academic-manager-field input,
        .academic-manager-field textarea {
          width: 100%;
          border: 1px solid #E6DCD1;
          border-radius: 12px;
          background: #FBFAF8;
          color: #1A1208;
          font-size: 13px;
          font-weight: 650;
          outline: none;
          padding: 12px 14px;
          transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
        }
        .academic-manager-field input {
          height: 46px;
        }
        .academic-manager-field textarea {
          min-height: 94px;
          resize: vertical;
          line-height: 1.55;
        }
        .academic-manager-field input:focus,
        .academic-manager-field textarea:focus {
          border-color: #C7773D;
          background: #FFFFFF;
          box-shadow: 0 0 0 4px rgba(224, 123, 57, 0.13);
        }
        .academic-manager-save {
          justify-self: start;
          height: 42px;
          border: 0;
          border-radius: 11px;
          padding: 0 16px;
          color: #FFFFFF;
          background: #6B3F1D;
          box-shadow: 0 10px 20px rgba(107, 63, 29, 0.18);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
          transition: transform 160ms ease, box-shadow 160ms ease;
        }
        .academic-manager-save:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 26px rgba(107, 63, 29, 0.24);
        }
        .academic-programs-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 16px;
        }
        .academic-programs-head h3 {
          margin: 0;
          color: #1A1208;
          font-size: 18px;
          line-height: 1.2;
          font-weight: 900;
        }
        .academic-programs-head p {
          margin: 5px 0 0;
          color: #8A7A6A;
          font-size: 13px;
          font-weight: 650;
        }
        .academic-programs-wrap {
          padding: 18px;
        }
        .academic-programs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
          gap: 16px;
        }
        .academic-program-card {
          min-width: 0;
          border: 1px solid #E8E0D8;
          border-radius: 16px;
          background: #FFFFFF;
          box-shadow: 0 12px 28px rgba(65, 42, 22, 0.06);
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: transform 170ms ease, box-shadow 170ms ease, border-color 170ms ease;
        }
        .academic-program-card:hover {
          transform: translateY(-2px);
          border-color: #D7C3AE;
          box-shadow: 0 18px 36px rgba(65, 42, 22, 0.11);
        }
        .academic-program-top {
          display: grid;
          grid-template-columns: 82px minmax(0, 1fr) auto;
          gap: 13px;
          align-items: start;
        }
        .academic-program-image {
          width: 82px;
          aspect-ratio: 1;
          border-radius: 14px;
          overflow: hidden;
          background: #F3EFEA;
          border: 1px solid #EFE7DF;
          flex: 0 0 auto;
        }
        .academic-program-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .academic-program-main {
          min-width: 0;
        }
        .academic-program-main h4 {
          margin: 0;
          color: #1A1208;
          font-size: 15px;
          line-height: 1.25;
          font-weight: 900;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .academic-program-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 9px;
        }
        .academic-program-pill {
          border: 1px solid #E7DDD2;
          border-radius: 999px;
          padding: 6px 9px;
          color: #6B3F1D;
          background: #FFF8F1;
          font-size: 11px;
          font-weight: 900;
          line-height: 1;
        }
        .academic-program-duration {
          border: 1px solid #DDE7F2;
          border-radius: 999px;
          padding: 6px 9px;
          color: #536C8D;
          background: #F6FAFE;
          font-size: 11px;
          font-weight: 900;
          line-height: 1;
        }
        .academic-program-actions {
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .academic-program-action {
          width: 34px;
          height: 34px;
          border: 1px solid #E6DCD1;
          border-radius: 10px;
          background: #FBFAF8;
          color: #1A1208;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 160ms ease, background 160ms ease, border-color 160ms ease, color 160ms ease;
        }
        .academic-program-action:hover {
          transform: translateY(-1px);
          background: #6B3F1D;
          border-color: #6B3F1D;
          color: #FFFFFF;
        }
        .academic-program-action.danger:hover {
          background: #B42318;
          border-color: #B42318;
        }
        .academic-program-desc {
          margin: 0;
          min-height: 42px;
          color: #786859;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .academic-program-empty {
          min-height: 260px;
          border: 2px dashed #E6DCD1;
          border-radius: 16px;
          background: #FBFAF8;
          text-align: center;
          padding: 34px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .academic-program-empty-icon {
          width: 60px;
          height: 60px;
          border-radius: 18px;
          color: #6B3F1D;
          background: #FDF0E6;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
        }
        .academic-program-empty h4 {
          margin: 0;
          color: #1A1208;
          font-size: 18px;
          font-weight: 900;
        }
        .academic-program-empty p {
          margin: 8px 0 18px;
          max-width: 360px;
          color: #786859;
          font-size: 13px;
          font-weight: 600;
          line-height: 1.55;
        }
        @media (max-width: 980px) {
          .academic-manager-hero {
            grid-template-columns: 1fr;
          }
          .academic-manager-stats {
            min-width: 0;
          }
          .academic-manager-top-actions {
            align-items: stretch;
            flex-direction: column;
          }
          .academic-manager-add {
            width: 100%;
          }
        }
        @media (max-width: 640px) {
          .academic-manager-hero,
          .academic-manager-panel-head,
          .academic-manager-form,
          .academic-programs-wrap {
            padding: 14px;
          }
          .academic-manager-title {
            font-size: 21px;
          }
          .academic-manager-title-row {
            align-items: flex-start;
          }
          .academic-manager-stats {
            grid-template-columns: 1fr;
          }
          .academic-manager-panel-head,
          .academic-programs-head {
            align-items: flex-start;
            flex-direction: column;
          }
          .academic-programs-grid {
            grid-template-columns: 1fr;
          }
          .academic-program-top {
            grid-template-columns: 68px minmax(0, 1fr);
          }
          .academic-program-image {
            width: 68px;
          }
          .academic-program-actions {
            grid-column: 1 / -1;
            width: 100%;
            justify-content: flex-end;
          }
        }
      `}</style>

      <div className="academic-manager-hero">
        <div>
          <div className="academic-manager-title-row">
            <div className="academic-manager-icon">
              <BookOpen size={22} />
            </div>
            <div className="min-w-0">
              <p className="academic-manager-kicker">Academic Content</p>
              <h1 className="academic-manager-title">Academic Programs</h1>
            </div>
          </div>
          <p className="academic-manager-subtitle">
            Manage the public academic section copy and program cards from one focused workspace.
          </p>
        </div>

        <div className="academic-manager-top-actions">
          <div className="academic-manager-stats">
            <div className="academic-manager-stat">
              <strong>{programs.length}</strong>
              <span>Programs</span>
            </div>
            <div className="academic-manager-stat">
              <strong>{categoryCount}</strong>
              <span>Categories</span>
            </div>
          </div>
          <button type="button" className="academic-manager-add" onClick={openCreateProgram}>
            <Plus size={16} />
            Add New Program
          </button>
        </div>
      </div>

      <div className="academic-manager-panel">
        <div className="academic-manager-panel-head">
          <div className="academic-manager-panel-title">
            <div className="academic-manager-panel-icon">
              <FileText size={19} />
            </div>
            <div>
              <h3>Section Banner Content</h3>
              <p>Copy shown above academic programs on the public website</p>
            </div>
          </div>
        </div>

        <div className="academic-manager-form">
          <div className="academic-manager-field">
            <label>Section Display Title</label>
            <input
              value={academicContent.title}
              onChange={e => setAcademicContent({ ...academicContent, title: e.target.value })}
              placeholder="Academic Programs"
            />
          </div>
          <div className="academic-manager-field">
            <label>Primary Description</label>
            <textarea
              rows={3}
              value={academicContent.description1}
              onChange={e => setAcademicContent({ ...academicContent, description1: e.target.value })}
              placeholder="Primary description paragraph"
            />
          </div>
          <div className="academic-manager-field">
            <label>Secondary Description</label>
            <textarea
              rows={2}
              value={academicContent.description2}
              onChange={e => setAcademicContent({ ...academicContent, description2: e.target.value })}
              placeholder="Secondary description paragraph"
            />
          </div>
          <button
            type="button"
            className="academic-manager-save"
            onClick={async () => {
              try {
                await axiosInstance.put("/content/academic", academicContent);
                notify("Content Saved Successfully");
              } catch {
                notify("Failed to save content", "error");
              }
            }}
          >
            <Save size={15} />
            Update Content
          </button>
        </div>
      </div>

      <div className="academic-manager-panel">
        <div className="academic-programs-wrap">
          <div className="academic-programs-head">
            <div>
              <h3>Program Cards</h3>
              <p>These programs appear in the academic programs section.</p>
            </div>
          </div>

          {programs.length === 0 ? (
            <div className="academic-program-empty">
              <div className="academic-program-empty-icon">
                <BookOpen size={28} />
              </div>
              <h4>No programs registered yet</h4>
              <p>Add the first program to start building the academic page.</p>
              <button type="button" className="academic-manager-add" onClick={openCreateProgram}>
                <Plus size={16} />
                Add New Program
              </button>
            </div>
          ) : (
            <div className="academic-programs-grid">
              {programs.map(p => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="academic-program-card"
                >
                  <div className="academic-program-top">
                    <div className="academic-program-image">
                      <img src={imgUrl(p.imageUrl)} alt={p.title} />
                    </div>

                    <div className="academic-program-main">
                      <h4 title={p.title}>{p.title}</h4>
                      <div className="academic-program-meta">
                        {p.category && <span className="academic-program-pill">{p.category}</span>}
                        {p.duration && <span className="academic-program-duration">{p.duration}</span>}
                      </div>
                    </div>

                    <div className="academic-program-actions">
                      <button type="button" className="academic-program-action" onClick={() => openEditProgram(p)} aria-label={`Edit ${p.title}`}>
                        <Edit3 size={14} />
                      </button>
                      <button type="button" className="academic-program-action danger" onClick={() => del(`/programs/${p._id}`)} aria-label={`Delete ${p.title}`}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {p.description && <p className="academic-program-desc">{p.description}</p>}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TestimonialsTab = ({ testimonials, testimonialForm, setTestimonialForm, openModal, del }) => (
  <div className="testimonial-manager-shell">
    <style>{`
      .testimonial-manager-shell {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .testimonial-manager-shell > div:first-of-type {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 18px !important;
        padding: 22px !important;
        border: 1px solid #E7DDD2 !important;
        border-radius: 18px !important;
        background:
          linear-gradient(135deg, rgba(255,255,255,0.97), rgba(255,249,243,0.94)),
          linear-gradient(135deg, #6B3F1D, #E07B39) !important;
        box-shadow: 0 18px 42px rgba(65, 42, 22, 0.08) !important;
      }
      .testimonial-manager-shell > div:first-of-type h3 {
        margin: 0 !important;
        color: #1A1208 !important;
        font-size: 24px !important;
        line-height: 1.15 !important;
        font-weight: 900 !important;
        letter-spacing: 0 !important;
      }
      .testimonial-manager-shell > div:first-of-type p {
        margin: 6px 0 0 !important;
        color: #786859 !important;
        font-size: 13px !important;
        font-weight: 650 !important;
      }
      .testimonial-manager-shell > div:first-of-type button {
        height: 44px !important;
        border: 0 !important;
        border-radius: 12px !important;
        padding: 0 16px !important;
        color: #FFFFFF !important;
        background: linear-gradient(135deg, #6B3F1D 0%, #9B5A2D 100%) !important;
        box-shadow: 0 12px 24px rgba(107, 63, 29, 0.2) !important;
        font-size: 13px !important;
        font-weight: 900 !important;
      }
      .testimonial-manager-shell > div:nth-of-type(2) {
        display: grid !important;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
        gap: 16px !important;
        padding: 18px !important;
        border: 1px solid #E8E0D8 !important;
        border-radius: 18px !important;
        background: #FFFFFF !important;
        box-shadow: 0 16px 38px rgba(65, 42, 22, 0.06) !important;
      }
      .testimonial-manager-shell > div:nth-of-type(2) > div {
        min-width: 0 !important;
      }
      .testimonial-manager-shell > div:nth-of-type(2) > div:not(.col-span-full) {
        border: 1px solid #E8E0D8 !important;
        border-radius: 16px !important;
        background: #FFFFFF !important;
        box-shadow: 0 12px 28px rgba(65, 42, 22, 0.06) !important;
        padding: 16px !important;
      }
      .testimonial-manager-shell img {
        width: 56px !important;
        height: 56px !important;
        border-radius: 16px !important;
        object-fit: cover !important;
      }
      .testimonial-manager-shell .col-span-full {
        grid-column: 1 / -1 !important;
      }
      .testimonial-manager-shell .col-span-full > div {
        min-height: 340px !important;
        border: 2px dashed #E6DCD1 !important;
        border-radius: 16px !important;
        background: #FBFAF8 !important;
        box-shadow: none !important;
      }
      @media (max-width: 640px) {
        .testimonial-manager-shell > div:first-of-type {
          align-items: stretch !important;
          flex-direction: column !important;
          padding: 14px !important;
        }
        .testimonial-manager-shell > div:nth-of-type(2) {
          grid-template-columns: 1fr !important;
          padding: 14px !important;
        }
      }
    `}</style>
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
  <div className="about-manager-shell admin-clean-page">
    <style>{`
      .about-manager-shell {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    `}</style>
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
            <div className="flex flex-col gap-4 p-4 rounded-2xl bg-gray-50 border border-dashed sm:flex-row sm:items-center" style={{ borderColor: C.border }}>
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 shadow-sm shrink-0" style={{ borderColor: C.brand + "40" }}>
                {deanMessage.photoUrl ? <img src={imgUrl(deanMessage.photoUrl)} className="w-full h-full object-cover" alt=""/> : <div className="w-full h-full bg-white flex items-center justify-center"><Users size={24} style={{ color: C.muted }}/></div>}
              </div>
              <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border-2 border-dashed px-4 py-3 text-sm font-bold cursor-pointer transition-all hover:border-amber-400 hover:bg-amber-50"
                     style={{ borderColor: deanPhotoFile ? C.accent : C.border, color: C.text, background: deanPhotoFile ? C.accentSoft : '#FFFFFF' }}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: C.accentSoft, color: C.accent }}><Upload size={17}/></span>
                <span className="min-w-0 flex-1"><span className="block text-[11px] uppercase tracking-wider" style={{ color: C.muted }}>Principal photo</span><span className="block truncate mt-0.5">{deanPhotoFile ? deanPhotoFile.name : "Choose or replace photo"}</span></span>
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
              <div className="grid grid-cols-1 gap-4">
                {milestones.map(m => (
                  <div key={m._id} className="p-5 rounded-2xl transition-all hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ background: C.surface, border:`1px solid ${C.border}`, borderLeft:`5px solid ${m.color || '#f59e0b'}` }}>
                    <div className="flex items-start gap-4 min-w-0 flex-1">
                      <span className="text-3xl shrink-0 p-2 rounded-xl bg-amber-50 border border-amber-100">{m.icon || "🎯"}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-md text-xs font-bold text-gray-800 bg-gray-100 border border-gray-200">{m.year}</span>
                        </div>
                        <p className="font-bold text-sm text-gray-900 truncate">{m.event}</p>
                        <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">{m.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                      <button
                        onClick={() => { setMilestoneForm({year:m.year,event:m.event,icon:m.icon,color:m.color,description:m.description,order:m.order||0}); openModal("milestone",m); }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-all shadow-sm">
                        <Edit3 size={14}/> Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (!window.confirm("Delete this milestone?")) return;
                          try {
                            await axiosInstance.delete(`/about/milestones/${m._id}`);
                            setMilestones(milestones.filter(x => x._id !== m._id));
                            notify("Milestone Removed");
                          } catch {
                            notify("Delete failed", "error");
                          }
                        }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all shadow-sm">
                        <Trash2 size={14}/> Delete
                      </button>
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

const AdmissionTab = ({ admSub, setAdmSub, courses, openModal, setCourseForm, del, admissionSteps, setStepForm, admissionRules, setRuleForm, bonds, setBondForm, guidelines, setGuidelineForm }) => {
  const [courseCategory, setCourseCategory] = useState('All');
  const courseCategories = ['All', ...Array.from(new Set(courses.map(course => course.category).filter(Boolean)))];
  const visibleCourses = courseCategory === 'All' ? courses : courses.filter(course => course.category === courseCategory);
  return (
  <div className="admission-manager-shell admin-clean-page">
    <SubTabs tabs={["Courses","Procedure","Eligibility","Guidelines"]} active={admSub} onChange={setAdmSub}/>
    
    {admSub === "Courses" && (
      <div className="space-y-6">
        <SectionHeader icon={GraduationCap} title="Program Offerings" subtitle={`${courses.length} courses listed`}
          action={<AddBtn onClick={() => { setCourseForm({category:"Undergraduate Programs",name:"",duration:"",seats:"",eligibility:"",description:"",icon:"👨‍⚕️",highlights:"",fees:"",admission:"",websiteLink:""}); openModal("course"); }} label="Add Course"/>}/>
        <div className="flex flex-wrap gap-2">
          {courseCategories.map(category => <button key={category} type="button" onClick={() => setCourseCategory(category)} className="px-3 py-2 rounded-xl text-xs font-bold border transition-all" style={{ background: courseCategory === category ? C.brand : C.surface, color: courseCategory === category ? '#fff' : C.muted, borderColor: C.border }}>{category}</button>)}
        </div>
        <div className="grid grid-cols-1 gap-3">
          {visibleCourses.map(c => <RowItem key={c._id} icon={c.icon} badge={c.category} title={c.name} sub={`${c.duration} | ${c.seats} Seats`}
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
        {["General Guidelines","Code of Conduct","Academic Requirements","For Parents/Guardians","Contact Information","Required Documents","Additional Documents"].map(cat => {
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
};

const DepartmentsTab = ({ selectedDept, setSelectedDept, departments, deptForm, setDeptForm, deptSub, setDeptSub, deptFacultyForm, setDeptFacultyForm, deptFacilityInput, setDeptFacilityInput, deptActivityInput, setDeptActivityInput, sliders, axiosInstance, fetchData, notify, openModal, del, handleSliderUpload }) => {
  const [editingFacultyIdx, setEditingFacultyIdx] = useState(null);
  const [editingFacilityIdx, setEditingFacilityIdx] = useState(null);
  const [editingActivityIdx, setEditingActivityIdx] = useState(null);

  if (!selectedDept) return (
    <div className="space-y-6">
      <SectionHeader icon={Building2} title="Academic Departments" subtitle={`Managing ${departments.length} nursing specialties`}
        action={<AddBtn onClick={() => { setDeptForm({name:"",slug:"",category:"Nursing Department",description:"",overview:"",overview2:"",faculty:[],facilities:[],activities:[],logo:null}); openModal("department"); }} label="New Department"/>}/>
      <div className="admin-department-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map(d => (
          <motion.div key={d._id} whileHover={{ y:-4 }}
            className="admin-department-card p-6 rounded-3xl group transition-all relative overflow-hidden"
            style={{ background: C.surface, border:`1px solid ${C.border}` }}>
            <div className={`absolute top-0 right-0 w-20 h-20 bg-amber-500 opacity-[0.02] rounded-bl-[80px] group-hover:opacity-[0.06] transition-all`}/>
            {/* Edit / Delete row */}
            <div className="admin-card-actions flex justify-end gap-1.5 mb-3">
              <IconBtn title="Edit department" onClick={e => { e.stopPropagation(); setDeptForm({...d, logo: null}); openModal("department", d); }}>
                <Edit3 size={14}/>
              </IconBtn>
              <IconBtn danger title="Delete department" onClick={e => { e.stopPropagation(); del(`/departments/${d._id}`); }}>
                <Trash2 size={14}/>
              </IconBtn>
            </div>
            {/* Card body — click to open detail editor */}
            <div className="cursor-pointer" onClick={() => { setSelectedDept(d); setDeptForm({...d}); setDeptSub("Overview"); }}>
              <div className="admin-department-body flex items-center gap-4 mb-5">
                {d.logoUrl ? (
                  <img src={imgUrl(d.logoUrl)} className="admin-department-logo w-12 h-12 rounded-xl object-cover shrink-0 border shadow-sm group-hover:scale-105 transition-transform duration-300" alt=""/>
                ) : (
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: C.accentSoft }}>🏥</div>
                )}
                <div className="min-w-0">
                  <p className="admin-department-title font-bold text-sm truncate leading-tight mb-1" style={{ color: C.text }}>{d.name}</p>
                  <Pill color={C.brand}>{d.category}</Pill>
                </div>
              </div>
              <div className="admin-department-meta flex items-center justify-between text-[11px] font-bold uppercase tracking-wider" style={{ color: C.muted }}>
                <div className="flex gap-2 flex-wrap">
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
      <p className="mb-2 text-xs font-semibold" style={{ color: C.muted }}>Recommended file size: 2–5 MB. Files larger than 5 MB are not accepted.</p>
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
    <SectionHeader
      icon={ImageIcon}
      title="Photo & Video Gallery"
      subtitle="Manage all photos and videos in the gallery"
      action={<AddBtn onClick={() => { setGalleryForm({ title:"", description:"", category:"college_campus_view", mediaType:"image", media:null }); openModal("gallery"); }} label="Add Media"/>}
    />
    <div className="grid grid-cols-1 gap-3">
      {galleryImages.map(img => (
        <RowItem key={img._id}
          left={<div className="admin-media-thumb w-16 h-12 rounded-xl overflow-hidden border-2 shrink-0 shadow-sm relative" style={{ borderColor: C.border }}>
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
    <Field label="Icon Emoji"><FInput value={keyPersonForm.icon} onChange={e=>setKeyPersonForm({...keyPersonForm,icon:e.target.value})}/></Field>
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
  const [selectedPage, setSelectedPage] = useState("Home Page");
  const [searchTerm, setSearchTerm] = useState("");

  const pages = ["Home Page", "About Us", "Admission", "Departments", "Gallery", "Institutes", "Student Corner", "Contact Us", "All Pages"];
  const pageCounts = pages.reduce((acc, page) => {
    acc[page] = page === "All Pages" ? sectionsList.length : sectionsList.filter(s => s.page === page).length;
    return acc;
  }, {});

  const filteredSections = sectionsList.filter(s => {
    const matchesPage = selectedPage === "All Pages" || s.page === selectedPage;
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
  const activePercent = totalSections ? Math.round((activeSections / totalSections) * 100) : 0;

  return (
    <div className="section-control-shell">
      <style>{`
        .section-control-shell {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .section-control-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 22px;
          align-items: stretch;
          padding: 22px;
          border: 1px solid #E7DDD2;
          border-radius: 18px;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.96), rgba(255,250,246,0.92)),
            linear-gradient(135deg, #6B3F1D, #E07B39);
          box-shadow: 0 18px 42px rgba(65, 42, 22, 0.08);
        }
        .section-control-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .section-control-icon {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          background: linear-gradient(135deg, #6B3F1D 0%, #A85D2A 100%);
          box-shadow: 0 12px 26px rgba(107, 63, 29, 0.22);
          flex: 0 0 auto;
        }
        .section-control-kicker {
          margin: 0 0 4px;
          color: #8A7A6A;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .section-control-title {
          margin: 0;
          color: #1A1208;
          font-size: 26px;
          line-height: 1.14;
          font-weight: 900;
          letter-spacing: 0;
        }
        .section-control-subtitle {
          margin: 8px 0 0;
          max-width: 660px;
          color: #786859;
          font-size: 13px;
          font-weight: 600;
          line-height: 1.55;
        }
        .section-control-metrics {
          display: grid;
          grid-template-columns: repeat(3, minmax(92px, 1fr));
          gap: 10px;
          min-width: 340px;
        }
        .section-control-metric {
          padding: 14px;
          border: 1px solid #E8E0D8;
          border-radius: 14px;
          background: #FFFFFF;
          box-shadow: 0 10px 24px rgba(65, 42, 22, 0.06);
        }
        .section-control-metric strong {
          display: block;
          color: #1A1208;
          font-size: 25px;
          line-height: 1;
          font-weight: 900;
        }
        .section-control-metric span {
          display: block;
          margin-top: 7px;
          color: #7A6A5B;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .section-control-progress {
          grid-column: 1 / -1;
          height: 8px;
          overflow: hidden;
          border-radius: 99px;
          background: #EFE7DF;
        }
        .section-control-progress > span {
          display: block;
          height: 100%;
          width: var(--section-progress, 0%);
          border-radius: inherit;
          background: linear-gradient(90deg, #16A34A, #E07B39);
        }
        .section-control-toolbar {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 360px);
          gap: 16px;
          align-items: start;
          padding: 14px;
          border: 1px solid #E8E0D8;
          border-radius: 16px;
          background: #FFFFFF;
          box-shadow: 0 12px 30px rgba(65, 42, 22, 0.05);
        }
        .section-control-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          min-width: 0;
        }
        .section-control-tab {
          min-height: 36px;
          border: 1px solid #E6DCD1;
          border-radius: 999px;
          padding: 7px 12px;
          color: #655646;
          background: #FBFAF8;
          font-size: 12px;
          font-weight: 800;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: transform 160ms ease, background 160ms ease, border-color 160ms ease, color 160ms ease, box-shadow 160ms ease;
        }
        .section-control-tab:hover {
          transform: translateY(-1px);
          border-color: #CFB69D;
          background: #FFF7EF;
        }
        .section-control-tab.is-active {
          color: #FFFFFF;
          border-color: #6B3F1D;
          background: #6B3F1D;
          box-shadow: 0 10px 22px rgba(107, 63, 29, 0.18);
        }
        .section-control-count {
          min-width: 22px;
          height: 22px;
          padding: 0 7px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: inherit;
          background: rgba(255,255,255,0.65);
          font-size: 11px;
          font-weight: 900;
        }
        .section-control-tab.is-active .section-control-count {
          background: rgba(255,255,255,0.18);
        }
        .section-control-search {
          position: relative;
          min-width: 0;
        }
        .section-control-search input {
          width: 100%;
          height: 42px;
          border: 1px solid #E6DCD1;
          border-radius: 12px;
          background: #FBFAF8;
          color: #1A1208;
          font-size: 13px;
          font-weight: 650;
          outline: none;
          padding: 0 38px 0 40px;
          transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
        }
        .section-control-search input:focus {
          border-color: #C7773D;
          background: #FFFFFF;
          box-shadow: 0 0 0 4px rgba(224, 123, 57, 0.13);
        }
        .section-control-search svg {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9A806B;
        }
        .section-control-clear {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 26px;
          height: 26px;
          border-radius: 8px;
          color: #8A7A6A;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .section-control-clear:hover {
          background: #EFE7DF;
          color: #1A1208;
        }
        .section-control-loading {
          min-height: 280px;
          border: 1px solid #E8E0D8;
          border-radius: 18px;
          background: #FFFFFF;
          color: #8A7A6A;
          font-size: 14px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .section-control-spinner {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 3px solid #E8E0D8;
          border-top-color: #6B3F1D;
          animation: section-spin 800ms linear infinite;
        }
        @keyframes section-spin {
          to { transform: rotate(360deg); }
        }
        .section-control-groups {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .section-control-group {
          border: 1px solid #E8E0D8;
          border-radius: 18px;
          background: #FFFFFF;
          box-shadow: 0 16px 38px rgba(65, 42, 22, 0.06);
          overflow: hidden;
        }
        .section-control-group-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px;
          border-bottom: 1px solid #EFE7DF;
          background: linear-gradient(180deg, #FFFFFF 0%, #FFFCFA 100%);
        }
        .section-control-group-title {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .section-control-group-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          color: #6B3F1D;
          background: #FDF0E6;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }
        .section-control-group-title h3 {
          margin: 0;
          color: #1A1208;
          font-size: 16px;
          line-height: 1.2;
          font-weight: 900;
        }
        .section-control-group-title p {
          margin: 4px 0 0;
          color: #8A7A6A;
          font-size: 12px;
          font-weight: 700;
        }
        .section-control-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 0 0 auto;
        }
        .section-control-action {
          height: 34px;
          border: 1px solid transparent;
          border-radius: 10px;
          padding: 0 12px;
          font-size: 12px;
          font-weight: 900;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          cursor: pointer;
          transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
        }
        .section-control-action:hover {
          transform: translateY(-1px);
        }
        .section-control-action.on {
          color: #146C3E;
          background: #ECFDF3;
          border-color: #B8E7CA;
        }
        .section-control-action.off {
          color: #A13434;
          background: #FFF1F1;
          border-color: #F4C7C7;
        }
        .section-control-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          padding: 16px;
        }
        .section-control-card {
          position: relative;
          min-width: 0;
          min-height: 108px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 14px;
          align-items: center;
          padding: 16px 16px 16px 18px;
          border: 1px solid #E8E0D8;
          border-radius: 14px;
          background: #FFFFFF;
          transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
        }
        .section-control-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 12px;
          bottom: 12px;
          width: 4px;
          border-radius: 0 999px 999px 0;
          background: #16A34A;
        }
        .section-control-card:hover {
          transform: translateY(-1px);
          border-color: #D8C8B7;
          box-shadow: 0 14px 28px rgba(65, 42, 22, 0.08);
        }
        .section-control-card.is-hidden {
          background: #FBFAF8;
        }
        .section-control-card.is-hidden::before {
          background: #D94B4B;
        }
        .section-control-card-copy {
          min-width: 0;
        }
        .section-control-status-row {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
          margin-bottom: 9px;
        }
        .section-control-status {
          min-width: 72px;
          border-radius: 999px;
          padding: 5px 9px;
          color: #146C3E;
          background: #ECFDF3;
          border: 1px solid #B8E7CA;
          font-size: 10px;
          font-weight: 950;
          line-height: 1;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-align: center;
          flex: 0 0 auto;
        }
        .section-control-card.is-hidden .section-control-status {
          color: #A13434;
          background: #FFF1F1;
          border-color: #F4C7C7;
        }
        .section-control-key {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          border: 1px solid #E7DDD2;
          border-radius: 8px;
          padding: 4px 8px;
          color: #725B45;
          background: #FFF8F1;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 11px;
          line-height: 1.2;
        }
        .section-control-card h4 {
          margin: 0;
          color: #1A1208;
          font-size: 14px;
          line-height: 1.25;
          font-weight: 900;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .section-control-card p {
          margin: 5px 0 0;
          color: #756657;
          font-size: 12px;
          line-height: 1.45;
          font-weight: 600;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .section-toggle {
          width: 58px;
          height: 32px;
          border: 0;
          border-radius: 999px;
          background: #16A34A;
          padding: 3px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: flex-end;
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08);
          transition: background 180ms ease;
        }
        .section-toggle.is-off {
          justify-content: flex-start;
          background: #CBD5E1;
        }
        .section-toggle span {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #16A34A;
          background: #FFFFFF;
          box-shadow: 0 3px 8px rgba(0,0,0,0.18);
        }
        .section-toggle.is-off span {
          color: #64748B;
        }
        @media (max-width: 1180px) {
          .section-control-hero,
          .section-control-toolbar {
            grid-template-columns: 1fr;
          }
          .section-control-metrics {
            min-width: 0;
          }
        }
        @media (max-width: 860px) {
          .section-control-list {
            grid-template-columns: 1fr;
          }
          .section-control-group-head {
            align-items: flex-start;
            flex-direction: column;
          }
          .section-control-actions {
            width: 100%;
          }
          .section-control-action {
            flex: 1 1 0;
          }
        }
        @media (max-width: 560px) {
          .section-control-hero,
          .section-control-toolbar {
            padding: 14px;
            border-radius: 14px;
          }
          .section-control-title {
            font-size: 21px;
          }
          .section-control-title-row {
            align-items: flex-start;
          }
          .section-control-metrics {
            grid-template-columns: 1fr;
          }
          .section-control-card {
            grid-template-columns: 1fr;
          }
          .section-toggle {
            width: 100%;
            justify-content: flex-end;
          }
          .section-toggle.is-off {
            justify-content: flex-start;
          }
          .section-control-tabs {
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 2px;
          }
        }
      `}</style>

      <div className="section-control-hero">
        <div>
          <div className="section-control-title-row">
            <div className="section-control-icon">
              <Sliders size={22} />
            </div>
            <div className="min-w-0">
              <p className="section-control-kicker">Site Content Manager</p>
              <h2 className="section-control-title">Section Visibility</h2>
            </div>
          </div>
          <p className="section-control-subtitle">
            Live control for public page sections, grouped by page with quick search and bulk status actions.
          </p>
        </div>

        <div className="section-control-metrics">
          <div className="section-control-metric">
            <strong>{totalSections}</strong>
            <span>Total</span>
          </div>
          <div className="section-control-metric">
            <strong style={{ color: "#16A34A" }}>{activeSections}</strong>
            <span>Visible</span>
          </div>
          <div className="section-control-metric">
            <strong style={{ color: "#D94B4B" }}>{hiddenSections}</strong>
            <span>Hidden</span>
          </div>
          <div className="section-control-progress" style={{ "--section-progress": `${activePercent}%` }}>
            <span />
          </div>
        </div>
      </div>

      <div className="section-control-toolbar">
        <div className="section-control-tabs">
          {pages.map(page => {
            const active = selectedPage === page;
            return (
              <button
                key={page}
                type="button"
                onClick={() => setSelectedPage(page)}
                className={`section-control-tab ${active ? "is-active" : ""}`}
              >
                {page}
                <span className="section-control-count">{pageCounts[page]}</span>
              </button>
            );
          })}
        </div>

        <div className="section-control-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search sections..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button type="button" className="section-control-clear" onClick={() => setSearchTerm("")} aria-label="Clear search">
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="section-control-loading">
          <span className="section-control-spinner" />
          Loading visibility settings...
        </div>
      ) : Object.keys(grouped).length === 0 ? (
        <EmptyState icon={EyeOff} text="No sections found matching filter search." />
      ) : (
        <div className="section-control-groups">
          {Object.entries(grouped).map(([pageName, secs]) => {
            return (
              <div key={pageName} className="section-control-group">
                <div className="section-control-group-head">
                  <div className="section-control-group-title">
                    <div className="section-control-group-icon">
                      <Layers size={20} />
                    </div>
                    <div>
                      <h3>{pageName}</h3>
                      <p>{secs.length} sections configured</p>
                    </div>
                  </div>

                  <div className="section-control-actions">
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await togglePageSections(pageName, true);
                          notify(`Turned ALL sections ON for ${pageName}`);
                        } catch {
                          notify("Update failed", "error");
                        }
                      }}
                      className="section-control-action on"
                    >
                      <CheckCircle2 size={14} /> All ON
                    </button>

                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await togglePageSections(pageName, false);
                          notify(`Turned ALL sections OFF for ${pageName}`);
                        } catch {
                          notify("Update failed", "error");
                        }
                      }}
                      className="section-control-action off"
                    >
                      <X size={14} /> All OFF
                    </button>
                  </div>
                </div>

                <div className="section-control-list">
                  {secs.map(sec => {
                    const isVisible = sec.isVisible !== false;

                    return (
                      <div
                        key={sec.sectionKey}
                        className={`section-control-card ${isVisible ? "" : "is-hidden"}`}
                      >
                        <div className="section-control-card-copy">
                          <div className="section-control-status-row">
                            <span className="section-control-status">
                              {isVisible ? "Visible" : "Hidden"}
                            </span>
                            <span className="section-control-key">{sec.sectionKey}</span>
                          </div>

                          <h4>{sec.sectionName}</h4>
                          {sec.description && <p>{sec.description}</p>}
                        </div>

                        <button
                          type="button"
                          aria-pressed={isVisible}
                          aria-label={`Toggle ${sec.sectionName}`}
                          onClick={async () => {
                            try {
                              await toggleSection(sec.sectionKey, !isVisible);
                              notify(`${sec.sectionName} is now ${!isVisible ? "ON (Visible)" : "OFF (Hidden)"}`);
                            } catch {
                              notify("Update failed", "error");
                            }
                          }}
                          className={`section-toggle ${isVisible ? "" : "is-off"}`}
                        >
                          <span>
                            {isVisible ? (
                              <CheckCircle2 size={15} />
                            ) : (
                              <X size={15} />
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
  const [studentCornerSections, setStudentCornerSections] = useState([]);
  const [scForm, setScForm] = useState({ title:'',subtitle:'',tag:'',icon:'📄',color:'#F59E0B',borderColor:'#FCD34D',badgeColor:'#D97706',items:[],description:'',order:0 });

  const notify = (message, type = "success") => {
    setNote({ message, type });
    setTimeout(() => setNote(null), 3000);
  };

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Student Corner is fetched independently below. This ensures it still
      // appears if an unrelated admin endpoint is temporarily unavailable.
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
    finally {
      try {
        const { data } = await axiosInstance.get("/student-corner");
        setStudentCornerSections(Array.isArray(data) ? data : []);
      } catch {
        setStudentCornerSections([]);
        notify("Unable to load Student Corner data", "error");
      }
      setLoading(false);
    }
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
    { name: "Gallery",         icon: ImageIcon },
    { name: "Student Corner",  icon: GraduationCap },
    { name: "Contact Us",      icon: Phone },
    { name: "Settings",        icon: Settings },
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
    studentCorner:{ title: editItem ? "Edit Section"    : "Add Section",    subtitle: "Student Corner document section" },
  }[modalType] || {};

  return (
    <div
      className="admin-shell flex flex-1 h-full w-full min-h-0 bg-gray-50 text-gray-900 font-sans overflow-hidden relative items-stretch"
      style={{
        display: 'flex',
        height: '100dvh',
        minHeight: '100dvh',
        maxHeight: '100dvh',
        width: '100%',
        overflow: 'hidden',
      }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        html, body, #root {
          height: 100%;
        }
        body:has(.admin-shell) {
          overflow: hidden;
        }
        .admin-shell {
          display: flex !important;
          height: 100dvh !important;
          max-height: 100dvh !important;
          overflow: hidden !important;
        }
        .admin-sidebar {
          height: 100dvh !important;
          max-height: 100dvh !important;
          overflow: hidden !important;
          background:
            linear-gradient(180deg, #6B3F1D 0%, #633815 46%, #4E2B12 100%) !important;
          box-shadow: inset -1px 0 0 rgba(255,255,255,0.07);
        }
        .admin-sidebar nav button {
          min-height: 46px;
          border: 1px solid transparent;
        }
        .admin-sidebar nav button:hover {
          background: rgba(255,255,255,0.09) !important;
          color: rgba(255,255,255,0.9) !important;
          border-color: rgba(255,255,255,0.08);
        }
        .admin-sidebar nav button[style*="rgba(255,255,255,0.12)"] {
          background: rgba(255,255,255,0.15) !important;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08), 0 12px 24px rgba(37, 22, 10, 0.16);
        }
        .admin-main {
          display: flex !important;
          flex-direction: column !important;
          flex: 1 1 auto !important;
          min-width: 0 !important;
          min-height: 0 !important;
          height: 100dvh !important;
          overflow: hidden !important;
        }
        .admin-header {
          height: 64px !important;
          min-height: 64px !important;
        }
        .admin-content-scroll {
          flex: 1 1 auto !important;
          min-height: 0 !important;
          height: calc(100dvh - 64px) !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          overscroll-behavior: contain;
        }
        .admin-page-inner {
          width: 100%;
          max-width: 1580px !important;
        }
        @media (max-width: 1023px) {
          .admin-header {
            height: 56px !important;
            min-height: 56px !important;
          }
          .admin-content-scroll {
            height: calc(100dvh - 56px) !important;
          }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        /* Premium admin scrollbar */
        .admin-scroll::-webkit-scrollbar { width: 8px; }
        .admin-scroll::-webkit-scrollbar-track { background: #F4F1EE; border-radius: 10px; }
        .admin-scroll::-webkit-scrollbar-thumb { background: #C4A882; border-radius: 10px; border: 2px solid #F4F1EE; }
        .admin-scroll::-webkit-scrollbar-thumb:hover { background: #6B3F1D; }
        .admin-scroll { scrollbar-width: thin; scrollbar-color: #C4A882 #F4F1EE; -webkit-overflow-scrolling: touch; }
        .admin-header {
          background:
            linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,252,249,0.96)) !important;
          box-shadow: 0 1px 0 rgba(232, 224, 216, 0.78), 0 10px 30px rgba(65, 42, 22, 0.04);
        }
        .admin-header h2 {
          letter-spacing: 0;
        }
        .admin-header-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 32px;
          padding: 0 12px;
          border: 1px solid #EEE2D6;
          border-radius: 999px;
          color: #6B3F1D;
          background: #FFF8F1;
          font-size: 12px;
          font-weight: 800;
        }
        .admin-header-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #16A34A;
          box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.12);
        }
        .admin-content-scroll {
          background:
            radial-gradient(circle at top right, rgba(224, 123, 57, 0.07), transparent 34%),
            linear-gradient(180deg, #F8F6F3 0%, #F4F1EE 100%);
        }
        .admin-section-header,
        .admin-row-item,
        .admin-department-card {
          border-radius: 18px !important;
          box-shadow: 0 14px 32px rgba(65, 42, 22, 0.055);
        }
        .admin-section-header {
          min-height: 76px;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,248,241,0.88)) !important;
        }
        .admin-section-icon,
        .admin-row-icon {
          box-shadow: inset 0 0 0 1px rgba(224, 123, 57, 0.12);
        }
        .admin-section-title,
        .admin-row-title,
        .admin-department-title {
          letter-spacing: 0;
        }
        .admin-section-subtitle,
        .admin-row-subtitle {
          font-weight: 600;
        }
        .admin-add-btn {
          min-height: 38px;
          border-radius: 999px !important;
          padding-inline: 16px !important;
          background: linear-gradient(135deg, #6B3F1D 0%, #8A4E23 100%) !important;
          box-shadow: 0 12px 22px rgba(107, 63, 29, 0.18);
          white-space: nowrap;
        }
        .admin-icon-btn {
          width: 36px;
          height: 36px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(226, 217, 208, 0.82);
          border-radius: 12px !important;
          box-shadow: 0 6px 14px rgba(17, 24, 39, 0.04);
        }
        .admin-icon-btn.is-danger {
          border-color: rgba(254, 226, 226, 0.95);
        }
        .admin-row-item {
          min-height: 82px;
          background: rgba(255,255,255,0.96) !important;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }
        .admin-row-item:hover {
          transform: translateY(-2px);
          border-color: #D8C6B4 !important;
          box-shadow: 0 18px 38px rgba(65, 42, 22, 0.085);
        }
        .admin-row-actions {
          padding-left: 12px;
        }
        .admin-pill {
          border-radius: 999px !important;
          text-transform: none !important;
          letter-spacing: 0 !important;
          font-size: 12px !important;
          line-height: 1.15;
          padding: 5px 10px !important;
        }
        .admin-department-grid {
          align-items: stretch;
        }
        .admin-department-card {
          min-height: 178px;
          background: rgba(255,255,255,0.96) !important;
          cursor: default;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }
        .admin-department-card:hover {
          border-color: #D8C6B4 !important;
          box-shadow: 0 20px 44px rgba(65, 42, 22, 0.1);
        }
        .admin-department-body {
          align-items: flex-start;
        }
        .admin-department-body > :first-child,
        .admin-media-thumb {
          box-shadow: 0 8px 18px rgba(65, 42, 22, 0.08);
        }
        .admin-department-title {
          white-space: normal !important;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 38px;
          font-size: 15px !important;
          line-height: 1.28 !important;
        }
        .admin-department-meta {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid #F0E7DF;
          letter-spacing: 0 !important;
          text-transform: none !important;
          font-size: 13px !important;
        }
        .admin-department-meta span {
          display: inline-flex;
          align-items: center;
          min-height: 24px;
          padding: 4px 9px;
          border-radius: 999px;
          color: #6F6254;
          background: #F7F2ED;
        }
        .admin-media-thumb {
          width: 72px !important;
          height: 52px !important;
          border-width: 1px !important;
        }
        .admin-subtabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 10px;
          border: 1px solid #E8E0D8;
          border-radius: 16px;
          background: #FFFFFF;
          box-shadow: 0 12px 30px rgba(65, 42, 22, 0.05);
        }
        .admin-subtabs button {
          min-height: 38px;
          border: 1px solid #E6DCD1;
          border-radius: 999px;
          padding: 8px 15px;
          color: #655646;
          background: #FBFAF8;
          font-size: 13px;
          font-weight: 850;
          line-height: 1;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 160ms ease, background 160ms ease, border-color 160ms ease, color 160ms ease, box-shadow 160ms ease;
        }
        .admin-subtabs button:hover {
          transform: translateY(-1px);
          border-color: #CFB69D;
          background: #FFF7EF;
        }
        .admin-subtabs button.is-active {
          color: #FFFFFF;
          border-color: #6B3F1D;
          background: #6B3F1D;
          box-shadow: 0 10px 22px rgba(107, 63, 29, 0.18);
        }
        @media (max-width: 640px) {
          .admin-section-header {
            padding: 16px !important;
          }
          .admin-add-btn {
            width: 100%;
            justify-content: center;
          }
          .admin-row-item {
            align-items: flex-start;
            gap: 12px;
            padding: 14px !important;
          }
          .admin-row-actions {
            opacity: 1 !important;
            padding-left: 0;
          }
          .admin-icon-btn {
            width: 34px;
            height: 34px;
          }
          .admin-subtabs {
            flex-wrap: nowrap;
            overflow-x: auto;
          }
        }
      `}</style>

      <Sidebar isMobile={isMobile} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} selectedDept={selectedDept} setSelectedDept={setSelectedDept} navItems={navItems} onLogout={onLogout} />
      
      <main
        className="admin-main flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-gray-50"
        style={{ height: '100dvh', minHeight: 0, overflow: 'hidden' }}>
        <Header setSidebarOpen={setSidebarOpen} selectedDept={selectedDept} activeTab={activeTab}/>
        <Toast note={note} onDismiss={() => setNote(null)}/>
        
        <div className="admin-content-scroll flex-1 min-h-0 overflow-y-auto admin-scroll p-4 md:p-6 lg:p-8">
          <div className="admin-page-inner max-w-7xl mx-auto pb-24">
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
                  {activeTab === "Student Corner" && <StudentCornerTab sections={studentCornerSections} openModal={openModal} setScForm={setScForm} del={del}/>}
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
        {modalType === "studentCorner" && <StudentCornerForm editItem={editItem} scForm={scForm} setScForm={setScForm} closeModal={closeModal} fetchData={fetchData} notify={notify}/>}
      </Modal>
    </div>
  );
};

export default AdminPanel;
