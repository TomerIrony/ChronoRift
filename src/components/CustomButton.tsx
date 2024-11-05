// src/components/CustomButton.tsx
import * as React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

// Extending ButtonProps allows you to pass additional props if needed
interface CustomButtonProps extends ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, children, ...props }) => {
  return (
    <Button
      variant="solid"
      size="lg"
      mt={6}
      colorScheme="purple"
      bg="#b084d1"
      _hover={{ bg: "#a372c4" }}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
