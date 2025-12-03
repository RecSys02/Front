import { Button } from "@/components/common/button/button";
import Column from "@/components/common/container/column";
import Body from "@/components/text/body";

type Props = {
  onClick: () => void;
  name: string;
  description: string;
  isActive: boolean;
};

const DiscoverButton = ({ onClick, name, description, isActive }: Props) => {
  return (
    <Column className="w-fit gap-8.5 justify-center">
      <Button
        onClick={onClick}
        className={`w-97.5 h-16 rounded-full text-button1 font-extrabold
          ${
            isActive
              ? "bg-white fc-accent border-accent border-[3px]"
              : "bg-gray-100 border-none font-semibold fc-gray-700"
          }
        `}
      >
        {name}
      </Button>
      {isActive && (
        <Body className="text-center h-fit whitespace-pre-wrap font-light">
          {description}
        </Body>
      )}
    </Column>
  );
};

export default DiscoverButton;
