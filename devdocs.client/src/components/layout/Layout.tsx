"use client"

import { Outlet } from "react-router-dom"
import { motion } from "framer-motion"
import Sidebar from "./sideBar/Sidebar"
import MobileNav from "./MobileNav"
import CommandMenu from "../ui/CommandMenu"
import "../../styles/layout.css"
import { useEffect } from "react"
import { useIsMobile } from "../../../hooks/use-mobile"

const Layout = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    const main = document.querySelector('.main-content');
    if (main) main.scrollTop = 0;
  }, []);

  return (
    <div className="app-container">
      <MobileNav />
      <div className="app-content">
        {!isMobile && <Sidebar />}
        <motion.main
          className="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </div>
      <CommandMenu />
    </div>
  )
}

export default Layout