import { EventItem } from "../../../Final2/src/components/EventItem";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heading,
  SimpleGrid,
  Center,
  Input,
  HStack,
  Tag,
  Stack,
  Button,
} from "@chakra-ui/react";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/events");

        if (response.ok) {
          const json = await response.json();
          setEvents(json);
        } else {
          throw new Error(`Failed to load events`);
        }
      } catch (error) {
        console.error("Error fetching events", error);
      }
    }

    fetchData();
  }, []);

  const [searchField, setSearchField] = useState("");

  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  const matchedEvents = events.filter((item) => {
    return (
      item.title?.toLowerCase().includes(searchField.toLowerCase()) &&
      (category === "" || item.categoryIds?.includes(category))
    );
  });

  return (
    <Center
      flexDirection="column"
      justify="center"
      height="fit"
      width="full"
      maxWidth="1200px"
      gap={20}
      mb={20}
      pt={20}
    >
      <Heading
        fontSize="64px"
        letterSpacing="-0.03em"
        maxWidth="700px"
        textAlign="center"
      >
        Create Your Next Adventure with Sherpa
      </Heading>
      <Button
        onClick={() => navigate("/addevent")}
        bg="black"
        color="white"
        _hover={{ bg: "grey" }}
        py={8}
        px={10}
        borderRadius={32}
      >
        Add an event
      </Button>
      <HStack justify="space-between" width="full">
        <HStack>
          <Tag
            background={category === "" ? "black" : "gray.100"}
            color={category === "" ? "white" : "grey.300"}
            py={2}
            px={4}
            borderRadius={32}
            cursor="pointer"
            onClick={() => setCategory("")}
          >
            All
          </Tag>
          <Tag
            background={category === 1 ? "black" : "gray.100"}
            color={category === 1 ? "white" : "grey.300"}
            py={2}
            px={4}
            borderRadius={32}
            cursor="pointer"
            onClick={() => setCategory(1)}
          >
            Sports
          </Tag>
          <Tag
            background={category === 2 ? "black" : "gray.100"}
            color={category === 2 ? "white" : "grey.300"}
            py={2}
            px={4}
            borderRadius={32}
            cursor="pointer"
            onClick={() => setCategory(2)}
          >
            Nature
          </Tag>
          <Tag
            background={category === 3 ? "black" : "gray.100"}
            color={category === 3 ? "white" : "grey.300"}
            py={2}
            px={4}
            borderRadius={32}
            cursor="pointer"
            onClick={() => setCategory(3)}
          >
            Wildlife
          </Tag>
        </HStack>
        <Input
          backgroundColor="gray.100"
          w="300px"
          variant="filled"
          _focus={{
            backgroundColor: "black",
          }}
          borderRadius="32px"
          border="black"
          placeholder="Search"
          _placeholder={{ color: "black" }}
          color="white"
          onChange={handleChange}
        ></Input>
      </HStack>
      <Stack maxWidth="1200px" gap={4}>
        {matchedEvents.length === 0 ? (
          <Center py={10}>
            <Heading fontWeight="bold" fontSize="16px">
              Sorry, we did not find anything with that search criteria. Please
              try something else.
            </Heading>
          </Center>
        ) : (
          <SimpleGrid
            columns={[1, 1, 2, 3]}
            justify="center"
            spacing="32px"
            overflow="visible"
          >
            {matchedEvents.map((item) => (
              <EventItem key={item.id} item={item} />
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Center>
  );
};
