import GithubLogo from "@/assets/logos/github.svg?react";
import Row from "@/components/common/container/row";

const GITHUB_URL = "https://github.com/RecSys02";

const IconBar = () => {
  return (
    <Row className="gap-4 pl-6 flex justify-end">
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub repository"
        className="cursor-pointer hover:opacity-80 transition-opacity"
      >
        <GithubLogo className="h-6 w-auto" />
      </a>

      {/*
      <NotionLogo className="h-6 w-auto" />
      <FigmaLogo className="h-6 w-auto" />
      */}
    </Row>
  );
};

export default IconBar;
