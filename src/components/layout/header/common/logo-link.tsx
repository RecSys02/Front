import Logo from "@/assets/logo.svg?react";
import { ROUTES } from "@/constants/routes";
import { Link } from "@tanstack/react-router";

const LogoLink = () => {
  return (
    <Link to={ROUTES.Home}>
      <Logo />
    </Link>
  );
};

export default LogoLink;
