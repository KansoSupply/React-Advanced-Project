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
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [image, setImage] = useState(event.image);
  const [categoryIds, setCategoryIds] = useState(
    event.categoryIds.map((id) => id.toString())
  );
  const [location, setLocation] = useState(event.location);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateEvent({
      id: event.id,
      createdBy: event.createdBy,
      title,
      description,
      image,
      categoryIds: categoryIds.map((id) => parseInt(id, 10)),
      location,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
    });
    setIsEditing(false);
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
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          width="100%"
        />
      </VStack>

      <VStack width="100%" align="flex-start">
        <FormLabel>Description</FormLabel>
        <Textarea
          id="description"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          width="100%"
        />
      </VStack>

      <VStack width="100%" align="flex-start">
        <FormLabel>Image URL</FormLabel>
        <Input
          id="image"
          type="text"
          value={image}
          placeholder="Image URL"
          onChange={(e) => setImage(e.target.value)}
          width="100%"
        />
      </VStack>

      <VStack width="100%" align="flex-start">
        <FormLabel>Category</FormLabel>
        <CheckboxGroup value={categoryIds} onChange={setCategoryIds}>
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
          value={location}
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
          width="100%"
        />
      </VStack>

      <VStack width="100%" align="flex-start">
        <FormLabel>Start Date and Time</FormLabel>
        <Input
          id="startTime"
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          width="100%"
        />
      </VStack>

      <VStack width="100%" align="flex-start">
        <FormLabel>End Date and Time</FormLabel>
        <Input
          id="endTime"
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
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
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Do you really want to delete the event?</ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  deleteEvent();
                }}
              >
                Yes
              </Button>
              <Button variant="ghost" onClick={onClose}>
                No
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </HStack>
    </VStack>
  );
};
