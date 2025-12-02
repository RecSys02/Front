import Logo from "@/assets/logos/logo.svg?react";
import { ROUTES } from "@/constants/routes";
import { Link } from "@tanstack/react-router";

const LogoLink = () => {
  return (
    <Link to={ROUTES.Home} className="w-52 flex justify-center">
      <Logo className="w-18 h-fit" />
    </Link>
  );
};

export default LogoLink;
