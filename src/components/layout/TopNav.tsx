import { Bell, Moon, Sun, Search } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function TopNav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-20 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search..."
            className="h-9 w-64 rounded-xl bg-muted/50 border-0 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <motion.div whileTap={{ scale: 0.92 }}>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl relative"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </Button>
        </motion.div>

        <motion.div whileTap={{ scale: 0.92 }}>
          <Button variant="ghost" size="icon" className="rounded-xl relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent" />
          </Button>
        </motion.div>

        <div className="ml-2 flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              MK
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
