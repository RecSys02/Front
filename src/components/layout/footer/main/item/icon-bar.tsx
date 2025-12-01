import FigmaLogo from "@/assets/logos/figma.svg?react";
import NotionLogo from "@/assets/logos/notion.svg?react";
import GithubLogo from "@/assets/logos/github.svg?react";
import Row from "@/components/common/container/row";

const IconBar = () => {
  return (
    <Row className="gap-4 pl-6 flex justify-end">
      <GithubLogo className="h-6 w-auto" />
      <NotionLogo className="h-6 w-auto" />
      <FigmaLogo className="h-6 w-auto" />
    </Row>
  );
};

export default IconBar;
