import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div className={cn("relative w-full", className)} {...props}>
      {children}
    </div>
  );
});
Select.displayName = "Select";

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "flex h-9 w-full items-center justify-between rounded-lg border border-gray-100 bg-white px-3 py-2 text-[13px] font-medium text-gray-600 shadow-sm outline-none transition-all hover:border-gray-300 focus:ring-1 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </button>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectContent = ({ children, isOpen, onClose, className }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <div className="fixed inset-0 z-40" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 5 }}
          className={cn(
             "absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-xl border border-gray-100 bg-white p-1 text-gray-900 shadow-xl ring-1 ring-black/5",
             className
          )}
        >
          <div className="max-h-60 overflow-y-auto w-full">
            {children}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const SelectItem = React.forwardRef(({ className, children, isSelected, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-lg py-1.5 pl-3 pr-8 text-[13px] font-medium outline-none transition-colors hover:bg-gray-50 hover:text-black",
      isSelected && "bg-gray-50 text-black",
      className
    )}
    {...props}
  >
    <span className="truncate">{children}</span>
    {isSelected && (
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <Check className="h-3.5 w-3.5 text-black" />
      </span>
    )}
  </div>
));
SelectItem.displayName = "SelectItem";

const SelectValue = ({ placeholder, value }) => (
  <span className="truncate">{value || placeholder}</span>
);

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };
