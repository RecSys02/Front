import Row from "@/components/common/container/row";
import { RegisterStep, STEP_META } from "./register.type";
import Column from "@/components/common/container/column";
import Body from "@/components/text/body";
import { Badge } from "@/components/ui/badge/badge";
import { cn } from "@/libs/utils";

const RegisterStepHeader = ({ step }: { step: RegisterStep }) => {
  const meta = STEP_META[step];

  return (
    <Column className="gap-1">
      <Row className="gap-4 items-center">
        <Body className="font-bold">{meta.label}</Body>
        <Badge
          variant="outline"
          className={cn(
            "rounded-full px-3 py-1 text-body3 font-bold",
            meta.badgeClass
          )}
        >
          {meta.badge}
        </Badge>
      </Row>
      <Body variant="body3" className="text-gray-500">
        {meta.description}
      </Body>
    </Column>
  );
};

export default RegisterStepHeader;
