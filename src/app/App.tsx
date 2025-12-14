import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import { ROUTES } from "@/constants/routes";
import { Outlet, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  const isFullscreen = pathname.startsWith(ROUTES.ModelSpot);
  if (isFullscreen) {
    return <Outlet />;
  }

  return (
    <>
      <div className="flex flex-col w-[1920px] mx-auto">
        <div className="min-h-screen flex flex-col w-full mx-auto">
          <Header />
          <main className="flex flex-1 flex-col">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default App;
