import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

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
        ); //1 SOL = 10^9 lamports
        alert(
          "Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58()
        );
      } catch (error) {
        console.error("Airdrop error details:", error);
        alert(`Error: ${error.message || "Airdrop failed"}`);
      }
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Amount"
        onChange={(e) => {
          setAmount(Number(e.target.value));
        }}
      />
      <button onClick={sendAirdrop}>Send Airdrop</button>
    </div>
  );
}
