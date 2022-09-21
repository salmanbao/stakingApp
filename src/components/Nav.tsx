import Button from "./Button";
import {
  FaDiscord,
  FaTelegramPlane,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { AiFillCaretUp } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { AnimatePresence, motion } from "framer-motion";
import { chains, connectors } from "../utils/connectors";
import { TokenInfo, usePrice } from "../hooks/usePrice";
import { contracts, DEFAULT_CHAINID } from "../utils/constants";

export default function Nav() {
  const tokenInfo: TokenInfo = usePrice();
  const [isOpen, setIsOpen] = useState(false);
  const [defaultChainId] = useState("0x3");
  const { activate, deactivate, active, library, connector } = useWeb3React();
 
  useEffect(() => {
    if (localStorage.getItem("isConnected") == "true")
      connect(localStorage.getItem("connector"));

    return () => {};
  }, []);

  const connect = async (type: string | null) => {
    switch (type) {
      case "metamask":
        activate(connectors.injected);
        localStorage.setItem("isConnected", "true");
        localStorage.setItem("connector", "metamask");
        break;
      case "walletconnect":
        activate(connectors.injected);
        localStorage.setItem("isConnected", "true");
        localStorage.setItem("connector", "walletconnect");
        break;
      default:
        break;
    }
    await connector?.activate();
  };

  const disconnect = () => {
    deactivate();
    localStorage.removeItem("isConnected");
    localStorage.removeItem("connector");
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: defaultChainId }],
      });
    } catch (switchError: any) {
      // 4902 error code indicates the chain is missing on the wallet
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [chains[defaultChainId]],
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <nav className="bg-design-background4 bg-opacity-20 text-design-white fixed top-0 left-0 w-full backdrop-blur-md z-40">
      <div className="hidden lg:flex bg-design-backgroundBlack text-xs font-semibold py-2 px-4 items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <p className="flex items-center">
            <img
              src="/images/coin.png"
              alt=""
              className="h-4 w-4 object-contain object-center mr-1.5"
            />
            SMCW
            <span className="text-design-green ml-2 flex items-center gap-1">
              <AiFillCaretUp /> ${tokenInfo.quote?.USD?.price.toFixed(4)}
            </span>
          </p>
          <button
            onClick={() => {
              window.navigator.clipboard.writeText(
                tokenInfo.platform.token_address
              );
              toast.success("Copied to clipboard");
            }}
            className="flex items-center"
          >
            <img
              src="/images/copy.png"
              alt=""
              className="h-5 w-5 object-contain object-center mr-1.5"
            />
            Copy Contract
          </button>
          <p className="flex items-center">
            <img
              src="/images/coin.png"
              alt=""
              className="h-4 w-4 object-contain object-center mr-1.5"
            />
            Staking APY
            <span className="gradient-3 clip-text ml-2">Up to 3625%</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* {!active && (
            <Button
              className="button-1 !rounded-md"
              onClick={() => connect("walletconnect")}
            >
              <img src="/images/WalletConnect.png" alt="" />
              WalletConnect
            </Button>
          )} */}
          {!active && (
            <Button
              className="button-1 !rounded-md"
              onClick={() => connect("metamask")}
            >
              <img src="/images/Metamask.png" alt="" />
              Connect to Metamask
            </Button>
          )}

          {active && (
            <Button
              className="button-1 !rounded-md"
              onClick={() => disconnect()}
            >
              Disconnect
            </Button>
          )}

          {defaultChainId != DEFAULT_CHAINID && (
            <Button
              className="button-1 !rounded-md"
              onClick={() => switchNetwork()}
            >
              Switch Network
            </Button>
          )}

          <p className="ml-4 flex items-center gap-3">
            <a
              href="https://discord.gg/JvHWFRWqNd"
              target="_blank"
              rel="noreferrer"
              className=" bg-white rounded-button-1"
            >
              <FaDiscord className="text-brands-discord" />
            </a>
            <a
              href="https://t.me/Spacemisfitsgame"
              target="_blank"
              rel="noreferrer"
              className=" bg-brands-telegram rounded-button-1"
            >
              <FaTelegramPlane />
            </a>
            <a
              href="https://twitter.com/spacemisfits.com"
              target="_blank"
              rel="noreferrer"
              className=" bg-brands-twitter rounded-button-1"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.youtube.com/channel/UCUPRP1fsOReM0QmwsZFAsKQ"
              target="_blank"
              rel="noreferrer"
              className=" bg-brands-youtube rounded-button-1"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.twitch.tv/durtymisfit"
              target="_blank"
              rel="noreferrer"
              className=" bg-brands-twitch rounded-button-1"
            >
              <FaTwitch />
            </a>
          </p>
        </div>
      </div>
      <div
        className="mx-auto px-4 lg:px-8"
        style={{
          maxWidth: "calc(1536px + 4rem)",
        }}
      >
        <div className="flex items-center text-sm font-semibold justify-between gap-4 py-3">
          <a href="/">
            <img
              src="/images/logo2.png"
              alt=""
              className="hidden lg:block h-14"
            />
            <img
              src="/images/logo.png"
              alt=""
              className="block lg:hidden h-14"
            />
          </a>
          <div className="hidden lg:flex gap-4 text-design-grey">
            <a href="/">HOME</a>
            <a href="/">NEWS</a>
            <a href="/" className="link-active">
              STAKING
            </a>
            <a href="/">TUTORIAL</a>
            <a href="/">SHOP</a>
            <a href="/">DOWNLOAD</a>
          </div>
          <div className="flex items-center gap-6 lg:w-32">
            {/* <Button className="!hidden lg:!flex gradient-1 button-3 font-semibold">
              Play Now
            </Button>
            <a href="/" className="text-lg">
              <FiSettings />
            </a>
            <Button className="text-lg relative">
              <FiBell />
              <div className="absolute w-1.5 h-1.5 top-0 right-0.5 bg-design-red rounded-full"></div>
            </Button>
            <a
              href="/"
              className="hidden lg:flex items-center justify-center p-3 text-xl rounded-full bg-design-background5"
            >
              <AiOutlineUser />
            </a> */}
            <Button className="block lg:hidden" onClick={() => setIsOpen(true)}>
              <img src="/images/menu.png" alt="Menu" />
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence exitBeforeEnter>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "linear" }}
            key="mobile-nav"
            className="fixed top-0 left-0 w-full h-screen bg-design-background py-3 px-4 lg:px-8 flex flex-col justify-between z-50"
            style={{
              transition: "none",
            }}
          >
            <div>
              <div className="flex items-center text-sm font-semibold justify-between gap-4 ">
                <a href="/">
                  <img
                    src="/images/logo2.png"
                    alt=""
                    className="hidden lg:block h-14"
                  />
                  <img
                    src="/images/logo.png"
                    alt=""
                    className="block lg:hidden h-14"
                  />
                </a>
                <Button onClick={() => setIsOpen(false)}>
                  <img src="/images/close.png" alt="Close" />
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-6 mt-8 text-design-grey font-semibold">
                <a href="/">PROFILE</a>
                <a href="/">HOME</a>
                <a href="/">NEWS</a>
                <a href="/" className="link-active">
                  STAKING
                </a>
                <a href="/">TUTORIAL</a>
                <a href="/">SHOP</a>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-center items-center gap-4 mb-4">
                <a href="/" className=" bg-white rounded-button-1">
                  <FaDiscord className="text-brands-discord" />
                </a>
                <a href="/" className=" bg-brands-telegram rounded-button-1">
                  <FaTelegramPlane />
                </a>
                <a href="/" className=" bg-brands-twitter rounded-button-1">
                  <FaTwitter />
                </a>
                <a href="/" className=" bg-brands-youtube rounded-button-1">
                  <FaYoutube />
                </a>
                <a href="/" className=" bg-brands-twitch rounded-button-1">
                  <FaTwitch />
                </a>
              </div>
              <Button className="button-1 !px-3 !py-2.5">
                <img src="/images/WalletConnect.png" alt="" />
                WalletConnect
              </Button>
              <Button className="button-1 !px-3 !py-2.5">
                <img src="/images/Metamask.png" alt="" />
                Connect to Metamask
              </Button>
              <Button className="flex gradient-1 button-3 font-semibold">
                Play Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
