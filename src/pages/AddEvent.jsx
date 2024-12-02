import { Heading, Center, useToast } from "@chakra-ui/react";
import { AddEventForm } from "../components/AddEventForm";
import { useNavigate } from "react-router-dom";

export const AddEvent = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const createEvent = async (newEvent) => {
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        const createdEvent = await response.json();
        toast({
          title: "Event created",
          description: "Great! Your event has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        navigate(`/event/${createdEvent.id}`);
      } else {
        throw new Error("Failed to create event");
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Oops. Looks like something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Center flexDirection="column" alignContent="center" gap={20} p={12}>
      <Heading fontSize="72px">Add An Event</Heading>
      <AddEventForm createEvent={createEvent} />
    </Center>
  );
};
