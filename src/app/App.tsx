import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import { Outlet, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <>
      <div className="min-h-screen flex flex-col w-[1920px] mx-auto">
        <Header />
        <main className="flex flex-1 flex-col">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};
export default App;
