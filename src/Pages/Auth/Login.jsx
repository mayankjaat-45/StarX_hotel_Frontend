import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Email and password required");
      return;
    }

    try {
      setLoading(true);
      await login(form);
      toast.success("Welcome back 👋");
      navigate(redirect, { replace: true });
    } catch {
      toast.error("Invalid email or password");
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
          <h1 className="text-3xl font-extrabold text-white">Welcome Back</h1>
          <p className="text-sm text-white/80 mt-1">
            Login to manage your bookings 🏨
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-orange-500
              hover:bg-orange-600 active:scale-95 transition font-bold text-sm"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-white/80">
          Don’t have an account?{" "}
          <Link to="/register" className="font-semibold text-white underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
