import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Center } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Center flexDirection="column" gap={0}>
      <Navigation />
      <Outlet />
    </Center>
  );
};
