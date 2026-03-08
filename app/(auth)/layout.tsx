import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return (
        <div className="flex flex-com w-screen h-screen justify-center items-center bg-[#222126]">
            {children}
        </div>
    )
}