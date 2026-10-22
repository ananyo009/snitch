import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useTheme from "../../../hooks/useTheme.js";
import useProduct from "../hook/useProduct.js";
import { useSelector } from "react-redux";
import Loader from "../../../component/Loader.jsx";
import { useNavigate } from "react-router-dom";

/* ─── SVG Icons (shared with CreateProduct) ─── */
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
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

/* ─── Nav items (Products active) ─── */
const NAV_ITEMS = [
  { label: "Dashboard",  icon: <GridIcon />,        to: "/" },
  { label: "Products",   icon: <PackageIcon />,     to: "/products", active: true },
  { label: "Orders",     icon: <ShoppingBagIcon />, to: "/orders" },
  { label: "Customers",  icon: <UsersIcon />,       to: "/customers" },
  { label: "Analytics",  icon: <BarChartIcon />,    to: "/analytics" },
  { label: "Settings",   icon: <SettingsIcon />,    to: "/settings" },
];

/* ─── Currency symbol map ─── */
const CURRENCY_SYMBOL = { INR: "₹", USD: "$", EUR: "€", GBP: "£" };

/* ─── Image Slider ─── */
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
      <div className="w-full aspect-[3/4] bg-[var(--input-bg)] flex items-center justify-center rounded-t-xl">
        <span className="text-xs text-[var(--text-muted)] tracking-widest uppercase">No image</span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-xl select-none group">
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

      {/* Prev / Next — only when more than 1 image */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-zinc-800 flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-zinc-800 flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRightIcon />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to image ${idx + 1}`}
                onClick={(e) => { e.stopPropagation(); setCurrent(idx); }}
                className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                style={{
                  background: idx === current ? "#fff" : "rgba(255,255,255,0.45)",
                  transform: idx === current ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Image counter badge */}
      <span className="absolute top-2.5 right-2.5 z-10 text-[9px] font-bold tracking-widest uppercase text-white bg-black/60 px-2 py-0.5 rounded-full">
        {current + 1} / {images.length}
      </span>
    </div>
  );
};

/* ─── Product Card ─── */
const ProductCard = ({ product }) => {

  const navigate = useNavigate();

  const symbol = CURRENCY_SYMBOL[product.price?.currency] ?? product.price?.currency ?? "";
  const currencyLabel = product.price?.currency
    ? symbol !== product.price.currency
      ? `${product.price.currency} (${symbol})`
      : product.price.currency
    : "—";

  return (
    <div onClick={()=>navigate(`/seller/productDetails/${product._id}`)} className="rounded-xl border border-[var(--card-border)] bg-[var(--bg-main)] overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <ImageSlider images={product.images} />

      <div className="p-5 flex flex-col gap-4 flex-1">

        {/* Title */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--text-muted)] mb-1">Title</p>
          <h2 className="text-sm font-semibold text-[var(--text-main)] leading-snug line-clamp-2">
            {product.title}
          </h2>
        </div>

        <div className="border-t border-[var(--card-border)]" />

        {/* Description */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--text-muted)] mb-1">Description</p>
          <p className="text-xs text-[var(--text-main)] leading-relaxed line-clamp-3">
            {product.description || "—"}
          </p>
        </div>

        <div className="border-t border-[var(--card-border)]" />

        {/* Pricing */}
        <div>
          <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--text-muted)] mb-2">Pricing</p>
          <div className="grid grid-cols-3 gap-3">
            {/* Currency — mirrors the select col in CreateProduct */}
            <div className="col-span-1">
              <div className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] py-3 px-3 text-xs text-[var(--text-main)] font-medium text-center">
                {currencyLabel}
              </div>
            </div>
            {/* Amount — mirrors the price-amount col */}
            <div className="col-span-2">
              <div className="w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] py-3 px-4 text-sm font-semibold text-[var(--text-main)] tracking-wide">
                {symbol}{Number(product.price?.amount).toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

/* ─── Skeleton loader card ─── */
const SkeletonCard = () => (
  <div className="rounded-xl border border-[var(--card-border)] bg-[var(--bg-main)] overflow-hidden animate-pulse">
    <div className="w-full aspect-[3/4] bg-[var(--input-bg)]" />
    <div className="p-5 space-y-4">
      <div className="h-2.5 bg-[var(--input-bg)] rounded w-1/4" />
      <div className="h-4 bg-[var(--input-bg)] rounded w-3/4" />
      <div className="border-t border-[var(--card-border)]" />
      <div className="h-2.5 bg-[var(--input-bg)] rounded w-1/4" />
      <div className="space-y-1.5">
        <div className="h-3 bg-[var(--input-bg)] rounded w-full" />
        <div className="h-3 bg-[var(--input-bg)] rounded w-5/6" />
      </div>
      <div className="border-t border-[var(--card-border)]" />
      <div className="h-2.5 bg-[var(--input-bg)] rounded w-1/4 mb-2" />
      <div className="flex gap-3">
        <div className="h-10 bg-[var(--input-bg)] rounded-lg w-1/3" />
        <div className="h-10 bg-[var(--input-bg)] rounded-lg flex-1" />
      </div>
    </div>
  </div>
);

/* ═══════════════════ ViewProduct ═══════════════════ */
const ViewProduct = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { handlegetSellerProduct } = useProduct();
  const products = useSelector((state) => state.product.sellerProduct);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await handlegetSellerProduct();
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <Loader/>
  }

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
          <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[var(--text-muted)]">
            Products
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-[var(--input-border)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            <Link
              to="/seller/create"
              id="add-product-btn"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--btn-bg)] text-[var(--btn-text)] px-4 py-2 text-xs font-semibold tracking-wide hover:bg-[var(--btn-hover)] transition-colors active:scale-[0.98]"
            >
              <PlusIcon />
              New Product
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 py-12 px-5 sm:px-10">
          <div className="mx-auto w-full max-w-[900px]">

            {/* Page heading */}
            <div className="mb-10">
              <h1 className="font-serif-title text-[clamp(2rem,5vw,2.4rem)] font-normal tracking-tight text-[var(--text-main)] leading-tight">
                Your Products
              </h1>
              <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
                Browse and manage all products listed in the SNITCH catalog.
              </p>
            </div>

            {/* Error banner */}
            {error && (
              <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-600">
                {error}
              </div>
            )}

            {/* Skeleton loaders */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && products.length === 0 && (
              <div className="border-2 border-dashed border-[var(--input-border)] rounded-xl py-20 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-[var(--input-border)] bg-[var(--input-bg)] flex items-center justify-center text-[var(--text-muted)]">
                    <PackageIcon />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-main)]">No products yet</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Create your first product to see it here.</p>
                  </div>
                  <Link
                    to="/products/create"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--btn-bg)] text-[var(--btn-text)] px-5 py-2.5 text-xs font-semibold tracking-wide hover:bg-[var(--btn-hover)] transition-colors"
                  >
                    <PlusIcon />
                    New Product
                  </Link>
                </div>
              </div>
            )}

            {/* Product grid */}
            {!loading && !error && products.length > 0 && (
              <>
                <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text-muted)] mb-6">
                  {products.length} {products.length === 1 ? "product" : "products"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </>
            )}

            {/* Footer */}
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

export default ViewProduct;
