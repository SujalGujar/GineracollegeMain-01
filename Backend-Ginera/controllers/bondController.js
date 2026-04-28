const Bond = require('../models/Bond');

// Get all bonds by type
exports.getBonds = async (req, res) => {
  try {
    const { type } = req.query;
    
    // Aggressive auto-seeding for student bonds
    if (type === "student") {
      const studentCount = await Bond.countDocuments({ type: "student" });
      if (studentCount === 0) {
        const defaultBonds = [
          {
            title: "Bond Details",
            type: "student",
            content: "Service Period: Students must serve in Gujarat State for 2 years after completion of MBBS degree and internship\nBond Amount: ₹10,00,000 (Ten Lakh Rupees) through bank guarantee or fixed deposit\nService Locations: Government hospitals, PHCs, CHCs, or rural hospitals as assigned by state government"
          },
          {
            title: "Bond Conditions",
            type: "student",
            content: "Mandatory Service: Minimum 2 years in assigned government facility, Service period starts after internship completion, Cannot leave without proper relieving order, Unauthorized absence may lead to penalty\nPenalty for Bond Breach: Full bond amount (₹10,00,000) to be paid, Interest as applicable from breach date, Legal action as per bond agreement terms"
          },
          {
            title: "Bond Execution Process",
            type: "student",
            content: "Required Documents: Bond agreement on stamp paper, Bank guarantee from scheduled bank, Fixed deposit receipt (alternative), Guarantor details and documents, Student and parent signatures\nSubmission Timeline: At the time of admission, Before commencement of classes, Mandatory for seat confirmation, Cannot be deferred or postponed"
          },
          {
            title: "Bond Release",
            type: "student",
            content: "The bond amount will be released after successful completion of the mandatory service period or as per the terms and conditions mentioned in the bond agreement. Students must apply for bond release with proper documentation of service completion."
          }
        ];
        await Bond.insertMany(defaultBonds);
      }
    }

    const filter = type ? { type } : {};
    const bonds = await Bond.find(filter).sort({ order: 1 });
    res.json(bonds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new bond item
exports.createBond = async (req, res) => {
  try {
    const bond = new Bond(req.body);
    const newBond = await bond.save();
    res.status(201).json(newBond);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a bond item
exports.updateBond = async (req, res) => {
  try {
    const updatedBond = await Bond.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBond);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a bond item
exports.deleteBond = async (req, res) => {
  try {
    await Bond.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bond item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
