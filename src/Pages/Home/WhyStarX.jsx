import { memo } from "react";

const FEATURES = [
  {
    icon: "💰",
    title: "Best Price Guarantee",
    desc: "No third-party commissions. You always get the lowest price.",
  },
  {
    icon: "🏨",
    title: "StarX Owned Hotels",
    desc: "Every hotel is owned & operated by StarX — no compromises.",
  },
  {
    icon: "⚡",
    title: "Priority Check-in",
    desc: "Direct guests enjoy faster check-in & better room allocation.",
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    desc: "Encrypted, trusted & instant booking confirmations.",
  },
];

const WhyStarX = memo(() => {
  return (
    <section className="py-28 bg-(--bg-white) relative overflow-hidden">
      {/* Background accent (paint-only, no layout) */}
      <div
        className="absolute inset-0 bg-linear-to-b from-(--bg-cream)/60 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Heading */}
        <header className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-(--text-main)">
            Why Book Direct with{" "}
            <span className="text-(--primary-orange)">StarX</span>
          </h2>

          <p className="mt-4 text-(--text-muted) text-lg max-w-2xl mx-auto">
            We own our hotels. You get better prices, better rooms, and better
            service — always.
          </p>
        </header>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {FEATURES.map((item) => (
            <article
              key={item.title}
              className="
                group
                bg-(--bg-cream)
                rounded-3xl
                p-8
                text-center
                shadow-lg transition-shadow
                duration-300
                will-change-transform
                hover:-translate-y-3
                hover:shadow-2xl
              "
            >
              {/* Icon */}
              <div
                className="
                  text-4xl
                  mb-5
                  inline-flex
                  items-center
                  justify-center
                  w-16
                  h-16
                  rounded-2xl
                  bg-(--primary-orange)/10
                  transition-colors
                  duration-300
                  group-hover:bg-(--primary-orange)
                "
                aria-hidden="true"
              >
                <span className="transform transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>
              </div>

              <h3 className="text-xl font-bold text-(--text-main)">
                {item.title}
              </h3>

              <p className="mt-3 text-(--text-muted) text-sm leading-relaxed">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

export default WhyStarX;
