import {
  Button,
  ButtonGroup,
  Heading,
  Text,
  Flex,
  Container,
} from "@chakra-ui/react";

function Buy() {
  return (
    <>
      <Container centerContent>
        <Heading mb={4}>Txbi's NFT Event</Heading>
        <Text fontSize="xl" mb={4}>
          Connect your wallet to mint your NFT ticket.
        </Text>
      </Container>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin="0 auto"
        maxW="140px"
      >
        <ButtonGroup mb={4}>
          <Button loadingText="Pending" size="lg" colorScheme="blue">
            Buy Ticket
          </Button>
        </ButtonGroup>
      </Flex>
    </>
  );
}

export default Buy;
