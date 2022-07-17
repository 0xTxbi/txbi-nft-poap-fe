import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import QrReader from "react-qr-scanner";
import { useState } from "react";
import { useEffect } from "react";

function CheckIn({ connectedContract }) {
  const toast = useToast();
  const [displayQRScanner, setDisplayQRScanner] = useState(false);
  const [scannedAddress, setScannedAddress] = useState(null);
  const [ownsTicket, setOwnsTicket] = useState(false);

  useEffect(() => {
    const confirmTicketOwnership = async () => {
      try {
        if (!connectedContract) return;

        const response = await connectedContract.confirmOwnership(
          scannedAddress
        );
        setOwnsTicket(response);

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (scannedAddress) {
      confirmTicketOwnership();
    }
  }, [connectedContract, scannedAddress]);

  return (
    <Container centerContent>
      <Heading mb={4}>Check In</Heading>

      {!displayQRScanner && scannedAddress && ownsTicket && (
        <>
          <Text mb={5}>You own a Txbi's Event ticket</Text>
          <Flex width="100%" justifyContent="center">
            <Button size="lg">Check In</Button>
          </Flex>
        </>
      )}

      {!displayQRScanner && (
        <>
          {!scannedAddress && (
            <Text fontSize="xl" mb={4} textAlign="center">
              scan the wallet address to verify you own a ticket. proceed to
              check-in right after.
            </Text>
          )}
          {scannedAddress && !ownsTicket && (
            <Text mb={5}>You don't own a Txbi's Event ticket</Text>
          )}
          {!ownsTicket && (
            <Flex width="100%" justifyContent="center">
              <Button
                onClick={() => setDisplayQRScanner(true)}
                size="lg"
                colorScheme="blue"
              >
                Scan QR
              </Button>
            </Flex>
          )}
        </>
      )}

      {displayQRScanner && (
        <>
          <Box>
            <QrReader
              delay={3000}
              legacyMode={true}
              style={{
                maxWidth: "100%",
                margin: "0 auto",
                marginBottom: "1.5rem",
              }}
              onError={(error) => {
                console.log(error);
                setDisplayQRScanner(false);
                toast({
                  title: "Error",
                  status: "error",
                  description: error,
                });
              }}
              onScan={(data) => {
                if (!data) return;
                console.log(data);
                const address = data.text.split("ethereum:");
                setScannedAddress(address[1]);
                setDisplayQRScanner(false);
                toast({
                  title: "Captured address",
                  status: "success",
                  description: `${address[1].slice(0, 6)}`,
                });
              }}
            />
          </Box>

          <Flex width="100%" justifyContent="center">
            <Button
              onClick={() => setDisplayQRScanner(false)}
              size="lg"
              colorScheme="red"
            >
              Cancel
            </Button>
          </Flex>
        </>
      )}
    </Container>
  );
}

export default CheckIn;
