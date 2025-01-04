import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import {
  Box,
  Flex,
  IconButton,
  Text,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";

const socket = io("http://localhost:3000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(true); // Assuming the chat is open by default
  const [userId] = useState("user1"); // Replace with actual dynamic user ID
  const [receiverId] = useState("government1"); // Replace with actual dynamic receiver ID

  useEffect(() => {
    const handleMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit(
        "sendMessage",
        {
          sender: userId,
          receiver: receiverId,
          content: message,
        },
        (response) => {
          if (response.error) {
            console.error("Message sending error:", response.error);
          } else {
            setMessage("");
          }
        }
      );
    }
  };

  if (!isOpen) return null;

  return (
    <Flex
      direction="column"
      w="350px"
      h="450px"
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
      overflow="hidden"
      position="fixed"
      bottom="20px"
      right="20px"
    >
      {/* Header */}
      <Flex
        bg="teal.400"
        p="4"
        color="white"
        alignItems="center"
        justifyContent="space-between"
        borderTopRadius="lg"
      >
        <Text fontWeight="bold">Chat App</Text>
        <IconButton
          size="sm"
          icon={<CloseIcon />}
          aria-label="Close"
          variant="ghost"
          color="white"
          onClick={() => setIsOpen(false)}
        />
      </Flex>

      {/* Messages */}
      <VStack
        flex="1"
        p="4"
        spacing="4"
        overflowY="auto"
        bg="gray.50"
      >
        {messages.map((msg, index) => (
          <Flex
            key={index}
            alignSelf={msg.sender === userId ? "flex-end" : "flex-start"} 
            bg={msg.sender === userId ? "teal.300" : "gray.200"} 
            color={msg.sender === userId ? "white" : "black"}
            borderRadius="lg"
            p="3"
            maxW="80%"
            boxShadow="sm"
            alignItems="center"
          >
            <Text>{msg.content}</Text>
          </Flex>
        ))}
      </VStack>

      {/* Input Area */}
      <Flex p="4" bg="gray.100" borderTop="1px solid" borderColor="gray.300">
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          mr="2"
          bg="white"
          color="black"
          _placeholder={{ color: "gray.400" }}
          borderRadius="md"
        />
        <Button onClick={sendMessage} colorScheme="teal" borderRadius="md">
          Send
        </Button>
      </Flex>
    </Flex>
  );
};

export default Chat;