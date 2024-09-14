import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import toast from "react-hot-toast";

export default function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState(0);

  async function sendAirdrop() {
    if (wallet.publicKey && amount > 0) {
      try {
        await connection.requestAirdrop(
          wallet.publicKey,
          amount * LAMPORTS_PER_SOL
        );
        toast.success(
          "Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58()
        );
      } catch (error) {
        console.error("Airdrop error details:", error);
        toast.error(`Error: ${error.message || "Airdrop failed"}`);
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <h1 className="text-2xl text-white mb-4">Solana Airdrop</h1>
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <input
          type="number"
          placeholder="Amount in SOL"
          className="w-full p-3 mb-4 text-black rounded-lg"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button
          onClick={sendAirdrop}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send Airdrop
        </button>
      </div>
    </div>
  );
}
