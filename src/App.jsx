import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Toaster } from "react-hot-toast";
import Airdrop from "./Airdrop";
import UserBalance from "./UserBalance";
import SignMessage from "./SignMessage";
import SendSol from "./SendSol";
import { motion } from "framer-motion";

export default function Wallet() {
  const endpoint = "https://api.devnet.solana.com/";

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-black text-blue-100 p-8">
            <div className="max-w-6xl mx-auto">
              <header className="mb-10">
                <motion.h1
                  className="text-4xl font-bold text-center text-blue-6 00"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{
                    scale: 1.015,
                  }}
                >
                  Solana Wallet Dashboard
                </motion.h1>
                <div className="flex justify-center space-x-4 mt-6">
                  <WalletMultiButton className="px-6 py-3 bg-zinc text-white rounded-md hover:bg-blue-700 transition-colors duration-300" />
                  <WalletDisconnectButton className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300" />
                </div>
              </header>
              <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <UserBalance />
                <Airdrop />
                <SignMessage />
                <SendSol />
              </main>
            </div>
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1e3a8a",
                color: "#fff",
              },
            }}
          />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
