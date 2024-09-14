import { useConnection } from "@solana/wallet-adapter-react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";
import { Buffer } from "buffer"; // to fix nodejs error
window.Buffer = Buffer;
import toast from "react-hot-toast";

export default function SendSol() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(0);

  async function Send() {
    try {
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(to),
          lamports: Number(amount * LAMPORTS_PER_SOL),
        })
      );
      await wallet.sendTransaction(transaction, connection);
      toast.success("Sent " + amount + " SOL");
    } catch (e) {
      console.log(e);
      toast.error("an error occured");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Send SOL
        </h2>

        <div className="mb-4">
          <label
            htmlFor="to"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Recipient Address
          </label>
          <input
            id="to"
            type="text"
            className="block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter recipient address"
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Amount (SOL)
          </label>
          <input
            id="amount"
            type="number"
            className="block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter amount"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          onClick={Send}
          className="w-full py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-500 transition duration-300"
          disabled={!wallet.connected}
        >
          {wallet.connected ? "Send SOL" : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
}
