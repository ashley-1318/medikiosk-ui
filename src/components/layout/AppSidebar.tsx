import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Pill,
  FileText,
  ChevronLeft,
  ChevronRight,
  Upload,
  Clock,
  Package,
  Monitor,
  BarChart3,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth, UserRole } from "@/context/AuthContext";

const navByRole: Record<UserRole, { label: string; items: { title: string; href: string; icon: typeof Users }[] }[]> = {
  patient: [
    {
      label: "My Health",
      items: [
        { title: "Dashboard", href: "/dashboard/patient", icon: LayoutDashboard },
        { title: "Upload Rx", href: "/dashboard/patient", icon: Upload },
        { title: "My Prescriptions", href: "/dashboard/patient", icon: FileText },
        { title: "History", href: "/dashboard/patient", icon: Clock },
      ],
    },
  ],
  doctor: [
    {
      label: "Practice",
      items: [
        { title: "Dashboard", href: "/dashboard/doctor", icon: LayoutDashboard },
        { title: "Pending Review", href: "/dashboard/doctor", icon: FileText },
        { title: "Patients", href: "/dashboard/doctor", icon: Users },
      ],
    },
  ],
  admin: [
    {
      label: "Management",
      items: [
        { title: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
        { title: "Inventory", href: "/dashboard/admin", icon: Package },
        { title: "Machines", href: "/dashboard/admin", icon: Monitor },
        { title: "Analytics", href: "/dashboard/admin", icon: BarChart3 },
      ],
    },
  ],
};

const roleLabels: Record<UserRole, { label: string; icon: typeof Users }> = {
  patient: { label: "Patient", icon: Users },
  doctor: { label: "Doctor", icon: ShieldCheck },
  admin: { label: "Admin", icon: LayoutDashboard },
};

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { role, logout } = useAuth();

  if (!role) return null;

  const navGroups = navByRole[role];
  const roleInfo = roleLabels[role];

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen sticky top-0 flex flex-col border-r border-border bg-sidebar z-30"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border">
        <div className="w-9 h-9 rounded-xl gradient-bg-primary flex items-center justify-center flex-shrink-0">
          <Pill className="w-5 h-5 text-primary-foreground" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <span className="font-bold text-sm tracking-tight">MEDIKIOSK</span>
              <p className="text-[10px] text-muted-foreground leading-none">AI Drug Dispensing</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Role badge */}
      <div className="px-3 pt-4 pb-2">
        <div className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 text-primary",
          collapsed && "justify-center px-0"
        )}>
          <roleInfo.icon className="w-4 h-4 flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs font-semibold"
              >
                {roleInfo.label} Portal
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2 px-3 space-y-6 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label}>
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2"
                >
                  {group.label}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="space-y-1">
              {group.items.map((item, idx) => {
                const active = location.pathname === item.href && idx === 0;
                return (
                  <Link
                    key={item.title}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {active && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 bg-primary/10 rounded-xl"
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      />
                    )}
                    <item.icon className="w-5 h-5 flex-shrink-0 relative z-10" />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="relative z-10"
                        >
                          {item.title}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout & Collapse */}
      <div className="p-3 border-t border-border space-y-1">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm">
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm">
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
