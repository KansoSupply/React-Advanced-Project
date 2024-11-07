import {
  Heading,
  CardBody,
  Card,
  Image,
  VStack,
  Text,
  Box,
  Tag,
  Wrap,
} from "@chakra-ui/react";
import { useNavigate, useLoaderData } from "react-router-dom";

export const EventItem = ({ item }) => {
  const navigate = useNavigate();
  const { category } = useLoaderData();

  const handleClick = () => {
    navigate(`/event/${item.id}`);
  };
  return (
    <Card
      w="full"
      h="Fit"
      onClick={handleClick}
      cursor="pointer"
      boxShadow="none"
    >
      <CardBody p={0}>
        <VStack spacing="16px" align="left">
          <Box overflow="hidden" borderRadius="8px">
            <Image
              w="full"
              h="250px"
              objectFit="cover"
              src={item.image}
              transition="transform 0.2s ease-in-out"
              _hover={{
                transform: "scale(1.1)",
              }}
            />
          </Box>
          <Wrap>
            {category
              .filter((category) => item.categoryIds.includes(category.id))
              .map((filteredCategory) => (
                <Tag
                  width="fit-content"
                  px={4}
                  py={2}
                  borderRadius={16}
                  key={filteredCategory.id}
                >
                  {filteredCategory.name}
                </Tag>
              ))}
          </Wrap>
          <Heading
            textAlign="left"
            lineHeight="6"
            size="md"
            w="fit"
            color={"Black"}
          >
            {item.title}
          </Heading>
          <Text>{item.description}</Text>
          <Text fontWeight="bold">
            {item.startTime.slice(0, 10)} {item.startTime.slice(11, 16)} —{" "}
            {item.endTime.slice(11, 16)}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
};
