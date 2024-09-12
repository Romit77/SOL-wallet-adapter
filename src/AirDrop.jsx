import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export default function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function sendAirdrop() {
    await connection.requestAirdrop(wallet.publicKey, 1000000000);
  }

  return (
    <div>
      <input type="text" placeholder="Amount" />
      <button onClick={sendAirdrop}>Send Airdrop</button>
    </div>
  );
}
