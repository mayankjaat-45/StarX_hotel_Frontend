import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { publicApi } from "../../lib/axios";

const HotelDetails = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchHotel = async () => {
      try {
        const res = await publicApi.get(`/hotels/${hotelId}/`, {
          signal: controller.signal,
        });
        setHotel(res.data?.data || null);
      } catch (error) {
        if (error.name !== "CanceledError") {
          toast.error("Failed to load hotel details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();

    return () => controller.abort();
  }, [hotelId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading hotel details...
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Hotel not found 😕
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 pb-24">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mt-4 text-sm text-orange-500 hover:underline"
      >
        ← Back to hotels
      </button>

      {/* Image Gallery */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 h-65 md:h-105 overflow-hidden rounded-3xl">
        <img
          src={hotel.hotel_images?.[0]?.image}
          alt={hotel.hotel_name}
          loading="eager"
          className="md:col-span-2 w-full h-full object-cover rounded-3xl"
        />
      </div>

      {/* Header */}
      <div className="mt-6">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          {hotel.hotel_name}
        </h1>
        <p className="text-gray-600 mt-1">📍 {hotel.location}</p>

        <div className="flex items-center gap-3 mt-2 text-sm">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
            ⭐ {hotel.rating}
          </span>
          <span className="text-gray-500">({hotel.total_review} reviews)</span>
        </div>
      </div>

      {/* Price */}
      <div className="mt-6">
        <p className="text-2xl font-extrabold text-orange-500">
          ₹{hotel.price_full_day}
          <span className="text-sm text-gray-500 font-normal"> / night</span>
        </p>

        {hotel.one_hour_price && Number(hotel.one_hour_price) > 0 && (
          <p className="text-sm text-gray-500 mt-1">
            Hourly stay available ·{" "}
            <span className="text-orange-500 font-bold">
              ₹{hotel.one_hour_price} / hour
            </span>
          </p>
        )}
      </div>

      {/* Description */}
      <p className="mt-6 text-gray-700 leading-relaxed">{hotel.description}</p>

      {/* Facilities */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-3">Facilities</h2>
        <div className="flex flex-wrap gap-3">
          {hotel.facilities?.map((f, i) => (
            <span key={i} className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
              ✓ {f.name}
            </span>
          ))}
        </div>
      </div>

      {/* Rooms */}
      <div className="mt-10 space-y-6">
        {hotel.rooms?.map((room) => (
          <div
            key={room.room_id}
            className="bg-white border rounded-2xl p-4 md:p-6 shadow hover:shadow-lg transition"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <img
                src={room.room_images?.[0]?.image}
                alt={room.room_type}
                loading="lazy"
                className="h-48 w-full object-cover rounded-xl"
              />

              <div className="md:col-span-2">
                <h3 className="text-lg font-bold">{room.room_type}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  🛏 {room.bed_type} · 👥 {room.capacity} guests · 📐{" "}
                  {room.size_sqft} sqft
                </p>
                <p className="text-sm text-green-600 mt-2">
                  {room.available_rooms} rooms available
                </p>
              </div>

              <div className="text-left md:text-right">
                <div className="flex flex-col md:items-end">
                  {room.one_hour_price &&
                  room.one_hour_price < room.price_per_night ? (
                    <>
                      <p className="text-sm text-gray-400 line-through">
                        ₹{room.price_per_night}
                      </p>
                      <p className="text-2xl font-extrabold text-orange-500">
                        ₹{room.one_hour_price}
                      </p>
                  
                    </>
                  ) : (
                    <p className="text-2xl font-extrabold text-orange-500">
                      ₹{room.one_hour_price}
                    </p>
                  )}
                </div>

                <p className="text-sm text-gray-500">per hour</p>

                {room.hourly_price && (
                  <p className="text-xs text-gray-500 mt-1">
                    ₹{room.hourly_price} / hour available
                  </p>
                )}

                <button
                  onClick={() =>
                    navigate(`/room/${hotel.hotel_id}/${room.room_id}`)
                  }
                  className="mt-4 w-full md:w-auto px-6 py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600"
                >
                  View Room
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Policies */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-3">Hotel Policies</h2>
        <ul className="text-gray-700 space-y-2 text-sm">
          <li>🕒 Check-in: {hotel.policies?.check_in}</li>
          <li>🕚 Check-out: {hotel.policies?.check_out}</li>
          <li>❌ {hotel.policies?.cancellation}</li>
        </ul>
      </div>
    </section>
  );
};

export default HotelDetails;
