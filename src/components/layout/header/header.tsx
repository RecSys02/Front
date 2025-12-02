import { useEffect, useState } from "react";
import { Locale } from "@/constants/types";
import MainNav from "./main/main-nav";

const Header = () => {
  const [locale, setLocale] = useState<Locale>("KR");
  const [isTop, setIsTop] = useState(true);

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
        backgroundColor: isTop ? "var(--banner-color)" : "var(--white)",
      }}
    >
      <MainNav locale={locale} onChange={setLocale} />
    </header>
  );
};

export default Header;
