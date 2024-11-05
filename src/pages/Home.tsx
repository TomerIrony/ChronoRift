import { Button, Flex, Heading, Text, Box, VStack, Image, HStack, Link, keyframes } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ChronoriftLogo from '../assets/chronoicon.png';
import CustomButton from "../components/CustomButton";
import { gradientAnimation } from "../animations/gradientAnimation";

// Define the keyframes for the gradient animation


const Home = () => {
  const navigate = useNavigate();

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      position="relative"
      bgGradient="linear(to-br, #f2994a, #d8345f, #4a1a73, #20284a)"
      bgSize="200% 200%"  // Make the gradient size larger for smooth animation
      animation={`${gradientAnimation} 8s ease infinite`}  
      color="white"
      padding={8}
    >
      <Box
        p={8}
        borderRadius="lg"
        boxShadow="2xl"
        bg="rgba(0, 0, 0, 0.7)"
        maxW="lg"
        textAlign="center"
      >
        <VStack spacing={6}>
          <Image
            src={ChronoriftLogo}
            alt="Chronorift Logo"
            boxSize="250px"
            borderRadius="full"
            mb={4}
          />
          <Heading as="h1" size="2xl">
            Welcome to Chronorift
          </Heading>
          <Text fontSize="lg" opacity={0.8}>
            Think you know your League patches? Test your skills in guessing the patch release dates and become a true Chronorift champion!
          </Text>
          <CustomButton
            onClick={() => navigate("/game")}
            width="full"
          >
            Start Game
          </CustomButton>
        </VStack>
      </Box>

      {/* Footer buttons */}
      <HStack
        position="absolute"
        bottom="4"
        spacing="4"
        color="white"
        fontSize="sm"
      >
        <Link onClick={() => alert("Navigate to Donate")} textDecoration="underline">
          Donate
        </Link>
        <Link onClick={() => alert("Navigate to More Info")} textDecoration="underline">
          More Info
        </Link>
        <Link onClick={() => alert("Navigate to Contact Us")} textDecoration="underline">
          Contact Us
        </Link>
      </HStack>
    </Flex>
  );
};

export default Home;
