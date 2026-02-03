import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useBooking } from "../../Context/BookingContext";
import api, { publicApi } from "../../lib/axios";

const Booking = () => {
  const { booking, resetBooking } = useBooking();
  const navigate = useNavigate();

  /* USER DETAILS */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("India");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!booking) navigate("/");
  }, [booking, navigate]);

  if (!booking) return null;

  const {
    hotel,
    room,
    stayMode,
    checkIn,
    checkOut,
    checkInTime,
    hours,
    totalPrice, // fallback (hourly)
  } = booking;

  /* -----------------------------
     DERIVED PRICING (SOURCE OF TRUTH)
  ----------------------------- */

  const nights = useMemo(() => {
    if (stayMode !== "NIGHT" || !checkOut) return 0;
    return Math.max(
      1,
      Math.ceil(
        (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24),
      ),
    );
  }, [stayMode, checkIn, checkOut]);

  const finalNightPrice =
    room.discount_price && room.discount_price < room.price_per_night
      ? room.discount_price
      : room.price_per_night;

  const calculatedNightTotal = useMemo(() => {
    if (stayMode !== "NIGHT") return totalPrice;
    return finalNightPrice * nights;
  }, [stayMode, finalNightPrice, nights, totalPrice]);

  const finalPayableAmount =
    stayMode === "NIGHT" ? calculatedNightTotal : totalPrice;

  /* ----------------------------------
     PAY AT HOTEL (ACTIVE)
  ---------------------------------- */

  const payAtHotel = async () => {
    if (!firstName || !lastName || !email || !phone) {
      toast.error("Please fill all required details");
      return;
    }

    // ✅ BASE PAYLOAD (COMMON FIELDS)
    const payload = {
      hotel_id: hotel.hotel_id,
      room_id: room.room_id,
      stay_mode: stayMode,
      total_amount: finalPayableAmount,
      payment_mode: "PAY_AT_HOTEL",
      guest: {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        country,
      },
    };

    // ✅ CONDITIONAL FIELDS (CRITICAL FIX)
    if (stayMode === "NIGHT") {
      payload.check_in = checkIn;
      payload.check_out = checkOut;
    } else {
      payload.check_in = new Date().toISOString().split("T")[0]; // ✅ ADD THIS LINE
      payload.check_in_time = checkInTime;
      payload.hours = hours;
    }

    try {
      const res = await api.post("/bookings/pay-at-hotel/", payload);

      toast.success("Room reserved. Pay at hotel 🏨");
      resetBooking();

      navigate("/confirmation", {
        state: res.data,
      });
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Failed to reserve booking");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-[1fr_420px] gap-6">
      {/* LEFT COLUMN */}
      <div className="space-y-6">
        {/* HOTEL CARD */}
        <div className="bg-white rounded-xl shadow p-5 flex gap-4">
          <img
            src={room?.room_images?.[0]?.image}
            alt=""
            className="w-32 h-24 object-cover rounded-lg"
          />
          <div>
            <h2 className="font-bold text-lg">{hotel.hotel_name}</h2>
            <p className="text-sm text-gray-500">{hotel.location}</p>
            <p className="text-sm mt-1">
              ⭐ {hotel.rating || "4.3"} · Free WiFi
            </p>
          </div>
        </div>

        {/* BOOKING DETAILS */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-bold mb-2">Your booking details</h3>

          {stayMode === "HOURLY" ? (
            <p className="text-sm">
              Check-in: {checkInTime} <br />
              Duration: {hours} hour(s)
            </p>
          ) : (
            <p className="text-sm">
              Check-in: {checkIn} <br />
              Check-out: {checkOut}
            </p>
          )}

          <p className="mt-2 text-sm">
            <b>{room.room_type}</b>
          </p>
        </div>

        {/* USER DETAILS */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-bold mb-4">Enter your details</h3>

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="First name *"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
            <input
              placeholder="Last name *"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <input
            type="email"
            placeholder="Email address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full mt-4"
          />

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full mt-4"
          >
            <option>India</option>
            <option>United States</option>
            <option>United Kingdom</option>
          </select>

          <div className="flex mt-4">
            <span className="border rounded-l-lg px-3 py-2 bg-gray-100">
              +91
            </span>
            <input
              placeholder="Phone number *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded-r-lg px-3 py-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN – PRICE SUMMARY */}
      <aside className="bg-white rounded-xl shadow p-6 sticky top-24 h-fit">
        <h3 className="font-bold text-lg mb-4">Price summary</h3>

        {stayMode === "NIGHT" ? (
          <>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">
                ₹{finalNightPrice} × {nights} night{nights > 1 && "s"}
              </span>
              <span className="font-medium">₹{calculatedNightTotal}</span>
            </div>

            {room.discount_price &&
              room.discount_price < room.price_per_night && (
                <p className="text-green-600 text-xs mb-3">
                  You saved ₹
                  {(room.price_per_night - room.discount_price) * nights}
                </p>
              )}
          </>
        ) : (
          <div className="flex justify-between text-sm mb-3">
            <span className="text-gray-600">
              ₹{room.price_per_hour} × {hours} hour{hours > 1 && "s"}
            </span>
            <span className="font-medium">₹{totalPrice}</span>
          </div>
        )}

        {/* TOTAL */}
        <div className="flex justify-between items-center border-t pt-4 mt-4">
          <span className="font-semibold text-lg">Total</span>
          <span className="font-bold text-2xl text-orange-600">
            ₹{finalPayableAmount}
          </span>
        </div>

        <button
          onClick={payAtHotel}
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-lg font-bold"
        >
          Pay at Hotel
        </button>

        <p className="text-xs text-gray-500 mt-3 text-center">
          No payment now • Pay directly at the hotel
        </p>
      </aside>
    </section>
  );
};

export default Booking;
