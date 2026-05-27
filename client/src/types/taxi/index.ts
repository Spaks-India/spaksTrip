export type TaxiTripMode = "local" | "outstation" | "airport";

export type TaxiCabCategory = "hatchback" | "sedan" | "suv" | "premium" | "traveller";

export type TaxiFuelType = "Petrol" | "Diesel" | "CNG" | "Hybrid";

export type TaxiPackage = {
  slug: string;
  mode: TaxiTripMode;
  title: string;
  cabName: string;
  category: TaxiCabCategory;
  image: string;
  gallery: string[];
  pickupCity: string;
  pickupLocation: string;
  destination: string;
  duration: string;
  distanceKm: number;
  includedKm: number;
  extraKmCharge: number;
  driverAllowance: number;
  tollsEstimate: number;
  seats: number;
  bags: number;
  ac: boolean;
  fuelType: TaxiFuelType;
  transmission: "Manual" | "Automatic";
  rating: number;
  reviewCount: number;
  price: number;
  strikePrice?: number;
  recommended?: boolean;
  popular?: boolean;
  tags: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: Array<{
    title: string;
    description: string;
    time: string;
  }>;
  specs: Array<{
    label: string;
    value: string;
  }>;
  cancellation: string[];
  terms: string[];
  reviews: Array<{
    name: string;
    rating: number;
    text: string;
    route: string;
  }>;
};

export type TaxiSearchParams = {
  mode: TaxiTripMode;
  pickupCity: string;
  pickupLocation: string;
  destination: string;
  pickupDate: string;
  pickupTime: string;
  cabType: "any" | TaxiCabCategory;
};

export type TaxiFilters = {
  minPrice: number;
  maxPrice: number;
  categories: TaxiCabCategory[];
  ac: "all" | "ac" | "non-ac";
  minRating: number;
  popularOnly: boolean;
};

export type TaxiSort = "recommended" | "price-asc" | "price-desc" | "rating-desc";

export type TaxiBookingDraft = {
  leadPassenger: string;
  phone: string;
  email: string;
  passengers: number;
  pickupInstructions: string;
  coupon: string;
};
