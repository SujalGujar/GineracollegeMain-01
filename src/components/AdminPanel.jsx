import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Upload, Save, Eye, Trash2, Plus, Edit3, 
  LayoutDashboard, Image as ImageIcon, Settings, 
  LogOut, CheckCircle2, AlertCircle, Loader2,
  ChevronRight, ArrowUpRight
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from 'framer-motion';
import axiosInstance from "../api/axiosInstance";

const defaultCampusImages = [
  {
    id: "1",
    title: "Main Academic Building",
    description: "The iconic main building houses lecture halls, laboratories, and administrative offices.",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY29sbGVnZSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc1ODM5MTQxMnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "campus",
  }
];

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [galleryImages, setGalleryImages] = useState([]);
  const [newImage, setNewImage] = useState({
    title: "",
    description: "",
    imageFile: null,
    imageUrl: "",
    category: "campus",
  });
  const [editingImage, setEditingImage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [imagePreview, setImagePreview] = useState("");
  const [sliderImages, setSliderImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dbStatus, setDbStatus] = useState("checking");

  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      loadImages();
      fetchSliders();
      checkDbConnection();
    }
  }, []);

  const checkDbConnection = async () => {
    try {
      await axiosInstance.get("/sliders");
      setDbStatus("connected");
    } catch (error) {
      setDbStatus("error");
    }
  };

  const fetchSliders = async () => {
    try {
      const response = await axiosInstance.get("/sliders");
      setSliderImages(response.data);
    } catch (error) {
      console.error("Error fetching sliders:", error);
      toast.error("Database connection timed out. Please check your MongoDB whitelist.");
    }
  };

  const loadImages = () => {
    const saved = localStorage.getItem("galleryImages");
    if (saved) {
      setGalleryImages(JSON.parse(saved));
    } else {
      setGalleryImages(defaultCampusImages);
      localStorage.setItem("galleryImages", JSON.stringify(defaultCampusImages));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === "admin" && loginForm.password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      loadImages();
      fetchSliders();
      checkDbConnection();
      toast.success("Welcome back, Administrator!");
    } else {
      toast.error("Invalid credentials!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
    toast("Logged out successfully!");
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file!");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB!");
        return;
      }
      setNewImage({ ...newImage, imageFile: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSliderFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const uploadSliders = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await axiosInstance.post("/sliders/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Slider images uploaded successfully");
      setSelectedFiles([]);
      fetchSliders();
    } catch (error) {
      console.error("Error uploading sliders:", error);
      toast.error("Upload failed. Connection to database timed out.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteSlider = async (id) => {
    if (!confirm("Are you sure you want to delete this slider image?")) return;
    try {
      await axiosInstance.delete(`/sliders/${id}`);
      toast.success("Slider image deleted successfully");
      fetchSliders();
    } catch (error) {
      toast.error("Delete failed. Check database connection.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden relative">
        {/* Animated Background Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md z-10 p-4"
        >
          <Card className="border-white/10 bg-white/5 backdrop-blur-xl text-white shadow-2xl">
            <CardHeader className="text-center space-y-2">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/30">
                <LayoutDashboard className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">Admin Console</CardTitle>
              <CardDescription className="text-slate-400">Secure access to Ginera College Management</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500"
                    placeholder="admin"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500"
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-lg font-semibold mt-4 transition-all">
                  Log In
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">Ginera Admin</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {[
            { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
            { id: "slider", icon: ImageIcon, label: "Hero Slider" },
            { id: "gallery", icon: ImageIcon, label: "Photo Gallery" },
            { id: "settings", icon: Settings, label: "Settings" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? "bg-blue-50 text-blue-600 font-semibold" 
                : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className={`p-4 rounded-xl border flex items-center gap-3 mb-4 ${
            dbStatus === "connected" ? "bg-emerald-50 border-emerald-100" : "bg-red-50 border-red-100"
          }`}>
            {dbStatus === "connected" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <div className="text-xs">
              <p className={`font-bold ${dbStatus === "connected" ? "text-emerald-700" : "text-red-700"}`}>
                DB: {dbStatus === "connected" ? "Connected" : "Timeout Error"}
              </p>
              <p className="text-slate-500">Atlas Cluster 0</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-slate-500 hover:text-red-600 hover:bg-red-50">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 capitalize">{activeTab}</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your college website content</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-full">
              <Eye className="w-4 h-4 mr-2" />
              View Site
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg shadow-blue-600/20">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-3 gap-6"
            >
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Slider Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-900">{sliderImages.length}</span>
                    <span className="text-emerald-500 text-sm font-medium">Live</span>
                  </div>
                </CardContent>
              </Card>
              {/* More dashboard cards... */}
            </motion.div>
          )}

          {activeTab === "slider" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card className="border-slate-200 overflow-hidden shadow-sm">
                <CardHeader className="bg-white border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Hero Slider Management</CardTitle>
                      <CardDescription>Upload and arrange homepage banners</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <div className="sticky top-0 space-y-4">
                        <Label>Upload New Images</Label>
                        <div 
                          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer
                            ${selectedFiles.length > 0 ? "border-blue-400 bg-blue-50/50" : "border-slate-200 hover:border-slate-300 bg-slate-50/50"}`}
                          onClick={() => document.getElementById('slider-input').click()}
                        >
                          <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                          <p className="text-sm font-medium text-slate-700">Click to choose files</p>
                          <p className="text-xs text-slate-500 mt-1">Up to 20 images • Max 5MB each</p>
                          <input 
                            id="slider-input"
                            type="file" 
                            multiple 
                            hidden 
                            onChange={handleSliderFilesChange}
                            accept="image/*"
                          />
                        </div>

                        {selectedFiles.length > 0 && (
                          <div className="p-4 bg-slate-100 rounded-xl">
                            <p className="text-sm font-semibold text-slate-700">{selectedFiles.length} images selected</p>
                            <div className="flex gap-1 mt-2 overflow-x-auto pb-2">
                              {Array.from(selectedFiles).map((f, i) => (
                                <div key={i} className="w-12 h-12 bg-slate-200 rounded flex-shrink-0" />
                              ))}
                            </div>
                          </div>
                        )}

                        <Button 
                          onClick={uploadSliders} 
                          disabled={uploading || selectedFiles.length === 0}
                          className="w-full h-12 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                        >
                          {uploading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 mr-2" />
                              Upload to Database
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="lg:col-span-2">
                      <Label className="mb-4 block">Current Live Sliders</Label>
                      {sliderImages.length === 0 ? (
                        <div className="p-12 text-center border rounded-2xl bg-white flex flex-col items-center">
                          <ImageIcon className="w-12 h-12 text-slate-200 mb-4" />
                          <p className="text-slate-500 font-medium">No slider images uploaded yet</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-4">
                          {sliderImages.map((image, index) => (
                            <motion.div 
                              layout
                              key={image._id} 
                              className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-video"
                            >
                              <img 
                                src={`http://localhost:8080${image.imageUrl}`} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                alt="Slider"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-full font-bold">
                                #{index + 1}
                              </div>
                              <button 
                                onClick={() => handleDeleteSlider(image._id)}
                                className="absolute top-2 right-2 w-8 h-8 bg-red-500/90 backdrop-blur-md text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Add more tabs content like gallery... */}
          {activeTab === "gallery" && (
             <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="space-y-6"
           >
             <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Gallery Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500">Gallery management UI is active. Select "Add Image" to expand.</p>
                  {/* Rest of gallery code... */}
                </CardContent>
             </Card>
           </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}