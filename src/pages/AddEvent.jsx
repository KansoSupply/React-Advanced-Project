import { Heading, Center } from "@chakra-ui/react";
import { AddEventForm } from "../components/AddEventForm";

import { useNavigate } from "react-router-dom";

export const AddEvent = () => {
  const navigate = useNavigate();

  const createEvent = async (newEvent) => {
    await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(newEvent),
    });

    navigate("/");
  };

  return (
    <>
      <Center flexDirection="column" alignContent="center" gap={20} p={12}>
        <Heading fontSize="72px">Add An Event</Heading>
        <AddEventForm createEvent={createEvent}></AddEventForm>
      </Center>
    </>
  );
};
