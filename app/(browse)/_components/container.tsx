'use client'

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useSidebar } from "@/store/use-sidebar";
import { cn } from "cn";
import { on } from "events";

interface ContainerProps { 
    children: React.ReactNode;
}


export const Container = ({ children }: ContainerProps) => {
    const {collapsed,onCollapse,onExpand } = useSidebar((state) => state);
    const matches = useMediaQuery("(min-width: 1024px)");

    useEffect(() => {
        if (matches) { 
            onCollapse();
        } else {
            onExpand();
        }
    },[matches, onExpand, onCollapse]);
    
    return (
        <div className={cn("flex-1",
            collapsed ? 'ml-[70px]' : 'ml-[70px] lg:ml-60'
        )}>
            {children}
        </div>
    )
}