import Row from "@/components/common/container/row";
import Body from "@/components/text/body";
import { Tally1Icon } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  bar?: boolean;
};

const TextBoxContainer = ({ children, bar = true }: Props) => {
  return (
    <Row className="w-68 flex justify-between">
      <Body variant="body3" className="fc-gray-500">
        {children}
      </Body>
      {bar && <Tally1Icon strokeWidth={0.1} />}
    </Row>
  );
};

export default TextBoxContainer;
