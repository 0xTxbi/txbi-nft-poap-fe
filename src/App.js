import { Route, Routes, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import {
  faQrcode,
  faTools,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";
import Connect from "./components/Connect";
import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import logo from "./images/txbi.jpeg";
import Admin from "./pages/Admin";
import Buy from "./pages/Buy";
import CheckIn from "./pages/CheckIn";
import Page from "./layouts/Page";
import Wallet from "./pages/Wallet";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import txbiTix from "./contracts/txbiTix.json";

function App() {
  const navigate = useNavigate();

  const [address, setAddress] = useState(null);
  const [isContractOwner, setIsContractOwner] = useState(false);
  const [connectedContract, setConnectedContract] = useState(null);

  // Check if connected wallet is the contract's owner
  useEffect(() => {
    const checkIfContractOwner = async () => {
      if (!address || !connectedContract) return;

      const ownerAddress = await connectedContract.owner();

      if (address.toLowerCase() === ownerAddress.toLowerCase()) {
        setIsContractOwner(true);
      } else {
        setIsContractOwner(false);
      }
    };

    checkIfContractOwner();
  }, [address, connectedContract]);

  // retrieve previously connected wallet
  useEffect(() => {
    if (!address) {
      const prevConnectedWallet =
        window.localStorage.getItem("txbitix-address");

      if (prevConnectedWallet) {
        setAddress(prevConnectedWallet);
      }
    }
  }, [address]);

  // connected contract
  const getConnectedContract = async () => {
    const { ethereum } = window;
    if (!ethereum) return;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ID,
      txbiTix.abi,
      signer
    );
    setConnectedContract(connectedContract);
  };

  // retrieve contract details
  useEffect(() => {
    getConnectedContract();
    console.log(connectedContract);
  }, []);

  return (
    <>
      <Connect
        address={address}
        onConnect={(address) => {
          setAddress(address);

          // cache details to local storage
          window.localStorage.setItem("txbitix-address", address);
        }}
        onDisconnect={() => {
          setAddress(null);

          // remove address cache from local storage
          window.localStorage.removeItem("txbitix-address");
        }}
      />
      <Page>
        <Menu
          left="0"
          _hover={{
            bg: "purple.500",
            fontWeight: "bold",
          }}
        >
          {({ isOpen }) => (
            <>
              <MenuButton
                position="absolute"
                top="12px"
                right="16px"
                as={Button}
                colorScheme="blue"
                rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              >
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate("/")}>
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Buy
                    <FontAwesomeIcon icon={faEthereum} size="lg" />
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => navigate("/wallet")}>
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Your Tickets
                    <FontAwesomeIcon icon={faTicketAlt} size="lg" />
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  isDisabled={!isContractOwner}
                  onClick={() => navigate("/check-in")}
                >
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Check In
                    <FontAwesomeIcon icon={faQrcode} size="lg" />
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  isDisabled={!isContractOwner}
                  onClick={() => navigate("/admin")}
                >
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Settings
                    <FontAwesomeIcon icon={faTools} size="lg" />
                  </Flex>
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
        <Flex
          alignItems="flex-start"
          flex="1 1 auto"
          flexDirection="column"
          justifyContent="center"
          width="100%"
        >
          <Image
            src={logo}
            alt="Event logo"
            margin="36px auto 12px"
            width="15%"
            borderRadius="full"
            boxSize="100px"
          />
          <Routes>
            <Route
              path="/"
              element={<Buy connectedContract={connectedContract} />}
            />

            <Route path="/check-in" element={<CheckIn />} />

            <Route
              path="/admin"
              element={
                <Admin
                  isContractOwner={isContractOwner}
                  connectedContract={connectedContract}
                />
              }
            />

            <Route path="/wallet" element={<Wallet />} />
          </Routes>
        </Flex>
      </Page>
    </>
  );
}

export default App;
