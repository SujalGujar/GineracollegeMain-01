import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "framer-motion";
 

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { staggerChildren: 0.15, when: "beforeChildren" }
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.12)" },
};

export function CollegePhotos() {
  const [collegeImages, setCollegeImages] = useState([]);

  // Default images as fallback
  const defaultImages = [
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

  useEffect(() => {
    // Load images from localStorage
    const saved = localStorage.getItem("galleryImages");
    if (saved) {
      const allImages = JSON.parse(saved);
      const campusImages = allImages.filter((img) => img.category === "campus");
      setCollegeImages(campusImages.length > 0 ? campusImages : defaultImages);
    } else {
      // Initialize with default images
      setCollegeImages(defaultImages);
      const allDefaults = [
        ...defaultImages,
        // Add default hospital and events images here if needed
      ];
      localStorage.setItem("galleryImages", JSON.stringify(allDefaults));
    }
  }, []);

  // Placeholder images for additional gallery items
  const additionalImages = [
    {
      title: "Library & Study Hall",
      description: "Extensive collection of medical books and journals",
    },
    {
      title: "Anatomy Museum",
      description: "Well-preserved specimens and anatomical models",
    },
    {
      title: "Lecture Theaters",
      description: "Modern amphitheater-style classrooms",
    },
    {
      title: "Student Hostels",
      description: "Comfortable accommodation for outstation students",
    },
    {
      title: "Cafeteria",
      description: "Spacious dining area with nutritious meals",
    },
    {
      title: "Sports Complex",
      description: "Recreation facilities for physical fitness",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-12 mt-6"
      style={{ maxWidth: "1200px" }}
    >
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-900">
        College Photo Gallery
      </h1>

      {/* Campus Highlights */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Campus Highlights
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {collegeImages.map((image, index) => (
            <motion.div
              key={image.id || index}
              variants={cardVariants}
              whileHover="hover"
              className="rounded-lg overflow-hidden cursor-pointer bg-white shadow-md"
            >
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="font-semibold text-lg mb-2 text-gray-900">
                  {image.title}
                </h3>
                <p className="text-sm text-gray-600">{image.description}</p>
              </CardContent>
            </motion.div>
          ))}
        </div>
      </section>

      {/* More Campus Views */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          More Campus Views
        </h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {additionalImages.map((image, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="rounded-lg overflow-hidden cursor-pointer bg-white shadow-sm flex flex-col"
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-5xl mb-3 select-none">🏢</div>
                  <h4 className="font-medium text-base text-gray-900">
                    {image.title}
                  </h4>
                </div>
              </div>
              <CardContent className="p-4 flex-grow">
                <p className="text-xs text-gray-500">{image.description}</p>
              </CardContent>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mt-16 text-center">
        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          <motion.div
            variants={cardVariants}
            className="space-y-2"
            initial="hidden"
            animate="visible"
          >
            <div className="text-3xl font-extrabold text-blue-600">150+</div>
            <p className="text-gray-600 text-sm">Total Photos</p>
          </motion.div>
          <motion.div
            variants={cardVariants}
            className="space-y-2"
            initial="hidden"
            animate="visible"
          >
            <div className="text-3xl font-extrabold text-blue-600">25</div>
            <p className="text-gray-600 text-sm">Photo Categories</p>
          </motion.div>
          <motion.div
            variants={cardVariants}
            className="space-y-2"
            initial="hidden"
            animate="visible"
          >
            <div className="text-3xl font-extrabold text-blue-600">2024</div>
            <p className="text-gray-600 text-sm">Last Updated</p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}






export function HospitalPhotos() {
  const [hospitalImages, setHospitalImages] = useState([]);

  // Default hospital image
  const defaultHospitalImage = {
    id: "h1",
    title: "Advanced Medical Equipment",
    description:
      "State-of-the-art diagnostic and treatment equipment for comprehensive patient care and medical education.",
    imageUrl:
      "https://images.unsplash.com/photo-1595464144526-5fb181b74625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMG1lZGljYWwlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzU4MzY5Mzk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "hospital",
  };

  useEffect(() => {
    const saved = localStorage.getItem("galleryImages");
    if (saved) {
      const allImages = JSON.parse(saved);
      const hospitalImgs = allImages.filter((img) => img.category === "hospital");
      setHospitalImages(hospitalImgs.length > 0 ? hospitalImgs : [defaultHospitalImage]);
    } else {
      setHospitalImages([defaultHospitalImage]);
    }
  }, []);

  const hospitalFacilities = [
    { title: "Emergency Department", description: "24/7 emergency services with trauma care", icon: "🚨" },
    { title: "Operation Theaters", description: "Modern surgical suites with advanced equipment", icon: "🏥" },
    { title: "ICU & Critical Care", description: "Intensive care units with monitoring systems", icon: "💓" },
    { title: "Radiology Department", description: "CT, MRI, X-ray and ultrasound facilities", icon: "📸" },
    { title: "Laboratory Services", description: "Comprehensive diagnostic laboratory", icon: "🔬" },
    { title: "Pharmacy", description: "24-hour pharmacy with essential medicines", icon: "💊" },
    { title: "Blood Bank", description: "Well-equipped blood bank and transfusion services", icon: "🩸" },
    { title: "Dialysis Unit", description: "Modern dialysis center for kidney patients", icon: "⚕️" },
    { title: "Maternity Ward", description: "Specialized care for mothers and newborns", icon: "👶" },
    { title: "Pediatric Wing", description: "Child-friendly environment for young patients", icon: "🧸" },
    { title: "Cardiac Unit", description: "Advanced cardiac care and monitoring", icon: "❤️" },
    { title: "Rehabilitation Center", description: "Physiotherapy and rehabilitation services", icon: "🏃" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-16"
      style={{ maxWidth: "1100px" }}
    >
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-900">
        Hospital Photo Gallery
      </h1>

      {/* Main Hospital Image */}
      {hospitalImages.length > 0 && (
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg cursor-pointer"
        >
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <ImageWithFallback
              src={hospitalImages[0].imageUrl}
              alt={hospitalImages[0].title}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
          <CardContent className="p-6 bg-white rounded-b-lg">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">
              {hospitalImages[0].title}
            </h2>
            <p className="text-gray-600 mb-4">{hospitalImages[0].description}</p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="px-3 py-1 text-sm">
                1000 Beds
              </Badge>
              <Badge variant="outline" className="px-3 py-1 text-sm">
                NABH Accredited
              </Badge>
              <Badge variant="outline" className="px-3 py-1 text-sm">
                24/7 Services
              </Badge>
            </div>
          </CardContent>
        </motion.div>
      )}

      {/* Additional Hospital Images */}
      {hospitalImages.length > 1 && (
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-6 mt-10"
        >
          {hospitalImages.slice(1).map((image) => (
            <motion.div
              key={image.id}
              variants={cardVariants}
              whileHover="hover"
              className="rounded-lg overflow-hidden shadow-md cursor-pointer bg-white"
            >
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 text-gray-900">{image.title}</h3>
                <p className="text-sm text-gray-600">{image.description}</p>
              </CardContent>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Hospital Facilities */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Hospital Facilities & Departments
        </h2>
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {hospitalFacilities.map((facility, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="rounded-lg shadow-sm bg-white cursor-pointer text-center p-6 flex flex-col items-center"
            >
              <div className="text-4xl mb-3 select-none">{facility.icon}</div>
              <h3 className="font-semibold mb-1 text-gray-900 text-sm">
                {facility.title}
              </h3>
              <p className="text-xs text-gray-500">{facility.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Hospital Statistics */}
      <section className="mt-16">
        <Card className="shadow-lg rounded-lg">
          <CardHeader className="border-b px-6 py-4">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Hospital Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-8">
            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-4 gap-8 text-center"
            >
              {[
                { label: "Bed Capacity", value: "1000" },
                { label: "Operation Theaters", value: "15" },
                { label: "Specialist Doctors", value: "50+" },
                { label: "Emergency Services", value: "24/7" },
              ].map(({ label, value }, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="space-y-2"
                >
                  <div className="text-3xl font-bold text-blue-600">{value}</div>
                  <p className="text-gray-600 text-sm">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </section>
    </motion.div>
  );
}





export function EventsPhotos() {
  const [eventImages, setEventImages] = useState([]);

  // Default events image
  const defaultEventImage = {
    id: "e1",
    title: "Graduation Ceremony 2024",
    description:
      "Annual convocation ceremony celebrating our graduating doctors and their achievements in medical education.",
    imageUrl:
      "https://images.unsplash.com/photo-1757143137392-0b1e1a27a7de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3R1ZGVudHMlMjBncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzU4MzkwNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "events",
  };

  useEffect(() => {
    const saved = localStorage.getItem("galleryImages");
    if (saved) {
      const allImages = JSON.parse(saved);
      const eventImgs = allImages.filter((img) => img.category === "events");
      setEventImages(eventImgs.length > 0 ? eventImgs : [defaultEventImage]);
    } else {
      setEventImages([defaultEventImage]);
    }
  }, []);

  const eventCategories = [
    {
      title: "Academic Events",
      icon: "🎓",
      events: [
        { name: "Annual Convocation", date: "March 2024", description: "Graduation ceremony for MBBS students" },
        { name: "Research Symposium", date: "February 2024", description: "Student and faculty research presentations" },
        { name: "Medical Conference", date: "January 2024", description: "International medical conference on modern healthcare" },
        { name: "Guest Lectures", date: "Ongoing", description: "Weekly lectures by renowned medical experts" },
      ],
    },
    {
      title: "Cultural Events",
      icon: "🎭",
      events: [
        { name: "Annual Cultural Fest", date: "December 2023", description: "Three-day cultural celebration with competitions" },
        { name: "Traditional Day", date: "November 2023", description: "Celebration of Indian culture and traditions" },
        { name: "Talent Show", date: "October 2023", description: "Students showcase their artistic talents" },
        { name: "Music Concert", date: "September 2023", description: "Live musical performances by students and guests" },
      ],
    },
    {
      title: "Sports Events",
      icon: "🏆",
      events: [
        { name: "Annual Sports Meet", date: "February 2024", description: "Inter-departmental sports competition" },
        { name: "Marathon for Health", date: "January 2024", description: "Health awareness marathon in the city" },
        { name: "Cricket Tournament", date: "December 2023", description: "Inter-college cricket championship" },
        { name: "Indoor Games", date: "November 2023", description: "Chess, table tennis, and badminton competitions" },
      ],
    },
    {
      title: "Community Service",
      icon: "🤝",
      events: [
        { name: "Health Camp", date: "March 2024", description: "Free medical check-up camp in rural areas" },
        { name: "Blood Donation Drive", date: "February 2024", description: "Annual blood donation campaign" },
        { name: "Awareness Rally", date: "January 2024", description: "Health awareness rally in local communities" },
        { name: "Medical Camp", date: "December 2023", description: "Free medical services for underprivileged" },
      ],
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-16"
      style={{ maxWidth: "1100px" }}
    >
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-900">
        Events Photo Gallery
      </h1>

      {/* Main Event Image */}
      {eventImages.length > 0 && (
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg cursor-pointer"
        >
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <ImageWithFallback
              src={eventImages[0].imageUrl}
              alt={eventImages[0].title}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
          <CardContent className="p-6 bg-white rounded-b-lg">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-semibold text-gray-900">
                {eventImages[0].title}
              </h2>
              <div className="flex gap-3">
                <Badge variant="outline" className="px-3 py-1 text-sm">
                  March 2024
                </Badge>
                <Badge className="px-3 py-1 text-sm">Academic</Badge>
              </div>
            </div>
            <p className="text-gray-600">{eventImages[0].description}</p>
          </CardContent>
        </motion.div>
      )}

      {/* Additional Event Images */}
      {eventImages.length > 1 && (
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-6 mt-10"
        >
          {eventImages.slice(1).map((image) => (
            <motion.div
              key={image.id}
              variants={cardVariants}
              whileHover="hover"
              className="rounded-lg overflow-hidden shadow-md cursor-pointer bg-white"
            >
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 text-gray-900">{image.title}</h3>
                <p className="text-sm text-gray-600">{image.description}</p>
              </CardContent>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Event Categories */}
      <section className="mt-14 space-y-12">
        {eventCategories.map((category, index) => (
          <div key={index}>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-gray-800">
              <span className="text-3xl select-none">{category.icon}</span>
              {category.title}
            </h2>

            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {category.events.map((event, eventIndex) => (
                <motion.div
                  key={eventIndex}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Card className="cursor-pointer rounded-lg shadow-sm bg-white">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-2xl select-none">📸</span>
                      </div>
                      <div className="mb-2">
                        <Badge variant="outline" className="text-xs mb-2 px-2 py-1">
                          {event.date}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-sm mb-2 text-gray-900">
                        {event.name}
                      </h3>
                      <p className="text-xs text-gray-500">{event.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </section>

      {/* Event Highlights */}
      <section className="mt-16">
        <Card className="shadow-lg rounded-lg">
          <CardHeader className="border-b px-6 py-4">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Event Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-8">
            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-4 gap-8 text-center"
            >
              {[
                { label: "Annual Events", value: "50+" },
                { label: "Student Participants", value: "1000+" },
                { label: "Guest Speakers", value: "25" },
                { label: "Awards Given", value: "100+" },
              ].map(({ label, value }, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="space-y-2"
                >
                  <div className="text-3xl font-bold text-blue-600">{value}</div>
                  <p className="text-gray-600 text-sm">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </section>
    </motion.div>
  );
}
