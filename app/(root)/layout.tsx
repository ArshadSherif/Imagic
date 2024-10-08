import MobileNav from "@/Components/shared/MobileNav";
import SidebarComponent from "@/Components/shared/Sidebar";
import { Toaster } from "@/Components/ui/toaster";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <SidebarComponent />
      <MobileNav/>
      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
      <Toaster/>
    </main>
  );
};

export default Layout;
