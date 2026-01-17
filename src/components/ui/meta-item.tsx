import { ReactNode } from "react";
import Body from "../text/body";
import Row from "../common/container/row";

const MetaItem = ({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <Row className="items-center gap-1.5 rounded-md bg-gray-50 border border-gray-100 px-2.5 py-1 w-fit">
      <span className="text-gray-500">{icon}</span>
      <Body variant="body3" className="fc-gray-500 font-medium">
        {label}
      </Body>
      <Body variant="body3" className="fc-gray-800 font-semibold">
        {value}
      </Body>
    </Row>
  );
};

export default MetaItem;
