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
    <Row className="items-center gap-1.5 rounded-md bg-lime-50 border border-lime-100 px-2.5 py-1 w-fit">
      <span className="text-lime-700">{icon}</span>
      <Body variant="body3" className="font-medium text-lime-700!">
        {label}
      </Body>
      <Body variant="body3" className="font-semibold text-lime-800!">
        {value}
      </Body>
    </Row>
  );
};

export default MetaItem;
