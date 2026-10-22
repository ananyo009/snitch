import React, { useState } from "react";
import useAuth from "../hook/useAuth.js";
import useTheme from "../../../hooks/useTheme.js";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../../component/Loader.jsx";

/* ──────────────────────── SVG Icons ──────────────────────── */

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
        const user = await handleLogin({ email: formData.email, password: formData.password });
      if (user.role == "buyer") {
          navigate("/")
      } else if (user.role == "seller") {
        console.log(user.role)
            navigate("/seller/view")
        }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Invalid credentials. Please try again.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };
    
  console.log(useSelector((state) => state.auth.user))
  
  if (loading) {
    return <Loader/>
  }

  return (
    <div className="relative min-h-screen w-full flex bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
      {/* ── Fixed Top-Right Theme Toggle Button ── */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className="fixed top-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--input-border)] bg-[var(--bg-main)] text-[var(--text-main)] shadow-md backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95"
      >
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* ════════════ LEFT COLUMN — Form Area ════════════ */}
      <div className="flex w-full flex-col justify-between px-6 py-10 sm:px-12 md:px-16 lg:w-1/2 lg:px-20 xl:px-28 min-h-screen">
        {/* Top Brand Logo */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-[0.35em] uppercase text-[var(--text-main)]">
              SNITCH
            </span>
          </div>
        </div>

        {/* Main Form Box */}
        <div className="my-auto py-10 max-w-md w-full mx-auto">
          {/* Headline */}
          <h1 className="font-serif-title text-4xl sm:text-5xl font-normal tracking-tight text-[var(--text-main)]">
            Login
          </h1>
          <p className="mt-3 text-sm font-light text-[var(--text-muted)] leading-relaxed">
            Enter your credentials to access your account and explore curated
            modern fashion collections.
          </p>

          {/* Error Alert */}
          {errorMessage && (
            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3.5 text-xs text-red-600 dark:bg-red-950/40 dark:border-red-900 dark:text-red-400">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            {/* Email Input */}
            <div className="relative flex items-center rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3.5 transition-all duration-200 focus-within:border-[var(--input-border-focus)]">
              <span className="text-[var(--text-muted)] mr-3">
                <MailIcon />
              </span>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none"
              />
            </div>

            {/* Password Input */}
            <div className="relative flex items-center rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3.5 transition-all duration-200 focus-within:border-[var(--input-border-focus)]">
              <span className="text-[var(--text-muted)] mr-3">
                <LockIcon />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors p-1 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end pt-1">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <a
              href="/api/auth/google"
              type="button"
              className="w-full flex items-center justify-center mt-5 gap-3 border border-gray-300 bg-blue-300 py-2.5 rounded-lg font-semibold text-gray-700 shadow-sm hover:bg-blue-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <svg className="h-5 w-5" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
                />
              </svg>
              Continue with Google
            </a>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-md bg-[var(--btn-bg)] text-[var(--btn-text)] py-3.5 text-sm font-medium tracking-wide transition-all duration-200 hover:bg-[var(--btn-hover)] active:scale-[0.99] cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>

          {/* Bottom Register Link */}
          <div className="mt-8 text-center sm:text-left">
            <p className="text-xs text-[var(--text-muted)]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-[var(--text-main)] underline underline-offset-4 decoration-[var(--input-border)] hover:decoration-[var(--text-main)] transition-colors"
              >
                Register
              </Link>
            </p>
          </div>
        </div>

        {/* Footer info for mobile/desktop */}
        <div className="text-xs text-[var(--text-muted)] tracking-wider">
          © {new Date().getFullYear()} SNITCH. All rights reserved.
        </div>
      </div>

      {/* ════════════ RIGHT COLUMN — Editorial Hero Image ════════════ */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-zinc-900">
        {/* Background Editorial Image */}
        <img
          src="/register-hero.jpg"
          alt="Fashion Editorial"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Red-tinted contrast overlay matching reference design */}
        <div className="absolute inset-0 bg-[var(--overlay-color)] mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Floating Editorial Quote Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-16 text-white">
          {/* Top Quote */}
          <div className="pt-8 max-w-lg">
            <h2 className="font-serif-title text-4xl leading-tight font-light tracking-wide text-zinc-100">
              "We use contrast to bring your brand's truest essence into the
              light."
            </h2>
          </div>

          {/* Bottom Visual Caption */}
          <div className="flex items-end justify-between text-xs tracking-widest text-zinc-300 font-mono">
            <div>@2026</div>
            <div>01-04</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
