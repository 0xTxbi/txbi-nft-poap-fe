import { Button, Box, Flex } from "@chakra-ui/react";

function Connect() {
  return (
    <Flex
      fontWeight="bold"
      position="absolute"
      top="8px"
      right="8px"
      zIndex="10"
    >
      <Button
        p="8px 16px"
        mr="1"
        textAlign="center"
        size="sm"
        color="white"
        variant="link"
        bg="blue.500"
      >
        Connect
      </Button>
    </Flex>
  );
}

export default Connect;
