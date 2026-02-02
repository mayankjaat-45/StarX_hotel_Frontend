import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "/background1.webp",
    title: "Premium Hotels in Delhi",
    subtitle: "Comfort • Safety • Best Price Guaranteed",
  },
  {
    image: "/background2.webp",
    title: "Comfortable Stays in Delhi",
    subtitle: "Modern rooms for every kind of traveler",
  },
  {
    image: "/background3.webp",
    title: "Quality Stays at the Best Price in Delhi",
    subtitle: "Book directly & save more",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [startSlider, setStartSlider] = useState(false);

  // ✅ Start slider AFTER first paint
  useEffect(() => {
    const idle = window.requestIdleCallback
      ? requestIdleCallback(() => setStartSlider(true))
      : setTimeout(() => setStartSlider(true), 1500);

    return () => {
      window.cancelIdleCallback?.(idle);
      clearTimeout(idle);
    };
  }, []);

  useEffect(() => {
    if (!startSlider) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [startSlider]);

  return (
    <section className="relative h-svh overflow-hidden">
      {/* ✅ LCP IMAGE (NO ANIMATION) */}
      <img
        src={slides[0].image}
        alt="Premium hotels in Delhi"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      {/* ✅ SLIDER IMAGES (AFTER LCP) */}
      {startSlider && (
        <AnimatePresence>
          <motion.img
            key={index}
            src={slides[index].image}
            alt={slides[index].title}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/80" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-5xl text-center text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[index].title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold">
                <span className="text-(--primary-orange)">
                  {slides[index].title.split(" ")[0]}
                </span>{" "}
                {slides[index].title.split(" ").slice(1).join(" ")}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-gray-200 max-w-2xl mx-auto">
                {slides[index].subtitle}
              </p>

              <div className="mt-10">
                <Link to="/hotels">
                  <button className="px-8 py-4 rounded-full bg-(--primary-orange) font-bold text-lg shadow-xl hover:scale-105 transition">
                    Explore Hotels
                  </button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="mt-12 flex justify-center gap-2">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i === index ? "bg-white scale-125" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
