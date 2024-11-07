import React, { useState } from "react";
import {
  Heading,
  Image,
  Text,
  Button,
  Center,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { EditEventForm } from "../components/EditEventForm";

export const EventPage = () => {
  const { event, user } = useLoaderData();
  const [updatedEvent, setUpdatedEvent] = useState(event);
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const updateEvent = async (updatedEvent) => {
    const response = await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(updatedEvent),
    });
    if (response.ok) {
      setUpdatedEvent(updatedEvent);
      toast({
        title: "event updated",
        description: "Great! The event is now updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "An error occurred.",
        description: "Oops. Looks like something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const deleteEvent = async () => {
    await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "DELETE",
    });
    navigate("/");
  };

  return (
    <Center flexDirection="column" gap={6} pb={6}>
      {isEditing ? (
        <>
          <EditEventForm
            updateEvent={updateEvent}
            setIsEditing={setIsEditing}
            deleteEvent={deleteEvent}
          />
        </>
      ) : (
        <>
          <Image
            src={updatedEvent.image}
            w="full"
            h="200px"
            objectFit="cover"
          />
          <Heading>{updatedEvent.title}</Heading>
          <Text>Created by {user.name}</Text>
          <Image
            src={user.image}
            objectFit="cover"
            width="100px"
            height="100px"
            borderRadius={99}
          />

          <Text
            fontSize="10px"
            textTransform="uppercase"
            fontWeight="bold"
            letterSpacing="-0.05em"
          >
            {updatedEvent.startTime.slice(0, 10)}{" "}
            {updatedEvent.startTime.slice(11, 16)} —{" "}
            {updatedEvent.endTime.slice(11, 16)}
          </Text>
          <Text maxWidth="300px" textAlign="center">
            {updatedEvent.description}
          </Text>
        </>
      )}
      <HStack gap={4}>
        <Button
          type="submit"
          bg="black"
          color="white"
          _hover={{ bg: "grey" }}
          py={8}
          px={10}
          borderRadius={32}
          onClick={handleEditClick}
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </HStack>
    </Center>
  );
};

export const eventLoader = async ({ params }) => {
  const eventResponse = await fetch(
    `http://localhost:3000/events/${params.eventId}`
  );
  const event = await eventResponse.json();

  const userResponse = await fetch(
    `http://localhost:3000/users/${event.createdBy}`
  );
  const user = await userResponse.json();

  const usersResponse = await fetch("http://localhost:3000/users/");
  const users = await usersResponse.json();

  const categoryResponse = await fetch("http://localhost:3000/categories/");
  const category = await categoryResponse.json();

  return {
    event,
    user,
    users,
    category,
  };
};