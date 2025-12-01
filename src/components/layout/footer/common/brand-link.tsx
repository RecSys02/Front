import BrandLogo from "@/assets/logos/brand.svg?react";
import { ROUTES } from "@/constants/routes";
import { Link } from "@tanstack/react-router";

const BrandLink = () => {
  return (
    <Link to={ROUTES.Home}>
      <BrandLogo className="w-full h-auto" />
    </Link>
  );
};

export default BrandLink;
