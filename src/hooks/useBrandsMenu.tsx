import { useRef, useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

export function useBrandsMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [manualExpand, setManualExpand] = useState(false);
  const [menuHeight] = useState(400);

  const handleScroll = useCallback(
    debounce(() => {
      if (!menuRef.current) return;

      const menuPosition = menuRef.current.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;

      // Auto collapse when scrolling past the menu
      if (menuPosition.bottom < 0) {
        setIsSticky(true);
        if (!manualExpand) {
          setIsCollapsed(true);
        }
      } else {
        setIsSticky(false);
      }

      // Auto expand when scrolling up near the menu
      if (isScrollingUp && menuPosition.top > -200 && !manualExpand) {
        setIsCollapsed(false);
      }

      setLastScrollY(currentScrollY);
    }, 50),
    [lastScrollY, manualExpand]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      handleScroll.cancel();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (manualExpand) {
      const timer = setTimeout(() => {
        setManualExpand(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [manualExpand]);

  const handleToggleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCollapsed(prev => !prev);
    setManualExpand(true);
  };

  const handleHeaderClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    const clickY = e.clientY - rect.top;

    if (clickY <= 96 && isSticky) {
      setIsCollapsed(prev => !prev);
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