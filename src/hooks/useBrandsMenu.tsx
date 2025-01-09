import { useRef, useState, useEffect } from "react";

export function useBrandsMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [manualExpand, setManualExpand] = useState(false);
  const [menuHeight] = useState(400); // Fixed height for consistency

  useEffect(() => {
    const handleScroll = () => {
      if (!menuRef.current) return;

      const menuPosition = menuRef.current.getBoundingClientRect();
      const menuTop = menuPosition.top;
      const menuBottom = menuPosition.bottom;
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;

      // Update sticky state
      if (menuBottom < 0) {
        setIsSticky(true);
        if (!isCollapsed && !manualExpand) {
          setIsCollapsed(true);
        }
      } else {
        setIsSticky(false);
      }

      // Handle auto-expand on scroll up
      if (isScrollingUp && menuTop > -100 && isCollapsed && !manualExpand) {
        setIsCollapsed(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCollapsed, lastScrollY, manualExpand]);

  const handleToggleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
    setManualExpand(true);
  };

  const handleHeaderClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    const clickY = e.clientY - rect.top;

    if (clickY <= 96 && isSticky) {
      setIsCollapsed(!isCollapsed);
      setManualExpand(true);
    }
  };

  return {
    menuRef,
    isCollapsed,
    isSticky,
    menuHeight,
    handleToggleCollapse,
    handleHeaderClick
  };
}