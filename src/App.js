import "./App.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
// import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from "wagmi/providers/public";
import Homepage from "./Components/Homepage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Drawingpad from "./Components/Drawingpad";




const { chains, provider } = configureChains([mainnet], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "Scribble-pad ",
  chains,
});

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App() {

  return (
    // <div className="bg-[url(https://us.123rf.com/450wm/litvinovaelena86/litvinovaelena861811/litvinovaelena86181101488/112092012-blockchain-technology-background-bussines-concept-banner-blue-digital-pattern-blockchain-vector.jpg)] w-screen h-screen bg-no-repeat bg-cover">
    //   <div className="flex items-center justify-between p-2 bg-gradient-to-r from-indigo-600 via-blue-800 to-purple-700">
    //     <p className="text-white text-xl "><a href="/">Scribble-Pad</a></p>
    //     <WagmiConfig client={client}>
    //       <RainbowKitProvider chains={chains}>
    //         <ConnectButton />
    //       </RainbowKitProvider>
    //     </WagmiConfig>
    //   </div>
      
    //   <BrowserRouter>
    //   <Routes>

    //   <Route path="/" element={<Homepage />} />
    //     <Route path="/Drawingpad" element={<Drawingpad />} />
    //   </Routes>
    //   </BrowserRouter>
        
      
    // </div>
    <div>
      <Drawingpad/>
    </div>
  );
}

export default App;
