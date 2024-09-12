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

export default function Wallet() {
  //useMemo(() => { /* expensive computation */ }, [dependency]);
  const endpoint =
    "https://solana-devnet.g.alchemy.com/v2/Ebs5VVFMeNeBW-6RiW7pZwFvXDlE5Evz";

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
          <Airdrop />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
