import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "framer-motion";
import axiosInstance, { getMediaUrl } from '../api/axiosInstance';
import { useSectionVisibility } from "../context/SectionVisibilityContext";
import SectionOffNotice from "./SectionOffNotice";


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
  const { isSectionVisible } = useSectionVisibility();
  const [collegeImages, setCollegeImages] = useState([]);
  const [additionalImages, setAdditionalImages] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axiosInstance.get('/gallery');
        const images = res.data;
        setCollegeImages(images.filter(img => img.category === 'college_highlight'));
        setAdditionalImages(images.filter(img => img.category === 'college_campus_view'));
      } catch (err) {
        console.error("Error fetching gallery:", err);
      }
    };
    fetchGallery();
  }, []);

  if (!isSectionVisible('gallery_college')) return <SectionOffNotice name="College Photos" />;

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
          {collegeImages.length === 0 && <p className="text-gray-500 col-span-3 text-center">No campus highlights uploaded yet.</p>}
          {collegeImages.map((image, index) => (
            <motion.div
              key={image._id || index}
              variants={cardVariants}
              whileHover="hover"
              className="rounded-lg overflow-hidden cursor-pointer bg-white shadow-md"
            >
              <div className="aspect-video overflow-hidden">
                {image.mediaType === 'video' ? (
                  <video
                    src={getMediaUrl(image.videoUrl)}
                    controls
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageWithFallback
                    src={getMediaUrl(image.imageUrl)}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                )}
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
          {additionalImages.length === 0 && <p className="text-gray-500 col-span-4 text-center">No additional campus views uploaded yet.</p>}
          {additionalImages.map((image, index) => (
            <motion.div
              key={image._id || index}
              variants={cardVariants}
              whileHover="hover"
              className="rounded-lg overflow-hidden cursor-pointer bg-white shadow-sm flex flex-col"
            >
              <div className="aspect-video overflow-hidden bg-gray-100 flex items-center justify-center relative group">
                {image.mediaType === 'video' ? (
                  <video
                    src={getMediaUrl(image.videoUrl)}
                    controls
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : image.imageUrl ? (
                  <img
                    src={getMediaUrl(image.imageUrl)}
                    alt={image.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                ) : (
                  <div className="text-center p-4">
                    <div className="text-5xl mb-3 select-none">🏢</div>
                  </div>
                )}
              </div>
              <CardContent className="p-4 flex-grow border-t">
                <h4 className="font-medium text-base text-gray-900 mb-1">
                  {image.title}
                </h4>
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
  const { isSectionVisible } = useSectionVisibility();
  const [hospitalImages, setHospitalImages] = useState([]);
  const [hospitalFacilities, setHospitalFacilities] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axiosInstance.get('/gallery');
        const images = res.data;
        setHospitalImages(images.filter(img => img.category === 'hospital'));
        setHospitalFacilities(images.filter(img => img.category === 'hospital_facility'));
      } catch (err) {
        console.error("Error fetching gallery:", err);
      }
    };
    fetchGallery();
  }, []);

  if (!isSectionVisible('gallery_hospital')) return <SectionOffNotice name="Hospital Photos" />;

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
            {hospitalImages[0].mediaType === 'video' ? (
              <video
                src={getMediaUrl(hospitalImages[0].videoUrl)}
                controls muted
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageWithFallback
                src={getMediaUrl(hospitalImages[0].imageUrl)}
                alt={hospitalImages[0].title}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />
            )}
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
                {image.mediaType === 'video' ? (
                  <video
                    src={getMediaUrl(image.videoUrl)}
                    controls muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageWithFallback
                    src={getMediaUrl(image.imageUrl)}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                )}
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
          {hospitalFacilities.length === 0 && <p className="text-gray-500 col-span-4 text-center">No facilities added yet. Upload them from the admin panel.</p>}
          {hospitalFacilities.map((facility, index) => (
            <motion.div
              key={facility._id || index}
              variants={cardVariants}
              whileHover="hover"
              className="rounded-lg shadow-sm bg-white cursor-pointer text-center flex flex-col items-center overflow-hidden border"
            >
              <div className="w-full aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                {facility.mediaType === 'video' ? (
                  <video
                    src={getMediaUrl(facility.videoUrl)}
                    controls muted
                    className="w-full h-full object-cover"
                  />
                ) : facility.imageUrl ? (
                  <img
                    src={getMediaUrl(facility.imageUrl)}
                    alt={facility.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="text-4xl">🏥</div>
                )}
              </div>
              <div className="p-5 w-full">
                <h3 className="font-semibold mb-2 text-gray-900 text-sm">
                  {facility.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{facility.description}</p>
              </div>
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
  const { isSectionVisible } = useSectionVisibility();
  const [eventImages, setEventImages] = useState([]);
  const [eventCategories, setEventCategories] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axiosInstance.get('/gallery');
        const images = res.data;
        
        setEventImages(images.filter(img => img.category === 'event'));
        
        const catMap = {
          event_academic: { title: "Academic Events", icon: "🎓", events: [] },
          event_cultural: { title: "Cultural Events", icon: "🎭", events: [] },
          event_sports: { title: "Sports Events", icon: "🏆", events: [] },
          event_community: { title: "Community Service", icon: "🤝", events: [] }
        };
        
        images.forEach(img => {
          if (catMap[img.category]) {
            catMap[img.category].events.push({
              _id: img._id,
              name: img.title,
              date: new Date(img.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
              description: img.description,
              mediaType: img.mediaType || 'image',
              imageUrl: img.imageUrl,
              videoUrl: img.videoUrl,
            });
          }
        });
        
        setEventCategories(Object.values(catMap));
      } catch (err) {
        console.error("Error fetching gallery:", err);
      }
    };
    fetchGallery();
  }, []);

  if (!isSectionVisible('gallery_events')) return <SectionOffNotice name="Events & Activities Photos" />;

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
      {eventImages.length === 0 && <p className="text-center text-gray-500 col-span-full">No event highlights uploaded yet.</p>}
      {eventImages.length > 0 && (
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg cursor-pointer"
        >
          <div className="aspect-video overflow-hidden rounded-t-lg">
            {eventImages[0].mediaType === 'video' ? (
              <video
                src={getMediaUrl(eventImages[0].videoUrl)}
                controls muted
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageWithFallback
                src={getMediaUrl(eventImages[0].imageUrl)}
                alt={eventImages[0].title}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />
            )}
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
                {image.mediaType === 'video' ? (
                  <video
                    src={getMediaUrl(image.videoUrl)}
                    controls muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageWithFallback
                    src={getMediaUrl(image.imageUrl)}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                )}
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
              {category.events.length === 0 && <p className="text-gray-500 text-sm italic col-span-full">No events added to this category yet.</p>}
              {category.events.map((event, eventIndex) => (
                <motion.div
                  key={eventIndex}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Card className="cursor-pointer rounded-lg shadow-sm bg-white">
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        {event.mediaType === 'video' ? (
                          <video
                            src={getMediaUrl(event.videoUrl)}
                            controls muted
                            className="w-full h-full object-cover"
                          />
                        ) : event.imageUrl ? (
                          <img
                            src={getMediaUrl(event.imageUrl)}
                            alt={event.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        ) : (
                          <span className="text-2xl select-none">📸</span>
                        )}
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
