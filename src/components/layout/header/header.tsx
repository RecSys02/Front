import { useEffect, useState } from "react";
import { Locale } from "@/constants/types";
import MainNav from "./main/main-nav";
import { Border } from "@/components/ui/border";
import { useLocation } from "@tanstack/react-router";

const Header = () => {
  const [locale, setLocale] = useState<Locale>("KR");
  const [isTop, setIsTop] = useState(true);

  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 left-0 z-50 w-full"
      style={{
        backgroundColor:
          isHome && isTop ? "var(--banner-color)" : "var(--white)",
      }}
    >
      <MainNav locale={locale} onChange={setLocale} />
      {!isHome && <Border />}
    </header>
  );
};

export default Header;
