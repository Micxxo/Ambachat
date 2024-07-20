import FlexContainer from "@/components/ui/container/FlexContainer";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <FlexContainer className="h-screen font-montserrat bg-gradient-to-bl from-gray-800 via-gray-900 to-black p-5 md:p-0 overflow-hidden">
      {children}
    </FlexContainer>
  );
};

export default AuthLayout;
