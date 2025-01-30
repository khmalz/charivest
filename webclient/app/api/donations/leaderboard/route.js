import contract from "@/utils/contractUtils";
import { ethers } from "ethers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await contract.queryFilter("DonationReceived", 0, "latest");
    const donationMap = {};

    events.forEach((event) => {
      const donor = event.args.donor.toLowerCase();
      const amount = event.args.amount;
      donationMap[donor] = (donationMap[donor] || ethers.toBigInt(0)).add(
        amount
      );
    });

    const leaderboard = Object.entries(donationMap)
      .map(([donor, total]) => ({
        donor,
        totalDonations: ethers.formatEther(total),
      }))
      .sort(
        (a, b) => parseFloat(b.totalDonations) - parseFloat(a.totalDonations)
      )
      .slice(0, 10);

    return NextResponse.json({ leaderboard });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
