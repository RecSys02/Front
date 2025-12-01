import Row from "@/components/common/container/row";
import BrandContainer from "./brand-container";
import Column from "@/components/common/container/column";
import InfoContainer from "./info-container";
import IconBar from "./icon-bar";

const InfoBox = () => {
  return (
    <Row>
      <BrandContainer />
      <Column className="gap-6 w-full pr-0.75">
        <InfoContainer />
        <IconBar />
      </Column>
    </Row>
  );
};

export default InfoBox;
