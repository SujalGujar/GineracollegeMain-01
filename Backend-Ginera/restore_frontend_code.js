const fs = require('fs');
const path = 'd:\\\\Ginera-website-main-1-main\\\\Ginera-website-main-1-main\\\\src\\\\components\\\\AdmissionPages.jsx';
let content = fs.readFileSync(path, 'utf8');

const bondPageCode = `const BondPage = ({ type, pageTitle, pageSubtitle }) => {
  const [bonds, setBonds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBonds = async () => {
      try {
        const response = await axiosInstance.get(\`/bonds?type=\${type}\`);
        setBonds(response.data);
      } catch (err) {
        console.error("Error fetching bonds:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBonds();
  }, [type]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.8 } },
    hover: { y: -5, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.25)", transition: { type: "spring", stiffness: 400, damping: 25 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 12, duration: 0.6 } },
    hover: { x: 10, scale: 1.02, backgroundColor: "rgba(245, 158, 11, 0.05)", transition: { duration: 0.3 } },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 200, duration: 0.8 } },
    hover: { scale: 1.2, rotate: 360, transition: { duration: 0.4 } },
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full" />
    </div>
  );

  // Specific data for beautiful cards
  const bondDetails = bonds.find(b => b.title === "Bond Details");
  const bondConditions = bonds.find(b => b.title === "Bond Conditions");
  const bondExecution = bonds.find(b => b.title === "Bond Execution Process");
  const bondRelease = bonds.find(b => b.title === "Bond Release");
  
  // Other bonds added by admin
  const otherBonds = bonds.filter(b => !["Bond Details", "Bond Conditions", "Bond Execution Process", "Bond Release"].includes(b.title));

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-16 relative">
      <img src={backgroundImage4} alt="Background" className="absolute inset-0 w-full h-full object-cover z-0 opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent">{pageTitle}</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">{pageSubtitle}</p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-6xl mx-auto space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 1. Bond Details Card - Beautiful UI */}
            {bondDetails && (
              <motion.div variants={cardVariants} whileHover="hover">
                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm h-full overflow-hidden border border-orange-200">
                  <CardHeader className="pb-4 bg-gradient-to-r from-amber-50 to-orange-50">
                    <CardTitle className="flex items-center gap-3 text-2xl text-amber-900">
                      <motion.div variants={iconVariants}><FileText className="w-8 h-8 text-amber-600" /></motion.div>
                      {bondDetails.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    {bondDetails.content.split('\\n').map((line, idx) => {
                      const [t, ...c] = line.split(':');
                      const icons = [<Calendar className="w-6 h-6" />, <Users className="w-6 h-6" />, <GraduationCap className="w-6 h-6" />];
                      const colors = ["text-amber-600", "text-orange-600", "text-yellow-600"];
                      const bgColors = ["from-amber-500 to-orange-500", "from-orange-500 to-amber-500", "from-yellow-500 to-orange-500"];
                      return (
                        <motion.div key={idx} className="flex items-start gap-4 p-4 bg-orange-50/50 rounded-xl group/item cursor-pointer border border-orange-200" variants={itemVariants} whileHover="hover">
                          <motion.div className={\`w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-lg border border-orange-200 \${colors[idx] || 'text-amber-600'}\`}>
                            {icons[idx] || <CheckCircle className="w-6 h-6" />}
                          </motion.div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-2 text-gray-800">{t.trim()}</h4>
                            <p className="text-gray-700">{c.join(':').trim()}</p>
                          </div>
                          <motion.div className={\`w-1 h-8 bg-gradient-to-b \${bgColors[idx] || 'from-amber-500 to-orange-500'} rounded-full opacity-0 group-hover/item:opacity-100\`} animate={{ scaleY: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.3 }} />
                        </motion.div>
                      );
                    })}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* 2. Bond Conditions Card - Beautiful UI */}
            {bondConditions && (
              <motion.div variants={cardVariants} whileHover="hover">
                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm h-full overflow-hidden border border-amber-200">
                  <CardHeader className="pb-4 bg-gradient-to-r from-orange-50 to-yellow-50">
                    <CardTitle className="flex items-center gap-3 text-2xl text-amber-900">
                      <motion.div variants={iconVariants}><Info className="w-8 h-8 text-orange-600" /></motion.div>
                      {bondConditions.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    {bondConditions.content.split('\\n').map((section, idx) => {
                      const [secTitle, ...items] = section.split(':');
                      const pointList = items.join(':').split(',').map(i => i.trim());
                      return (
                        <div key={idx}>
                          <h4 className="font-semibold text-lg mb-3 text-gray-800">{secTitle.trim()}</h4>
                          <ul className="text-gray-700 space-y-2">
                            {pointList.map((item, iIdx) => (
                              <motion.li key={iIdx} className={\`flex items-center gap-2 p-2 rounded-lg hover:\${idx === 0 ? 'bg-orange-50' : 'bg-red-50'} transition-all duration-300 border \${idx === 0 ? 'border-orange-100' : 'border-red-100'}\`} variants={itemVariants} whileHover="hover">
                                <ArrowRight className={\`w-4 h-4 \${idx === 0 ? 'text-amber-600' : 'text-red-500'}\`} />
                                <span>{item}</span>
                                {idx === 1 && <motion.div className="w-2 h-2 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 ml-auto" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: iIdx * 0.2 }} />}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* 3. Bond Execution Process Card - Beautiful UI */}
          {bondExecution && (
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden border border-amber-200">
                <CardHeader className="pb-4 bg-gradient-to-r from-yellow-50 to-amber-50">
                  <CardTitle className="flex items-center gap-3 text-2xl text-amber-900">
                    <motion.div variants={iconVariants}><Download className="w-8 h-8 text-amber-600" /></motion.div>
                    {bondExecution.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    {bondExecution.content.split('\\n').map((section, idx) => {
                      const [secTitle, ...items] = section.split(':');
                      const pointList = items.join(':').split(',').map(i => i.trim());
                      return (
                        <div key={idx}>
                          <h4 className="font-semibold text-lg mb-4 text-gray-800">{secTitle.trim()}</h4>
                          <div className="space-y-3">
                            {pointList.map((item, iIdx) => (
                              <motion.div key={iIdx} className={\`flex items-center gap-3 p-3 \${idx === 0 ? 'bg-amber-50 border-amber-200' : 'bg-orange-50 border-orange-200'} rounded-lg border transition-all duration-300\`} variants={itemVariants} whileHover="hover">
                                {idx === 0 ? <CheckCircle className="w-4 h-4 text-amber-600" /> : <Calendar className="w-4 h-4 text-orange-600" />}
                                <span className="text-gray-700">{item}</span>
                                {idx === 1 && iIdx === pointList.length - 1 && <motion.div className="w-2 h-2 bg-red-500 rounded-full ml-auto" animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }} />}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* 4. Bond Release Card - Beautiful UI */}
          {bondRelease && (
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden border border-green-200">
                <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-3 text-2xl text-amber-900">
                    <motion.div variants={iconVariants}><CheckCircle className="w-8 h-8 text-green-500" /></motion.div>
                    {bondRelease.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <motion.p className="text-gray-700 text-lg leading-relaxed p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200" whileHover={{ scale: 1.02, backgroundColor: "rgba(16, 185, 129, 0.1)" }}>
                    {bondRelease.content}
                  </motion.p>
                  <div className="flex justify-center mt-6">
                    <motion.div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl" animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>✓</motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* 5. Any New Cards added by Admin */}
          <div className="grid lg:grid-cols-2 gap-8">
            {otherBonds.map((bond) => (
              <motion.div key={bond._id} variants={cardVariants} whileHover="hover">
                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm h-full overflow-hidden border border-orange-200">
                  <CardHeader className="pb-4 bg-gradient-to-r from-amber-50 to-orange-50">
                    <CardTitle className="flex items-center gap-3 text-2xl text-amber-900">
                      <motion.div variants={iconVariants}><FileText className="w-8 h-8 text-amber-600" /></motion.div>
                      {bond.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{bond.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};`;

const startIdx = content.indexOf('const BondPage =');
const endIdx = content.indexOf('export function Bond()', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + bondPageCode + '\n' + content.substring(endIdx);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully updated BondPage with structural specific code.');
} else {
  console.log('Could not find BondPage component.');
}
