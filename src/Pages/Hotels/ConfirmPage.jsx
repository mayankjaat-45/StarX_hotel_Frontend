import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Hotel, Calendar, CreditCard } from "lucide-react";
import { useMemo } from "react";

const ConfirmPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No booking data found.</p>
      </div>
    );
  }

  const {
    booking_id,
    hotel_name,
    room_type,
    payment_mode,
    payment_status,
    stay_mode,
    check_in,
    check_out,
    check_in_time,
    hours,
    total_amount,
  } = state.data;

  const reception_number =
    state.data.reception_number ||
    state.data.receptionNumber ||
    state.data.reception_no;

  const isHourly = stay_mode === "HOURLY";

  const formatDate = (date) => {
    if (!date) return "—";
    const d = new Date(date);
    return isNaN(d.getTime()) ? "—" : d.toDateString();
  };

  const getHourlyTimes = (date, time, hours) => {
    if (!date || !time) return { checkIn: "—", checkOut: "—" };

    const checkInDateTime = new Date(`${date}T${time}`);

    const checkOutDateTime = new Date(checkInDateTime);
    checkOutDateTime.setHours(checkOutDateTime.getHours() + Number(hours || 0));

    return {
      checkIn: checkInDateTime.toLocaleString(),
      checkOut: checkOutDateTime.toLocaleString(),
    };
  };

  const hourlyTimes = useMemo(() => {
    if (!isHourly) return null;
    return getHourlyTimes(check_in, check_in_time, hours);
  }, [isHourly, check_in, check_in_time, hours]);

  const checkInText = isHourly ? hourlyTimes.checkIn : formatDate(check_in);

  const checkOutText = isHourly ? hourlyTimes.checkOut : formatDate(check_out);
  console.log("STATE DATA:", state.data);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-6">
        {/* SUCCESS HEADER */}
        <div className="flex flex-col items-center text-center">
          <CheckCircle className="text-green-500 w-16 h-16 mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">
            Booking Confirmed 🎉
          </h1>
          <p className="text-gray-500 mt-1">
            Your room has been reserved successfully
          </p>
        </div>

        {/* BOOKING ID */}
        <div className="bg-green-50 border border-green-200 rounded-lg mt-6 p-4 text-center">
          <p className="text-sm text-gray-600">Booking ID</p>
          <p className="text-lg font-semibold text-green-700">{booking_id}</p>
        </div>

        {/* DETAILS */}
        <div className="mt-6 space-y-4">
          <DetailRow
            icon={<Hotel className="w-5 h-5 text-gray-500" />}
            label="Hotel"
            value={hotel_name}
          />

          <DetailRow
            icon={<Hotel className="w-5 h-5 text-gray-500" />}
            label="Room Type"
            value={room_type}
          />

          <DetailRow
            icon={<Calendar className="w-5 h-5 text-gray-500" />}
            label="Check-in"
            value={checkInText}
          />

          <DetailRow
            icon={<Calendar className="w-5 h-5 text-gray-500" />}
            label="Check-out"
            value={checkOutText}
          />

          <DetailRow
            icon={<CreditCard className="w-5 h-5 text-gray-500" />}
            label="Payment Mode"
            value="Pay at Hotel"
          />
        </div>

        {/* PAYMENT STATUS */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Payment Status</p>
          <p className="text-yellow-700 font-semibold">
            {payment_status === "PENDING"
              ? "Payment Pending – Pay at Hotel"
              : "Payment Completed"}
          </p>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Contact for Check Time</p>

          {reception_number ? (
            <a
              href={`tel:${reception_number}`}
              className="text-blue-600 font-semibold underline"
            >
              {reception_number}
            </a>
          ) : (
            <p className="text-gray-500">Not available</p>
          )}
        </div>

        {/* TOTAL AMOUNT */}
        <div className="mt-6 flex justify-between items-center border-t pt-4">
          <p className="text-lg font-medium text-gray-700">Total Amount</p>
          <p className="text-xl font-bold text-gray-900">₹{total_amount}</p>
        </div>

        {/* INFO NOTE */}
        <div className="mt-4 text-sm text-gray-500">
          ℹ️ Please carry a valid ID and pay directly to the hotel manager
          during check-in.
        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-gray-600">
      {icon}
      <span>{label}</span>
    </div>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);

export default ConfirmPage;
