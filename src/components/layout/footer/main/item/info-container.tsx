import Row from "@/components/common/container/row";
import { ROUTES } from "@/constants/routes";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import TermsViewModal from "./terms-view-modal";
import PolicyViewModal from "./privacy-view-modal";
import { Button } from "@/components/common/button/button";

const InfoContainer = () => {
  const [openPolicy, setOpenPolicy] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);

  return (
    <>
      <Row className="flex justify-end gap-16 h-6 items-center">
        <Link to={ROUTES.Home} className="text-body2">
          팀 소개
        </Link>
        <Link to={ROUTES.Home} className="text-body2">
          고객센터
        </Link>

        <Button
          type="button"
          onClick={() => setOpenPolicy(true)}
          className="text-body2 fc-emphasis font-bold hover:opacity-80 p-0!"
        >
          개인정보처리방침
        </Button>

        <Button
          type="button"
          onClick={() => setOpenTerms(true)}
          className="text-body2 hover:opacity-80 p-0!"
        >
          이용약관
        </Button>
      </Row>

      <PolicyViewModal open={openPolicy} onOpenChange={setOpenPolicy} />
      <TermsViewModal open={openTerms} onOpenChange={setOpenTerms} />
    </>
  );
};

export default InfoContainer;
