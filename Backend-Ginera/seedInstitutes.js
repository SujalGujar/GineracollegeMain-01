const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Institute = require('./models/Institute');

dotenv.config();

const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const institutes = [
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
      type: "Educational Institute",
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

const seedInstitutes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Institute.deleteMany();
    console.log('Deleted existing institutes');

    await Institute.insertMany(institutes);
    console.log('Seeded institutes successfully');

    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding institutes:', err);
  }
};

seedInstitutes();
