"use client";

import { useState } from "react";
import { Button } from "flowbite-react";

export default function ConnectWallet() {
  const [walletAddress, setWalletAddress] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert(
        "MetaMask is not installed. Please install it to use this feature."
      );
      return;
    }

    try {
      setLoading(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];
      setWalletAddress(address);

      const response = await fetch("/api/wallet/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      });

      const data = await response.json();

      if (response.ok) {
        setUsername(data.user.username || "Dummy User");
        console.log("User data:", data.user);
      } else {
        setError(data.message || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setError("Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        size="xs"
        onClick={connectWallet}
        className="!text-white dark:bg-amber-700 hidden md:block dark:hover:!bg-amber-800"
        disabled={loading}
      >
        {loading
          ? "Connecting..."
          : username
            ? username
            : walletAddress
              ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4)
              : "Connect with E-wallet"}
      </Button>
      {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
    </div>
  );
}
