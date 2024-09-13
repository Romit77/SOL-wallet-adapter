import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function UserBalance() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [balance, setBalance] = useState();

  useEffect(() => {
    async function getBalance() {
      if (wallet.publicKey) {
        try {
          const bal = await connection.getBalance(wallet.publicKey);
          setBalance(bal / LAMPORTS_PER_SOL);
        } catch (e) {
          console.log("fetching error", e);
        }
      }
    }
    getBalance();
  }, [wallet.publicKey, connection]);

  return (
    <div>
      <p>SOL BALANCE: {balance}</p>
    </div>
  );
}
