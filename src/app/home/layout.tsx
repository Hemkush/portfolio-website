import SideNave from "@/app/ui/components/sidenave";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <div className="flex flex-col h-screen" >
      <div className="flex justify-center items-center bg-gray-100 shadow-md">
    <SideNave/>
    </div>
      <div className="flex-1 overflow-y-4" style={{ paddingTop: '1.75%' }}>{children}</div>
    </div>
  );
}