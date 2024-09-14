import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import bs58 from "bs58";

export default function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");

  async function sign() {
    try {
      if (!publicKey) throw new Error("Wallet not connected!");
      if (!signMessage)
        throw new Error("Wallet does not support message signing!");
      const encodedMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodedMessage);

      if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes()))
        throw new Error("Error signing");
      alert(`Success! Message signature: ${bs58.encode(signature)}`);
    } catch (error) {
      console.log(error);
      alert(`Error: ${error.message}`);
    }
  }

  return (
    <div className="flex h-screen justify-center items-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Sign Message
        </h1>
        <input
          type="text"
          placeholder="Enter your message"
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="w-full p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-white font-semibold"
          onClick={sign}
        >
          Sign
        </button>
      </div>
    </div>
  );
}
