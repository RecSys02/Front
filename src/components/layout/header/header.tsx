import { useState } from "react";
import { Locale } from "@/constants/types";
import MainNav from "./main/main-nav";

const Header = () => {
  const [locale, setLocale] = useState<Locale>("KR");

  return (
    <header className="sticky top-0 left-0 z-50 w-full bg-white">
      <MainNav locale={locale} onChange={setLocale} />
    </header>
  );
};
export default Header;
