import React from 'react';
import { EyeOff } from 'lucide-react';

export const SectionOffNotice = ({ name = "This section" }) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center my-12 mx-auto max-w-2xl">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4 shadow-inner">
        <EyeOff size={32} />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{name} Unavailable</h3>
      <p className="text-sm text-gray-500 max-w-md leading-relaxed">
        This section is currently disabled by the site administration. Please check back later or contact us for more information.
      </p>
    </div>
  );
};

export default SectionOffNotice;
