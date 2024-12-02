import {
  VStack,
  HStack,
  Input,
  Textarea,
  Button,
  CheckboxGroup,
  Checkbox,
  Stack,
  FormLabel,
  Heading,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

export const EditEventForm = ({ updateEvent, setIsEditing, deleteEvent }) => {
  const { event, user } = useLoaderData();

  const [eventData, setEventData] = useState({
    title: event.title,
    description: event.description,
    image: event.image,
    location: event.location,
    categoryIds: event.categoryIds.map((id) => id.toString()),
    startDate: event.startTime.slice(0, 10),
    startTime: event.startTime.slice(11, 16),
    endDate: event.endTime.slice(0, 10),
    endTime: event.endTime.slice(11, 16),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDateTime = new Date(
      `${eventData.startDate}T${eventData.startTime}:00Z`
    ).toISOString();
    const endDateTime = new Date(
      `${eventData.endDate}T${eventData.endTime}:00Z`
    ).toISOString();

    await updateEvent({
      id: event.id,
      createdBy: event.createdBy,
      title: eventData.title,
      description: eventData.description,
      image: eventData.image,
      categoryIds: eventData.categoryIds.map((id) => parseInt(id, 10)),
      location: eventData.location,
      startTime: startDateTime,
      endTime: endDateTime,
    });

    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleCategoryChange = (newCategories) => {
    setEventData((prevState) => ({
      ...prevState,
      categoryIds: newCategories,
    }));
  };

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit}
      gap={8}
      align="center"
      width="full"
      maxWidth="600px"
      p={4}
    >
      <VStack align="center" gap={4}>
        <Image
          src={user.image}
          objectFit="cover"
          width="100px"
          height="100px"
          borderRadius={99}
        />
        <Heading textAlign="center">
          Hi {user.name}! You can edit your event using the form below.
        </Heading>
      </VStack>

      <VStack width="100%" align="flex-start">
        <FormLabel>Title</FormLabel>
        <Input
          id="title"
          color="black"
          type="text"
          value={eventData.title}
          placeholder="Title"
          onChange={handleChange}
          width="100%"
        />
      </VStack>

      <VStack width="100%" align="flex-start">
        <FormLabel>Description</FormLabel>
        <Textarea
          id="description"
          value={eventData.description}
          placeholder="Description"
          onChange={handleChange}
          width="100%"
        />
      </VStack>

      <VStack width="100%" align="flex-start">
        <FormLabel>Image URL</FormLabel>
        <Input
          id="image"
          type="text"
          value={eventData.image}
          placeholder="Image URL"
          onChange={handleChange}
          width="100%"
        />
      </VStack>

      <VStack width="100%" align="flex-start">
        <FormLabel>Category</FormLabel>
        <CheckboxGroup
          value={eventData.categoryIds}
          onChange={handleCategoryChange}
        >
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            <Checkbox value="1">Sports</Checkbox>
            <Checkbox value="2">Nature</Checkbox>
            <Checkbox value="3">Wildlife</Checkbox>
          </Stack>
        </CheckboxGroup>
      </VStack>

      <VStack width="100%" align="flex-start">
        <FormLabel>Location</FormLabel>
        <Input
          id="location"
          type="text"
          value={eventData.location}
          placeholder="Location"
          onChange={handleChange}
          width="100%"
        />
      </VStack>

      <VStack width="100%" align="flex-start">
        <FormLabel>Start Date</FormLabel>
        <Input
          id="startDate"
          type="date"
          value={eventData.startDate}
          onChange={handleChange}
          width="100%"
        />
      </VStack>

      <VStack width="100%" align="flex-start">
        <FormLabel>Start Time</FormLabel>
        <Input
          id="startTime"
          type="time"
          value={eventData.startTime}
          onChange={handleChange}
          width="100%"
        />
      </VStack>

      <VStack width="100%" align="flex-start">
        <FormLabel>End Date</FormLabel>
        <Input
          id="endDate"
          type="date"
          value={eventData.endDate}
          onChange={handleChange}
          width="100%"
        />
      </VStack>

      <VStack width="100%" align="flex-start">
        <FormLabel>End Time</FormLabel>
        <Input
          id="endTime"
          type="time"
          value={eventData.endTime}
          onChange={handleChange}
          width="100%"
        />
      </VStack>

      <HStack gap={4}>
        <Button
          type="submit"
          bg="black"
          color="white"
          _hover={{ bg: "grey" }}
          py={8}
          px={10}
          borderRadius={32}
        >
          Update Event
        </Button>
        <Button
          bg="black"
          color="white"
          _hover={{ bg: "grey" }}
          py={8}
          px={10}
          borderRadius={32}
          onClick={onOpen}
        >
          Delete
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Do you really want to delete the event?</ModalBody>

            <ModalFooter gap={3} justifyContent="left">
              <Button colorScheme="gray" onClick={onClose}>
                No, go back
              </Button>
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => {
                  deleteEvent();
                }}
              >
                Yes, delete the event
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </HStack>
    </VStack>
  );
};
