import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";

const HotelCard = memo(({ hotel }) => {
  const hotelImage = hotel.hotel_images?.[0]?.image || "/placeholder.webp"; // local placeholder is faster

  // Memoized minimum price (safe)
  const minPrice = useMemo(() => {
    if (hotel.one_hour_price) return Number(hotel.one_hour_price);

    if (hotel.rooms?.length) {
      return Math.min(
        ...hotel.rooms.map((room) =>
          Number(
            room.discount_price && room.discount_price < room.price_per_night
              ? room.discount_price
              : room.price_per_hour || room.price_per_night || 0,
          ),
        ),
      );
    }

    return Number(hotel.price_full_day || 0);
  }, [hotel]);

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
        <img
          src={hotelImage}
          alt={hotel.hotel_name}
          loading="lazy"
          decoding="async"
          width="400"
          height="300"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Rating */}
        {hotel.rating && (
          <div className="absolute top-3 left-3 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
            ⭐ {hotel.rating}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-1">
          {hotel.hotel_name}
        </h2>

        <p className="text-sm text-gray-500 line-clamp-1">
          📍 {hotel.location}
        </p>

        {/* Facilities */}
        <div className="flex gap-2 flex-wrap">
          {hotel.facilities?.slice(0, 3).map((f, i) => (
            <span
              key={i}
              className="text-xs bg-gray-100 px-2 py-1 rounded-full"
            >
              {f.name}
            </span>
          ))}
        </div>

        {/* Reviews + Price */}
        <div className="flex items-end justify-between pt-2">
          <p className="text-sm text-gray-600">
            {hotel.total_review || 0} reviews
          </p>

          {minPrice > 0 && (
            <div className="text-right">
              <p className="text-xs text-gray-600">Starting from</p>
              <p className="text-md text-orange-400 font-bold">
                {hotel.one_hour_price}
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <Link to={`/hotel/${hotel.slug}`} className="block">
          <button
            className="w-full mt-3 py-2.5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition active:scale-95"
            aria-label={`View rooms at ${hotel.hotel_name}`}
          >
            View Rooms
          </button>
        </Link>
      </div>
    </article>
  );
});

export default HotelCard;
