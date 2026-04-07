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

  return (
    <div className="relative w-full mx-auto">
      {/* Image */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div className="aspect-video">
          <img
            src={current.src}
            alt={current.title || `slide-${currentIdx}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
