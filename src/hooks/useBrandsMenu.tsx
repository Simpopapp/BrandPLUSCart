import { useRef, useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

export function useBrandsMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [manualExpand, setManualExpand] = useState(false);
  const [menuHeight] = useState(400); // Fixed height for consistency

  // Memoize the scroll handler to prevent unnecessary re-renders
  const handleScroll = useCallback(
    debounce(() => {
      if (!menuRef.current) return;

      const menuPosition = menuRef.current.getBoundingClientRect();
      const menuTop = menuPosition.top;
      const menuBottom = menuPosition.bottom;
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;

      // Update sticky state with threshold
      if (menuBottom < -10) { // Added threshold to prevent flickering
        setIsSticky(true);
        if (!isCollapsed && !manualExpand) {
          setIsCollapsed(true);
        }
      } else if (menuBottom > 10) { // Added threshold for unsticking
        setIsSticky(false);
      }

      // Handle auto-expand on scroll up with improved conditions
      if (isScrollingUp && 
          menuTop > -100 && 
          isCollapsed && 
          !manualExpand && 
          Math.abs(currentScrollY - lastScrollY) > 50) { // Added minimum scroll delta
        setIsCollapsed(false);
      }

      setLastScrollY(currentScrollY);
    }, 50, { leading: true, trailing: true }), // Debounce with both leading and trailing calls
    [isCollapsed, lastScrollY, manualExpand]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Reset states when component mounts
    setIsCollapsed(false);
    setIsSticky(false);
    setManualExpand(false);
    setLastScrollY(window.scrollY);

    return () => {
      handleScroll.cancel(); // Cancel any pending debounced calls
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Reset manual expand after a delay when menu is manually toggled
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
    setIsCollapsed((prev) => !prev);
    setManualExpand(true);
  };

  const handleHeaderClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    const clickY = e.clientY - rect.top;

    if (clickY <= 96 && isSticky) {
      setIsCollapsed((prev) => !prev);
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