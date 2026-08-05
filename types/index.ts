export interface MenuItem {
  _id: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  restaurantId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  tableNumber: number;
  tableName?: string;
  items: CartItem[];
  totalPrice: number;
  status: "pending" | "preparing" | "completed" | "cancelled";
  tableToken?: string;
  createdAt: string;
}

export interface TableResponse {
  _id: string;
  tableNumber: string;
  title?: string;
  status: "active" | "occupied";
  token: string;
  restaurantId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  username: string;
  role: "superadmin" | "admin" | "kitchen";
  restaurantId?: string;
  restaurantName?: string;
  restaurantSlug?: string;
  restaurantSystemMode?: SystemMode;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  initializing: boolean;
  error: string | null;
  users: any[];
  restaurants: any[];
  usersLoading: boolean;
  restaurantsLoading: boolean;
}

export type SystemMode = "VIEWER_ONLY" | "FULL_ORDERING";

export interface Restaurant {
  id: string;
  name: string;
  slug?: string;
  address?: string;
  phone?: string;
  isActive: boolean;
  systemMode?: SystemMode;
  createdAt?: string;
}

export interface RestaurantInfo {
  name: string;
  address?: string;
  phone?: string;
  systemMode?: SystemMode;
  logo?: string;
  coverImage?: string;
  description?: string;
  workingHours?: string;
  wifiSsid?: string;
  wifiPassword?: string;
  googleMapsUrl?: string;
  wazeUrl?: string;
  instagram?: string;
}
