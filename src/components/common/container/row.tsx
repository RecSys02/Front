import { cn } from "@/libs/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Row = ({ children, className }: Props) => {
  return (
    <div className={cn("flex w-full flex-row items-start", className)}>
      {children}
    </div>
  );
};

export default Row;
