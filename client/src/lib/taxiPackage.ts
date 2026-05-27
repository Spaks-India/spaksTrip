import { taxiPackages } from "@/data/taxi/packages";
import type { TaxiCabCategory, TaxiFilters, TaxiPackage, TaxiSearchParams, TaxiSort, TaxiTripMode } from "@/types/taxi";

export const TAXI_CATEGORIES: Array<{ value: TaxiCabCategory; label: string }> = [
  { value: "hatchback", label: "Hatchback" },
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "premium", label: "Premium" },
  { value: "traveller", label: "Traveller" },
];

export const TAXI_MODES: Array<{ value: TaxiTripMode; label: string; description: string }> = [
  { value: "local", label: "Local", description: "Hourly rentals and city sightseeing" },
  { value: "outstation", label: "Outstation", description: "Intercity one-way and round trips" },
  { value: "airport", label: "Airport Transfer", description: "Flight-aware pickup and drop" },
];

export const defaultTaxiSearch: TaxiSearchParams = {
  mode: "outstation",
  pickupCity: "Delhi",
  pickupLocation: "Hotel, airport, or home pickup",
  destination: "Agra",
  pickupDate: new Date().toISOString().slice(0, 10),
  pickupTime: "09:00",
  cabType: "any",
};

export const defaultTaxiFilters: TaxiFilters = {
  minPrice: 0,
  maxPrice: 10000,
  categories: [],
  ac: "all",
  minRating: 0,
  popularOnly: false,
};

export function formatCurrency(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function categoryLabel(category: TaxiCabCategory): string {
  return TAXI_CATEGORIES.find((item) => item.value === category)?.label ?? category;
}

export function searchParamsToQuery(params: TaxiSearchParams): URLSearchParams {
  const qs = new URLSearchParams();
  qs.set("mode", params.mode);
  qs.set("pickupCity", params.pickupCity);
  qs.set("pickupLocation", params.pickupLocation);
  qs.set("destination", params.destination);
  qs.set("pickupDate", params.pickupDate);
  qs.set("pickupTime", params.pickupTime);
  qs.set("cabType", params.cabType);
  return qs;
}

export function parseTaxiSearchParams(searchParams: URLSearchParams): TaxiSearchParams {
  const mode = searchParams.get("mode");
  const cabType = searchParams.get("cabType");
  return {
    mode: mode === "local" || mode === "airport" || mode === "outstation" ? mode : defaultTaxiSearch.mode,
    pickupCity: searchParams.get("pickupCity") || defaultTaxiSearch.pickupCity,
    pickupLocation: searchParams.get("pickupLocation") || defaultTaxiSearch.pickupLocation,
    destination: searchParams.get("destination") || defaultTaxiSearch.destination,
    pickupDate: searchParams.get("pickupDate") || defaultTaxiSearch.pickupDate,
    pickupTime: searchParams.get("pickupTime") || defaultTaxiSearch.pickupTime,
    cabType:
      cabType === "hatchback" || cabType === "sedan" || cabType === "suv" || cabType === "premium" || cabType === "traveller"
        ? cabType
        : "any",
  };
}

export function findTaxiPackage(slug: string): TaxiPackage | undefined {
  return taxiPackages.find((pkg) => pkg.slug === slug);
}

export function getSimilarTaxiPackages(pkg: TaxiPackage): TaxiPackage[] {
  return taxiPackages
    .filter((item) => item.slug !== pkg.slug && (item.mode === pkg.mode || item.pickupCity === pkg.pickupCity))
    .slice(0, 3);
}

export function searchTaxiPackages(params: TaxiSearchParams, filters: TaxiFilters, sort: TaxiSort): TaxiPackage[] {
  const pickup = params.pickupCity.toLowerCase().trim();
  const destination = params.destination.toLowerCase().trim();

  const matches = taxiPackages.filter((pkg) => {
    const matchesMode = pkg.mode === params.mode;
    const matchesPickup = !pickup || pkg.pickupCity.toLowerCase().includes(pickup);
    const matchesDestination =
      !destination ||
      pkg.destination.toLowerCase().includes(destination) ||
      pkg.title.toLowerCase().includes(destination);
    const matchesCab = params.cabType === "any" || pkg.category === params.cabType;
    const matchesPrice = pkg.price >= filters.minPrice && pkg.price <= filters.maxPrice;
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(pkg.category);
    const matchesAc = filters.ac === "all" || (filters.ac === "ac" ? pkg.ac : !pkg.ac);
    const matchesRating = pkg.rating >= filters.minRating;
    const matchesPopular = !filters.popularOnly || Boolean(pkg.popular || pkg.recommended);
    return matchesMode && matchesPickup && matchesDestination && matchesCab && matchesPrice && matchesCategory && matchesAc && matchesRating && matchesPopular;
  });

  return [...matches].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating-desc") return b.rating - a.rating;
    return Number(Boolean(b.recommended)) - Number(Boolean(a.recommended)) || b.rating - a.rating || a.price - b.price;
  });
}

export function fareBreakdown(pkg: TaxiPackage, coupon = "") {
  const baseFare = pkg.price;
  const serviceFee = Math.round(baseFare * 0.035);
  const taxes = Math.round((baseFare + serviceFee) * 0.05);
  const couponDiscount = coupon.trim().toUpperCase() === "SPAKS500" ? 500 : 0;
  const total = Math.max(baseFare + serviceFee + taxes - couponDiscount, 0);
  return { baseFare, serviceFee, taxes, couponDiscount, total };
}
