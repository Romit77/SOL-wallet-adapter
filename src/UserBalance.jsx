import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { WalletIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function UserBalance() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    async function getBalance() {
      if (wallet.publicKey) {
        try {
          const bal = await connection.getBalance(wallet.publicKey);
          setBalance(bal / LAMPORTS_PER_SOL);
        } catch (e) {
          toast.error("Error fetching balance", e);
        }
      }
    }
    getBalance();
  }, [wallet.publicKey, connection]);

  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg shadow-lg border border-blue-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-blue-400 flex items-center">
        <WalletIcon className="mr-2" /> User Balance
      </h2>
      <p className="text-3xl font-bold mb-4 text-blue-200">
        {balance !== null ? `${balance.toFixed(4)} SOL` : "Loading..."}
      </p>
      <div className="text-sm text-blue-300 break-all">
        {wallet.publicKey ? (
          <>Address: {wallet.publicKey.toBase58()}</>
        ) : (
          <span className="text-red-400">Wallet not connected</span>
        )}
      </div>
    </motion.div>
  );
}
