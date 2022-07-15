import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Connect({ address, onConnect, onDisconnect }) {
  const navigate = useNavigate();

  // connect user wallet
  const connectWallet = async () => {
    const { ethereum } = window;
    if (!ethereum) return;

    try {
      // accounts under the MetaMask extension
      const userAccounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      onConnect(userAccounts[0]);
    } catch (error) {}
  };

  // disconnect wallet
  const disconnectWallet = () => {
    onDisconnect();
    navigate("/");
  };

  return (
    <Flex
      fontWeight="bold"
      position="absolute"
      top="8px"
      right="8px"
      zIndex="10"
    >
      {address && (
        <Button colorScheme="red" onClick={disconnectWallet}>
          Disconnect
        </Button>
      )}
      {!address && (
        <Button onClick={connectWallet} mr="1" colorScheme="blue">
          Connect
        </Button>
      )}

      {address && (
        <Button mr="2" ml="5" colorScheme="blue">
          {address.slice(0, 3)}
          ...{address.slice(-4)}
        </Button>
      )}
    </Flex>
  );
}

export default Connect;
