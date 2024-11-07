import React from "react";
import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <>
      <Flex
        gap={6}
        flexDirection="row"
        maxWidth="1200px" // Limits width to 1200px
        width="100%"
        h="64px"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Link
          to="/"
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            letterSpacing: "-0,05em",
          }}
        >
          Sherpa
        </Link>
      </Flex>
    </>
  );
};
