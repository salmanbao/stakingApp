import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import SMCW from "./components/Panel/SMCW";
import { Route, Routes } from "react-router-dom";
import Ingame from "./components/Panel/Ingame";
import Vesting from "./components/Panel/Vesting";
import { useWeb3React } from "@web3-react/core";
import {  DEFAULT_CHAINID, toHex } from "./utils/constants";
import { chains } from "./utils/connectors";

export default function App() {
  const [refresh,setRefresh] = useState(false);
  const {active ,chainId , library } = useWeb3React();

  if(active){
    library.on('chainChanged',async (chainId:string|number)=>{
      if( chainId != DEFAULT_CHAINID){
        await switchNetwork()
      }
    })
  }
    
  useEffect(()=>{
    if(chainId !== undefined && toHex(chainId) !== DEFAULT_CHAINID){
     switchNetwork().then()
    }
  },[chainId])

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: DEFAULT_CHAINID}],
      });
    } catch (switchError: any) {
      // 4902 error code indicates the chain is missing on the wallet
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [chains[DEFAULT_CHAINID]],
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  return (
    <div className="bg-design-background text-white">
      <Nav />
      <Routes>
        <Route path="/" element={<Home refresh={refresh} setRefresh={setRefresh} />}>
          <Route path="/" element={<SMCW refresh={refresh} setRefresh={setRefresh} />} />
          <Route path="/ingame" element={<Ingame  />} />
          <Route path="/vesting" element={<Vesting/>} />
        </Route>
      </Routes>
      <Toaster
        toastOptions={{
          style: {
            background: "#11172C",
            color: "#fff",
            border: "1px solid #2966F5",
          },
        }}
      />
    </div>
  );
}
