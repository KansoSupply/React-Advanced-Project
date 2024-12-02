import { Center } from "@chakra-ui/react";
import { EditEventForm } from "../components/EditEventForm";
// import { useLoaderData } from "react-router-dom";

export const EditEvent = (updateEvent) => {
  // const { event } = useLoaderData();

  // const updateEvent = async (updatedEvent) => {
  //   await fetch(`http://localhost:3000/events/${event.id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json;charset=utf-8" },
  //     body: JSON.stringify(updatedEvent),
  //   });
  // };

  return (
    <>
      <Center flexDirection="column" alignContent="center" gap={6} p={12}>
        <EditEventForm updateEvent={updateEvent} />
      </Center>
    </>
  );
};
