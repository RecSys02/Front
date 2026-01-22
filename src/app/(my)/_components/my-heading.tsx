import Row from "@/components/common/container/row";
import Title from "@/components/text/title";
import { UserCogIcon } from "lucide-react";

const MyHeading = () => {
  return (
    <Row className="w-fit h-fit gap-2 items-center pt-18">
      <UserCogIcon size={36} className="text-gray-800" />
      <Title
        variant="title2"
        className="font-extrabold fc-gray-800 text-[32px]!"
      >
        마이페이지
      </Title>
    </Row>
  );
};

export default MyHeading;
