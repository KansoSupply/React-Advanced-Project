import {
  VStack,
  Input,
  Textarea,
  Button,
  FormLabel,
  HStack,
  CheckboxGroup,
  Checkbox,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";

export const AddEventForm = ({ createEvent }) => {
  const [createdBy, setCreatedBy] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const navigate = useNavigate();
  const { users } = useLoaderData();

  const handleSubmit = (event) => {
    event.preventDefault();

    createEvent({
      createdBy:
        users.find(
          (user) => user.name.toLowerCase() === createdBy.toLowerCase()
        )?.id || null,
      title,
      description,
      image,
      categoryIds: categoryIds.map((id) => parseInt(id, 10)),
      location,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
    });

    setCreatedBy("");
    setTitle("");
    setDescription("");
    setImage("");
    setCategoryIds([]);
    setLocation("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <VStack gap={8} align="center" width="full" maxWidth="600px">
      <VStack width="100%" align="flex-start">
        <FormLabel>Created By</FormLabel>
        <Input
          id="createdBy"
          color="black"
          type="text"
          value={createdBy}
          placeholder="John Doe"
          onChange={(e) => setCreatedBy(e.target.value)}
          width="100%"
        />
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
          value={startTime || ""}
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
      <HStack>
        <Button
          bg="black"
          color="white"
          _hover={{ bg: "grey" }}
          py={8}
          px={10}
          borderRadius={32}
          type="submit"
          onClick={handleSubmit}
        >
          Create Event
        </Button>
        <Button
          bg="black"
          color="white"
          _hover={{ bg: "grey" }}
          py={8}
          px={10}
          borderRadius={32}
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
      </HStack>
    </VStack>
  );
};
