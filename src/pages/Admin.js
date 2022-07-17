import {
  Button,
  Container,
  Flex,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

function Admin({ isContractOwner, connectedContract }) {
  const toast = useToast();
  const [openTicketSaleTxnPending, setOpenTicketSaleTxnPending] =
    useState(false);
  const [closeTicketSaleTxnPending, setCloseTicketSaleTxnPending] =
    useState(false);

  // Open ticket sales
  const openTicketSale = async () => {
    try {
      if (!connectedContract) return;

      setOpenTicketSaleTxnPending(true);
      let openTicketTicketSaleTxn = await connectedContract.openSale();

      await openTicketTicketSaleTxn.wait();
      setOpenTicketSaleTxnPending(false);

      toast({
        status: "success",
        title: "Ticket sale opened",
        description: (
          <p>
            Check transaction on{" "}
            <a
              href={`https://rinkeby.etherscan.io/tx/${openTicketTicketSaleTxn.hash}`}
              target="_blank"
              rel="nofollow noreferrer"
            >
              Etherscan
            </a>
          </p>
        ),
      });
    } catch (error) {
      setOpenTicketSaleTxnPending(false);
      toast({
        status: "error",
        title: "Transaction error",
        description: error,
      });
    }
  };

  // Close ticket sales
  const closeTicketSale = async () => {
    try {
      if (!connectedContract) return;

      setCloseTicketSaleTxnPending(true);
      let closeTicketTicketSaleTxn = await connectedContract.closeSale();

      await closeTicketTicketSaleTxn.wait();
      setCloseTicketSaleTxnPending(false);

      toast({
        status: "success",
        title: "Ticket sale closed",
        description: (
          <p>
            Check transaction on{" "}
            <a
              href={`https://rinkeby.etherscan.io/tx/${closeTicketTicketSaleTxn.hash}`}
              target="_blank"
              rel="nofollow noreferrer"
            >
              Etherscan
            </a>
          </p>
        ),
      });
    } catch (error) {
      setCloseTicketSaleTxnPending(false);
      toast({
        status: "error",
        title: "Transaction error",
        description: error,
      });
    }
  };

  return (
    <Container centerContent>
      <Heading mb={4}>Admin Settings</Heading>
      <Text fontSize="xl" mb={8}>
        enable and disable ticket sales.
      </Text>
      <Flex width="100%" justifyContent="center">
        <Button
          onClick={openTicketSale}
          size="lg"
          colorScheme="blue"
          isDisabled={!isContractOwner || closeTicketSaleTxnPending}
          isLoading={openTicketSaleTxnPending}
        >
          Open Sale
        </Button>
        <Button
          onClick={closeTicketSale}
          isLoading={closeTicketSaleTxnPending}
          size="lg"
          colorScheme="red"
          variant="solid"
          marginLeft="24px"
          isDisabled={!isContractOwner || openTicketSaleTxnPending}
        >
          Close Sale
        </Button>
      </Flex>
    </Container>
  );
}

export default Admin;
