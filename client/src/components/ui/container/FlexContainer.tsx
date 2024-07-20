import React from "react";
import { twMerge } from "tailwind-merge";

interface FlexContainerProps {
  children: React.ReactNode;
  className?: string;
}
const FlexContainer = ({ children, className }: FlexContainerProps) => {
  return (
    <div
      className={twMerge("flex items-center w-full justify-center", className)}
    >
      {children}
    </div>
  );
};

export default FlexContainer;
