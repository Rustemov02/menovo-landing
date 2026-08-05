import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ("superadmin" | "admin" | "kitchen")[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, initializing } = useAppSelector((state) => state.auth);

  // Show loading spinner while auth check is in progress
  if (initializing) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-16 w-16 text-[#d63c00] mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <p className="text-[#5c4038] text-[14px]">Yoxlanır...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === "superadmin") {
      return <Navigate to="/superadmin" replace />;
    } else if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (user.role === "kitchen") {
      return <Navigate to="/kitchen" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
