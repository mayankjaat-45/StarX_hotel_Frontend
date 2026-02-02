import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { publicApi } from "../../lib/axios";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await publicApi.post("/register/", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      toast.success("Account created 🎉");
      navigate("/login");
    } catch (error) {
      console.log("REGISTER ERROR:", error.response?.data);
      console.error(error.response?.data);

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.detail ||
          "Registration failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      {/* 🌈 Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945')",
        }}
      />
      <div className="absolute inset-0 bg-orange-500/20 backdrop-blur-sm" />

      {/* 🧊 Glass Card */}
      <div
        className="relative w-full max-w-md rounded-3xl border border-white/30
        bg-white/20 backdrop-blur-xl shadow-2xl px-6 py-8 sm:p-8 text-white"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-white">Create Account</h1>
          <p className="text-sm text-white/80 mt-1">
            Book comfortable stays in Delhi 🏨
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-xs text-white/80">Full Name</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 w-4" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-10 py-3 rounded-xl bg-white/20 border border-white/30
                  placeholder-white/60 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs text-white/80">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 w-4" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@email.com"
                className="w-full pl-10 py-3 rounded-xl bg-white/20 border border-white/30
                  placeholder-white/60 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-white/80">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 w-4" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/20 border border-white/30
                  placeholder-white/60 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-xs text-white/80">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full mt-1 px-3 py-3 rounded-xl bg-white/20 border border-white/30
                placeholder-white/60 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-orange-500
              hover:bg-orange-600 active:scale-95 transition font-bold text-sm"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-white/80">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-white underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
