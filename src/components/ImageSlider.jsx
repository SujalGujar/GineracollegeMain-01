import { useState, useEffect } from "react";

export default function ImageSlider({ images, interval = 3000 }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(timer); // cleanup on unmount
  }, [images.length, interval]);

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const current = images[currentIdx];
  if (!current) return null;

  const getImgUrl = (url) => {
    if (!url) return "/placeholder.png";
    if (url.startsWith("http")) return url;
    return `${window.location.hostname === 'localhost' ? `${window.location.hostname === 'localhost' ? 'http://localhost:8080' : 'https://gineracollegemain-01.onrender.com'}` + '' : 'https://gineracollegemain-01.onrender.com'}${url}`;
  };

  const src = current.imageUrl || current.src || current.image;

  return (
    <div className="relative w-full mx-auto">
      {/* Image */}
      <div className="overflow-hidden rounded-3xl shadow-2xl border border-white/20">
        <div className="aspect-[21/9]">
          <img
            src={getImgUrl(src)}
            alt={current.title || `slide-${currentIdx}`}
            className="w-full h-full object-cover transition-transform duration-1000"
          />
        </div>
      </div>
      
      {/* Navigation Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIdx ? "w-8 bg-white" : "w-2 bg-white/40"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
