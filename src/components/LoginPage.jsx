import React, { useState } from 'react';
import { User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import gineraLogo2 from '../images/ginera-logo2.png';
import { motion } from 'framer-motion';

export const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (username === 'adminginera@gmail.com' && password === '12345') {
        onLogin();
      } else {
        setError('Invalid username or password');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-[32px] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          <div className="p-10">
            <div className="flex flex-col items-center mb-10">
              <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                <img src={gineraLogo2} alt="Logo" className="w-12 h-12 object-contain" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Portal</h2>
              <p className="text-slate-500 mt-2 font-medium">Ginera Nursing College Console</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <User size={18} />
                  </div>
                  <input
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:outline-none transition-all font-medium"
                    style={{ '--tw-ring-color': '#E07B3930' }}
                    placeholder="admin@ginera.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Secure Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:outline-none transition-all font-medium"
                    style={{ '--tw-ring-color': '#E07B3930' }}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-red-600 text-sm bg-red-50 p-4 rounded-2xl flex items-center gap-3 border border-red-100"
                >
                  <ShieldCheck size={18} />
                  <span className="font-semibold">{error}</span>
                </motion.div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full text-white py-4 rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center gap-2 group active:scale-[0.98] hover:opacity-90"
                style={{ backgroundColor: '#6B3F1D', boxShadow: '0 10px 15px -3px rgba(224, 123, 57, 0.2)' }}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In to Console</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
            <p className="text-xs text-slate-400 font-semibold tracking-wide uppercase">
              Authorized Access Only • Security Level 4
            </p>
          </div>
        </div>
        
        <p className="mt-8 text-center text-slate-400 text-sm font-medium">
          © 2024 Ginera Medical Group. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};
