import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";
import { Buffer } from "buffer";
import toast from "react-hot-toast";
import { SendIcon } from "lucide-react";
import { motion } from "framer-motion";

window.Buffer = Buffer;

export default function SendSol() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  async function handleSend() {
    if (!wallet.publicKey || !wallet.signTransaction) {
      toast.error("Wallet not connected");
      return;
    }

    try {
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(to),
          lamports: Number(parseFloat(amount) * LAMPORTS_PER_SOL),
        })
      );

      await wallet.sendTransaction(transaction, connection);
      toast.success(`Sent ${amount} SOL to ${to}`);
    } catch (error) {
      console.error(error);
      toast.error("Transaction failed");
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
        <SendIcon className="mr-2" /> Send SOL
      </h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="to"
            className="block text-sm font-medium text-blue-300 mb-1"
          >
            Recipient Address
          </label>
          <input
            id="to"
            type="text"
            className="w-full p-2 bg-gray-700 border border-blue-900 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter recipient address"
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
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
            placeholder="Enter amount"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!wallet.connected || !to || !amount}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
        >
          {wallet.connected ? "Send SOL" : "Connect Wallet"}
        </button>
      </div>
    </motion.div>
  );
}
