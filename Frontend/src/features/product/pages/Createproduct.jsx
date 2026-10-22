import React, { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../../../hooks/useTheme.js";
import useProduct from "../hook/useProduct.js";

/* SVG Icons */
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const UploadCloudIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);
const PackageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
const ShoppingBagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const BarChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);
const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* Nav items */
const NAV_ITEMS = [
  { label: "Dashboard", icon: <GridIcon />, to: "/" },
  { label: "Products",  icon: <PackageIcon />, to: "/products", active: true },
  { label: "Orders",    icon: <ShoppingBagIcon />, to: "/orders" },
  { label: "Customers", icon: <UsersIcon />, to: "/customers" },
  { label: "Analytics", icon: <BarChartIcon />, to: "/analytics" },
  { label: "Settings",  icon: <SettingsIcon />, to: "/settings" },
];

const MAX_IMAGES = 7;

/* ═══════════════════ CreateProduct ═══════════════════ */
const CreateProduct = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "INR",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { handleCreateProduct } = useProduct();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const addImages = useCallback((files) => {
    const validTypes = ["image/png", "image/jpeg", "image/webp"];
    const validFiles = Array.from(files).filter((f) => validTypes.includes(f.type));
    setImages((prev) => {
      const remaining = MAX_IMAGES - prev.length;
      const toAdd = validFiles.slice(0, remaining).map((file) => ({
        id: `${Date.now()}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
      }));
      return [...prev, ...toAdd];
    });
  }, []);

  const removeImage = (id) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  const handleDragOver  = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop      = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (images.length < MAX_IMAGES) addImages(e.dataTransfer.files);
  };
  const handleFileInput = (e) => { if (e.target.files) addImages(e.target.files); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return setError("Title is required.");
    if (!formData.priceAmount)  return setError("Price amount is required.");
    setLoading(true);
    setError("");
    try {
      // TODO: wire up product API
      const payload = new FormData();
      payload.append("title",         formData.title);
      payload.append("description",   formData.description);
      payload.append("priceAmount",   formData.priceAmount);
      payload.append("priceCurrency", formData.priceCurrency);
      images.forEach((img) => payload.append("images", img.file));
      await new Promise((r) => setTimeout(r, 800));
      handleCreateProduct(payload)
      navigate("/products");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">

      {/* ── Sidebar ── */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-60 flex-col border-r border-[var(--card-border)] bg-[var(--bg-main)] z-30">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-[var(--card-border)]">
          <div className="w-7 h-7 rounded-md bg-[var(--btn-bg)] text-[var(--btn-text)] flex items-center justify-center text-xs font-bold tracking-widest">
            S
          </div>
          <div>
            <p className="font-serif-title text-sm font-semibold tracking-widest text-[var(--text-main)]">SNITCH</p>
            <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-[var(--text-muted)]">Back-Office</p>
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-0.5 px-3 py-5">
          {NAV_ITEMS.map(({ label, icon, to, active }) => (
            <Link
              key={label}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                active
                  ? "bg-[var(--input-bg)] text-[var(--text-main)] font-semibold border-l-2 border-[var(--text-main)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--input-bg)]"
              }`}
            >
              <span className={active ? "text-[var(--text-main)]" : "text-[var(--text-muted)]"}>{icon}</span>
              {label}
            </Link>
          ))}
        </nav>
        <div className="px-6 py-5 border-t border-[var(--card-border)]">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
            {darkMode ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 md:ml-60 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="sticky top-0 z-20 h-14 flex items-center justify-between px-6 sm:px-10 border-b border-[var(--card-border)] bg-[var(--bg-main)]/90 backdrop-blur-sm">
          <Link
            to="/seller/view"
            className="inline-flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] font-medium tracking-wide transition-colors group"
          >
            <span className="transition-transform group-hover:-translate-x-0.5"><ArrowLeftIcon /></span>
            Back to Products
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-[var(--input-border)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 py-12 px-5 sm:px-10">
          <div className="mx-auto w-full max-w-[680px]">

            <div className="mb-10">
              <h1 className="font-serif-title text-[clamp(2rem,5vw,2.4rem)] font-normal tracking-tight text-[var(--text-main)] leading-tight">
                New Product
              </h1>
              <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
                Add product details, pricing, and imagery to publish to the SNITCH catalog.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">

              {/* Section 1: Details */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="product-title" className="block text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text-muted)] mb-2">
                    Title
                  </label>
                  <input
                    id="product-title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Oversized Linen Trench Coat in Bone"
                    required
                    className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] py-3 px-4 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--input-border-focus)] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="product-description" className="block text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text-muted)] mb-2">
                    Description
                  </label>
                  <textarea
                    id="product-description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Provide detailed material notes, fit, silhouette, and care instructions..."
                    className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] py-3 px-4 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--input-border-focus)] transition-colors resize-y leading-relaxed"
                  />
                </div>
              </div>

              <div className="border-t border-[var(--card-border)]" />

              {/* Section 2: Pricing */}
              <div>
                <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text-muted)] mb-3">
                  Pricing
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <label htmlFor="currency-select" className="sr-only">Currency</label>
                    <div className="relative">
                      <select
                        id="currency-select"
                        name="priceCurrency"
                        value={formData.priceCurrency}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] py-3 px-4 pr-9 text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--input-border-focus)] transition-colors cursor-pointer"
                      >
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[var(--text-muted)]">
                        <ChevronDownIcon />
                      </span>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="price-amount" className="sr-only">Price Amount</label>
                    <input
                      id="price-amount"
                      type="number"
                      name="priceAmount"
                      value={formData.priceAmount}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="1"
                      required
                      className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] py-3 px-4 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--input-border-focus)] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--card-border)]" />

              {/* Section 3: Images */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text-muted)]">
                    Images
                  </p>
                  <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text-muted)]">
                    {images.length} / {MAX_IMAGES}
                  </span>
                </div>

                {/* Drop zone */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Upload images"
                  onClick={() => images.length < MAX_IMAGES && fileInputRef.current?.click()}
                  onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={[
                    "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer select-none",
                    isDragging
                      ? "border-[var(--text-main)] bg-[var(--input-bg)] scale-[1.01]"
                      : images.length >= MAX_IMAGES
                      ? "border-[var(--card-border)] bg-[var(--input-bg)] opacity-50 cursor-not-allowed"
                      : "border-[var(--input-border)] bg-[var(--input-bg)] hover:border-[var(--text-muted)]",
                  ].join(" ")}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    className="hidden"
                    onChange={handleFileInput}
                    disabled={images.length >= MAX_IMAGES}
                  />
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-11 h-11 rounded-full border border-[var(--input-border)] bg-[var(--bg-main)] flex items-center justify-center text-[var(--text-muted)]">
                      <UploadCloudIcon />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-main)]">
                        {isDragging ? "Drop to upload" : "Drop images here or click to upload"}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-1">
                        PNG, JPG or WEBP · up to {MAX_IMAGES} images · max 10 MB each
                      </p>
                    </div>
                  </div>
                </div>

                {/* Thumbnail grid */}
                {images.length > 0 && (
                  <div className="grid grid-cols-4 gap-3 mt-4">
                    {images.map((img, idx) => (
                      <div
                        key={img.id}
                        className="relative group aspect-[3/4] rounded-lg overflow-hidden border border-[var(--card-border)] bg-[var(--input-bg)]"
                      >
                        <img src={img.preview} alt={`Product image ${idx + 1}`} className="w-full h-full object-cover" />
                        {idx === 0 && (
                          <span className="absolute bottom-1.5 left-2 text-[9px] font-bold tracking-widest uppercase text-white bg-black/70 px-1.5 py-0.5 rounded">
                            Cover
                          </span>
                        )}
                        <button
                          type="button"
                          aria-label={`Remove image ${idx + 1}`}
                          onClick={() => removeImage(img.id)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 hover:bg-white text-zinc-900 flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100"
                        >
                          <XIcon />
                        </button>
                      </div>
                    ))}
                    {images.length < MAX_IMAGES && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-[3/4] rounded-lg border-2 border-dashed border-[var(--input-border)] bg-[var(--input-bg)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors text-xl"
                        aria-label="Add more images"
                      >
                        +
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="border-t border-[var(--card-border)]" />

              {/* Section 4: Actions */}
              <div className="space-y-3 pb-2">
                <button
                  type="submit"
                  id="publish-product-btn"
                  disabled={loading}
                  className="w-full rounded-lg bg-[var(--btn-bg)] text-[var(--btn-text)] py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 hover:bg-[var(--btn-hover)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Publishing..." : "Publish Product"}
                </button>
              </div>
            </form>

            <div className="mt-16 pt-6 border-t border-[var(--card-border)] flex flex-col sm:flex-row items-center justify-between gap-2 text-[9px] font-bold tracking-[0.18em] uppercase text-[var(--text-muted)]">
              <span>SNITCH Archive v4.2</span>
              <span>Catalog Engine - Global</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateProduct;