import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  User,
  ArrowRight,
  Send,
  Calendar,
} from "lucide-react";
import SendMessageButton from "../components/Buttons/SendMessageButton.";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const keyContacts = [
    {
      name: "Dr. Hiral S. Shah",
      position: " Principal",
      qualification: " M.Sc. in Obstetrics and Gynaecological Nursing",
      phone: "+91-96011 11973",
      email: "principalgcona@gmail.com",
      // office: "Dean's Office, Administrative Block",
      hours: "9:00 AM - 5:00 PM (Mon-Fri)/Sat(Half Day)",
      icon: "👨‍⚕️",
      color: "from-blue-500 to-blue-600",
      responsibilities: [
        "Overall Institutional administration",
        "Academic policy decisions",
        "Faculty development",
        "External relations",
      ],
    },
    {
      name: "Mrs. Minaxiben R. Patel",
      position: "I/C Principal Nursing Officer Class-2(PHN Tutor)",
      qualification: "M.Sc.(Medical Surgical Nursing)",
      phone: "+91-98792 25542",
      email: "principalgsona@gmail.com",
      // office: "Academic Office, Second Floor",
      hours: "9:00 AM - 5:00 PM (Mon-Fri)/Sat(Half Day)",
      icon: "👩‍⚕️",
      color: "from-purple-500 to-purple-600",
      responsibilities: [
        "Coordinate Diploma In General Nursing And Midwifery Program",

        "Academic curriculum development",
        "Student affairs management",
      ],
    },
  ];

  const departments = [
    {
      name: "Admissions Office",
      phone: "+91-79-2268-0010",
      email: "admissions@gmc.edu.in",
      icon: "📚",
    },
    {
      name: "Academic Office",
      phone: "+91-79-2268-0011",
      email: "academic@gmc.edu.in",
      icon: "🎓",
    },
    {
      name: "Examination Cell",
      phone: "+91-79-2268-0012",
      email: "exams@gmc.edu.in",
      icon: "📝",
    },
    {
      name: "Student Affairs",
      phone: "+91-79-2268-0013",
      email: "students@gmc.edu.in",
      icon: "👥",
    },
    {
      name: "Hospital Administration",
      phone: "+91-79-2268-0014",
      email: "hospital@gmc.edu.in",
      icon: "🏥",
    },
    {
      name: "Finance Office",
      phone: "+91-79-2268-0015",
      email: "finance@gmc.edu.in",
      icon: "💰",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section with Animation */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help and answer any questions you might have. We look
            forward to hearing from you.
          </p>
        </div>

        {/* Key Contacts Section */}
        <div
          className="mb-16 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Key Administrative Contacts
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {keyContacts.map((contact, index) => (
              <div
                key={index}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 h-full">
                  <div
                    className={`h-2 bg-gradient-to-r ${contact.color}`}
                  ></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                        {contact.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl text-gray-800">
                          {contact.name}
                        </CardTitle>
                        <p className="text-blue-600 font-semibold">
                          {contact.position}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {contact.qualification}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 group/item hover:bg-blue-50 p-2 rounded-lg transition-colors">
                        <div className="p-2 bg-blue-100 rounded-lg group-hover/item:bg-blue-200 transition-colors">
                          <Phone className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 group/item hover:bg-blue-50 p-2 rounded-lg transition-colors">
                        <div className="p-2 bg-blue-100 rounded-lg group-hover/item:bg-blue-200 transition-colors">
                          <Mail className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{contact.email}</span>
                      </div>
                      {/* <div className="flex items-start gap-3 group/item hover:bg-blue-50 p-2 rounded-lg transition-colors">
                        <div className="p-2 bg-blue-100 rounded-lg group-hover/item:bg-blue-200 transition-colors mt-0.5">
                          <MapPin className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{contact.office}</span>
                      </div> */}
                      <div className="flex items-center gap-3 group/item hover:bg-blue-50 p-2 rounded-lg transition-colors">
                        <div className="p-2 bg-blue-100 rounded-lg group-hover/item:bg-blue-200 transition-colors">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{contact.hours}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {contact.responsibilities.map(
                          (responsibility, respIndex) => (
                            <li
                              key={respIndex}
                              className="flex items-center gap-3 text-sm group/list-item hover:bg-gray-50 p-2 rounded-lg transition-colors"
                            >
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                              <span className="text-gray-600">
                                {responsibility}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                        <Calendar className="h-4 w-4" />
                        Schedule Meeting
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 transition-all duration-300"
                      >
                        <Send className="h-4 w-4" />
                        Send Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form and College Info */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <div
            className="animate-fade-in-left"
            style={{ animationDelay: "0.3s" }}
          >
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                  <Send className="h-6 w-6 text-blue-600" />
                  Send us a Message
                </CardTitle>
                <p className="text-gray-600">
                  We'll get back to you within 24 hours
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="border-gray-300 focus:border-blue-500 transition-colors duration-300 h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className="border-gray-300 focus:border-blue-500 transition-colors duration-300 h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Type your message here..."
                      rows={6}
                      className="border-gray-300 focus:border-blue-500 transition-colors duration-300 resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    style={{ backgroundColor: "#D97D55" }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    disabled={isSubmitting}
                  >
                    <SendMessageButton />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* College Info */}
          <div
            className="animate-fade-in-right"
            style={{ animationDelay: "0.4s" }}
          >
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  College Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="group hover:bg-blue-50 p-4 rounded-xl transition-all duration-300">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-3 text-lg">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Address
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Government Medical College
                    <br />
                    Civil Hospital Campus
                    <br />
                    Asarwa, Ahmedabad - 380016
                    <br />
                    Gujarat, India
                  </p>
                </div>

                <div className="group hover:bg-blue-50 p-4 rounded-xl transition-all duration-300">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-3 text-lg">
                    <Phone className="h-5 w-5 text-blue-600" />
                    Main Phone Numbers
                  </h4>
                  <div className="text-gray-600 space-y-2">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Reception:{" "}
                      <span className="font-semibold">+91-96011 11973</span>
                    </p>
                    {/* <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Emergency:{" "}
                      <span className="font-semibold">+91-79-2268-0100</span>
                    </p> */}
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Ambulance:{" "}
                      <span className="font-semibold text-red-600">108</span>
                    </p>
                  </div>
                </div>

                <div className="group hover:bg-blue-50 p-4 rounded-xl transition-all duration-300">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-3 text-lg">
                    <Mail className="h-5 w-5 text-blue-600" />
                    Email Addresses
                  </h4>
                  <div className="text-gray-600 space-y-2">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      General: principalgcona@gmail.com
                    </p>
                    {/* <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Admissions: admissions@gmc.edu.in
                    </p> */}
                    {/* <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Academic: academic@gmc.edu.in
                    </p> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Department Contacts */}
        <div
          className="mb-16 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl text-gray-800 mb-3">
                Department Contact Directory
              </CardTitle>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get in touch with specific departments for specialized queries
                and support
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map((dept, index) => (
                  <div
                    key={index}
                    className="group p-6 border border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 bg-white"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                        {dept.icon}
                      </div>
                      <h4 className="font-semibold text-gray-800 text-lg">
                        {dept.name}
                      </h4>
                    </div>
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-center gap-3 group/item hover:text-blue-600 transition-colors">
                        <Phone className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">
                          {dept.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 group/item hover:text-blue-600 transition-colors">
                        <Mail className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">{dept.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>


      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
