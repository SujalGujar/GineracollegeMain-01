const mongoose = require('mongoose');

const historyContentSchema = new mongoose.Schema({
  heroTitle: { type: String, default: "Our History" },
  timelineTitle: { type: String, default: "Institutional Timeline" },
  timelineParagraphs: {
    type: [String],
    default: [
      "The college has completed 62 years of teaching to nursing students. Students of this college have obtained various statuses in administration, education and clinical field in Gujarat (India) as well abroad.",
      "The college has the roots in the post basic Nursing School, which was started in 1963. At the time Gujarat was very young state and the need for P.H.N. nurses was acute. So the diploma course in Public Health Nursing was started. Two years later with the increasing in Nursing Schools a especially the ANM schools the need for tutors was felt, so in 1965 a Diploma in Nursing Education course was started.",
      "During the years when the Diploma courses were being conducted, the concept of post Basic B.Sc. Degree course in Nursing was conceived. The Idea very new too many but was easily accepted. It was realized that changing needs of the society which in turn is due to the rapid advanced medicine and technology demands professional Nurses. This could be done if a collegiate program was started thus, in July 1963 the post Basic nursing school ceased to exist and the college of Nursing born."
    ]
  },
  legacyTitle: { type: String, default: "Legacy of Excellence" },
  legacyParagraphs: {
    type: [String],
    default: [
      "Government College of Nursing, GINERA, Ahmedabad signifies a history of producing high-quality, competent nurses through a combination of strong academics, practical experience, and a commitment to ethical and compassionate care. This legacy is built on proven leadership, consistent accreditation, and a holistic approach that develops critical thinking, empathy, and job-ready skills for a dynamic healthcare environment."
    ]
  }
}, { timestamps: true });

module.exports = mongoose.model('HistoryContent', historyContentSchema);
