import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700","800"],
})


export const Logo = () => {
    return (
        <Link href="/">
            <div className="flex items-center gap-x-4 hover:opacity-75">
                <div className="bg-white rounded-full p-1 shrink-0">
                    <Image
                        src="/spooky.svg"
                        alt="Logo"
                        width={32}
                        height={32}
                    />
                </div>
                <div className={cn(font.className,"hidden lg:block")}>
                    <p className="text-lg font-semibold text-white">
                        Rëlay
                    </p>
                </div>
            </div>
        </Link>
    )
}
