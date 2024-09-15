import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import toast from "react-hot-toast";
import { CloudIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function SendTokens() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");

  async function handleAirdrop() {
    if (!wallet.publicKey) {
      toast.error("Wallet not connected");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      const signature = await connection.requestAirdrop(
        wallet.publicKey,
        parsedAmount * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(signature, "processed");
      toast.success(
        `Airdropped ${amount} SOL to ${wallet.publicKey.toBase58()}`
      );
    } catch (error) {
      console.error("Airdrop error:", error);
      toast.error(`Error: ${error.message || "Airdrop failed"}`);
    }
  }

  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg shadow-lg border border-blue-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-blue-400 flex items-center">
        <CloudIcon className="mr-2" /> Solana Airdrop
      </h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-blue-300 mb-1"
          >
            Amount (SOL)
          </label>
          <input
            id="amount"
            type="number"
            step="0.000000001"
            className="w-full p-2 bg-gray-700 border border-blue-900 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount in SOL"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          onClick={handleAirdrop}
          disabled={!wallet.publicKey || !amount}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
        >
          Request Airdrop
        </button>
      </div>
    </motion.div>
  );
}
