"use client";

import { Button, Progress, Radio, TextInput } from "flowbite-react";
import { DollarSignIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import contract from "@/utils/contractUtils";

export default function FundCampaign() {
  const { id } = useParams();
  const [clickOther, setClickOther] = useState(false);
  const [amountValue, setAmountValue] = useState("");

  useEffect(() => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
    }
  }, []);

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setAmountValue(value);
    setClickOther(value === "Other");
  };

  const connectAndFund = async () => {
    if (!window.ethereum) return alert("MetaMask not found!");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractWithSigner = contract.connect(signer);

      const amountInWei = ethers.parseEther(amountValue || "0");
      const tx = await contractWithSigner.donate(id, { value: amountInWei });

      alert("Donation transaction sent!");
      await tx.wait();
      alert("Donation successful!");
    } catch (err) {
      console.error("Error donating:", err);
      alert("Donation failed!");
    }
  };

  return (
    <section id="fund" className="mt-5">
      <h3 className="text-2xl font-bold dark:text-white text-slate-900 sm:text-3xl mt-5">
        Fund Campaign {id}
      </h3>
      <div className="mt-5">
        <Progress
          progress={45}
          progressLabelPosition="inside"
          textLabel="Campaign Goal: $1000"
          textLabelPosition="outside"
          size="lg"
        />
      </div>
      <div className="mt-5">
        <legend className="md:text-base text-sm dark:text-slate-200 text-slate-900">
          Choose an amount
        </legend>
        <ul className="w-full mt-5 text-sm font-medium bg-white border border-gray-200 rounded-lg sm:flex">
          <li className="w-full">
            <div className="flex items-center gap-3">
              <Radio
                id="5$"
                name="amount"
                value="5"
                defaultChecked
                onChange={handleRadioChange}
              />
              <label htmlFor="5$">$5</label>
            </div>
          </li>
          <li className="w-full">
            <div className="flex items-center gap-3">
              <Radio
                id="10$"
                name="amount"
                value="10"
                onChange={handleRadioChange}
              />
              <label htmlFor="10$">$10</label>
            </div>
          </li>
          <li className="w-full">
            <div className="flex items-center gap-3">
              <Radio
                id="20$"
                name="amount"
                value="20"
                onChange={handleRadioChange}
              />
              <label htmlFor="20$">$20</label>
            </div>
          </li>
          <li className="w-full">
            <div className="flex items-center gap-3">
              <Radio
                id="other"
                name="amount"
                value="Other"
                onChange={handleRadioChange}
              />
              <label htmlFor="other">Other</label>
            </div>
          </li>
        </ul>
      </div>
      <div className="mt-5" hidden={!clickOther}>
        <TextInput
          id="amount"
          type="number"
          icon={DollarSignIcon}
          onInput={(e) => setAmountValue(e.target.value)}
          placeholder="amount"
          required
        />
      </div>
      <div className="mt-5">
        <Button onClick={connectAndFund}>
          Fund {amountValue && `$${amountValue}`}
        </Button>
      </div>
    </section>
  );
}
