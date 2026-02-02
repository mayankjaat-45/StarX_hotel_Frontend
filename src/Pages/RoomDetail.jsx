import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useBooking } from "../Context/BookingContext";
import { publicApi } from "../lib/axios";

const RoomDetail = () => {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();

  // ❌ setBooking removed
  // ✅ updateBooking added
  const { startBooking, updateBooking } = useBooking();

  const [hotel, setHotel] = useState(null);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  /* BOOKING STATE */
  const [bookingType, setBookingType] = useState("night");
  const today = new Date().toISOString().split("T")[0];

  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkInTime, setCheckInTime] = useState("12:00");
  const [hours, setHours] = useState(1);

  /* FETCH ROOM */
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await publicApi.get("/hotels/");
        const h = res.data.data.find(
          (x) => String(x.hotel_id) === String(hotelId),
        );
        if (!h) throw new Error("Hotel not found");

        const r = h.rooms.find((x) => String(x.room_id) === String(roomId));
        if (!r) throw new Error("Room not found");

        setHotel(h);
        setRoom(r);
      } catch {
        toast.error("Failed to load room details");
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [hotelId, roomId]);

  const images = room?.room_images?.map((i) => i.image) || [];

  /* NIGHTS CALC */
  const nights = useMemo(() => {
    if (!checkOutDate) return 0;
    const diff =
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24);
    return Math.max(1, Math.ceil(diff));
  }, [checkInDate, checkOutDate]);

  /* TOTAL PRICE */
  const totalAmount = useMemo(() => {
    if (!room) return 0;

    // Hourly booking (no discount logic here)
    if (bookingType === "hour") {
      return Number((hours * room.price_per_hour).toFixed(2));
    }

    // Night booking (apply discount if lower)
    const finalNightPrice =
      room.discount_price && room.discount_price < room.price_per_night
        ? room.discount_price
        : room.price_per_night;

    return nights * finalNightPrice;
  }, [bookingType, hours, nights, room]);

  /* RESERVE */
  const handleReserve = () => {
    if (bookingType === "night" && !checkOutDate) {
      toast.error("Please select check-out date");
      return;
    }

    // ✅ Step 1: initialize booking
    startBooking({ hotel, room });

    // ✅ Step 2: update booking safely
    updateBooking({
      stayMode: bookingType === "hour" ? "HOURLY" : "NIGHT",
      checkIn: checkInDate,
      checkOut: bookingType === "night" ? checkOutDate : null,
      checkInTime: bookingType === "hour" ? checkInTime : null,
      hours: bookingType === "hour" ? hours : null,
      totalPrice: totalAmount,
    });

    // ✅ Step 3: navigate
    navigate("/booking");
  };

  if (loading) return <div className="p-10">Loading…</div>;

  /* HOURLY OPTIONS */
  const hourOptions = Array.from({ length: 3 }, (_, i) => (i + 1) * 2);
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-[1fr_380px] gap-6">
        {/* LEFT */}
        <div className="space-y-6">
          {/* IMAGE GALLERY */}
          <div className="rounded-2xl overflow-hidden">
            <div className="lg:hidden relative">
              <div className="flex overflow-x-auto snap-x snap-mandatory">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="h-64 w-full object-cover snap-center"
                  />
                ))}
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-4 grid-rows-2 gap-2">
              <img
                src={images[0]}
                className="col-span-2 row-span-2 h-90 w-full object-cover rounded-l-2xl"
              />
              {images.slice(1, 5).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="h-44.5 w-full object-cover"
                />
              ))}
            </div>
          </div>

          {/* ROOM INFO */}
          <div className="bg-white rounded-2xl shadow p-5">
            <h1 className="text-2xl font-bold">{room.room_type}</h1>
            <p className="text-gray-500">{hotel.hotel_name}</p>

            <div className="flex flex-wrap gap-3 mt-4 text-sm">
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                🛏 {room.bed_type}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                📐 {room.size_sqft} sqft
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                👤 {room.capacity} Guests
              </span>
            </div>

            <p className="mt-4 text-gray-600">{room.description}</p>
          </div>
        </div>

        {/* PRICE PANEL */}
        <aside className="sticky top-24 bg-white rounded-2xl shadow p-5">
          <div className="flex bg-gray-100 rounded-full p-1 mb-4">
            {["night", "hour"].map((t) => (
              <button
                key={t}
                onClick={() => setBookingType(t)}
                className={`flex-1 py-2 rounded-full text-sm ${
                  bookingType === t ? "bg-white shadow" : "text-gray-500"
                }`}
              >
                {t === "night" ? "Per Night" : "Per Hour"}
              </button>
            ))}
          </div>

          {bookingType === "night" ? (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <input
                type="date"
                min={today}
                value={checkInDate}
                onChange={(e) => {
                  setCheckInDate(e.target.value);
                  setCheckOutDate("");
                }}
                className="border rounded-lg px-3 py-2"
              />
              <input
                type="date"
                min={checkInDate}
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="border rounded-lg px-3 py-2"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <input
                type="time"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                className="border rounded-lg px-3 py-2"
              />
              <select
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="border rounded-lg px-3 py-2"
              >
                {hourOptions.map((h) => (
                  <option key={h} value={h}>
                    {h} hour{h > 1 && "s"}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-between font-bold text-orange-600 text-lg">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            onClick={handleReserve}
            className="w-full mt-5 bg-orange-500 text-white py-3 rounded-xl font-semibold"
          >
            Reserve
          </button>
        </aside>
      </div>
    </>
  );
};

export default RoomDetail;
