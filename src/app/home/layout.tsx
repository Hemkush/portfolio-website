import SideNave from "@/app/ui/components/sidenave";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <div className="flex flex-col h-screen" >
      <div className="flex justify-center items-center bg-gray-100 shadow-md">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/60 backdrop-blur-lg border-b border-gray-700/50 shadow-lg">
      <nav className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-center h-16">
          {/* <div className="flex items-center">
            <span className="text-xl font-bold text-white">Hemant Kushwaha</span>
          </div> */}
    <SideNave/>
    </div>
    </nav>
      </header>
    </div>
      <div className="flex-1 overflow-y-4" style={{ paddingTop: "3%" }}>{children}</div>
      
    </div>
  );
}