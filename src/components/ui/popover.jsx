import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

const Popover = ({ children }) => {
  return <div className="relative inline-block text-left">{children}</div>;
};

const PopoverTrigger = ({ children, onClick, className }) => {
  return (
    <div onClick={onClick} className={cn("cursor-pointer", className)}>
      {children}
    </div>
  );
};

const PopoverContent = ({ children, isOpen, onClose, className, align = "center" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className={cn(
              "absolute z-[70] mt-2 min-w-[300px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl ring-1 ring-black/5",
              align === "center" && "left-1/2 -translate-x-1/2",
              align === "left" && "left-0",
              align === "right" && "right-0",
              className
            )}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export { Popover, PopoverTrigger, PopoverContent };
