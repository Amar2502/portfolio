"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Home, User, Briefcase, Code, Mail, 
  Moon, Sun, 
  Newspaper, ChevronLeft, ChevronRight,
  LucideMessageCircle, 
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Define types for navigation items
interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Skills", href: "/skills", icon: Code },
  { name: "Blogs", href: "/blogs", icon: Newspaper },
  { name: "Contact", href: "/contact", icon: Mail },
  { name: "Connect", href: "/connect", icon: LucideMessageCircle },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const footerNavRef = useRef<HTMLDivElement | null>(null);

  // Use this effect to handle theme-related rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Effect to scroll to the active item when the pathname changes
  useEffect(() => {
    if (!footerNavRef.current) return;
    
    // Find the active item index
    const activeIndex = navItems.findIndex(item => item.href === pathname);
    if (activeIndex === -1) return;
    
    // Find all nav items in the footer
    const footerItems = footerNavRef.current.querySelectorAll('[data-nav-item]');
    if (!footerItems.length || !footerItems[activeIndex]) return;
    
    // Get the active item element
    const activeItem = footerItems[activeIndex] as HTMLElement;
    
    // Calculate whether the item is fully visible
    const container = footerNavRef.current;
    const containerRect = container.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    
    // Check if the item is partially or fully outside the visible area
    const isItemPartiallyHidden = 
      itemRect.left < containerRect.left || 
      itemRect.right > containerRect.right;
    
    if (isItemPartiallyHidden) {
      // Calculate the scroll position to center the active item
      const scrollLeft = activeItem.offsetLeft - 
        (container.clientWidth / 2) + 
        (activeItem.offsetWidth / 2);
      
      // Smooth scroll to the position
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [pathname]);

  const toggleSidebar = (): void => {
    setCollapsed(!collapsed);
  };

  // Render a placeholder during server-side rendering
  // to avoid hydration mismatch with theme-dependent content
  const ThemeIcon = mounted ? (theme === "dark" ? Sun : Moon) : null;

  return (
    <>
      {/* Mobile/Tablet Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 border-b bg-background">
        <Link href="/" className="font-bold text-xl">
          Amar Pandey
        </Link>
        
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {ThemeIcon && <ThemeIcon className="h-5 w-5" />}
          </Button>
        )}
      </div>

      {/* Mobile/Tablet Footer Navigation Bar - Smart scrolling */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-40">
        <div 
          ref={footerNavRef} 
          className="overflow-x-auto scrollbar-hide"
        >
          <div className="flex items-center px-2 py-2 gap-4" style={{ minWidth: "max-content" }}>
            {navItems.map((item) => (
              <Link href={item.href} key={item.href} className="flex-shrink-0">
                <div
                  data-nav-item
                  className={cn(
                    "flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs mt-1">{item.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - collapsible */}
      <aside 
        className={cn(
          "hidden lg:flex flex-col h-screen border-r shadow-sm py-8 sticky top-0 transition-all duration-300",
          collapsed ? "w-16 px-2" : "w-64 px-6"
        )}
      >
        <div className={cn(
          "flex justify-between items-center mb-10",
          collapsed ? "px-0" : "px-2"
        )}>
          {!collapsed && (
            <Link href="/" className="font-bold text-2xl">
              Amar Pandey
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn(
              collapsed ? "ml-auto mr-auto" : "ml-auto"
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>

        <nav className="space-y-1 flex-1">
          <TooltipProvider>
            {navItems.map((item) => (
              <Tooltip key={item.href} delayDuration={300}>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className={cn(
                        "flex items-center rounded-lg text-sm font-medium",
                        collapsed ? "justify-center py-3 px-0" : "px-3 py-2 gap-3",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && item.name}
                    </motion.div>
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    {item.name}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>

        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
              "mt-auto",
              collapsed ? "mx-auto" : "ml-auto mr-2"
            )}
          >
            {ThemeIcon && <ThemeIcon className="h-5 w-5" />}
          </Button>
        )}
      </aside>
    </>
  );
}

export default Sidebar;