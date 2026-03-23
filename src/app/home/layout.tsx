export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
