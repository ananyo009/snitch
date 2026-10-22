import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useTheme from "../../../hooks/useTheme.js";
import useProduct from "../hook/useProduct.js";
import { useNavigate } from "react-router-dom";

/* ─── Currency symbol map ─── */
const CURRENCY_SYMBOL = { INR: "₹", USD: "$", EUR: "€", GBP: "£" };



/* ─── SVG Icons ─── */
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const HeartIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ─── Image Slider ─── */
const ImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isHovered && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
      }, 1200);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered, images.length]);

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
      <div className="aspect-[3/4] bg-[var(--input-bg)] flex items-center justify-center rounded-t-2xl">
        <span className="text-[10px] text-[var(--text-muted)] tracking-[0.15em] uppercase">No image</span>
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[3/4] overflow-hidden rounded-t-2xl select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); clearInterval(intervalRef.current); }}
    >
      {/* Slides */}
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

      {/* Gradient overlay — fades in on group hover */}
      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent z-[2] transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

      {images.length > 1 && (
        <>
          {/* Prev */}
          <button
            type="button"
            aria-label="Previous image"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 border-none cursor-pointer flex items-center justify-center text-zinc-900 shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 hover:bg-white"
          >
            <ChevronLeftIcon />
          </button>
          {/* Next */}
          <button
            type="button"
            aria-label="Next image"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 border-none cursor-pointer flex items-center justify-center text-zinc-900 shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 hover:bg-white"
          >
            <ChevronRightIcon />
          </button>

          {/* Pill dots */}
          <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to image ${idx + 1}`}
                onClick={(e) => { e.stopPropagation(); setCurrent(idx); }}
                className="h-1.5 rounded-full border-none cursor-pointer p-0 transition-all duration-300"
                style={{
                  width: idx === current ? "16px" : "6px",
                  background: idx === current ? "#fff" : "rgba(255,255,255,0.5)",
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Counter badge */}
      {images.length > 1 && (
        <span className="absolute top-2.5 right-2.5 z-10 text-[9px] font-bold tracking-widest uppercase text-white bg-black/55 px-2 py-0.5 rounded-full">
          {current + 1}/{images.length}
        </span>
      )}
    </div>
  );
};

/* ─── Product Card ─── */
const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const symbol = CURRENCY_SYMBOL[product.price?.currency] ?? product.price?.currency ?? "";

  const handleAddToCart = (e) => {
    e.preventDefault();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div onClick={()=>navigate(`/details/${product._id}`)}
      className="bg-[var(--bg-main)] border border-[var(--card-border)] rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl animate-[fadeSlideUp_0.5s_ease_both]"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Image + wishlist */}
      <div className="relative">
        <ImageSlider images={product.images} />
        <button
          type="button"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
          className={`absolute top-3 left-3 z-10 w-8 h-8 rounded-full border-none cursor-pointer flex items-center justify-center backdrop-blur-md transition-all duration-200 ${
            liked
              ? "bg-red-500/15 text-red-500 scale-110"
              : "bg-white/85 text-zinc-500 scale-100"
          }`}
        >
          <HeartIcon filled={liked} />
        </button>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-3 flex-1">

        {/* Title + Price */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-[var(--text-main)] leading-snug truncate capitalize m-0">
              {product.title}
            </h2>
            <p className="text-[11px] text-[var(--text-muted)] mt-1 truncate leading-relaxed">
              {product.description || "No description"}
            </p>
          </div>
          <div className="shrink-0 text-sm font-bold text-[var(--text-main)] bg-[var(--input-bg)] rounded-lg px-2.5 py-1 whitespace-nowrap tracking-tight">
            {symbol}{Number(product.price?.amount).toLocaleString("en-IN")}
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[9px] font-bold tracking-[0.14em] uppercase text-[var(--text-muted)] border border-[var(--input-border)] rounded-full px-2 py-0.5">
            {product.price?.currency}
          </span>
          <span className="text-[9px] font-bold tracking-[0.14em] uppercase text-[var(--text-muted)] border border-[var(--input-border)] rounded-full px-2 py-0.5">
            {product.images?.length} {product.images?.length === 1 ? "photo" : "photos"}
          </span>
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          id={`add-to-cart-${product._id}`}
          onClick={handleAddToCart}
          className={`mt-auto w-full py-2.5 px-4 rounded-xl border-none cursor-pointer text-xs font-bold tracking-[0.08em] uppercase flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.97] ${
            addedToCart
              ? "bg-green-500 text-white scale-[0.97]"
              : "bg-[var(--btn-bg)] text-[var(--btn-text)] hover:bg-[var(--btn-hover)]"
          }`}
        >
          {addedToCart ? <><span>✓</span> Added!</> : <><CartIcon /> Add to Cart</>}
        </button>
      </div>
    </div>
  );
};

/* ─── Skeleton Card ─── */
const SkeletonCard = () => (
  <div className="bg-[var(--bg-main)] border border-[var(--card-border)] rounded-2xl overflow-hidden animate-pulse">
    <div className="aspect-[3/4] bg-[var(--input-bg)]" />
    <div className="p-4 flex flex-col gap-3">
      <div className="flex justify-between gap-2">
        <div className="flex-1">
          <div className="h-3.5 bg-[var(--input-bg)] rounded w-[70%] mb-2" />
          <div className="h-2.5 bg-[var(--input-bg)] rounded w-[90%]" />
        </div>
        <div className="h-7 w-16 bg-[var(--input-bg)] rounded-lg shrink-0" />
      </div>
      <div className="flex gap-1.5">
        <div className="h-5 w-12 bg-[var(--input-bg)] rounded-full" />
        <div className="h-5 w-14 bg-[var(--input-bg)] rounded-full" />
      </div>
      <div className="h-10 bg-[var(--input-bg)] rounded-xl" />
    </div>
  </div>
);

/* ─── Empty State ─── */
const EmptyState = ({ query }) => (
  <div className="col-span-full text-center py-20 flex flex-col items-center gap-4">
    <div className="w-18 h-18 rounded-full border-2 border-dashed border-[var(--input-border)] bg-[var(--input-bg)] flex items-center justify-center text-3xl">
      🛍️
    </div>
    <div>
      <p className="text-sm font-semibold text-[var(--text-main)] m-0">
        {query ? `No results for "${query}"` : "No products available"}
      </p>
      <p className="text-xs text-[var(--text-muted)] mt-1.5">
        {query ? "Try a different search term." : "Check back soon — new arrivals coming."}
      </p>
    </div>
  </div>
);

/* ══════════════════════ HOME ══════════════════════ */
const Home = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { handlegetAllProducts } = useProduct();
  const products = useSelector((state) => state.product.products);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [scrolled, setScrolled] = useState(false);

  /* Fetch all products on mount */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await handlegetAllProducts();
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* Navbar scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Filter + Sort */
  const filteredProducts = [...(products || [])]
    .filter((p) => {
      const q = searchQuery.toLowerCase();
      return p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return (a.price?.amount ?? 0) - (b.price?.amount ?? 0);
      if (sortBy === "price-desc") return (b.price?.amount ?? 0) - (a.price?.amount ?? 0);
      if (sortBy === "name") return a.title?.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
      `}</style>

      {/* ════════════ NAVBAR ════════════ */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-zinc-950/92 backdrop-blur-xl border-b border-[var(--card-border)]"
          : "bg-transparent border-b border-transparent"
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="no-underline flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--btn-bg)] text-[var(--btn-text)] flex items-center justify-center text-sm font-black tracking-wide">
              S
            </div>
            <span className="font-serif-title text-base font-extrabold tracking-[0.18em] uppercase text-[var(--text-main)]">
              SNITCH
            </span>
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-7">
            <a href="#products" className="text-xs font-semibold tracking-[0.1em] uppercase text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors no-underline">
              Shop
            </a>
            <Link to="/seller/view" className="text-xs font-semibold tracking-[0.1em] uppercase text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors no-underline">
              Sellers
            </Link>
            <Link to="/login" className="text-xs font-semibold tracking-[0.1em] uppercase text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors no-underline">
              Sign In
            </Link>
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              id="home-theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full border border-[var(--input-border)] bg-transparent cursor-pointer flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-main)] transition-all duration-200"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            <Link
              to="/login"
              id="home-cart-btn"
              className="w-9 h-9 rounded-full border border-[var(--input-border)] bg-transparent flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-main)] transition-all duration-200 no-underline"
            >
              <CartIcon />
            </Link>
          </div>
        </div>
      </header>

      {/* ════════════ HERO ════════════ */}
      <section className="relative overflow-hidden px-6 pt-20 pb-18 text-center animate-[fadeIn_0.8s_ease]">
        {/* Decorative blur orb */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.1)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-[10px] font-extrabold tracking-[0.3em] uppercase text-[var(--text-muted)] mb-5 animate-[fadeSlideUp_0.6s_ease_0.1s_both]">
            New Collection · SS 2026
          </p>
          <h1 className="font-serif-title text-[clamp(2.4rem,7vw,4.5rem)] font-normal leading-[1.1] text-[var(--text-main)] mb-5 animate-[fadeSlideUp_0.6s_ease_0.2s_both]">
            Wear what you<br />
            <em className="italic">actually</em> want.
          </h1>
          <p className="text-[15px] text-[var(--text-muted)] leading-relaxed max-w-[480px] mx-auto mb-9 animate-[fadeSlideUp_0.6s_ease_0.3s_both]">
            Bold drops, raw styles, no compromise. Discover the latest from SNITCH — fashion built for the fearless.
          </p>

          {/* CTAs */}
          <div className="flex gap-3 justify-center flex-wrap animate-[fadeSlideUp_0.6s_ease_0.4s_both]">
            <a
              href="#products"
              id="hero-shop-now-btn"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--btn-bg)] text-[var(--btn-text)] text-xs font-bold tracking-[0.1em] uppercase no-underline transition-all duration-200 hover:bg-[var(--btn-hover)] hover:scale-[1.04] active:scale-[0.98]"
            >
              Shop Now <ArrowRightIcon />
            </a>
            <Link
              to="/seller/create"
              id="hero-sell-btn"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-transparent border border-[var(--input-border)] text-[var(--text-main)] text-xs font-bold tracking-[0.1em] uppercase no-underline transition-all duration-200 hover:border-[var(--text-main)] active:scale-[0.98]"
            >
              Sell on SNITCH
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-[var(--card-border)] mx-auto mt-14" />
      </section>

      {/* ════════════ PRODUCTS SECTION ════════════ */}
      <section id="products" className="max-w-6xl mx-auto px-6 pt-16 pb-24">

        {/* Section header */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10 animate-[fadeSlideUp_0.5s_ease_0.1s_both]">
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-[var(--text-muted)] mb-2">
              Catalog
            </p>
            <h2 className="font-serif-title text-[clamp(1.6rem,4vw,2.4rem)] font-normal text-[var(--text-main)] m-0 leading-snug">
              All Products
            </h2>
          </div>
          {!loading && (
            <p className="text-xs text-[var(--text-muted)] font-medium">
              {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
            </p>
          )}
        </div>

        {/* ── Search & Sort bar ── */}
        <div className="flex gap-3 flex-wrap mb-10 animate-[fadeSlideUp_0.5s_ease_0.15s_both]">
          {/* Search */}
          <div className="relative flex-[1_1_260px]">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none flex">
              <SearchIcon />
            </span>
            <input
              id="home-search-input"
              type="search"
              placeholder="Search products…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-10 pr-10 rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-main)] text-sm box-border transition-all duration-200 focus:outline-none focus:border-[var(--input-border-focus)] focus:ring-2 focus:ring-[var(--input-border-focus)]/10"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[var(--text-muted)] flex p-0 hover:text-[var(--text-main)] transition-colors"
              >
                <XIcon />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-[var(--text-muted)] flex">
              <FilterIcon />
            </span>
            <select
              id="home-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-3 pl-3.5 pr-9 rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-main)] text-xs font-semibold cursor-pointer appearance-none focus:outline-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name">Name: A → Z</option>
            </select>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-8 px-4 py-3.5 rounded-xl bg-red-500/6 border border-red-500/20 text-red-500 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Product grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : filteredProducts.length === 0
              ? <EmptyState query={searchQuery} />
              : filteredProducts.map((product, i) => (
                  <ProductCard key={product._id} product={product} index={i} />
                ))
          }
        </div>

        {/* Products shown count */}
        {!loading && filteredProducts.length > 0 && (
          <div className="text-center mt-16">
            <p className="text-[11px] text-[var(--text-muted)] tracking-[0.1em] uppercase font-semibold">
              {filteredProducts.length} of {filteredProducts.length} products shown
            </p>
          </div>
        )}
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <footer className="border-t border-[var(--card-border)] py-10 px-6 bg-[var(--bg-main)]">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-6 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[var(--btn-bg)] text-[var(--btn-text)] flex items-center justify-center text-xs font-black">
              S
            </div>
            <span className="font-serif-title text-xs font-bold tracking-[0.18em] uppercase text-[var(--text-main)]">
              SNITCH
            </span>
          </div>

          {/* Footer links */}
          <div className="flex gap-7 flex-wrap">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--text-muted)] no-underline hover:text-[var(--text-main)] transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[10px] text-[var(--text-muted)] font-semibold tracking-[0.1em] uppercase m-0">
            © 2026 SNITCH. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
