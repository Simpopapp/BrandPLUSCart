import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { BrandsMenuHeader } from "./brands/BrandsMenuHeader";
import { BrandsCarousel } from "./brands/BrandsCarousel";
import { useBrandsMenu } from "@/hooks/useBrandsMenu";

const brandMenuItems = [
  {
    id: "elfbar",
    name: "Elf Bar",
    image: "/placeholder.svg",
    route: "/elfbar"
  },
  {
    id: "lostmary",
    name: "Lost Mary",
    image: "/placeholder.svg",
    route: "/lostmary"
  },
  {
    id: "oxbar",
    name: "Ox Bar",
    image: "/placeholder.svg",
    route: "/oxbar"
  }
];

export function BrandsMenu() {
  const {
    menuRef,
    isCollapsed,
    isSticky,
    menuHeight,
    handleToggleCollapse,
    handleHeaderClick
  } = useBrandsMenu();

  return (
    <div className="relative mb-96" ref={menuRef}>
      {/* Spacer div that maintains layout */}
      <div 
        style={{ height: menuHeight }}
        className="transition-all duration-500"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          height: isCollapsed ? "96px" : "auto",
          minHeight: isCollapsed ? "96px" : "300px",
          opacity: 1,
        }}
        transition={{ 
          duration: 0.5, 
          ease: "easeInOut",
          layout: true 
        }}
        layout
        className={cn(
          "w-full bg-gradient-to-b from-secondary/80 to-secondary/40 backdrop-blur-md z-40 shadow-lg overflow-hidden",
          !isCollapsed && "py-12",
          isCollapsed && "cursor-pointer",
          isSticky ? "fixed top-0 left-0 right-0" : "absolute top-0 left-0 right-0"
        )}
        onClick={handleHeaderClick}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5 opacity-50" />
        
        <BrandsMenuHeader 
          isCollapsed={isCollapsed}
          handleToggleCollapse={handleToggleCollapse}
        />

        <AnimatePresence>
          {!isCollapsed && (
            <BrandsCarousel 
              isCollapsed={isCollapsed}
              brandMenuItems={brandMenuItems}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}