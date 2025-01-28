import Nav from "@/components/ui/Nav";

export default function RootLayout({ children }) {
   return (
      <div>
         <Nav />
         <div className="text-slate-900 dark:text-white bg-slate-300/50 dark:bg-primary container pb-10">{children}</div>
      </div>
   );
}
