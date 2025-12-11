import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import Body from "@/components/text/body";
import { cn } from "@/libs/utils";

type PreferenceSectionProps = {
  title: string;
  helper?: string;
  withDivider?: boolean;
  children: React.ReactNode;
};

export const PreferenceSection = ({
  title,
  helper,
  withDivider,
  children,
}: PreferenceSectionProps) => (
  <Column
    className={cn("gap-2", withDivider && "pt-5 mt-5 border-t border-gray-100")}
  >
    <Row className="items-baseline justify-between pb-1">
      <Body variant="body2" className="font-semibold fc-gray-900">
        {title}
      </Body>
      {helper && (
        <Body variant="body3" className="fc-gray-500">
          {helper}
        </Body>
      )}
    </Row>

    {children}
  </Column>
);
