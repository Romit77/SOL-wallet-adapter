import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import bs58 from "bs58";
import toast from "react-hot-toast";
import { PenIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");

  async function handleSign() {
    if (!publicKey || !signMessage) {
      toast.error("Wallet not connected or doesn't support message signing");
      return;
    }

    try {
      const encodedMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodedMessage);

      if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
        throw new Error("Signature verification failed");
      }

      toast.success(`Success! Message signature: ${bs58.encode(signature)}`);
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.message}`);
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
        <PenIcon className="mr-2" /> Sign Message
      </h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-blue-300 mb-1"
          >
            Enter your message
          </label>
          <textarea
            id="message"
            rows={3}
            className="w-full p-2 bg-gray-700 border border-blue-900 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message here"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
        <button
          onClick={handleSign}
          disabled={!message || !publicKey}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
        >
          Sign Message
        </button>
      </div>
    </motion.div>
  );
}
