import Column from "@/components/common/container/column";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/libs/utils";

type Props = {
  open: boolean;
  title?: string;
  description?: string;
};

const PlanCreatingOverlay = ({
  open,
  title = "일정을 생성하고 있어요",
  description = "잠시만 기다려 주세요",
}: Props) => {
  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-9999",
        "bg-black/10 backdrop-blur-[1px]",
        "flex items-center justify-center",
      )}
    >
      <Column className="items-center gap-4">
        <Spinner className="size-20 text-[#1A6E3D] animate-spin animation-duration-[1.2s]" />

        <div className="bg-white/90 border rounded-2xl px-6 py-5 shadow-sm">
          <Column className="items-center gap-1">
            <div className="text-base font-medium text-gray-700">{title}</div>
            <div className="text-sm text-gray-500">{description}</div>
          </Column>
        </div>
      </Column>
    </div>
  );
};

export default PlanCreatingOverlay;
