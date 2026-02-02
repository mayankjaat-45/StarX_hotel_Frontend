const GuestReviews = () => {
  return (
    <section className="py-28 bg-(--bg-cream) relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-(--text-main)">
            What Our Guests Say
          </h2>
          <p className="mt-3 text-(--text-muted) text-lg">
            Real experiences from guests who booked directly with StarX
          </p>
        </div>

        {/* Reviews */}
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              name: "Amit Sharma",
              city: "Mumbai",
              review:
                "Booking directly with StarX saved me money and the check-in was super smooth. The room quality was top-notch.",
              rating: 5,
            },
            {
              name: "Neha Kapoor",
              city: "Delhi",
              review:
                "Exactly as shown in the photos. Clean rooms, premium feel, and excellent staff support throughout my stay.",
              rating: 5,
            },
            {
              name: "Rahul Mehta",
              city: "Bengaluru",
              review:
                "No hidden charges and instant confirmation. StarX feels much more trustworthy than aggregator sites.",
              rating: 5,
            },
          ].map((r, i) => (
            <div
              key={i}
              className="
                bg-(--bg-white)
                rounded-3xl
                p-8
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
              "
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4 text-(--primary-orange)">
                {"⭐".repeat(r.rating)}
              </div>

              {/* Review */}
              <p className="text-(--text-muted) mb-6 leading-relaxed">
                “{r.review}”
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <div
                  className="
                    w-12 h-12
                    rounded-full
                    bg-(--primary-orange)/20
                    flex items-center justify-center
                    font-extrabold
                    text-(--primary-orange)
                  "
                >
                  {r.name.charAt(0)}
                </div>

                <div>
                  <p className="font-bold text-(--text-main)">{r.name}</p>
                  <p className="text-sm text-(--text-muted)">{r.city}, India</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuestReviews;
