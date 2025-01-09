import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { BrandsCarousel } from "./brands/BrandsCarousel";
import { BrandsMenuHeader } from "./brands/BrandsMenuHeader";

export function BrandsMenu() {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isSticky, setIsSticky] = React.useState(false);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [manualExpand, setManualExpand] = React.useState(false);
  const [menuHeight, setMenuHeight] = React.useState<number>(0);

  React.useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.offsetHeight);
    }
  }, [isCollapsed]);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        setIsSticky(true);
        
        if (currentScrollY > lastScrollY && !manualExpand) {
          setIsCollapsed(true);
        } else if (currentScrollY < lastScrollY && manualExpand) {
          setIsCollapsed(false);
        }
      } else {
        setIsSticky(false);
        setIsCollapsed(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, manualExpand]);

  const handleToggleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
    setManualExpand(!isCollapsed);
  };

  const handleHeaderClick = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setManualExpand(true);
    }
  };

  return (
    <div className="relative mb-48" ref={menuRef}>
      {/* Spacer div that's always present to maintain layout */}
      <div 
        style={{ height: menuHeight }}
        className="transition-all duration-500"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          height: isCollapsed ? "auto" : "auto",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={cn(
          "w-full bg-gradient-to-b from-secondary/80 to-secondary/40 backdrop-blur-md z-40 shadow-lg overflow-hidden",
          !isCollapsed && "py-12",
          isCollapsed && "cursor-pointer",
          isSticky ? "fixed top-0 left-0 right-0" : "absolute top-0 left-0 right-0"
        )}
        onClick={handleHeaderClick}
      >
        <BrandsMenuHeader
          isCollapsed={isCollapsed}
          handleToggleCollapse={handleToggleCollapse}
        />

        <AnimatePresence>
          {!isCollapsed && (
            <BrandsCarousel
              isCollapsed={isCollapsed}
              handleToggleCollapse={handleToggleCollapse}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}