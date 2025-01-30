import contract from "@/utils/contractUtils";
import { ethers } from "ethers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const address = req.nextUrl.pathname.split("/").pop();
  console.log(address);

  if (!ethers.isAddress(address)) {
    return NextResponse.json({ error: "Invalid address" }, { status: 400 });
  }

  try {
    const events = await contract.queryFilter("DonationReceived", 0, "latest");
    const totalDonations = events
      .filter(
        (event) => event.args.donor.toLowerCase() === address.toLowerCase()
      )
      .reduce((sum, event) => sum.add(event.args.amount), ethers.toBigInt(0));

    return NextResponse.json({
      address,
      totalDonations: ethers.formatEther(totalDonations),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
