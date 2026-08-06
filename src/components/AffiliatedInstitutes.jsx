import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Phone, Globe, Users } from "lucide-react";
import backgroundImage4 from "../images/backgroundImage(4).png";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

import axiosInstance from "../api/axiosInstance";
import { useSectionVisibility } from "../context/SectionVisibilityContext";
import SectionOffNotice from "./SectionOffNotice";

export function AffiliatedInstitutes() {
  const { isSectionVisible } = useSectionVisibility();
  if (!isSectionVisible('institutes_list')) return <SectionOffNotice name="Affiliated Institutes" />;

  const DEFAULT_INSTITUTES = [
    {
      name: "Civil Hospital Ahmedabad",
      type: "Teaching Hospital",
      description:
        "Civil Hospital in Asarwa, Ahmedabad, is a massive, government-run teaching hospital affiliated with B.J. Medical College, is a Parent Hospital for  Government College of Nursing, GINERA, Ahmedabad  that provides free or low-cost healthcare to a large population. It is one of the largest hospitals in Asia, equipped with modern facilities, numerous departments, and the capacity for more than 2000 thousand of beds. The hospital offers a wide range of medical services, including comprehensive care, complex surgeries, and specialized treatments in areas like cardiology, obstetrics, and oncology. ",
      description2: "The Civil Hospital campus is one of the largest in Asia, spread over 110 acres and equipped to handle a massive number of patients with over 7,000 beds across its campus includes Civil Hospital itself, U N Mehta Institute of Cardiology and Research, Gujarat Cancer Research Institute, Institute of Kidney Diseases and Research, Government Spine Institute and Physiotherapy College, M & J Institute of Ophthalmology, Dental College and Hospital.",
      established: "1962",
      capacity: " 7,000 Beds",
      specialties: [
        "Medical", "Surgical", "Pediatric and Neonatal unit", "Psychiatric unit", "Obstetric and Gynaecology unit", "Intensive care Units", "Operation Theatres", "Post operative Units", "ENT", "Orthopaedic Units", "Dialysis Unit", "CSSD", "Emergency and Trauma Centre"
      ],
      services: [
        "24/7 Emergency Services",
        "Trauma Care Center",
        "Blood Bank",
        "Pharmacy Services",
        "Radiology & Imaging",
        "Laboratory Services",
      ],
      contact: {
        address: "Civil Hospital Campus, Asarwa, Ahmedabad - 380016",
        phone: "+91-79-2268-0074",
        website: "www.civilhospitalamd.gov.in",
      },
      icon: "🏥",
    },
    {
      name: "U.N. Mehta Institute of Cardiology and Research Center",
      type: "Cancer Institute",
      description:
        "U.N. Mehta Institute of Cardiology and Research Centre,  Ahmedabad is a government-promoted, grant-in-aid institute for cardiac care, known for providing compassionate, high-quality cardiac treatment at concessional or no cost, particularly for the underprivileged. ",
      description2: 'It is a tertiary care hospital affiliated with Government Nursing College, GINERA that is a hub for various cardiac procedures, including being the first center in India to perform robotic cardiac surgery, performing heart transplants, neonatal/pediatric cardiac surgery, and complex coronary interventions. The capacity of the hospital is more than 1200 beds.',
      established: "1980",
      capacity: "More Than 1200 Beds",
      specialties: [
        "Medical Cardiology", "Surgical Units", "ICCU", "Emergency Cardiac Unit", "Cath Lab", "Cardio-thoracic Operation Theatres", "OPD", "Post Operative Units", "Neonatal and Pediatric Cardiology Units"
      ],
      services: [
        "Chemotherapy Services",
        "Radiation Therapy",
        "Cancer Surgery",
        "Bone Marrow Transplant",
        "Pain Management",
        "Psycho-oncology Support",
      ],
      contact: {
        address: "Ellis Bridge, Ahmedabad - 380006",
        phone: "+91-79-2657-8901",
        website: "www.mpshah-cancer.gov.in",
      },
      icon: "🎗️",
    },
    {
      name: "Institute of Kidney Diseases and Research Centre ",
      type: "Educational Institute",
      description:
        "Institute of Kidney Diseases and Research Centre is affiliated with Government College of Nursing, GINERA. Institute of Kidney Diseases and Research Centre is one of the largest institutes in the world, based on three pillars of service, education and research, catering the needs of all classes of patients with kidney diseases. It is located in Civil Hospital Campus, Asarwa, Ahmedabad in the state of Gujarat of India. The institute was established on October 7, 1981 on an auspicious ninth day of Navratri. Institute of Transplantation Sciences was established as its sister institute in the year of 1997. ",
      description2: 'Today it stands on the western end of the civil hospital campus, occupying an area of 15,000 sq. mts and total built up area of 20,000 sq. mts, it can boast to be largest tertiary care center of its kind in the world. It has 400 indoor beds for Nephrology, Urology and Transplantation. The New campus of this hospital is situated at Manju Shree Mill Compund, Baliya LImbdi, Asarwa, Ahmedabad with all modern facilities for treatment of Patients with Kidney problems.',
      established: "1990",
      capacity: "Dental Hospital",
      specialties: [
        "Nephrology Unit", " Urology unit", " Dialysis unit", "Operation Theatre", "Transplant Unit", "Gynaecological Unit", "ICUs", "Pediatric Unit"
      ],
      services: [
        "Dental OPD Services",
        "Oral Surgery Procedures",
        "Dental Implants",
        "Orthodontic Treatment",
        "Preventive Dentistry",
        "Emergency Dental Care",
      ],
      contact: {
        address: "Civil Hospital Campus, Ahmedabad - 380016",
        phone: "+91-79-2268-7890",
        website: "www.govtdentalcollege.gujarat.gov.in",
      },
      icon: "🦷",
    },
    {
      name: "The Gujarat Cancer & Research Institute (GCRI) (M. P. Shah Cancer hospital)",
      type: "Educational Institute",
      description:
        "Government College of Nursing, GINERA is affiliated with the Gujarat Cancer & Research Institute (GCRI) situated in civil hospital Campus, Asarwa Ahmedabad.  The Gujarat Cancer & Research Institute (GCRI) (M. P. Shah Cancer hospital) is a large, state-owned cancer center established in 1972, which provides comprehensive diagnostic, therapeutic, and palliative services. ",
      description2: 'It is a Regional Cancer Centre supported by the Government of India and is managed by a unique partnership between the state government, the central government, and the Gujarat Cancer Society. GCRI’s mission includes patient care, research, and education, and it offers advanced treatment across a wide range of specialties, including surgical, medical, and radiation oncology.It’s bed strength is more than 1000.',
      established: "1988",
      capacity: "More Than 1000 beds",
      specialties: [
        "Medical Oncology",
        "Surgical Oncology",
        "Radiation Oncology",
        "Palliative Care",
        "Cancer Research",
      ],
      services: [
        "Nursing Education Programs",
        "Clinical Training",
        "Community Health Services",
        "Continuing Education",
        "Research Programs",
        "Student Health Services",
      ],
      contact: {
        address: "Civil Hospital Campus, Ahmedabad - 380016",
        phone: "+91-79-2268-4567",
        website: "www.govtnursingcollege.gujarat.gov.in",
      },
      icon: "👩‍⚕️",
    },
    {
      name: "Government Spine Institute",
      type: "Educational Institute",
      description:
        "Government College of Nursing, GINERA is affiliated with the Government Spine, located in the Civil Hospital campus, is a major center for spinal cord treatment in India, offering comprehensive care including surgery, physical and occupational therapy, and rehabilitation. ",
      description2: 'Established in 1978, it treats a large volume of patients from across India, has advanced facilities like a modular operation theater, and includes an affiliated physiotherapy college. The institute’s mission is to provide holistic care, including vocational rehabilitation for patients with disabilities. Its bed strength is 80.',
      established: "1988",
      capacity: "80",
      specialties: [
        "Orthopedic Unit", "Paraplegia unit", "rehabilitation Centre", "Operation Theatre"
      ],
      services: [
        "Nursing Education Programs",
        "Clinical Training",
        "Community Health Services",
        "Continuing Education",
        "Research Programs",
        "Student Health Services",
      ],
      contact: {
        address: "Civil Hospital Campus, Ahmedabad - 380016",
        phone: "+91-79-2268-4567",
        website: "www.govtnursingcollege.gujarat.gov.in",
      },
      icon: "👩‍⚕️",
    },
    {
      name: " Mental Hospital, Ahmedabad",
      type: "Educational Institute",
      description:
        "Our College of Nursing is also affiliated with Mental Hospital, Ahmedabad. The 'mental hospital' near Delhi Darwaja is likely the Government Mental Hospital in Shahibaug, a well-established institution founded in 1866.  ",
      description2: 'It offers a range of services for various mental health conditions and provides a supportive environment, though its primary location is in Shahibaug, not right at Delhi Darwaja.  It has capacity of more than 300 beds.',
      established: "1988",
      capacity: "More Than 300 beds",
      specialties: [
        "Psychiatric Units", "Rehabilitation Centre", "Psychology Unit", "Counselling Unit"
      ],
      services: [
        "Nursing Education Programs",
        "Clinical Training",
        "Community Health Services",
        "Continuing Education",
        "Research Programs",
        "Student Health Services",
      ],
      contact: {
        address: "Civil Hospital Campus, Ahmedabad - 380016",
        phone: "+91-79-2268-4567",
        website: "www.govtnursingcollege.gujarat.gov.in",
      },
      icon: "👩‍⚕️",
    },
    {
      name: " The M & J Institute of Ophthalmology",
      type: "Educational Institute",
      description:
        "The M & J Institute of Ophthalmology is a premier government eye hospital in Ahmedabad, affiliated with Government College of Nursing, GINERA. It offers advanced eye care, including surgeries and specialized units for retina, glaucoma, and cornea.",
      description2: 'The institute also provides training and conducts outreach programs to serve underserved communities and is equipped with the latest technology for treating various eye diseases, with some treatments potentially offered for free. It has capacity of more than 250 beds.',
      established: "1988",
      capacity: "More Than 250 beds",
      specialties: [
        "Indoor Units", "OPDs", "Operation Theatre", "Eye Donation unit", "Transplant Unit"
      ],
      services: [
        "Nursing Education Programs",
        "Clinical Training",
        "Community Health Services",
        "Continuing Education",
        "Research Programs",
        "Student Health Services",
      ],
      contact: {
        address: "Civil Hospital Campus, Ahmedabad - 380016",
        phone: "+91-79-2268-4567",
        website: "www.govtnursingcollege.gujarat.gov.in",
      },
      icon: "👩‍⚕️",
    },
    {
      name: "Community Health Services",
      // type: "Educational Institute",
      description:
        "Our institute is affiliated with various urban health centres, Primary Health centres and Community Health Centres situated in Ahmedabad or nearby Ahmedabad",
      description2: 'Affiliated Urban Health Centres are Asarwa, Ranip, Madhupura, Juna Vadaj, Meghaninagar, Amdupura, RakhiyalAffiliated Community Health Centre are Chandkheda, Sabaramati, Rakhiyal, Danilimda and Adalaj, Singarava.Affiliated Primary Health Centres are Jetalpur, Kuha, Kanbha, Sughad, Aslali',
      description3: 'Community health services in nursing focus on promoting health, preventing disease, and providing care to individuals, families, and groups within their community setting rather than in a hospital. This field emphasizes health education, resource navigation, and direct care to diverse populations, working to improve overall public well-being and reduce health disparities',
      established: "1988",
      capacity: "More Than 250 beds",
      specialties: [
        "General Nursing",
        "Midwifery",
        "Community Health",
        "Critical Care",
        "Nursing Administration",
      ],
      services: [
        "Nursing Education Programs",
        "Clinical Training",
        "Community Health Services",
        "Continuing Education",
        "Research Programs",
        "Student Health Services",
      ],
      contact: {
        address: "Civil Hospital Campus, Ahmedabad - 380016",
        phone: "+91-79-2268-4567",
        website: "www.govtnursingcollege.gujarat.gov.in",
      },
      icon: "👩‍⚕️",
    },

  ];

  const [institutes, setInstitutes] = React.useState(DEFAULT_INSTITUTES);

  React.useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await axiosInstance.get('/institutes');
        if (response.data && response.data.length > 0) {
          setInstitutes(response.data);
        }
      } catch (err) {
        console.error("Error fetching institutes:", err);
      }
    };
    fetchInstitutes();
  }, []);

  return (
    <motion.div
      // style={{ marginTop: "70px" }}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-16 relative"
    >
      {/* Background Image */}
      <img
        src={backgroundImage4}
        alt="Affiliated Institutes Background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-20"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.h1
          variants={fadeInUp}
          className="text-4xl font-bold text-center mb-14 bg-gradient-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent"
        >
          Affiliated Institutes
        </motion.h1>

        {/* Overview Card */}
        <motion.div variants={fadeInUp} className="mb-12">
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg border border-orange-200 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <h2
                className="text-2xl font-semibold mb-3"
                style={{ color: "#78350f" }}
              >
                Our Healthcare Network
              </h2>
              <p className="text-gray-700 max-w-3xl mx-auto mb-8">
                Gujarat Institute of Nursing Education and Research Ahmedabad - GINERA (Government College of Nursing) is affiliated with leading healthcare institutions, forming a strong academic as well as  clinical ecosystem that nurtures both excellence in Nursing education and compassionate patient care.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { number: "8", label: "Affiliated Institutes" },
                  { number: "2000+", label: "Total Bed Capacity" },
                  { number: "50+", label: "Medical Specialties" },
                  { number: "24/7", label: "Healthcare Services" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 bg-white rounded-xl shadow-md border border-orange-200"
                  >
                    <div className="text-3xl font-bold text-amber-600">
                      {stat.number}
                    </div>
                    <p className="text-gray-700 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Institutes List */}
        <div className="space-y-10">
          {institutes.map((institute, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <Card className="shadow-lg hover:shadow-2xl border border-orange-200 transition-all duration-300 bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{institute.icon}</div>
                      <div>
                        <CardTitle className="text-xl font-semibold text-gray-900">
                          {institute.name}
                        </CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge
                            style={{
                              backgroundColor: "#f59e0b",
                              color: "#ffffff",
                            }}
                            className="bg-orange-500 text-white border-orange-600"
                          >
                            {institute.type}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="border-orange-300 text-orange-700"
                          >
                            Est. {institute.established}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <Users className="h-4 w-4 text-amber-600" />
                      {institute.capacity}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 pt-4">
                  <p className="text-gray-700 leading-relaxed">
                    {institute.description}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {institute.description2}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {institute.description3}
                  </p>


                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Specialties */}
                    <div>
                      <h4 className="font-semibold mb-3 text-amber-700">
                        Clinical Areas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {institute.specialties.map((spec, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="text-xs border-amber-300 text-amber-700 bg-amber-50"
                          >
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Services */}
                    <div>
                      <h4 className="font-semibold mb-3 text-amber-700">
                        Key Services
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {institute.services.slice(0, 4).map((srv, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                            {srv}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="border-t border-orange-200 pt-4">
                    <h4 className="font-semibold mb-3 text-amber-700">
                      Contact Information
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-amber-600 mt-0.5" />
                        {institute.contact.address}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-amber-600" />
                        {institute.contact.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-amber-600" />
                        {institute.contact.website}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      size="sm"
                      style={{ backgroundColor: "#f59e0b" }}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="relative border-orange-500 bg-transparent overflow-hidden contact-btn-orange"
                    >
                      {/* Orange theme shine effect */}
                      <span className="contact-btn-shine-orange">
                        Contact Institute
                      </span>

                      <style jsx>{`
                        .contact-btn-orange {
                          position: relative;
                          padding: 8px 24px;
                          border: 1px solid #f59e0b;
                          background: transparent;
                          border-radius: 6px;
                        }

                        .contact-btn-shine-orange {
                          position: relative;
                          background: linear-gradient(
                            to right,
                            #f59e0b 0,
                            #facc15 10%,
                            #f59e0b 20%
                          );
                          background-position: 0;
                          -webkit-background-clip: text;
                          -webkit-text-fill-color: transparent;
                          background-clip: text;
                          animation: orangeShine 3s infinite linear;
                          animation-fill-mode: forwards;
                          font-weight: 600;
                          font-size: 14px;
                          white-space: nowrap;
                          font-family: "Poppins", sans-serif;
                        }

                        @keyframes orangeShine {
                          0% {
                            background-position: 0;
                          }
                          60% {
                            background-position: 150px;
                          }
                          100% {
                            background-position: 150px;
                          }
                        }

                        .contact-btn-orange:hover {
                          background: rgba(245, 158, 11, 0.05);
                        }

                        .contact-btn-orange:hover .contact-btn-shine-orange {
                          animation-duration: 1.5s;
                        }
                      `}</style>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Collaboration Section */}
        <motion.div variants={fadeInUp} className="mt-16">
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 shadow-xl border border-orange-200 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle
                className="text-xl font-semibold"
                style={{ color: "#78350f" }}
              >
                Collaboration & Partnerships
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">
                Our affiliated institutes work together to deliver exceptional
                healthcare and medical education. Students gain exposure to
                multiple specializations, advanced technologies, and diverse
                patient cases.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                {[
                  {
                    title: "Joint Programs",
                    desc: "Collaborative medical education & training",
                  },
                  {
                    title: "Patient Referrals",
                    desc: "Seamless multidisciplinary patient care",
                  },
                  {
                    title: "Research Collaboration",
                    desc: "Joint research and clinical innovation",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-white rounded-xl shadow-md border border-orange-200"
                  >
                    <div className="text-lg font-semibold text-amber-600 mb-2">
                      {item.title}
                    </div>
                    <p className="text-sm text-gray-700">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
