import { Link } from "react-router-dom";
import { lazy, memo } from "react";
import { motion } from "framer-motion";

const rooms = [
  {
    title: "Deluxe Room",
    img: "/room1.webp",
    desc: "Elegant interiors with modern amenities and city views.",
  },
  {
    title: "Executive Suite",
    img: "/room.webp",
    desc: "Perfect for business travelers seeking premium comfort.",
  },
  {
    title: "Presidential Suite",
    img: "/room3.webp",
    desc: "Ultimate luxury with spacious lounge & premium services.",
  },
];

/* ✅ Lazy Framer Motion */
const MotionDiv = lazy(() =>
  import("framer-motion").then((m) => ({ default: m.motion.div })),
);

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const FeaturedRooms = memo(() => {
  return (
    <section className="py-24 bg-(--bg-cream)">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="text-center mb-16"
        >
          <motion.h2
            variants={item}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-(--text-main)"
          >
            StarX <span className="text-(--primary-orange)">Signature</span>{" "}
            Rooms
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-3 text-(--text-muted) text-lg"
          >
            Crafted for comfort, luxury & memorable stays
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="grid md:grid-cols-3 gap-10"
        >
          {rooms.map((room, i) => (
            <motion.article
              key={room.title}
              variants={item}
              className="
                bg-(--bg-white)
                rounded-3xl
                shadow-xl
                overflow-hidden
                group
              "
            >
              {/* Image */}
              <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                <img
                  src={room.img}
                  alt={`${room.title} in Delhi hotel`}
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-(--text-main)">
                  {room.title}
                </h3>
                <p className="text-(--text-muted) mt-2 mb-4">{room.desc}</p>

                <Link
                  to="/hotels"
                  className="
                    inline-block
                    font-semibold
                    text-(--primary-orange)
                    hover:underline
                  "
                >
                  Explore Hotels →
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

export default FeaturedRooms;
