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
        throw new Error("error signing");
      alert("success", `Message signature: ${bs58.encode(signature)}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="message"
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={sign}>Sign</button>
    </div>
  );
}
