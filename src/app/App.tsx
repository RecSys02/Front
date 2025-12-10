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
      <div className="w-full min-h-screen overflow-x-auto">
        <div className="min-h-screen flex flex-col w-[1920px] mx-auto">
          <Header />
          <main className="flex-1 pt-22.5">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default App;
