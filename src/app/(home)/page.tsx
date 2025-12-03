import Column from "@/components/common/container/column";
import BannerSection from "./_components/banner-section/banner-section";
import DiscoverSection from "./_components/discover-section/discover-section";
import PlanSection from "./_components/plan-section/plan-section";

const Home = () => {
  return (
    <Column className="gap-10">
      <BannerSection />
      <DiscoverSection />
      <PlanSection />
    </Column>
  );
};

export default Home;
