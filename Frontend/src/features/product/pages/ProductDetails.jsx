import React, { useEffect, useState, useCallback } from "react";
import useProduct from "../hook/useProduct";
import { useParams, useNavigate, Link } from "react-router-dom";
import useTheme from "../../../hooks/useTheme.js";

/* ─── Currency symbol map ─── */
const CURRENCY_SYMBOL = { INR: "₹", USD: "$", EUR: "€", GBP: "£" };

/* ─── SVG Icons ─── */
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const BoltIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const HeartIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
const RotateCcwIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
  </svg>
);
const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
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

/* ─── Full-page Image Slider ─── */
const ImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const prev = useCallback((e) => {
    e.stopPropagation();
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }, [images.length]);

  const next = useCallback((e) => {
    e.stopPropagation();
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }, [images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[4/5] bg-[var(--input-bg)] rounded-2xl flex items-center justify-center">
        <span className="text-xs text-[var(--text-muted)] tracking-widest uppercase">No image</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl group bg-[var(--input-bg)] select-none">
        {images.map((img, idx) => (
          <img
            key={img._id}
            src={img.url}
            alt={img.alt}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: idx === current ? 1 : 0, zIndex: idx === current ? 1 : 0 }}
            draggable={false}
          />
        ))}

        {/* Gradient bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent z-[2] pointer-events-none" />

        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 border-none cursor-pointer flex items-center justify-center text-zinc-900 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-105"
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 border-none cursor-pointer flex items-center justify-center text-zinc-900 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-105"
            >
              <ChevronRightIcon />
            </button>
          </>
        )}

        {/* Counter badge */}
        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 z-10 text-[9px] font-bold tracking-widest uppercase text-white bg-black/60 px-2.5 py-1 rounded-full">
            {current + 1} / {images.length}
          </span>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={img._id}
              type="button"
              aria-label={`View image ${idx + 1}`}
              onClick={() => setCurrent(idx)}
              className={`shrink-0 w-16 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                idx === current
                  ? "border-[var(--text-main)] opacity-100 scale-[1.03]"
                  : "border-[var(--card-border)] opacity-50 hover:opacity-80"
              }`}
            >
              <img src={img.url} alt={img.alt} className="w-full h-full object-cover" draggable={false} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Skeleton Loader ─── */
const SkeletonDetail = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
      {/* Image skeleton */}
      <div>
        <div className="w-full aspect-[4/5] bg-[var(--input-bg)] rounded-2xl" />
        <div className="flex gap-2 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-16 h-20 bg-[var(--input-bg)] rounded-xl shrink-0" />
          ))}
        </div>
      </div>
      {/* Info skeleton */}
      <div className="flex flex-col gap-6 pt-2">
        <div className="h-3 bg-[var(--input-bg)] rounded w-1/4" />
        <div className="h-9 bg-[var(--input-bg)] rounded w-4/5" />
        <div className="h-9 bg-[var(--input-bg)] rounded w-2/5" />
        <div className="h-px bg-[var(--input-bg)]" />
        <div className="space-y-2">
          <div className="h-3 bg-[var(--input-bg)] rounded w-1/5" />
          <div className="h-4 bg-[var(--input-bg)] rounded w-full" />
          <div className="h-4 bg-[var(--input-bg)] rounded w-5/6" />
        </div>
        <div className="h-12 bg-[var(--input-bg)] rounded-xl" />
        <div className="h-12 bg-[var(--input-bg)] rounded-xl" />
      </div>
    </div>
  </div>
);

/* ══════════════════════ PRODUCT DETAILS ══════════════════════ */
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const { handleGetProductDetails } = useProduct();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const [liked, setLiked] = useState(false);
  const [qty, setQty] = useState(1);
  const [openPanel, setOpenPanel] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await handleGetProductDetails(id);
        setProduct(data);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Failed to load product.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const symbol = CURRENCY_SYMBOL[product?.price?.currency] ?? product?.price?.currency ?? "";

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-[var(--bg-main)]/90 backdrop-blur-xl border-b border-[var(--card-border)] transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Back + Logo */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="w-8 h-8 rounded-full border border-[var(--input-border)] bg-transparent cursor-pointer flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-main)] transition-all duration-200"
            >
              <ArrowLeftIcon />
            </button>
            <Link to="/" className="no-underline flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[var(--btn-bg)] text-[var(--btn-text)] flex items-center justify-center text-xs font-black">
                S
              </div>
              <span className="font-serif-title text-sm font-extrabold tracking-[0.18em] uppercase text-[var(--text-main)] hidden sm:block">
                SNITCH
              </span>
            </Link>
          </div>

          {/* Breadcrumb */}
          <p className="hidden md:block text-xs text-[var(--text-muted)] font-semibold tracking-[0.08em] uppercase truncate max-w-xs">
            {product ? product.title : "Product Details"}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-8 h-8 rounded-full border border-[var(--input-border)] bg-transparent cursor-pointer flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-main)] transition-all duration-200"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              type="button"
              onClick={() => setLiked((l) => !l)}
              aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
              className={`w-8 h-8 rounded-full border cursor-pointer flex items-center justify-center transition-all duration-200 ${
                liked
                  ? "border-red-400 text-red-500 bg-red-50 scale-110"
                  : "border-[var(--input-border)] text-[var(--text-muted)] bg-transparent hover:border-[var(--text-main)] hover:text-[var(--text-main)]"
              }`}
            >
              <HeartIcon filled={liked} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="max-w-6xl mx-auto px-6 py-10 pb-20">

        {/* Error state */}
        {error && (
          <div className="mb-8 px-4 py-3.5 rounded-xl bg-red-500/6 border border-red-500/20 text-red-500 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Skeleton */}
        {loading && <SkeletonDetail />}

        {/* Product layout */}
        {!loading && product && (
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 animate-[fadeSlideUp_0.5s_ease_both]"
          >
            {/* ── LEFT: Image Slider ── */}
            <div className="sticky top-24 self-start">
              <ImageSlider images={product.images} />
            </div>

            {/* ── RIGHT: Product Info ── */}
            <div className="flex flex-col gap-6">

              {/* Label + share */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold tracking-[0.3em] uppercase text-[var(--text-muted)]">
                  SNITCH Original
                </span>
                <button
                  type="button"
                  aria-label="Share product"
                  className="w-8 h-8 rounded-full border border-[var(--input-border)] bg-transparent cursor-pointer flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-main)] transition-all duration-200"
                >
                  <ShareIcon />
                </button>
              </div>

              {/* Title */}
              <h1 className="font-serif-title text-[clamp(1.8rem,5vw,3rem)] font-normal leading-[1.1] text-[var(--text-main)] m-0 capitalize">
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-end gap-3">
                <span className="text-[clamp(1.6rem,4vw,2.2rem)] font-bold text-[var(--text-main)] tracking-tight">
                  {symbol}{Number(product.price?.amount).toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-bold tracking-[0.14em] uppercase text-[var(--text-muted)] border border-[var(--input-border)] rounded-full px-2.5 py-1 mb-1">
                  {product.price?.currency}
                </span>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2">
                {["Free Returns", "Secure Payment", "Original Quality"].map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--text-muted)] bg-[var(--input-bg)] border border-[var(--card-border)] rounded-full px-3 py-1">
                    <CheckIcon /> {badge}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-[var(--card-border)]" />

              {/* Description */}
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[var(--text-muted)] mb-3">
                  About this product
                </p>
                <p className="text-sm text-[var(--text-main)] leading-relaxed">
                  {product.description || "No description available."}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-[var(--card-border)]" />

              {/* Quantity picker */}
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[var(--text-muted)] mb-3">
                  Quantity
                </p>
                <div className="inline-flex items-center border border-[var(--input-border)] rounded-xl overflow-hidden">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--input-bg)] cursor-pointer border-none bg-transparent transition-colors text-lg font-light"
                  >
                    −
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center text-sm font-bold text-[var(--text-main)] border-x border-[var(--input-border)]">
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--input-bg)] cursor-pointer border-none bg-transparent transition-colors text-lg font-light"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {/* Buy Now */}
                <button
                  type="button"
                  id="buy-now-btn"
                  className="flex-1 py-4 px-6 rounded-xl border-none cursor-pointer text-sm font-bold tracking-[0.1em] uppercase flex items-center justify-center gap-2 bg-[var(--btn-bg)] text-[var(--btn-text)] hover:bg-[var(--btn-hover)] active:scale-[0.98] transition-all duration-200"
                >
                  <BoltIcon /> Buy Now
                </button>

                {/* Add to Cart */}
                <button
                  type="button"
                  id="add-to-cart-detail-btn"
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 px-6 rounded-xl cursor-pointer text-sm font-bold tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] ${
                    addedToCart
                      ? "bg-green-500 text-white border-transparent"
                      : "bg-transparent border border-[var(--input-border)] text-[var(--text-main)] hover:border-[var(--text-main)]"
                  }`}
                >
                  {addedToCart
                    ? <><CheckIcon /> Added to Cart!</>
                    : <><CartIcon /> Add to Cart</>
                  }
                </button>
              </div>

              {/* Divider */}
              <div className="h-px bg-[var(--card-border)]" />

              {/* Meta info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--input-bg)] rounded-xl p-4">
                  <p className="text-[9px] font-extrabold tracking-[0.2em] uppercase text-[var(--text-muted)] mb-1.5">
                    Product ID
                  </p>
                  <p className="text-xs font-mono text-[var(--text-main)] truncate">
                    {product._id}
                  </p>
                </div>
                <div className="bg-[var(--input-bg)] rounded-xl p-4">
                  <p className="text-[9px] font-extrabold tracking-[0.2em] uppercase text-[var(--text-muted)] mb-1.5">
                    Photos
                  </p>
                  <p className="text-xs font-semibold text-[var(--text-main)]">
                    {product.images?.length} image{product.images?.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Total price preview */}
              {qty > 1 && (
                <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--card-border)]">
                  <span className="text-xs text-[var(--text-muted)] font-semibold">
                    Total ({qty} items)
                  </span>
                  <span className="text-sm font-bold text-[var(--text-main)]">
                    {symbol}{(Number(product.price?.amount) * qty).toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-[var(--card-border)]" />

              {/* ── Accordion: Shipping / Returns / Authenticity ── */}
              {[
                {
                  id: "shipping",
                  icon: <TruckIcon />,
                  label: "Shipping & Delivery",
                  content: (
                    <ul className="space-y-2.5 text-sm text-[var(--text-main)] leading-relaxed">
                      <li className="flex gap-3">
                        <span className="mt-0.5 shrink-0 text-[var(--text-muted)]"><CheckIcon /></span>
                        <span><strong>Standard Delivery</strong> — 5–7 business days. Free on orders above ₹999.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-0.5 shrink-0 text-[var(--text-muted)]"><CheckIcon /></span>
                        <span><strong>Express Delivery</strong> — 1–3 business days at a flat ₹99 fee.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-0.5 shrink-0 text-[var(--text-muted)]"><CheckIcon /></span>
                        <span>Orders are dispatched within <strong>24 hours</strong> on business days.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-0.5 shrink-0 text-[var(--text-muted)]"><CheckIcon /></span>
                        <span>Tracking link sent via SMS & email once shipped.</span>
                      </li>
                    </ul>
                  ),
                },
                {
                  id: "returns",
                  icon: <RotateCcwIcon />,
                  label: "Return Policy",
                  content: (
                    <ul className="space-y-2.5 text-sm text-[var(--text-main)] leading-relaxed">
                      <li className="flex gap-3">
                        <span className="mt-0.5 shrink-0 text-[var(--text-muted)]"><CheckIcon /></span>
                        <span><strong>7-day hassle-free returns</strong> from the date of delivery.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-0.5 shrink-0 text-[var(--text-muted)]"><CheckIcon /></span>
                        <span>Items must be unworn, unwashed, with tags intact and original packaging.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-0.5 shrink-0 text-[var(--text-muted)]"><CheckIcon /></span>
                        <span>Refund processed within <strong>3–5 business days</strong> after item inspection.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-0.5 shrink-0 text-[var(--text-muted)]"><CheckIcon /></span>
                        <span>Exchange available for size or color (subject to stock availability).</span>
                      </li>
                    </ul>
                  ),
                },
                {
                  id: "authenticity",
                  icon: <ShieldCheckIcon />,
                  label: "Authenticity Guarantee",
                  content: (
                    <ul className="space-y-2.5 text-sm text-[var(--text-main)] leading-relaxed">
                      <li className="flex gap-3">
                        <span className="mt-0.5 shrink-0 text-[var(--text-muted)]"><CheckIcon /></span>
                        <span>Every product is sourced directly from <strong>verified SNITCH sellers</strong>.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-0.5 shrink-0 text-[var(--text-muted)]"><CheckIcon /></span>
                        <span>All listings go through a <strong>quality inspection</strong> before going live.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-0.5 shrink-0 text-[var(--text-muted)]"><CheckIcon /></span>
                        <span>Each order ships with a <strong>SNITCH authenticity tag</strong> — your proof of originality.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-0.5 shrink-0 text-[var(--text-muted)]"><CheckIcon /></span>
                        <span>If you receive a counterfeit, we offer a <strong>full refund + ₹500 coupon</strong>.</span>
                      </li>
                    </ul>
                  ),
                },
              ].map(({ id, icon, label, content }) => (
                <div key={id} className="border border-[var(--card-border)] rounded-xl overflow-hidden">
                  <button
                    type="button"
                    id={`accordion-${id}`}
                    aria-expanded={openPanel === id}
                    onClick={() => setOpenPanel((prev) => (prev === id ? null : id))}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3.5 bg-transparent border-none cursor-pointer text-left transition-colors hover:bg-[var(--input-bg)] group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors">{icon}</span>
                      <span className="text-xs font-bold tracking-[0.1em] uppercase text-[var(--text-main)]">{label}</span>
                    </div>
                    <span
                      className="text-[var(--text-muted)] transition-transform duration-300 shrink-0"
                      style={{ transform: openPanel === id ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      <ChevronDownIcon />
                    </span>
                  </button>
                  {/* Panel body */}
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: openPanel === id ? "400px" : "0px" }}
                  >
                    <div className="px-4 pb-4 pt-1 border-t border-[var(--card-border)]">
                      {content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty / not found state */}
        {!loading && !product && !error && (
          <div className="flex flex-col items-center justify-center py-32 gap-5 text-center">
            <div className="text-5xl">🔍</div>
            <p className="text-base font-semibold text-[var(--text-main)]">Product not found</p>
            <p className="text-sm text-[var(--text-muted)]">The product you're looking for doesn't exist.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--btn-bg)] text-[var(--btn-text)] text-xs font-bold tracking-[0.1em] uppercase no-underline hover:bg-[var(--btn-hover)] transition-colors"
            >
              <ArrowLeftIcon /> Back to Shop
            </Link>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--card-border)] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[var(--btn-bg)] text-[var(--btn-text)] flex items-center justify-center text-[10px] font-black">S</div>
            <span className="font-serif-title text-xs font-bold tracking-[0.18em] uppercase text-[var(--text-main)]">SNITCH</span>
          </div>
          <p className="text-[10px] text-[var(--text-muted)] font-semibold tracking-[0.1em] uppercase m-0">
            © 2026 SNITCH. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetails;
