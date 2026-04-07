import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [booking, setBooking] = useState(null);

  /* 🏁 Start booking */
  const startBooking = useCallback(({ hotel, room }) => {
    setBooking({
      hotel,
      room,
      nights: 1,
      stayMode: "NIGHT", // NIGHT | HOURLY
      checkIn: "",
      checkOut: "",
      checkInTime: "",

      hours: 1,
      totalPrice: room?.price_per_night || 0,

      paymentOrderId: null,
      status: "INIT", // INIT | PAYMENT_CREATED | PAID
    });
  }, []);

  /* 🔄 Update booking (IMMUTABLE + SAFE) */
  const updateBooking = useCallback((updates) => {
    setBooking((prev) => {
      if (!prev) return prev;

      const stayMode = updates.stayMode ?? prev.stayMode;
      const room = updates.room ?? prev.room;
      const hours = updates.hours ?? prev.hours;

      /* ✅ HOURLY PRICE FIX */
      const getHourlyPrice = (room, hours) => {
        if (!room) return 0;

        switch (hours) {
          case 1:
            return Number(room.one_hour_price || 0);
          case 2:
            return Number(room.two_hour_price || 0);
          case 3:
            return Number(room.three_hour_price || 0);
          case 4:
            return Number(room.four_hour_price || 0);
          case 12:
            return Number(room.twelve_hour_price || 0);
          default:
            return Number(room.one_hour_price || 0);
        }
      };
      const nights = updates.nights ?? prev.nights ?? 1;
      /* ✅ TOTAL PRICE */

      const totalPrice =
        stayMode === "HOURLY"
          ? getHourlyPrice(room, hours)
          : Number(room?.price_per_night || 0) * nights;
      return {
        ...prev,
        ...updates,
        totalPrice,
      };
    });
  }, []);

  const resetBooking = useCallback(() => {
    setBooking(null);
  }, []);

  /* 🧪 Debug (safe) */
  useEffect(() => {
    if (booking) {
      console.log("BOOKING CONTEXT:", booking);
    }
  }, [booking]);

  const value = useMemo(
    () => ({
      booking,
      startBooking,
      updateBooking,
      resetBooking,
    }),
    [booking, startBooking, updateBooking, resetBooking],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
