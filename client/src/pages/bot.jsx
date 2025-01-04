import React, { useState } from 'react';
import { Box, Button, Image, useDisclosure } from '@chakra-ui/react';
import Bot from './Aibot';  // Import your Bot component
import Chat from './chat';  // Import your Chat component
import ChatIcon from '../assets/chat.webp';
const bot = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const handleImageClick = () => {
    setShowButtons(!showButtons);
  };
  const handleButtonClick = (component) => {
    setSelectedComponent(component);
    setShowButtons(false);  // Hide buttons after selection
  };
  return (
    <Box textAlign="center">
      <Button
        onClick={handleImageClick}
        position="fixed"
        bottom="80px"
        right="20px"
        transition="width 0.3s"
        variant="unstyled" // Remove default button styles
        p={0} // Remove padding
        cursor="pointer"
      >
       <Box
      position="fixed"   // Keeps the image fixed in place
      bottom="20px"      // Adjusts the distance from the bottom of the page
      right="20px"       // Adjusts the distance from the right side of the page
      zIndex="1000"      // Ensures it stays on top of other content
    >
      <Image
        src={ChatIcon}    // Path to your bot image
        alt="Chatbot"
        boxSize="100px"    // Adjust this to increase/decrease the image size
        borderRadius="full" // Keeps the image circular
        cursor="pointer"    // Adds a pointer cursor to indicate it's clickable
        boxShadow="lg"      // Optional: Adds a shadow around the image
      />
    </Box>
      </Button>
      {showButtons && (
        <Box mt={4}>
          <Button
            colorScheme="teal"
            mr={4}
            marginLeft="1200px"
            bottom="120px"
            right="20px"
            position="fixed"
            onClick={() => handleButtonClick('ai')}
          >
            Chat with AI
          </Button>
          <Button
            colorScheme="blue"
            marginLeft="1200px"
            position="fixed"
        bottom="180px"
        right="30px"
            onClick={() => handleButtonClick('human')}
          >
            Chat with Human
          </Button>
        </Box>
      )}
      {selectedComponent === 'ai' && <Bot />}
      {selectedComponent === 'human' && <Chat />}
    </Box>
  );
};
export default bot;