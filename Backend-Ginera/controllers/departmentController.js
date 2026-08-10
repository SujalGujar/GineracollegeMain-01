const Department = require('../models/Department');
const mongoose = require('mongoose');

const checkDbConnection = (res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: 'Database not connected',
      error: 'Database not available.'
    });
  }
  return null;
};

exports.seedDepartments = async (req, res) => {
  const allDepartments = {
    "Department of Fundamentals Of Nursing": {
      name: "Department of Fundamentals Of Nursing",
      category: "Nursing Department",
      description: "The Fundamentals of Nursing Laboratory is a simulated clinical environment where students learn, practice, and master essential nursing procedures before patient interaction. It bridges theoretical knowledge with clinical skills using mannequins, medical equipment, and simulated scenarios to foster competence and safety.",
      overview: "The Department of Fundamentals of Nursing forms the foundation of nursing education and practice. It introduces students to the basic principles, concepts, and skills essential for providing safe and effective patient care.",
      faculty: [
        { name: "Mrs. Suhasini Macwan", designation: "Lecturer Senior Scale Class-1", qualification: "M.Sc.(Medical Surgical Nursing)" },
        { name: "Mrs. Sangeeta Davidson", designation: "Lecturer Class-2", qualification: "M.Sc.(Community Health Nursing)" },
        { name: "Mrs Dhara Patel", designation: "Nursing Tutor", qualification: "M.Sc.(Child Health Nursing)" },
        { name: "Mrs Gauri Patel", designation: "Nursing Tutor", qualification: "B.Sc.Nursing" },
        { name: "Mrs Pinal Panchal", designation: "Nursing Tutor", qualification: "B.Sc.Nursing" }
      ],
      slug: "fundamentals",
      facilities: [
        "Key Equipment & Setup: Labs are designed like hospital wards, featuring mannequins (high-fidelity & basic), patient beds with linens, bedside lockers, IV poles, and oxygen cylinders.",
        "Skill Development: Key skills practiced include vital sign assessment, physical assessment, medication administration, wound dressing, catheterization, hygiene, and infection control techniques.",
        "Learning Methods: Involves faculty-led demonstrations followed by student return demonstrations and simulation-based learning to build confidence and accuracy.",
        "Focus Areas: Emphasis is placed on safety, aseptic techniques, proper body mechanics, communication with patients, and ethical care",
        "Simulation & Technology: Modern labs use advanced mannequins that can mimic human vital signs to enhance critical thinking"
      ],
      activities: [
        "Teaching and Demonstrating First-year B.Sc. and GNM Students",
        "Preparation for Nursing Procedures",
        "Demonstration and Re-Demonstration of Nursing Procedure"
      ],
      icon: "🦴"
    },
    "Department of Medical Surgical Nursing": {
      name: "Department of Medical Surgical Nursing",
      category: "Nursing Department",
      description: "Study of Advanced Medical Surgical Nursing",
      overview: "Our Medical Surgical Nursing Department focuses on understanding how to care for adult patients with medical and surgical conditions. We provide comprehensive education on nursing interventions, from basic to advanced levels, preparing students to provide holistic care to patients with various health alterations.",
      faculty: [
        { name: "Dr. Asha N. Patel", designation: "H.O.D & Lecturer Senior Scale Class-1", qualification: "Ph.D (Nursing) M.Sc. (Medical Surgical Nursing)" },
        { name: "Mrs. Minaxi R. Patel", designation: "Nursing Tutor", qualification: "M.Sc. (Medical Surgical Nursing)" },
        { name: "Dr. Rajesh Sabara", designation: "Nursing Tutor", qualification: "Ph.D (Nursing) M.Sc. (Medical Surgical Nursing)" },
        { name: "Mrs. Rupal Patel", designation: "Nursing Tutor", qualification: "M.Sc. (Medical Surgical Nursing)" },
        { name: "Mrs. Mittal Prajapati", designation: "Nursing Tutor", qualification: "M.Sc. (Medical Surgical Nursing)" },
        { name: "Mrs. Anjana Nayka", designation: "Nursing Tutor", qualification: "M.Sc. (Medical Surgical Nursing)" },
        { name: "Mrs. Mittal P. Patel", designation: "Nursing Tutor", qualification: "B.Sc. (Nursing)" }
      ],
      slug: "medical-surgical",
      facilities: [
        "High-Fidelity Simulators: Manikins that breathe, have pulses, display vital signs, and can talk, used for complex clinical scenarios.",
        "Specialized Task Trainers: Focused simulators for specific procedures like IV insertion, central line care, catheterization, and tracheostomy care.",
        "Realistic Clinical Environments: Setups mimicking intensive care units (ICUs), emergency rooms, and modern hospital rooms.",
        "Advanced Equipment: Includes defibrillators, mechanical ventilators, multipara monitors, infusion pumps, and advanced airway management tools."
      ],
      activities: [
        "Common Procedures Practiced", "Advanced Cardiac Life Support (ACLS) & BLS", "Central Line Medication Administration", "Ventilator Management & Suctioning", "Endotracheal Tube Insertion", "Intravenous/Intramuscular injections using adult and pediatric arms", "Ryle's Tube insertion and Feeding & Jejunostomy feeding", "Colostomy Care Simulation", "Equiped with Defibrilator", "Management of Surgical Wound, Surgical Dressing And Suture Techniques"
      ],
      icon: "❤️"
    },
    "Department of Obstetric and Gynaecological Nursing": {
      name: "Department of Obstetric and Gynaecological Nursing",
      category: "Nursing Department",
      description: "Study of comprehensive care for women throughout their reproductive lives, including pregnancy, childbirth, the postpartum period, and reproductive system health",
      overview: "The Obstetric and Gynaecological Nursing Department provides fundamental knowledge of women's health throughout the lifespan. Our curriculum covers antenatal, intranatal, postnatal care, and gynecological conditions, forming the foundation for understanding women's healthcare needs.",
      faculty: [
        { name: "Dr. Hiral S. Shah", designation: "Principal & H.O.D", qualification: "Ph.D. (Nursing) M.Sc. in Obstetrics and Gynaecological Nursing" },
        { name: "Mrs. Hetal M. Bhatia", designation: "Lecturer Senior Scale Class-1", qualification: "M.Sc. in Obstetrics and Gynaecological Nursing" },
        { name: "Mrs. Komal Panchal", designation: "Nursing Tutor", qualification: "M.Sc. in Obstetrics and Gynaecological Nursing" },
        { name: "Mrs. Amita Parekh", designation: "Nursing Tutor", qualification: "M.Sc. in Obstetrics and Gynaecological Nursing" }
      ],
      slug: "obstetric",
      facilities: [
        "Specialized Equipment: The lab is equipped with birthing simulators, pelvic models, fetal skulls, and newborn manikins.",
        "Simulation Scenarios: Students practice normal delivery, high-risk pregnancies, breech delivery, and emergency situations (e.g., postpartum hemorrhage).",
        "Procedural Training: Training includes pelvic exams, Leopold's maneuvers, episiotomy care, sterile tray preparation, and newborn resuscitation."
      ],
      activities: [
        "Antenatal Care: Assessing maternal health, measuring fundal height, and monitoring fetal heart rate.", "Intranatal Care: Managing the stages of labor, assisting with delivery, and using fetal monitors, Partograph training", "Postnatal Care: Postpartum assessment of the mother and umbilical cord care for the newborn.", "Gynecological Care: Performing PAP smears and providing reproductive health counseling."
      ],
      icon: "🤰"
    },
    "Department of Mental Health Nursing": {
      name: "Department of Mental Health Nursing",
      category: "Nursing Department",
      description: "The Department of Mental Health Nursing specializes in preparing nurses to promote mental health, prevent illness, and rehabilitate individuals with mental health issues across the lifespan. It focuses on training in psychiatric history collection, mental status exams, therapeutic communication, and crisis intervention.",
      overview: "The Department of Mental Health (Psychiatric) Nursing is dedicated to promoting mental well-being and providing comprehensive care to individuals experiencing mental and emotional disorders. The department plays a vital role in training students to understand human behavior and apply therapeutic principles in clinical and community settings.",
      overview2: "In alignment with the Indian Nursing Council (INC) syllabus, the department emphasizes the development of knowledge, skills, and attitudes essential for delivering preventive, promotive, curative, and rehabilitative mental health care. Students are guided to use various therapeutic modalities, develop therapeutic communication and counseling skills, and collaborate effectively within a multidisciplinary mental health team.",
      faculty: [
        { name: "Mr. Hasmukh D. Patel", designation: "Nursing Tutor", qualification: "M.Sc. In psychiatric and Mental Health Nursing" },
        { name: "Mrs. Jigna Patel", designation: "Nursing Tutor", qualification: "M.Sc. In psychiatric and Mental Health Nursing" }
      ],
      slug: "mental-health",
      facilities: [
        "Clinical Skills Training: Instruction in therapeutic nurse-patient relationships, psychotropic drug administration, process recording, and managing psychiatric emergencies.",
        "Academic & Practical Focus: Combines classroom education with clinical placements in psychiatry, nursing labs, and community outreach programs.",
        "Holistic Care & Advocacy: Emphasizes treating the patient as a holistic individual, advocating for their rights, and providing compassionate care.",
        "Research & Professional Growth: Involves research in mental health disorders, conducting workshops, and continuing nursing education (CNE) to maintain expertise.",
        "Specialized Roles: Prepares nurses to act as mental health specialists, educators, and managers in psychiatric settings",
        "Computer-assisted learning programs"
      ],
      activities: [
        "Therapeutic Techniques: Training in Active Listening, Counseling, and crisis intervention techniques.", "Psychiatric Assessment: Conducting mental status examinations and comprehensive history taking.", "Alternative Therapies: Promotion of yoga, laughter therapy, and other holistic approaches.", "Community Outreach: Conducting school counseling, and public awareness campaigns."
      ],
      icon: "🧠"
    },
    "Department of Child Health Nursing": {
      name: "Department of Child Health Nursing",
      category: "Nursing Department",
      description: "The Department of Child Health Nursing is dedicated to promoting the health and well-being of infants, children, and adolescents. It prepares nurses to provide comprehensive, family-centered care to children in both hospital and community settings.",
      overview: "Our Child Health Nursing Department provides comprehensive education on pediatric nursing care, including growth and development, common childhood illnesses, and specialized pediatric procedures. We focus on family-centered care and the unique needs of children from birth through adolescence.",
      faculty: [
        { name: "Mrs. Rupali Joshi", designation: "Nursing Tutor", qualification: "M.Sc.In Child Health Nursing" },
        { name: "Mrs. Dhara Patel", designation: "Nursing Tutor", qualification: "M.Sc.In Child Health Nursing" },
        { name: "Mrs. Urvi Patel", designation: "Nursing Tutor", qualification: "M.Sc.In Child Health Nursing" }
      ],
      slug: "child-health",
      facilities: [
        "Mannequins & Manikins: NeoNatalie neonatal resuscitation mannequins, advanced neonatal resuscitation equipment, CPR manikins, and infant/toddler dolls.",
        "Clinical Procedures Setup: Phototherapy machines, radiant warmers, oxygen hoods, incubators, and specialized instruments for neonates.",
        "Assessment Tools: Infantometers (for measuring length), pediatric weighing machines, and pediatric stethoscopes/BP apparatus with age-appropriate cuffs.",
        "Simulation Aids: Pediatric procedure manikins with all orifices, pediatric procedure demonstration items, and Pediatric Intensive Care Unit (PICU) or NICU layouts.",
        "Child-Friendly Environment: Various toys and play materials suitable for different developmental stages, promoting play therapy"
      ],
      activities: [
        "Skill Proficiency: Providing hands-on training for pediatric procedures (e.g., feeding, IV insertion, medication administration) before clinical exposure.", "Developmental Care: Understanding newborn growth and development stages.", "Emergency Management: Practicing pediatric CPR, neonatal resuscitation (NRP), and emergency care.", "Preventive Care: Training in immunizations, neonatal care, and child health screening"
      ],
      icon: "👶"
    },
    "Department of Community Health Nursing": {
      name: "Department of Community Health Nursing",
      category: "Nursing Department",
      description: "The Department of Community Health Nursing focuses on improving the health of individuals, families, and communities through preventive, promotive, and rehabilitative care. It prepares nurses to work beyond hospital settings and serve people in their own environments.",
      overview: "The Department of Community Health Nursing focuses on improving the health of individuals, families, and communities through preventive, promotive, and rehabilitative care. It prepares nurses to work beyond hospital settings and serve people in their own environments.",
      faculty: [
        { name: "Mrs. Tejal Suthar", designation: "Lecturer Senior Scale Class-1", qualification: "M.Sc. in Community Health Nursing" },
        { name: "Ms. Mercy Christi", designation: "Lecturer Senior Scale Class-1", qualification: "M.Sc. in Community Health Nursing" },
        { name: "Ms. Samgeeta Devidson", designation: "Lecturer Class-2", qualification: "M.Sc. in Community Health Nursing" },
        { name: "Ms. Hematri Patel", designation: "Nursing Tutor", qualification: "B.Sc. Nursing" },
        { name: "Mr. Satanand Jayswal", designation: "Nursing Tutor", qualification: "B.Sc. Nursing" },
        { name: "Ms. Payal Joshi", designation: "Nursing Tutor", qualification: "B.Sc. Nursing" },
        { name: "Ms. Parul Patel", designation: "Demonstrator", qualification: "B.Sc. Nursing" }
      ],
      slug: "community",
      facilities: [
        "Home Visiting Bags: Equipped with essential supplies for nursing care in community settings.",
        "Simulation Setup: A simulated home environment is often included to facilitate training in home-based care.",
        "Equipment: BP apparatus, weighing machines, mannequins, sterilization supplies, and screening tools.",
        "Educational Materials (IEC): Materials for teaching and awareness, such as posters, models, and pamphlets.",
        "Data Management: Tools for epidemiological data collection and health surveillance."
      ],
      activities: [
        "Home Visiting Techniques: Practicing nursing procedures during simulated home visits.", "Family Health Care: Assessing and addressing health needs at the familial level.", "Health Education: Developing materials for community campaigns and awareness programs.", "Procedure Practice: Simulating nursing procedures like wound care and injections under instructor supervision.", "Community Assessment: Utilizing survey tools and environmental checklists."
      ],
      icon: "🏥",
      slug: "community"
    }
  };

  try {
    const existing = await Department.find();
    if (existing.length > 0) return res.status(400).json({ message: "Data already exists" });

    for (const key in allDepartments) {
      await new Department(allDepartments[key]).save();
    }
    res.status(201).json({ message: "Seeded successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDepartments = async (req, res) => {
  const dbError = checkDbConnection(res);
  if (dbError) return dbError;

  try {
    const departments = await Department.find().sort({ name: 1 }).lean();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching departments', error: error.message });
  }
};

exports.getDepartmentBySlug = async (req, res) => {
  try {
    const department = await Department.findOne({ slug: req.params.slug }).lean();
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching department', error: error.message });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.logoUrl = `/uploads/${req.file.filename}`;
    const department = new Department(data);
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ message: 'Error creating department', error: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.logoUrl = `/uploads/${req.file.filename}`;

    if (typeof data.faculty === 'string') {
      try { data.faculty = JSON.parse(data.faculty); } catch (e) { }
    }
    if (typeof data.facilities === 'string') {
      try { data.facilities = JSON.parse(data.facilities); } catch (e) { }
    }
    if (typeof data.activities === 'string') {
      try { data.activities = JSON.parse(data.activities); } catch (e) { }
    }

    const department = await Department.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: 'Error updating department', error: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting department', error: error.message });
  }
};
