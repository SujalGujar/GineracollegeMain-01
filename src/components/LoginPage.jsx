import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import gineraLogo2 from '../images/ginera-logo2.png';
import { motion } from 'framer-motion';

export const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      if (username === 'adminginera@gmail.com' && password === '12345') {
        onLogin();
      } else {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 font-sans"
      style={{ background: '#0D1117' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .playfair { font-family: 'Playfair Display', serif; }
        .input-field:focus {
          border-color: rgba(224,123,57,0.5) !important;
          background: rgba(224,123,57,0.05) !important;
          box-shadow: 0 0 0 3px rgba(224,123,57,0.08) !important;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full rounded-3xl"
        style={{
          maxWidth: '460px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          padding: 'clamp(32px, 6vw, 52px)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-9">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #6B3F1D, #c05a1f)' }}
          >
            <img src={gineraLogo2} alt="Ginera" className="w-6 h-6 object-contain" />
          </div>
          <span className="playfair text-white text-[17px] font-bold">Ginera</span>
        </div>

        {/* Headings */}
        <h2 className="playfair text-[28px] font-bold text-white mb-1">Welcome back</h2>
        <p className="text-sm mb-8 font-light" style={{ color: 'rgba(255,255,255,0.32)' }}>
          Sign in to access the admin console
        </p>

        <form onSubmit={handleSubmit} className="space-y-[18px]">
          {/* Email */}
          <div>
            <label
              className="block text-[10px] font-semibold uppercase tracking-[1.2px] mb-2"
              style={{ color: 'rgba(255,255,255,0.38)' }}
            >
              Email Address
            </label>
            <div className="relative flex items-center">
              <span
                className="absolute left-[14px] flex items-center justify-center pointer-events-none"
                style={{ color: 'rgba(255,255,255,0.22)' }}
              >
                <Mail size={16} />
              </span>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="adminginera@gmail.com"
                required
                className="input-field w-full rounded-[13px] text-sm text-white outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '14px 16px 14px 44px',
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-[10px] font-semibold uppercase tracking-[1.2px] mb-2"
              style={{ color: 'rgba(255,255,255,0.38)' }}
            >
              Password
            </label>
            <div className="relative flex items-center">
              <span
                className="absolute left-[14px] flex items-center justify-center pointer-events-none"
                style={{ color: 'rgba(255,255,255,0.22)' }}
              >
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input-field w-full rounded-[13px] text-sm text-white outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '14px 44px 14px 44px',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-[14px] flex items-center justify-center transition-colors"
                style={{ color: 'rgba(255,255,255,0.25)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-[13px]"
              style={{
                background: 'rgba(239,68,68,0.07)',
                border: '1px solid rgba(239,68,68,0.18)',
                color: '#f87171',
              }}
            >
              <AlertCircle size={14} className="flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 rounded-[13px] py-4 font-semibold text-sm text-white transition-all active:scale-[0.98] hover:opacity-90 group"
            style={{
              background: 'linear-gradient(135deg, #6B3F1D 0%, #b85320 100%)',
              boxShadow: '0 6px 20px rgba(107,63,29,0.3)',
              marginTop: '6px',
            }}
          >
            {isLoading ? (
              <div
                className="w-5 h-5 rounded-full border-2 animate-spin"
                style={{ borderColor: 'rgba(255,255,255,0.25)', borderTopColor: '#fff' }}
              />
            ) : (
              <>
                <span>Sign In to Console</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div
          className="mt-7 pt-6 text-center text-[10px] uppercase tracking-[0.8px]"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.18)' }}
        >
          Authorized Access Only &nbsp;·&nbsp; Security Level 4
        </div>
      </motion.div>
    </div>
  );
};