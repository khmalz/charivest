import MetaMask from "@/app/_components/ui/MetaMask";
import Nav from "@/app/_components/ui/Nav";

export default function RootLayout({ children }) {
   return (
      <div>
         <MetaMask>
            <Nav />
         </MetaMask>
         <div className="text-slate-900 dark:text-white bg-slate-300/50 dark:bg-primary">
            <div className="container pb-10 min-h-screen">{children}</div>
         </div>
      </div>
   );
}
