import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Upload, Save, Eye, Trash2, Plus, Edit3 } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { motion } from 'framer-motion';

const defaultCampusImages = [
  {
    id: "1",
    title: "Main Academic Building",
    description:
      "The iconic main building houses lecture halls, laboratories, and administrative offices. Built in 1960, it represents the architectural heritage of our institution.",
    imageUrl:
      "https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY29sbGVnZSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc1ODM5MTQxMnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "campus",
  },
  {
    id: "2",
    title: "Modern Library Complex",
    description:
      "State-of-the-art library facility with digital resources, study halls, and research areas. Open 24/7 for students with extensive medical literature collection.",
    imageUrl:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbGlicmFyeXxlbnwxfHx8fDE3NTgzOTE0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "campus",
  },
  {
    id: "3",
    title: "Student Recreation Center",
    description:
      "Modern recreational facilities including sports complex, student lounge, and cafeteria. A perfect place for students to relax and engage in extracurricular activities.",
    imageUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwY2VudGVyfGVufDF8fHx8MTc1ODM5MTQxMnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "campus",
  },
];

const defaultHospitalImages = [
  {
    id: "h1",
    title: "Advanced Medical Equipment",
    description:
      "State-of-the-art diagnostic and treatment equipment for comprehensive patient care and medical education.",
    imageUrl:
      "https://images.unsplash.com/photo-1595464144526-5fb181b74625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMG1lZGljYWwlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzU4MzY5Mzk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "hospital",
  },
];

const defaultEventImages = [
  {
    id: "e1",
    title: "Graduation Ceremony 2024",
    description:
      "Annual convocation ceremony celebrating our graduating doctors and their achievements in medical education.",
    imageUrl:
      "https://images.unsplash.com/photo-1757143137392-0b1e1a27a7de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3R1ZGVudHMlMjBncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzU4MzkwNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "events",
  },
];

export function AdminPanel() {
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

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem("adminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      loadImages();
    }
  }, []);

  const loadImages = () => {
    const saved = localStorage.getItem("galleryImages");
    if (saved) {
      setGalleryImages(JSON.parse(saved));
    } else {
      // Initialize with default images
      const allDefaults = [
        ...defaultCampusImages,
        ...defaultHospitalImages,
        ...defaultEventImages,
      ];
      setGalleryImages(allDefaults);
      localStorage.setItem("galleryImages", JSON.stringify(allDefaults));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple authentication - in production, use proper authentication
    if (loginForm.username === "admin" && loginForm.password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      loadImages();
      toast("Successfully logged in!");
    } else {
      toast("Invalid credentials!");
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
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast("Please select an image file!");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast("File size should be less than 5MB!");
        return;
      }

      setNewImage({ ...newImage, imageFile: file });
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleAddImage = () => {
    if (!newImage.title || !newImage.description || !newImage.imageFile) {
      toast("Please fill all fields and select an image!");
      return;
    }

    // For demo purposes, we'll use the preview URL as the image URL
    // In a real application, you would upload the file to a server
    const imageToAdd = {
      ...newImage,
      id: Date.now().toString(),
      imageUrl: imagePreview, // Use the preview URL temporarily
    };

    const updatedImages = [...galleryImages, imageToAdd];
    setGalleryImages(updatedImages);
    localStorage.setItem("galleryImages", JSON.stringify(updatedImages));

    setNewImage({
      title: "",
      description: "",
      imageFile: null,
      imageUrl: "",
      category: "campus",
    });
    setImagePreview("");
    toast("Image added successfully!");
  };

  const handleEditImage = (image) => {
    setEditingImage(image);
    setNewImage({
      title: image.title,
      description: image.description,
      imageFile: null,
      imageUrl: image.imageUrl,
      category: image.category,
    });
    setImagePreview(image.imageUrl);
  };

  const handleUpdateImage = () => {
    if (!newImage.title || !newImage.description) {
      toast("Please fill all fields!");
      return;
    }

    const updatedImage = {
      ...editingImage,
      title: newImage.title,
      description: newImage.description,
      category: newImage.category,
    };

    // If a new file was selected, update the image URL
    if (newImage.imageFile) {
      updatedImage.imageUrl = imagePreview;
    }

    const updatedImages = galleryImages.map((img) =>
      img.id === editingImage.id ? updatedImage : img
    );

    setGalleryImages(updatedImages);
    localStorage.setItem("galleryImages", JSON.stringify(updatedImages));

    setEditingImage(null);
    setNewImage({
      title: "",
      description: "",
      imageFile: null,
      imageUrl: "",
      category: "campus",
    });
    setImagePreview("");
    toast("Image updated successfully!");
  };

  const handleDeleteImage = (imageId) => {
    if (confirm("Are you sure you want to delete this image?")) {
      const updatedImages = galleryImages.filter((img) => img.id !== imageId);
      setGalleryImages(updatedImages);
      localStorage.setItem("galleryImages", JSON.stringify(updatedImages));
      toast("Image deleted successfully!");
    }
  };

  const cancelEdit = () => {
    setEditingImage(null);
    setNewImage({
      title: "",
      description: "",
      imageFile: null,
      imageUrl: "",
      category: "campus",
    });
    setImagePreview("");
  };

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4 my-10 mx-4 py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <Card style={{ backgroundColor: "#F4E9D7" }}>
            <CardHeader>
              <CardTitle
                className="w-full h-9 text-center item-center rounded"
                style={{ backgroundColor: "#B8C4A9" }}
              >
                Admin Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                onSubmit={handleLogin}
                className="space-y-6 my-10 mx-4"
              >
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={loginForm.username}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, username: e.target.value })
                    }
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    placeholder="Enter password"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                  }}
                  style={{backgroundColor:'#D97D55'}}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Login
                </motion.button>
              </motion.form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <Tabs defaultValue="gallery" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="gallery">Photo Gallery</TabsTrigger>
            <TabsTrigger value="add-image">Add Image</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gallery Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {["campus", "hospital", "events"].map((category) => (
                    <div key={category}>
                      <h3 className="text-lg font-semibold mb-4 capitalize">
                        {category} Images
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {galleryImages
                          .filter((img) => img.category === category)
                          .map((image) => (
                            <Card key={image.id} className="overflow-hidden">
                              <div className="aspect-video">
                                <ImageWithFallback
                                  src={image.imageUrl}
                                  alt={image.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <CardContent className="p-4">
                                <h4 className="font-semibold mb-1">
                                  {image.title}
                                </h4>
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                  {image.description}
                                </p>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleEditImage(image)}
                                  >
                                    <Edit3 className="h-3 w-3 mr-1" />
                                    Edit
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDeleteImage(image.id)}
                                  >
                                    <Trash2 className="h-3 w-3 mr-1" />
                                    Delete
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add-image">
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingImage ? "Edit Image" : "Add New Image"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Image Title</Label>
                      <Input
                        id="title"
                        value={newImage.title}
                        onChange={(e) =>
                          setNewImage({ ...newImage, title: e.target.value })
                        }
                        placeholder="Enter image title"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newImage.description}
                        onChange={(e) =>
                          setNewImage({
                            ...newImage,
                            description: e.target.value,
                          })
                        }
                        placeholder="Enter image description"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="imageFile">Select Image</Label>
                      <Input
                        id="imageFile"
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="cursor-pointer"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Supported formats: JPG, PNG, GIF. Max size: 5MB
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        value={newImage.category}
                        onChange={(e) =>
                          setNewImage({ ...newImage, category: e.target.value })
                        }
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="campus">Campus</option>
                        <option value="hospital">Hospital</option>
                        <option value="events">Events</option>
                      </select>
                    </div>

                    <div className="flex gap-2">
                      {editingImage ? (
                        <>
                          <Button onClick={handleUpdateImage}>
                            <Save className="h-4 w-4 mr-2" />
                            Update Image
                          </Button>
                          <Button
                            variant="outline"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button onClick={handleAddImage}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Image
                        </Button>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label>Preview</Label>
                    {(imagePreview || newImage.imageUrl) && (
                      <Card className="overflow-hidden">
                        <div className="aspect-video">
                          <ImageWithFallback
                            src={imagePreview || newImage.imageUrl}
                            alt={newImage.title || "Preview"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-semibold">
                            {newImage.title || "Title"}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {newImage.description || "Description"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Category: {newImage.category}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Gallery Statistics
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-primary">
                            {
                              galleryImages.filter(
                                (img) => img.category === "campus"
                              ).length
                            }
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Campus Images
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-primary">
                            {
                              galleryImages.filter(
                                (img) => img.category === "hospital"
                              ).length
                            }
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Hospital Images
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-primary">
                            {
                              galleryImages.filter(
                                (img) => img.category === "events"
                              ).length
                            }
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Event Images
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Quick Actions
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          const data = JSON.stringify(galleryImages, null, 2);
                          const blob = new Blob([data], {
                            type: "application/json",
                          });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = "gallery-backup.json";
                          a.click();
                          toast("Gallery data exported!");
                        }}
                      >
                        Export Data
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (
                            confirm(
                              "This will reset all gallery images to defaults. Continue?"
                            )
                          ) {
                            const allDefaults = [
                              ...defaultCampusImages,
                              ...defaultHospitalImages,
                              ...defaultEventImages,
                            ];
                            setGalleryImages(allDefaults);
                            localStorage.setItem(
                              "galleryImages",
                              JSON.stringify(allDefaults)
                            );
                            toast("Gallery reset to defaults!");
                          }
                        }}
                      >
                        Reset to Defaults
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}