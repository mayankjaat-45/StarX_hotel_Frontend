import React, { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import HotelCard from "../../Components/UI/HotelCard.jsx";
import { publicApi } from "../../lib/axios.js";

const HotelSection = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHotels = useCallback(async () => {
    try {
      const res = await publicApi.get("/hotels/");
      setHotels(res.data?.data || []);
    } catch {
      toast.error("Error fetching hotels,come after few minutes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchHotels(controller.signal);
    return () => controller.abort();
  }, [fetchHotels]);

  const retryFetch = () => {
    setLoading(true);
    fetchHotels();
  };

  const visibleHotels = useMemo(() => {
    return hotels
      .filter(
        (h) =>
          h.is_active === true ||
          h.is_active === 1 ||
          h.is_active === "true" ||
          h.is_active === undefined, // backend not sending it
      )
      .sort((a, b) => (a.price_per_night || 0) - (b.price_per_night || 0));
  }, [hotels]);

  const skeletons = useMemo(() => Array.from({ length: 6 }), []);

  /* 🔄 Loading */
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skeletons.map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  /* ❌ Empty */
  if (!hotels.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <p className="text-lg text-gray-500">
          No hotels available right now 😕
        </p>
        <button
          onClick={retryFetch}
          className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center mb-10 sm:mb-14">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
          Best <span className="text-orange-500">Hotels</span> for Booking in
          Delhi
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
          Compare prices, explore rooms, and book your perfect stay
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visibleHotels.map((hotel) => (
          <HotelCard key={hotel.hotel_id} hotel={hotel} />
        ))}
      </div>
    </section>
  );
};

export default HotelSection;
