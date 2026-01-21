import Row from "@/components/common/container/row";
import Title from "@/components/text/title";
import { ROUTES } from "@/constants/routes";
import { Link } from "@tanstack/react-router";
import { Bird } from "lucide-react";

const MyHeading = () => {
  return (
    <Row className="w-fit h-33 items-end gap-2">
      <Bird className="w-auto h-10 mb-1" strokeWidth={1.3} />
      <Link to={ROUTES.My}>
        <Title variant="title2" className="font-extrabold">마이페이지</Title>
      </Link>

    </Row>
  );
};

export default MyHeading;