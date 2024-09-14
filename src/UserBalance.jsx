import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
          toast.error("fetching error", e);
        }
      }
    }
    getBalance();
  }, [wallet.publicKey, connection]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-gray-100">
      <div className="bg-gray-900 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          User Balance
        </h2>
        <p className="text-lg mb-4 text-center">
          SOL BALANCE: {balance !== null ? balance.toFixed(2) : "Loading..."}
        </p>
        <div className="text-center">
          {wallet.publicKey ? (
            <p className="text-sm text-gray-400">
              Address: {wallet.publicKey.toBase58()}
            </p>
          ) : (
            <p className="text-sm text-red-500">Wallet not connected</p>
          )}
        </div>
      </div>
    </div>
  );
}
