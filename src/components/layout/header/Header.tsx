import { useState } from "react";
import { Locale } from "@/constants/types";
import MainNav from "./main/main-nav";
import { useUser } from "@/hooks/user.hook";

const Header = () => {
  const [locale, setLocale] = useState<Locale>("KR");
  const { data } = useUser();
  const userName = data?.body.username ?? "Guest";

  return (
    <header className="sticky top-0 left-0 z-50 w-full bg-white">
      <MainNav locale={locale} userName={userName} onChange={setLocale} />
    </header>
  );
};
export default Header;
