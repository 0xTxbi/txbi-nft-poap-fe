import {
  Button,
  ButtonGroup,
  Heading,
  Text,
  Flex,
  Container,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";

function Buy({ connectedContract }) {
  const [totalTicketNumber, setTotalTicketNumber] = useState(null);
  const [numberOfAvailableTickets, setNumberOfAvailableTickets] =
    useState(null);

  useEffect(() => {
    if (!connectedContract) return;

    getNumberOfAvailableTickets();
    getTotalTicketNumber();
  }, []);

  // Obtain number of available tickets
  const getNumberOfAvailableTickets = async () => {
    try {
      const count = await connectedContract.availableTicketCount();
      setNumberOfAvailableTickets(count.toNumber());
    } catch (error) {
      console.log(error);
    }
  };

  // Obtain total number of tickets
  const getTotalTicketNumber = async () => {
    try {
      const count = await connectedContract.totalTicketCount();
      setTotalTicketNumber(count.toNumber());
    } catch (error) {
      console.log(error);
    }
  };

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
        {numberOfAvailableTickets && totalTicketNumber && (
          <Text>
            {numberOfAvailableTickets} of {totalTicketNumber}minted.
          </Text>
        )}
      </Flex>
    </>
  );
}

export default Buy;
