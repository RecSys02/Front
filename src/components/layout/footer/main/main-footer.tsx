import Column from "@/components/common/container/column";
import CopyrightBox from "./item/copyright-box";
import InfoBox from "./item/info-box";

const MainFooter = () => {
  return (
    <Column className="gap-8 px-4">
      <InfoBox />
      <CopyrightBox />
    </Column>
  );
};

export default MainFooter;
