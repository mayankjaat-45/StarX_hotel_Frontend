import { Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-24 bg-(--primary-orange)">
      <div className="max-w-5xl mx-auto px-4 text-center text-white space-y-8">
        {/* Heading */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
            Book Direct. Stay Better.
          </h2>

          <p className="text-lg opacity-90">
            Zero commission. Instant confirmation. Real support.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* Explore Hotels */}
          <Link
            to="/hotels"
            className="
              px-10 py-4
              bg-white
              text-(--primary-orange)
              font-bold
              rounded-xl
              hover:scale-105
              transition
            "
          >
            Explore StarX Hotels
          </Link>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919625945591"
            target="_blank"
            rel="noopener noreferrer"
            className="
              px-10 py-4
              bg-green-600
              text-white
              font-bold
              rounded-xl
              flex items-center justify-center gap-3
              hover:bg-green-700
              transition
            "
          >
            <MessageCircle size={20} />
            WhatsApp Booking
          </a>

          {/* Call */}
          <a
            href="tel:+919625945591"
            className="
              px-10 py-4
              bg-(--bg-white)/20
              border border-white/30
              text-white
              font-bold
              rounded-xl
              flex items-center justify-center gap-3
              hover:bg-(--bg-white)/30
              transition
            "
          >
            <Phone size={20} />
            Call Now
          </a>
        </div>

        {/* Trust Line */}
        <p className="text-sm opacity-80">
          Available 24×7 • Instant support • Best price guaranteed
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
