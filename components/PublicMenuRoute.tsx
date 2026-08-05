import { Navigate, useParams } from "react-router-dom";
import CustomerMenu from "../pages/customer/CustomerMenu";
import { RESERVED_PUBLIC_SLUGS } from "../utils/systemMode";

export default function PublicMenuRoute() {
  const { slug } = useParams<{ slug?: string }>();

  if (slug && RESERVED_PUBLIC_SLUGS.has(slug.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  return <CustomerMenu />;
}
