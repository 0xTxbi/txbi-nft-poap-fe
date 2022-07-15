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

function App() {
  const navigate = useNavigate();

  const [address, setAddress] = useState(null);
  console.log(address);

  useEffect(() => {
    // retrieve previously connected wallet
    if (!address) {
      const prevConnectedWallet =
        window.localStorage.getItem("txbitix-address");

      if (prevConnectedWallet) {
        setAddress(prevConnectedWallet);
      }
    }
  }, [address]);

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
                <MenuItem onClick={() => navigate("/check-in")}>
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
                <MenuItem onClick={() => navigate("/admin")}>
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
            <Route path="/" element={<Buy />} />

            <Route path="/check-in" element={<CheckIn />} />

            <Route path="/admin" element={<Admin />} />

            <Route path="/wallet" element={<Wallet />} />
          </Routes>
        </Flex>
      </Page>
    </>
  );
}

export default App;
