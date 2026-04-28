import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Image as ImageIcon, BookOpen, Users, Settings,
  LogOut, Plus, Trash2, Edit3, ChevronRight, Upload, FileText,
  X, Menu, Save, CheckCircle2, AlertCircle, Layers, Info,
  ArrowLeft, Building2, Zap, ChevronDown, ChevronUp, Eye
} from "lucide-react";
import axiosInstance from "../api/axiosInstance";

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
       : `${window.location.hostname === 'localhost' ? `${window.location.hostname === 'localhost' ? 'http://localhost:8080' : 'https://gineracollegemain-01.onrender.com'}` + '' : 'https://gineracollegemain-01.onrender.com'}${url}`;

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
        initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border text-sm font-semibold"
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

const Field = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: C.muted }}>{label}</label>
    {children}
  </div>
);

const inputCls = "w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2";
const inputStyle = { borderColor: C.border, "--tw-ring-color": C.accent + "40" };

const Modal = ({ show, onClose, title, subtitle, children }) => (
  <AnimatePresence>
    {show && (
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm"/>
        <motion.div
          initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
          className="relative w-full sm:max-w-2xl max-h-[92dvh] flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: C.surface }}>
          <div className="flex items-start justify-between p-6 border-b shrink-0" style={{ borderColor: C.border, background: C.bg }}>
            <div>
              <h3 className="text-xl font-bold" style={{ color: C.text }}>{title}</h3>
              {subtitle && <p className="text-sm mt-0.5" style={{ color: C.muted }}>{subtitle}</p>}
            </div>
            <button onClick={onClose}
              className="p-2 rounded-full border transition hover:bg-gray-100 shrink-0 ml-4"
              style={{ borderColor: C.border }}>
              <X size={18} style={{ color: C.muted }}/>
            </button>
          </div>
          <div className="overflow-y-auto flex-1 p-6 space-y-5">
            {children}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// ── MODAL FORM COMPONENTS ───────────────────────────────

const ProgramForm = ({ editItem, programForm, setProgramForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => { 
    e.preventDefault(); 
    if (!editItem && !programForm.image) {
      return notify("Please select a cover image", "error");
    }
    const fd=new FormData(); 
    Object.entries(programForm).forEach(([k,v]) => { 
      if(k==="courses") fd.append(k,JSON.stringify(typeof v === 'string' ? v.split(",").map(c=>c.trim()).filter(Boolean) : v)); 
      else if(k==="image"&&v instanceof File) fd.append("image",v); 
      else if(k!=="image" && k!=="courses") fd.append(k,v||""); 
    }); 
    const url=editItem?`/programs/${editItem._id}`:"/programs"; 
    try{
      if(editItem) await axiosInstance.put(url,fd); 
      else await axiosInstance.post(url,fd); 
      notify(editItem?"Updated":"Created"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Program Title"><input required value={programForm.title} onChange={e=>setProgramForm({...programForm,title:e.target.value})} className={inputCls} style={inputStyle} placeholder="e.g. B.Sc. Nursing"/></Field>
      <Field label="Category">
        <select value={programForm.category} onChange={e=>setProgramForm({...programForm,category:e.target.value})} className={inputCls} style={inputStyle}>
          <option>Undergraduate</option><option>Postgraduate</option><option>Diploma</option>
        </select>
      </Field>
    </div>
    <Field label="Description"><textarea required rows={3} value={programForm.description} onChange={e=>setProgramForm({...programForm,description:e.target.value})} className={`${inputCls} resize-none`} style={inputStyle}/></Field>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Duration"><input value={programForm.duration} onChange={e=>setProgramForm({...programForm,duration:e.target.value})} className={inputCls} style={inputStyle} placeholder="e.g. 4 Years"/></Field>
      <Field label="Cover Image">
        <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer hover:bg-gray-50 transition text-sm" style={{ borderColor: C.border, color: C.muted }}>
          <ImageIcon size={16}/>{programForm.image && typeof programForm.image === 'object' ? programForm.image.name : "Select image"}
          <input type="file" className="hidden" onChange={e=>setProgramForm({...programForm,image:e.target.files[0]})} />
        </label>
      </Field>
    </div>
    <Field label="Courses (comma separated)"><textarea rows={2} value={programForm.courses} onChange={e=>setProgramForm({...programForm,courses:e.target.value})} className={`${inputCls} resize-none`} style={inputStyle}/></Field>
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border font-bold text-sm transition hover:bg-gray-50" style={{ borderColor: C.border, color: C.muted }}>Cancel</button>
      <button type="submit" className="flex-[2] py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2" style={{ background: C.brand }}><Save size={16}/>{editItem?"Save Changes":"Create"}</button>
    </div>
  </form>
);

const TestimonialForm = ({ editItem, testimonialForm, setTestimonialForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => { 
    e.preventDefault(); 
    if (!editItem && !testimonialForm.image) {
      return notify("Please select a photo", "error");
    }
    const fd=new FormData(); 
    Object.entries(testimonialForm).forEach(([k,v]) => { 
      if(k==="image"&&v instanceof File) fd.append("image",v); 
      else if(k!=="image") fd.append(k,v); 
    }); 
    const url=editItem?`/testimonials/${editItem._id}`:"/testimonials"; 
    try{
      if(editItem) await axiosInstance.put(url,fd); 
      else await axiosInstance.post(url,fd); 
      notify(editItem?"Updated":"Created"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Student Name"><input required value={testimonialForm.name} onChange={e=>setTestimonialForm({...testimonialForm,name:e.target.value})} className={inputCls} style={inputStyle}/></Field>
      <Field label="Role / Batch"><input required value={testimonialForm.role} onChange={e=>setTestimonialForm({...testimonialForm,role:e.target.value})} className={inputCls} style={inputStyle}/></Field>
    </div>
    <Field label="Testimonial"><textarea required rows={4} value={testimonialForm.content} onChange={e=>setTestimonialForm({...testimonialForm,content:e.target.value})} className={`${inputCls} resize-none`} style={inputStyle}/></Field>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Rating (1–5)"><input type="number" min={1} max={5} value={testimonialForm.rating} onChange={e=>setTestimonialForm({...testimonialForm,rating:parseInt(e.target.value)})} className={inputCls} style={inputStyle}/></Field>
      <Field label="Photo">
        <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer hover:bg-gray-50 text-sm transition" style={{ borderColor: C.border, color: C.muted }}>
          <ImageIcon size={16}/>{testimonialForm.image && typeof testimonialForm.image === 'object' ? testimonialForm.image.name : "Select photo"}
          <input type="file" className="hidden" onChange={e=>setTestimonialForm({...testimonialForm,image:e.target.files[0]})} />
        </label>
      </Field>
    </div>
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border font-bold text-sm hover:bg-gray-50 transition" style={{ borderColor: C.border, color: C.muted }}>Cancel</button>
      <button type="submit" className="flex-[2] py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2" style={{ background: C.brand }}><Save size={16}/>{editItem?"Save Changes":"Create"}</button>
    </div>
  </form>
);

const MilestoneForm = ({ editItem, milestoneForm, setMilestoneForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => { 
    e.preventDefault(); 
    const url=editItem?`/about/milestones/${editItem._id}`:"/about/milestones"; 
    try{
      if(editItem) await axiosInstance.put(url,milestoneForm); 
      else await axiosInstance.post(url,milestoneForm); 
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <Field label="Year"><input required value={milestoneForm.year} onChange={e=>setMilestoneForm({...milestoneForm,year:e.target.value})} placeholder="1963" className={inputCls} style={inputStyle}/></Field>
      <Field label="Icon (emoji)"><input value={milestoneForm.icon} onChange={e=>setMilestoneForm({...milestoneForm,icon:e.target.value})} className={inputCls} style={inputStyle}/></Field>
    </div>
    <Field label="Event Title"><input required value={milestoneForm.event} onChange={e=>setMilestoneForm({...milestoneForm,event:e.target.value})} className={inputCls} style={inputStyle}/></Field>
    <Field label="Accent Color">
      <div className="flex gap-3 items-center">
        <input type="color" value={milestoneForm.color} onChange={e=>setMilestoneForm({...milestoneForm,color:e.target.value})} className="w-12 h-10 rounded-lg border cursor-pointer" style={{ borderColor: C.border }}/>
        <input value={milestoneForm.color} onChange={e=>setMilestoneForm({...milestoneForm,color:e.target.value})} className={`${inputCls} flex-1`} style={inputStyle}/>
      </div>
    </Field>
    <Field label="Description"><textarea required rows={3} value={milestoneForm.description} onChange={e=>setMilestoneForm({...milestoneForm,description:e.target.value})} className={`${inputCls} resize-none`} style={inputStyle}/></Field>
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border font-bold text-sm hover:bg-gray-50" style={{ borderColor: C.border, color: C.muted }}>Cancel</button>
      <button type="submit" className="flex-[2] py-3 rounded-xl text-sm font-bold text-white" style={{ background: C.brand }}>{editItem?"Save":"Add"}</button>
    </div>
  </form>
);

const VisionMissionForm = ({ editItem, vmForm, setVmForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => { 
    e.preventDefault(); 
    const url=editItem?`/about/vision-mission/${editItem._id}`:"/about/vision-mission"; 
    try{
      if(editItem) await axiosInstance.put(url,vmForm); 
      else await axiosInstance.post(url,vmForm); 
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-4">
    <Field label="Type">
      <select value={vmForm.type} onChange={e=>setVmForm({...vmForm,type:e.target.value})} className={inputCls} style={inputStyle}>
        <option value="vision">Vision</option><option value="mission">Mission</option>
      </select>
    </Field>
    <Field label="Content"><textarea required rows={4} value={vmForm.content} onChange={e=>setVmForm({...vmForm,content:e.target.value})} className={`${inputCls} resize-none`} style={inputStyle}/></Field>
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border font-bold text-sm hover:bg-gray-50" style={{ borderColor: C.border, color: C.muted }}>Cancel</button>
      <button type="submit" className="flex-[2] py-3 rounded-xl text-sm font-bold text-white" style={{ background: C.brand }}>{editItem?"Update":"Add"}</button>
    </div>
  </form>
);

const CoreValueForm = ({ editItem, cvForm, setCvForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => { 
    e.preventDefault(); 
    const url=editItem?`/about/core-values/${editItem._id}`:"/about/core-values"; 
    try{
      if(editItem) await axiosInstance.put(url,cvForm); 
      else await axiosInstance.post(url,cvForm); 
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <Field label="Title"><input required value={cvForm.title} onChange={e=>setCvForm({...cvForm,title:e.target.value})} className={inputCls} style={inputStyle}/></Field>
      <Field label="Icon (emoji)"><input value={cvForm.icon} onChange={e=>setCvForm({...cvForm,icon:e.target.value})} className={inputCls} style={inputStyle}/></Field>
    </div>
    <Field label="Description"><textarea required rows={3} value={cvForm.description} onChange={e=>setCvForm({...cvForm,description:e.target.value})} className={`${inputCls} resize-none`} style={inputStyle}/></Field>
    <Field label="Gradient (Tailwind classes)"><input value={cvForm.color} onChange={e=>setCvForm({...cvForm,color:e.target.value})} placeholder="from-amber-500 to-orange-500" className={inputCls} style={inputStyle}/></Field>
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border font-bold text-sm hover:bg-gray-50" style={{ borderColor: C.border, color: C.muted }}>Cancel</button>
      <button type="submit" className="flex-[2] py-3 rounded-xl text-sm font-bold text-white" style={{ background: C.brand }}>{editItem?"Update":"Add"}</button>
    </div>
  </form>
);

const CourseForm = ({ editItem, courseForm, setCourseForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => { 
    e.preventDefault(); 
    const url=editItem?`/courses/${editItem._id}`:"/courses"; 
    try{
      if(editItem) await axiosInstance.put(url,courseForm); 
      else await axiosInstance.post(url,courseForm); 
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Name"><input required value={courseForm.name} onChange={e=>setCourseForm({...courseForm,name:e.target.value})} className={inputCls} style={inputStyle}/></Field>
      <Field label="Category">
        <select value={courseForm.category} onChange={e=>setCourseForm({...courseForm,category:e.target.value})} className={inputCls} style={inputStyle}>
          <option>Undergraduate Programs</option><option>Postgraduate Programs</option><option>Diploma Programs</option>
        </select>
      </Field>
      <Field label="Duration"><input value={courseForm.duration} onChange={e=>setCourseForm({...courseForm,duration:e.target.value})} className={inputCls} style={inputStyle}/></Field>
      <Field label="Seats"><input value={courseForm.seats} onChange={e=>setCourseForm({...courseForm,seats:e.target.value})} className={inputCls} style={inputStyle}/></Field>
      <Field label="Icon (emoji)"><input value={courseForm.icon} onChange={e=>setCourseForm({...courseForm,icon:e.target.value})} className={inputCls} style={inputStyle}/></Field>
    </div>
    <Field label="Eligibility"><textarea rows={2} value={courseForm.eligibility} onChange={e=>setCourseForm({...courseForm,eligibility:e.target.value})} className={`${inputCls} resize-none`} style={inputStyle}/></Field>
    <Field label="Highlights (comma separated)"><textarea rows={2} value={courseForm.highlights} onChange={e=>setCourseForm({...courseForm,highlights:e.target.value})} className={`${inputCls} resize-none`} style={inputStyle}/></Field>
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border font-bold text-sm hover:bg-gray-50" style={{ borderColor: C.border, color: C.muted }}>Cancel</button>
      <button type="submit" className="flex-[2] py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2" style={{ background: C.brand }}><Save size={16}/>{editItem?"Save Changes":"Create"}</button>
    </div>
  </form>
);

const StepForm = ({ editItem, stepForm, setStepForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => { 
    e.preventDefault(); 
    const url=editItem?`/admission-steps/${editItem._id}`:"/admission-steps"; 
    try{
      if(editItem) await axiosInstance.put(url,stepForm); 
      else await axiosInstance.post(url,stepForm); 
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <Field label="Step #"><input type="number" required value={stepForm.step} onChange={e=>setStepForm({...stepForm,step:parseInt(e.target.value)})} className={inputCls} style={inputStyle}/></Field>
      <Field label="Icon">
        <select value={stepForm.icon} onChange={e=>setStepForm({...stepForm,icon:e.target.value})} className={inputCls} style={inputStyle}>
          {["Calendar","Users","CheckCircle","GraduationCap","FileText","Download"].map(i=><option key={i}>{i}</option>)}
        </select>
      </Field>
    </div>
    <Field label="Title"><input required value={stepForm.title} onChange={e=>setStepForm({...stepForm,title:e.target.value})} className={inputCls} style={inputStyle}/></Field>
    <Field label="Description"><textarea required rows={3} value={stepForm.description} onChange={e=>setStepForm({...stepForm,description:e.target.value})} className={`${inputCls} resize-none`} style={inputStyle}/></Field>
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border font-bold text-sm hover:bg-gray-50" style={{ borderColor: C.border, color: C.muted }}>Cancel</button>
      <button type="submit" className="flex-[2] py-3 rounded-xl text-sm font-bold text-white" style={{ background: C.brand }}>{editItem?"Save":"Add"} Step</button>
    </div>
  </form>
);

const RuleForm = ({ editItem, ruleForm, setRuleForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => { 
    e.preventDefault(); 
    const url=editItem?`/admission-rules/${editItem._id}`:"/admission-rules"; 
    try{
      if(editItem) await axiosInstance.put(url,ruleForm); 
      else await axiosInstance.post(url,ruleForm); 
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Category">
        <select value={ruleForm.category} onChange={e=>setRuleForm({...ruleForm,category:e.target.value})} className={inputCls} style={inputStyle}>
          <option>UnderGraduated Programs</option><option>PostGraduated Programs</option><option>General Rules</option>
        </select>
      </Field>
      <Field label="Icon">
        <select value={ruleForm.icon} onChange={e=>setRuleForm({...ruleForm,icon:e.target.value})} className={inputCls} style={inputStyle}>
          {["CheckCircle","Calendar","Stethoscope","GraduationCap","Info"].map(i=><option key={i}>{i}</option>)}
        </select>
      </Field>
    </div>
    <Field label="Title"><input required value={ruleForm.title} onChange={e=>setRuleForm({...ruleForm,title:e.target.value})} className={inputCls} style={inputStyle}/></Field>
    <Field label="Description"><textarea required rows={4} value={ruleForm.description} onChange={e=>setRuleForm({...ruleForm,description:e.target.value})} className={`${inputCls} resize-none`} style={inputStyle}/></Field>
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border font-bold text-sm hover:bg-gray-50" style={{ borderColor: C.border, color: C.muted }}>Cancel</button>
      <button type="submit" className="flex-[2] py-3 rounded-xl text-sm font-bold text-white" style={{ background: C.brand }}>{editItem?"Save":"Add"} Rule</button>
    </div>
  </form>
);

const BondForm = ({ editItem, bondForm, setBondForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => { 
    e.preventDefault(); 
    const url=editItem?`/bonds/${editItem._id}`:"/bonds"; 
    try{
      if(editItem) await axiosInstance.put(url,bondForm); 
      else await axiosInstance.post(url,bondForm); 
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-4">
    <Field label="Title"><input required value={bondForm.title} onChange={e=>setBondForm({...bondForm,title:e.target.value})} className={inputCls} style={inputStyle}/></Field>
    <Field label="Content"><textarea required rows={4} value={bondForm.content} onChange={e=>setBondForm({...bondForm,content:e.target.value})} className={`${inputCls} resize-none`} style={inputStyle}/></Field>
    <Field label="Display Order"><input type="number" value={bondForm.order} onChange={e=>setBondForm({...bondForm,order:parseInt(e.target.value)})} className={inputCls} style={inputStyle}/></Field>
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border font-bold text-sm hover:bg-gray-50" style={{ borderColor: C.border, color: C.muted }}>Cancel</button>
      <button type="submit" className="flex-[2] py-3 rounded-xl text-sm font-bold text-white" style={{ background: C.brand }}>{editItem?"Update":"Add"}</button>
    </div>
  </form>
);

const GuidelineForm = ({ editItem, guidelineForm, setGuidelineForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => { 
    e.preventDefault(); 
    const data={...guidelineForm,points:typeof guidelineForm.points==="string"?guidelineForm.points.split("\n").filter(p=>p.trim()):guidelineForm.points}; 
    const url=editItem?`/guidelines/${editItem._id}`:"/guidelines"; 
    try{
      if(editItem) await axiosInstance.put(url,data); 
      else await axiosInstance.post(url,data); 
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Category">
        <select value={guidelineForm.category} onChange={e=>setGuidelineForm({...guidelineForm,category:e.target.value})} className={inputCls} style={inputStyle}>
          {["General Guidelines","Code of Conduct","Academic Requirements","For Parents/Guardians","Contact Information"].map(c=><option key={c}>{c}</option>)}
        </select>
      </Field>
      <Field label="Sub-Category / Title"><input required value={guidelineForm.subCategory} onChange={e=>setGuidelineForm({...guidelineForm,subCategory:e.target.value})} className={inputCls} style={inputStyle}/></Field>
    </div>
    <Field label="Points (one per line)"><textarea required rows={6} value={guidelineForm.points} onChange={e=>setGuidelineForm({...guidelineForm,points:e.target.value})} className={`${inputCls} resize-none`} style={inputStyle}/></Field>
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border font-bold text-sm hover:bg-gray-50" style={{ borderColor: C.border, color: C.muted }}>Cancel</button>
      <button type="submit" className="flex-[2] py-3 rounded-xl text-sm font-bold text-white" style={{ background: C.brand }}>{editItem?"Update":"Add"}</button>
    </div>
  </form>
);

const DeptForm = ({ editItem, deptForm, setDeptForm, closeModal, fetchData, notify }) => (
  <form onSubmit={async e => { 
    e.preventDefault(); 
    const url=editItem?`/departments/${editItem._id}`:"/departments"; 
    try{
      if(editItem) await axiosInstance.put(url,deptForm); 
      else await axiosInstance.post("/departments",deptForm); 
      notify("Saved"); closeModal(); fetchData();
    } catch { notify("Failed","error"); }
  }} className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Name"><input required value={deptForm.name} onChange={e=>setDeptForm({...deptForm,name:e.target.value})} className={inputCls} style={inputStyle}/></Field>
      <Field label="URL Slug (fixed ID)"><input required value={deptForm.slug} onChange={e=>setDeptForm({...deptForm,slug:e.target.value.toLowerCase().replace(/\s+/g,'-')})} className={inputCls} style={inputStyle} placeholder="e.g. fundamentals"/></Field>
      <Field label="Category"><input required value={deptForm.category} onChange={e=>setDeptForm({...deptForm,category:e.target.value})} className={inputCls} style={inputStyle}/></Field>
      <Field label="Icon (emoji)"><input value={deptForm.icon} onChange={e=>setDeptForm({...deptForm,icon:e.target.value})} className={inputCls} style={inputStyle}/></Field>
    </div>
    <Field label="Short Description"><input required value={deptForm.description} onChange={e=>setDeptForm({...deptForm,description:e.target.value})} className={inputCls} style={inputStyle}/></Field>
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border font-bold text-sm hover:bg-gray-50" style={{ borderColor: C.border, color: C.muted }}>Cancel</button>
      <button type="submit" className="flex-[2] py-3 rounded-xl text-sm font-bold text-white" style={{ background: C.brand }}>{editItem?"Update":"Create"}</button>
    </div>
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
  <div className="flex flex-col h-full">
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

    <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar scrollbar-hide">
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

const Sidebar = ({ sidebarOpen, setSidebarOpen, ...props }) => (
  <>
    <aside className="hidden lg:flex flex-col w-80 shrink-0 h-full border-r border-black/10"
           style={{ background: C.brand }}>
      <SidebarContent onClose={null} {...props} />
    </aside>

    <AnimatePresence>
      {sidebarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden"/>
          <motion.aside
            initial={{ x: -340 }} animate={{ x: 0 }} exit={{ x: -340 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-[110] w-80 flex flex-col lg:hidden shadow-2xl"
            style={{ background: C.brand }}>
            <SidebarContent onClose={() => setSidebarOpen(false)} {...props} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
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

    <div className="grid grid-cols-1 gap-3">
      {programs.map(p => (
        <RowItem key={p._id}
          left={<div className="w-16 h-12 rounded-xl overflow-hidden border-2 shrink-0 shadow-sm" style={{ borderColor: C.border }}>
            <img src={imgUrl(p.imageUrl)} className="w-full h-full object-cover" alt=""/>
          </div>}
          badge={p.category} title={p.title} sub={p.duration}
          onEdit={() => { setProgramForm({ title:p.title,description:p.description,duration:p.duration,category:p.category,courses:p.courses?.join(", ")||"",image:null }); openModal("program",p); }}
          onDelete={() => del(`/programs/${p._id}`)}/>
      ))}
      {programs.length === 0 && <EmptyState icon={BookOpen} text="No programs registered yet"/>}
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
          className="p-5 rounded-2xl group relative shadow-sm transition-all hover:shadow-md" style={{ background: C.surface, border:`1px solid ${C.border}` }}>
          <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <IconBtn onClick={() => { setTestimonialForm({name:t.name,role:t.role,content:t.content,rating:t.rating,image:null}); openModal("testimonial",t); }}><Edit3 size={14}/></IconBtn>
            <IconBtn danger onClick={() => del(`/testimonials/${t._id}`)}><Trash2 size={14}/></IconBtn>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <img src={imgUrl(t.imageUrl)} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 shadow-inner" style={{ borderColor: C.accentSoft }}/>
            <div>
              <p className="font-bold text-sm" style={{ color: C.text }}>{t.name}</p>
              <p className="text-xs font-medium" style={{ color: C.muted }}>{t.role}</p>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_,i) => <span key={i} className="text-sm" style={{ color: i < t.rating ? "#F59E0B" : C.border }}>★</span>)}
              </div>
            </div>
          </div>
          <p className="text-xs leading-relaxed italic text-gray-600 line-clamp-4">"{t.content}"</p>
        </motion.div>
      ))}
      {testimonials.length === 0 && <div className="col-span-full"><EmptyState icon={Users} text="No testimonials available"/></div>}
    </div>
  </div>
);

const AboutTab = ({ aboutSub, setAboutSub, collegeLogo, setCollegeLogo, logoFile, setLogoFile, deanMessage, setDeanMessage, deanPhotoFile, setDeanPhotoFile, milestones, milestoneForm, setMilestoneForm, openModal, setMilestones, visionMission, setVmForm, coreValues, setCvForm, axiosInstance, notify, del }) => (
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
            <button onClick={async()=>{ const fd=new FormData(); ["name","title","greeting","highlight"].forEach(k=>fd.append(k,deanMessage[k]||"")); fd.append("paragraphs",JSON.stringify(deanMessage.paragraphs||[])); fd.append("stats",JSON.stringify(deanMessage.stats||[])); if(deanPhotoFile) fd.append("photo",deanPhotoFile); try{const r=await axiosInstance.put("/about/dean",fd); setDeanMessage(r.data); setDeanPhotoFile(null); notify("Message Updated Successfully");}catch{notify("Update failed","error");}}}
              className="w-full sm:w-auto px-10 py-3.5 rounded-xl text-sm font-bold text-white shadow-xl active:scale-95 transition-all" style={{ background: C.brand }}>Publish Message</button>
          </div>
        )}

        {aboutSub === "Timeline" && (
          <div className="space-y-6">
            <SectionHeader icon={Zap} title="Historical Milestones" subtitle={`Tracing our growth since inception`}
              action={<AddBtn onClick={() => { setMilestoneForm({year:"",event:"",icon:"🎯",color:"#1e3a8a",description:""}); openModal("milestone"); }} label="New Milestone"/>}/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                  <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconBtn onClick={() => { setMilestoneForm({year:m.year,event:m.event,icon:m.icon,color:m.color,description:m.description}); openModal("milestone",m); }}><Edit3 size={13}/></IconBtn>
                    <IconBtn danger onClick={async()=>{ try{await axiosInstance.delete(`/about/milestones/${m._id}`); setMilestones(milestones.filter(x=>x._id!==m._id)); notify("Milestone Removed");}catch{notify("Delete failed","error");}}}><Trash2 size={13}/></IconBtn>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {aboutSub === "Vision & Mission" && (
           <div className="space-y-6">
             <SectionHeader icon={Info} title="Vision & Mission" subtitle="Strategic direction statements"
                action={<AddBtn onClick={() => { setVmForm({type:"vision",content:"",order:0}); openModal("visionMission"); }} label="Add Statement"/>}/>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {["vision","mission"].map(type => (
                  <div key={type} className="space-y-3">
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
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
    <SubTabs tabs={["Courses","Procedure","Eligibility","Student Bond","Guidelines"]} active={admSub} onChange={setAdmSub}/>
    
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

    {admSub === "Student Bond" && (
      <div className="space-y-6">
        <SectionHeader icon={FileText} title="Legal Bond Agreement" subtitle="Institutional agreement points"
          action={<AddBtn onClick={() => { setBondForm({type:"student",title:"",content:"",order:0}); openModal("bond"); }} label="Add Point"/>}/>
        <div className="grid grid-cols-1 gap-3">
          {bonds.filter(b=>b.type==="student").map(b => <RowItem key={b._id} icon={<FileText size={20} style={{color:C.accent}}/>} title={b.title} sub={b.content?.slice(0,100)+"..."}
            onEdit={() => { setBondForm({...b}); openModal("bond",b); }} onDelete={() => del(`/bonds/${b._id}`)}/>)}
        </div>
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
  if (!selectedDept) return (
    <div className="space-y-6">
      <SectionHeader icon={Building2} title="Academic Departments" subtitle={`Managing ${departments.length} nursing specialties`}
        action={<AddBtn onClick={() => { setDeptForm({name:"",slug:"",category:"Nursing Department",description:"",overview:"",overview2:"",faculty:[],facilities:[],activities:[],icon:"🏥"}); openModal("department"); }} label="New Department"/>}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map(d => (
          <motion.div key={d._id} whileHover={{ y:-4, shadow:"0 12px 24px -10px rgba(0,0,0,0.1)" }}
            onClick={() => { setSelectedDept(d); setDeptForm({...d}); setDeptSub("Overview"); }}
            className="p-6 rounded-3xl cursor-pointer group transition-all relative overflow-hidden"
            style={{ background: C.surface, border:`1px solid ${C.border}` }}>
            <div className={`absolute top-0 right-0 w-20 h-20 bg-amber-500 opacity-[0.02] rounded-bl-[80px] group-hover:opacity-[0.06] transition-all`}/>
            <div className="flex items-center gap-4 mb-5">
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300 block drop-shadow-sm">{d.icon||"🏥"}</span>
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
          <button onClick={() => setSelectedDept(null)} className="p-3 rounded-2xl hover:bg-gray-50 transition-all shrink-0 border shadow-sm group" style={{ borderColor: C.border, color: C.muted }}>
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/>
          </button>
          <span className="text-4xl shrink-0 drop-shadow-sm">{deptForm.icon||"🏥"}</span>
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
              await axiosInstance.put(`/departments/${selectedDept._id}`, deptForm);
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <Field label="Department Display Name"><input value={deptForm.name} onChange={e=>setDeptForm({...deptForm,name:e.target.value})} className={inputCls} style={inputStyle}/></Field>
                <Field label="URL Slug (fixed ID)"><input value={deptForm.slug} onChange={e=>setDeptForm({...deptForm,slug:e.target.value})} className={inputCls} style={inputStyle} readOnly/></Field>
                <Field label="Academic Category"><input value={deptForm.category} onChange={e=>setDeptForm({...deptForm,category:e.target.value})} className={inputCls} style={inputStyle}/></Field>
                <Field label="Identity Icon (Emoji)"><input value={deptForm.icon} onChange={e=>setDeptForm({...deptForm,icon:e.target.value})} className={inputCls} style={inputStyle}/></Field>
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
                  <input key={k} placeholder={k.charAt(0).toUpperCase()+k.slice(1)} value={deptFacultyForm[k]}
                    onChange={e=>setDeptFacultyForm({...deptFacultyForm,[k]:e.target.value})}
                    className={inputCls} style={inputStyle}/>
                ))}
                <button onClick={() => { if(!deptFacultyForm.name) return; setDeptForm({...deptForm,faculty:[...deptForm.faculty,deptFacultyForm]}); setDeptFacultyForm({name:"",designation:"",qualification:"",specialization:""}); }}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-white shadow hover:opacity-90 active:scale-95 transition-all" style={{ background: C.brand }}>Add Staff</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deptForm.faculty.map((f,i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl shadow-sm border group hover:border-amber-200 transition-all" style={{ background: C.bg, borderColor: C.border }}>
                    <div className="min-w-0">
                      <p className="font-bold text-sm truncate" style={{ color: C.text }}>{f.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-[10px] font-bold uppercase text-amber-600">{f.designation}</p>
                        <span className="w-1 h-1 rounded-full bg-gray-300"/>
                        <p className="text-[10px] font-medium text-gray-500 truncate">{f.qualification}</p>
                      </div>
                    </div>
                    <IconBtn danger onClick={() => setDeptForm({...deptForm,faculty:deptForm.faculty.filter((_,idx)=>idx!==i)})}><Trash2 size={15}/></IconBtn>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(deptSub === "Facilities" || deptSub === "Activities") && (() => {
            const key = deptSub === "Facilities" ? "facilities" : "activities";
            const input = deptSub === "Facilities" ? deptFacilityInput : deptActivityInput;
            const setInput = deptSub === "Facilities" ? setDeptFacilityInput : setDeptActivityInput;
            const add = () => { if(!input.trim()) return; setDeptForm({...deptForm,[key]:[...deptForm[key],input.trim()]}); setInput(""); };
            return (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex gap-3">
                  <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()}
                    placeholder={`Describe new ${deptSub.toLowerCase()} point...`} className={`${inputCls} flex-1 shadow-sm`} style={inputStyle}/>
                  <button onClick={add} className="px-6 py-2.5 rounded-xl font-bold text-white shadow-lg hover:opacity-90 active:scale-95 transition-all shrink-0" style={{ background: C.brand }}><Plus size={20}/></button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {deptForm[key].map((item,i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl group transition-all hover:bg-gray-50 border shadow-sm" style={{ background: C.bg, borderColor: C.border }}>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0">
                          <span className="text-[10px] font-bold" style={{ color: C.accent }}>{i+1}</span>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: C.text }}>{item}</p>
                      </div>
                      <IconBtn danger onClick={() => setDeptForm({...deptForm,[key]:deptForm[key].filter((_,idx)=>idx!==i)})}><Trash2 size={14}/></IconBtn>
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
    if (!editItem && !formState.image) {
      return notify("Please select an image", "error");
    }
    const fd = new FormData(); 
    if(formState.image instanceof File) fd.append("image", formState.image); 
    fd.append("title", formState.title || "");
    fd.append("description", formState.description || "");
    fd.append("category", formState.category || "college_campus_view");
    
    const url = editItem ? `/gallery/${editItem._id}` : "/gallery"; 
    try {
      if(editItem) await axiosInstance.put(url, fd); 
      else await axiosInstance.post(url, fd); 
      notify(editItem ? "Updated" : "Created"); closeModal(); fetchData();
    } catch { notify("Failed", "error"); }
  }} className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Title"><input required value={formState.title} onChange={e=>setFormState({...formState,title:e.target.value})} className={inputCls} style={inputStyle} placeholder="e.g. Main Academic Building"/></Field>
      <Field label="Category">
        <select value={formState.category} onChange={e=>setFormState({...formState,category:e.target.value})} className={inputCls} style={inputStyle}>
          <option value="college_campus_view">College Campus View</option>
          <option value="college_highlight">College Highlight</option>
          <option value="hospital">Hospital Main/Additional Images</option>
          <option value="hospital_facility">Hospital Facility & Department</option>
          <option value="event">Main/Additional Event Images</option>
          <option value="event_academic">Academic Events</option>
          <option value="event_cultural">Cultural Events</option>
          <option value="event_sports">Sports Events</option>
          <option value="event_community">Community Service Events</option>
        </select>
      </Field>
    </div>
    <Field label="Description"><textarea rows={3} value={formState.description} onChange={e=>setFormState({...formState,description:e.target.value})} className={`${inputCls} resize-none`} style={inputStyle}/></Field>
    <Field label="Image">
      <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer hover:bg-gray-50 transition text-sm" style={{ borderColor: C.border, color: C.muted }}>
        <ImageIcon size={16}/>{formState.image && typeof formState.image === 'object' ? formState.image.name : "Select image"}
        <input type="file" className="hidden" onChange={e=>setFormState({...formState,image:e.target.files[0]})} />
      </label>
    </Field>
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border font-bold text-sm transition hover:bg-gray-50" style={{ borderColor: C.border, color: C.muted }}>Cancel</button>
      <button type="submit" className="flex-1 py-3 rounded-xl font-bold text-sm transition" style={{ background: C.accent, color: "#fff" }}>{editItem ? "Save Changes" : "Create Image"}</button>
    </div>
  </form>
);

const GalleryTab = ({ galleryImages, galleryForm, setGalleryForm, openModal, del }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: C.text }}>Photo Gallery</h2>
        <p className="text-sm mt-1" style={{ color: C.muted }}>Manage all photos in the gallery</p>
      </div>
      <button onClick={() => { setGalleryForm({ title:"", description:"", category:"college_campus_view", image:null }); openModal("gallery"); }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition hover:opacity-90 shadow-sm" style={{ background: C.accent, color: "#fff" }}><Plus size={16}/>Add Photo</button>
    </div>
    <div className="grid grid-cols-1 gap-3">
      {galleryImages.map(img => (
        <RowItem key={img._id}
          left={<div className="w-16 h-12 rounded-xl overflow-hidden border-2 shrink-0 shadow-sm" style={{ borderColor: C.border }}>
            <img src={imgUrl(img.imageUrl)} className="w-full h-full object-cover" alt=""/>
          </div>}
          badge={img.category.replace(/_/g, ' ')} title={img.title} sub={img.description?.substring(0, 50) + "..."}
          onEdit={() => { setGalleryForm({ ...img, image: null }); openModal("gallery", img); }}
          onDelete={() => del(`/gallery/${img._id}`)}/>
      ))}
      {galleryImages.length === 0 && <EmptyState icon={ImageIcon} text="No gallery photos yet. Add your first photo." />}
    </div>
  </div>
);

// ── MAIN ADMIN PANEL ─────────────────────────────────────

const AdminPanel = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("Home Page");
  const [aboutSub, setAboutSub] = useState("Branding");
  const [admSub, setAdmSub] = useState("Courses");
  const [deptSub, setDeptSub] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDeptForSlider, setSelectedDeptForSlider] = useState("null");
  const [selectedDept, setSelectedDept] = useState(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editItem, setEditItem] = useState(null);

  // Data
  const [sliders, setSliders] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [academicContent, setAcademicContent] = useState({ title: "", description1: "", description2: "" });
  const [milestones, setMilestones] = useState([]);
  const [deanMessage, setDeanMessage] = useState({ name:"",title:"",greeting:"",paragraphs:[],highlight:"",photoUrl:"",stats:[] });
  const [collegeLogo, setCollegeLogo] = useState({ logoUrl:"",collegeName:"",tagline:"" });
  const [visionMission, setVisionMission] = useState([]);
  const [coreValues, setCoreValues] = useState([]);
  const [courses, setCourses] = useState([]);
  const [admissionSteps, setAdmissionSteps] = useState([]);
  const [admissionRules, setAdmissionRules] = useState([]);
  const [bonds, setBonds] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
  const [departments, setDepartments] = useState([]);

  // Form States
  const [programForm, setProgramForm] = useState({ title:"",description:"",duration:"",category:"Undergraduate",courses:"",image:null });
  const [testimonialForm, setTestimonialForm] = useState({ name:"",role:"",content:"",rating:5,image:null });
  const [milestoneForm, setMilestoneForm] = useState({ year:"",event:"",icon:"🎯",color:"#1e3a8a",description:"" });
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

  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryForm, setGalleryForm] = useState({ title:"", description:"", category:"college_campus_view", image:null });

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
      ]);
      setPrograms(r[0].data); setTestimonials(r[1].data); setAcademicContent(r[2].data);
      setMilestones(r[3].data); setDeanMessage(r[4].data); setCollegeLogo(r[5].data);
      setVisionMission(r[6].data); setCoreValues(r[7].data); setCourses(r[8].data);
      setAdmissionSteps(r[9].data); setAdmissionRules(r[10].data); setBonds(r[11].data);
      setGuidelines(r[12].data); setDepartments(r[13].data); setSliders(r[14].data); setGalleryImages(r[15].data);
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
    { name: "Home Page",    icon: ImageIcon },
    { name: "Academic",     icon: BookOpen },
    { name: "Testimonials", icon: Users },
    { name: "About Us",     icon: Info },
    { name: "Admission",    icon: Layers },
    { name: "Departments",  icon: Building2 },
    { name: "Gallery",      icon: ImageIcon },
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
  }[modalType] || {};

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-thumb { background: #D1C7BC; border-radius: 10px; }
      `}</style>

      <Toast note={note}/>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} selectedDept={selectedDept} setSelectedDept={setSelectedDept} navItems={navItems} onLogout={onLogout}/>
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} selectedDept={selectedDept} activeTab={activeTab}/>
        
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: C.accent, borderTopColor: "transparent" }}/>
              </div>
            )}
            {!loading && (
              <AnimatePresence mode="wait">
                <motion.div key={activeTab + (selectedDept?._id || "")} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }} transition={{ duration:0.25 }}>
                  {activeTab === "Home Page" && <HomeTab selectedDeptForSlider={selectedDeptForSlider} setSelectedDeptForSlider={setSelectedDeptForSlider} departments={departments} sliders={sliders} handleSliderUpload={handleSliderUpload} updateSliderImage={updateSliderImage} del={del}/>}
                  {activeTab === "Academic" && <AcademicTab programs={programs} academicContent={academicContent} setAcademicContent={setAcademicContent} axiosInstance={axiosInstance} notify={notify} openModal={openModal} setProgramForm={setProgramForm} del={del}/>}
                  {activeTab === "Testimonials" && <TestimonialsTab testimonials={testimonials} testimonialForm={testimonialForm} setTestimonialForm={setTestimonialForm} openModal={openModal} del={del}/>}
                  {activeTab === "About Us" && <AboutTab aboutSub={aboutSub} setAboutSub={setAboutSub} collegeLogo={collegeLogo} setCollegeLogo={setCollegeLogo} logoFile={logoFile} setLogoFile={setLogoFile} deanMessage={deanMessage} setDeanMessage={setDeanMessage} deanPhotoFile={deanPhotoFile} setDeanPhotoFile={setDeanPhotoFile} milestones={milestones} milestoneForm={milestoneForm} setMilestoneForm={setMilestoneForm} openModal={openModal} setMilestones={setMilestones} visionMission={visionMission} setVmForm={setVmForm} coreValues={coreValues} setCvForm={setCvForm} axiosInstance={axiosInstance} notify={notify} del={del}/>}
                  {activeTab === "Admission" && <AdmissionTab admSub={admSub} setAdmSub={setAdmSub} courses={courses} openModal={openModal} setCourseForm={setCourseForm} del={del} admissionSteps={admissionSteps} setStepForm={setStepForm} admissionRules={admissionRules} setRuleForm={setRuleForm} bonds={bonds} setBondForm={setBondForm} guidelines={guidelines} setGuidelineForm={setGuidelineForm}/>}
                  {activeTab === "Departments" && <DepartmentsTab selectedDept={selectedDept} setSelectedDept={setSelectedDept} departments={departments} deptForm={deptForm} setDeptForm={setDeptForm} deptSub={deptSub} setDeptSub={setDeptSub} deptFacultyForm={deptFacultyForm} setDeptFacultyForm={setDeptFacultyForm} deptFacilityInput={deptFacilityInput} setDeptFacilityInput={setDeptFacilityInput} deptActivityInput={deptActivityInput} setDeptActivityInput={setDeptActivityInput} sliders={sliders} axiosInstance={axiosInstance} fetchData={fetchData} notify={notify} openModal={openModal} del={del} handleSliderUpload={handleSliderUpload}/>}
                  {activeTab === "Gallery" && <GalleryTab galleryImages={galleryImages} galleryForm={galleryForm} setGalleryForm={setGalleryForm} openModal={openModal} del={del} />}
                  {activeTab === "Settings" && (
                    <div className="flex flex-col items-center justify-center py-32 text-center" style={{ color: C.muted }}>
                      <Settings size={48} className="mb-4 opacity-30"/>
                      <p className="font-semibold">Settings Console — feature coming soon</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
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
      </Modal>
    </div>
  );
};

export default AdminPanel;