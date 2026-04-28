const fs = require('fs');
const path = 'd:\\\\Ginera-website-main-1-main\\\\Ginera-website-main-1-main\\\\src\\\\components\\\\AdmissionPages.jsx';
let content = fs.readFileSync(path, 'utf8');

const bondStart = content.indexOf('export function Bond() {');
if (bondStart !== -1) {
  content = content.substring(0, bondStart) + `export function Bond() {
  return (
    <BondPage
      type="student"
      pageTitle="Student Bond Agreement"
      pageSubtitle="Essential legal and service requirements for MBBS program enrollment"
    />
  );
}

export function Instructions() {
  const [guidelines, setGuidelines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuidelines = async () => {
      try {
        const res = await axiosInstance.get("/guidelines");
        setGuidelines(res.data);
      } catch (err) {
        console.error("Error fetching guidelines:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGuidelines();
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 20px 40px rgba(245, 158, 11, 0.2)",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full" />
    </div>
  );

  const groupedGuidelines = guidelines.reduce((acc, curr) => {
    if (!acc[curr.category]) acc[curr.category] = [];
    acc[curr.category].push(curr);
    return acc;
  }, {});

  const categories = [
    { name: "General Guidelines", icon: <GraduationCap className="w-8 h-8 text-amber-600" /> },
    { name: "Code of Conduct", icon: <FileText className="w-8 h-8 text-amber-600" /> },
    { name: "Academic Requirements", icon: <Calendar className="w-8 h-8 text-amber-600" /> },
    { name: "For Parents/Guardians", icon: <Users className="w-8 h-8 text-amber-600" /> },
    { name: "Contact Information", icon: <Info className="w-8 h-8 text-amber-600" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-16 relative">
      <img src={backgroundImage4} alt="Instructions Background" className="absolute inset-0 w-full h-full object-cover z-0 opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Instructions for Students and Parents</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">Essential guidelines and code of conduct for a successful academic journey</p>
        </motion.div>

        {guidelines.length > 0 ? (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-6xl mx-auto space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {categories.slice(0, 2).map(cat => (
                <motion.div key={cat.name} variants={cardVariants} whileHover="hover">
                  <Card className="border-0 shadow-xl h-full bg-white/90 backdrop-blur-sm border border-orange-200">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: "#78350f" }}>
                        {cat.icon}
                        {cat.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {cat.name === "Code of Conduct" && (
                        <Alert className="bg-orange-50 border-orange-300 text-orange-800 p-3 rounded-xl">
                          <Info className="h-5 w-5 text-orange-600 mr-2" />
                          <AlertDescription>
                            <strong>Zero Tolerance Policy:</strong> Strict anti-ragging policy. Any form of ragging is punishable and may lead to expulsion.
                          </AlertDescription>
                        </Alert>
                      )}
                      {groupedGuidelines[cat.name]?.map((sub, idx) => (
                        <div key={idx}>
                          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2 text-gray-800">
                            <BookOpen className="w-5 h-5 text-amber-600" />
                            {sub.subCategory}
                          </h4>
                          <ul className="space-y-2 ml-3">
                            {sub.points.map((point, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2 text-gray-700">
                                <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {categories.slice(2, 4).map(cat => (
                <motion.div key={cat.name} variants={cardVariants} whileHover="hover">
                  <Card className="border-0 shadow-xl h-full bg-white/90 backdrop-blur-sm border border-amber-200">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: "#78350f" }}>
                        {cat.icon}
                        {cat.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {groupedGuidelines[cat.name]?.map((sub, idx) => (
                          <div key={idx}>
                            <h4 className="font-semibold text-lg mb-3 text-gray-800">{sub.subCategory}</h4>
                            <ul className="space-y-2 ml-3">
                              {sub.points.map((point, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-2 text-gray-700">
                                  <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {groupedGuidelines["Contact Information"] && (
              <motion.div variants={cardVariants} whileHover="hover">
                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm border border-amber-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-2xl" style={{ color: "#78350f" }}>
                      <Info className="w-8 h-8 text-amber-600" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-1 gap-8">
                      {groupedGuidelines["Contact Information"].map((sub, idx) => (
                        <div key={idx} className="text-center p-6 bg-orange-50 rounded-2xl border border-orange-200">
                          <h4 className="font-semibold text-lg mb-3 text-gray-800">{sub.subCategory}</h4>
                          <div className="space-y-2 text-gray-700">
                            {sub.points.map((point, pIdx) => (
                              <p key={pIdx}>{point}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-orange-200 max-w-4xl mx-auto">
            <Info className="w-16 h-16 text-orange-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-400">No guidelines available</h3>
            <p className="text-gray-400">Contact admin for more information</p>
          </div>
        )}
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully replaced file content.');
} else {
  console.log('Could not find Bond export.');
}
