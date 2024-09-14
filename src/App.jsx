import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
// import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import Airdrop from "./AirDrop";
import UserBalance from "./UserBalance";
import { Toaster } from "react-hot-toast";
import SignMessage from "./SignMessage";
import SendSol from "./SendSol";

export default function Wallet() {
  //useMemo(() => { /* expensive computation */ }, [dependency]);
  const endpoint = "https://api.devnet.solana.com/";

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "50px",
            }}
          >
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
          <Toaster />
          <Airdrop />
          <UserBalance />
          <SignMessage />
          <SendSol />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
