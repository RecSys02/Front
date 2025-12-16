import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cn } from "@/libs/utils"
import { ChevronDownIcon } from "lucide-react"

function MyPlanAccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "w-197 cursor-pointer flex flex-1 items-center py-4 pr-11 transition-all [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="pointer-events-none size-12 transition-transform duration-200 mr-4" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export { MyPlanAccordionTrigger }