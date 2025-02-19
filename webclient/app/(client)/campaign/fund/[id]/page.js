import FundDetails from "@/app/_components/ui/FundDetails";

export default async function FundCampaign({ params }) {
   const { id } = await params;

   return (
      <section id="fund" className="mt-5">
         <FundDetails id={id} />
      </section>
   );
}
