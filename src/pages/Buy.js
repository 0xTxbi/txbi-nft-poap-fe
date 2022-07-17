import {
  Button,
  ButtonGroup,
  Heading,
  Text,
  Flex,
  Container,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";

function Buy({ connectedContract }) {
  const toast = useToast();
  const [totalTicketNumber, setTotalTicketNumber] = useState(null);
  const [numberOfAvailableTickets, setNumberOfAvailableTickets] =
    useState(null);
  const [mintTicketTxnPending, setMintTicketTxnPending] = useState(false);

  useEffect(() => {
    if (!connectedContract) return;

    getNumberOfAvailableTickets();
    getTotalTicketNumber();
  }, []);

  // Mint ticket
  const mintTicket = async () => {
    try {
      if (!connectedContract) return;

      setMintTicketTxnPending(true);
      const mintTicketTxn = await connectedContract.mint({
        value: `${0.05 * 10 ** 18}`,
      });

      await mintTicketTxn.wait();
      setMintTicketTxnPending(false);
      toast({
        status: "success",
        title: "Ticket minted",
        description: (
          <p>
            Check transaction on{" "}
            <a
              href={`https://rinkeby.etherscan.io/tx/${mintTicketTxn.hash}`}
              target="_blank"
              rel="nofollow noreferrer"
            >
              Etherscan
            </a>
          </p>
        ),
      });
    } catch (error) {
      console.log(error);
      setMintTicketTxnPending(false);
      toast({
        status: "error",
        title: "Transaction error",
        description: error?.message?.message,
      });
    }
  };

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
          <Button
            onClick={mintTicket}
            isLoading={mintTicketTxnPending}
            loadingText="Minting ticket"
            size="lg"
            colorScheme="blue"
          >
            Mint Ticket
          </Button>
        </ButtonGroup>
        {numberOfAvailableTickets && totalTicketNumber && (
          <Text>
            {numberOfAvailableTickets} of {totalTicketNumber} minted.
          </Text>
        )}
      </Flex>
    </>
  );
}

export default Buy;
