// src/pages/NotFound.tsx
import * as React from "react";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { gradientAnimation } from "../animations/gradientAnimation";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Flex bgGradient="linear(to-br, #f2994a, #d8345f, #4a1a73, #20284a)"
    minH="100vh" direction="column" align="center" justify="center" bgSize="200% 200%"  // Make the gradient size larger for smooth animation
    animation={`${gradientAnimation} 8s ease infinite`}  >
      <Heading color={'white'}  as="h1" size="2xl" mb={4}>404 - Page Not Found</Heading>
      <Text color={'white'} mb={6}>Oops! The page you’re looking for doesn’t exist.</Text>
      <CustomButton size="lg" onClick={() => navigate("/")}>
        Go to Home Page
      </CustomButton>
    </Flex>
  );
};

export default NotFound;
