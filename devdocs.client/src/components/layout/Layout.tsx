"use client"

import React from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import CommandMenu from "../ui/CommandMenu";
import "../../styles/layout.css";
import { useIsMobile } from "../../../hooks/use-mobile";

export const Layout = ({ children }: { children: React.ReactNode }) => {
 
  const isMobile = useIsMobile();

  return (
    <div className="layout">
      {!isMobile ? <Sidebar /> : <MobileNav />}

      <div className="main-content">
        <main className="content-wrapper">{children}</main>
      </div>
      <CommandMenu />
    </div>
  );
};

export default Layout;
