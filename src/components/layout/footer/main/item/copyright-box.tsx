import Column from "@/components/common/container/column";
import Body from "@/components/text/body";
import TeamContainer from "./team-container";

const CopyrightBox = () => {
  return (
    <Column className="gap-2.5 flex justify-start">
      <Body variant="body3" className="font-bold">
        RECSYS02 - 어슬렁
      </Body>
      <TeamContainer />
      <Body variant="body3" className="fc-gray-500">
        COPYRIGHT 2025 어슬렁 ALL RIGHTS RESERVED.
      </Body>
    </Column>
  );
};

export default CopyrightBox;
