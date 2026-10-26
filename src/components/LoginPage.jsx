import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff, KeyRound } from 'lucide-react';
import gujaratNursingEmblem from '../images/Gujarat Nursing Education Emblem.png';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';

export const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await axiosInstance.post('/auth/login', {
        email: username,
        password: password
      });

      if (res.data?.token) {
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('adminAuthenticated', 'true');
        if (res.data.admin?.email) {
          localStorage.setItem('adminEmail', res.data.admin.email);
        }
        onLogin();
      } else {
        setError('Login failed. Please check your credentials.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.response?.data?.message || 'Invalid email or password. Please try again.';
      setError(msg);
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 font-sans"
      style={{ background: '#0D1117' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        .playfair { font-family: 'Playfair Display', serif; }
        .input-field:focus {
          border-color: rgba(224,123,57,0.5) !important;
          background: rgba(224,123,57,0.05) !important;
          box-shadow: 0 0 0 3px rgba(224,123,57,0.08) !important;
        }
        .admin-login-logo-img {
          width: 30px !important;
          height: 30px !important;
          max-width: 30px !important;
          max-height: 30px !important;
          object-fit: contain !important;
          display: block !important;
        }
        @media (max-width: 480px) {
          .admin-login-card {
            padding: 24px 20px !important;
            border-radius: 20px !important;
          }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full rounded-3xl admin-login-card"
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          padding: 'clamp(28px, 5vw, 44px)',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 mb-8"
          style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              minWidth: '46px',
              minHeight: '46px',
              maxWidth: '46px',
              maxHeight: '46px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              background: 'linear-gradient(135deg, #6B3F1D, #c05a1f)',
              boxShadow: '0 4px 14px rgba(107, 63, 29, 0.4)',
              overflow: 'hidden',
              padding: '6px',
            }}
          >
            <img
              src={gujaratNursingEmblem}
              alt="Ginera"
              width="30"
              height="30"
              className="admin-login-logo-img"
              style={{
                width: '30px',
                height: '30px',
                maxWidth: '30px',
                maxHeight: '30px',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              className="playfair text-white text-[18px] font-bold"
              style={{ color: '#ffffff', fontSize: '18px', fontWeight: '700', lineHeight: 1.2 }}
            >
              Ginera
            </span>
            <span
              style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
                fontWeight: '500',
                marginTop: '2px',
              }}
            >
              Admin Portal
            </span>
          </div>
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
                  padding: '14px 84px 14px 44px',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                title={showPassword ? 'Hide password' : 'Click key icon to see password'}
                className="absolute right-[10px] flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all select-none group"
                style={{
                  color: showPassword ? '#E07B39' : 'rgba(255,255,255,0.7)',
                  background: showPassword ? 'rgba(224,123,57,0.16)' : 'rgba(255,255,255,0.06)',
                  border: '1px solid ' + (showPassword ? 'rgba(224,123,57,0.35)' : 'rgba(255,255,255,0.1)'),
                  cursor: 'pointer',
                }}
              >
                <KeyRound size={15} className="transition-transform group-hover:scale-110" />
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
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