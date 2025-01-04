import React, { useState,useEffect } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const Bot = () => {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleToggleChatbot = () => {
    setOpen(!open);
  };
 
  const handleSendMessage = () => {
    fetch("http://localhost:8080/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages([
          ...messages,
          { sender: "user", text: input },
          { sender: "bot", text: data.output },
        ]);
        setInput("");
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };
  if(!open) return null;
  return (
    <Box position="fixed" bottom="4" right="4" zIndex="1000">
        <Box
          w="350px"
          h="450px"
          bg="white"
          borderRadius="lg"
          boxShadow="lg"
          display="flex"
          flexDirection="column"
        >
          {/* Header */}
          <HStack justifyContent="space-between" p="4" bg="blue.400" borderTopRadius="lg">
            <Text fontSize="lg" fontWeight="bold" color="white">
              Chatbot
            </Text>
            <IconButton
              aria-label="Close Chatbot"
              icon={<CloseIcon />}
              onClick={handleToggleChatbot}
              variant="ghost"
              color="white"
            />
          </HStack>

          {/* Messages */}
          <VStack
            spacing="3"
            p="4"
            flex="1"
            overflowY="auto"
            bg="gray.50"
            w="100%"
            className="chatbot-messages"
          >
            {messages.map((message, index) => (
              <Text
                key={index}
                alignSelf={message.sender === "user" ? "flex-end" : "flex-start"}
                bg={message.sender === "user" ? "blue.300" : "gray.200"}
                color={message.sender === "user" ? "white" : "black"}
                px="4"
                py="2"
                borderRadius="md"
              >
                {message.text}
              </Text>
            ))}
          </VStack>
          {/* Input Area */}
          <HStack p="4" bg="gray.100" borderBottomRadius="lg">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={handleChange}
              variant="filled"
              bg="white"
              color="black"
              _placeholder={{ color: "gray.400" }}
              flex="1"
            />
            <Button onClick={handleSendMessage} colorScheme="blue" borderRadius="md">
              Send
            </Button>
          </HStack>
        </Box>
    </Box>
  );
};

export default Bot;
