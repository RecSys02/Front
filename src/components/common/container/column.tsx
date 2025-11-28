import { cn } from "@/libs/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Column = ({ children, className, style }: Props) => {
  return (
    <div className={cn("flex w-full flex-col", className)} style={style}>
      {children}
    </div>
  );
};

export default Column;
