import Row from "@/components/common/container/row";
import Title from "@/components/text/title";
import { Bird } from "lucide-react";

const MyHeading = () => {
  return (
    <Row className= "h-33 flex items-end gap-2">
        <Bird className="w-auto h-10 mb-1" strokeWidth={1.0} />
        <Title variant="title2" className="fc-gray-800 font-extrabold">마이페이지</Title>
    </Row>
    );
};

export default MyHeading;