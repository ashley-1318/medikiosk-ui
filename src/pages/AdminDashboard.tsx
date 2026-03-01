import { motion } from "framer-motion";
import {
  Package,
  AlertTriangle,
  Monitor,
  BarChart3,
  TrendingUp,
  Pill,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/layout/Animations";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const inventoryItems = [
  { name: "Amoxicillin 500mg", stock: 85, max: 100, unit: "strips" },
  { name: "Metformin 850mg", stock: 12, max: 100, unit: "strips", low: true },
  { name: "Lisinopril 10mg", stock: 67, max: 100, unit: "strips" },
  { name: "Atorvastatin 20mg", stock: 8, max: 100, unit: "strips", low: true },
  { name: "Omeprazole 20mg", stock: 45, max: 100, unit: "strips" },
];

const machines = [
  { id: "MK-001", location: "Floor 1 - Lobby", status: "online" as const },
  { id: "MK-002", location: "Floor 2 - Ward A", status: "online" as const },
  { id: "MK-003", location: "Floor 3 - Ward B", status: "offline" as const },
];

const dispensingData = [
  { day: "Mon", count: 34 }, { day: "Tue", count: 45 },
  { day: "Wed", count: 38 }, { day: "Thu", count: 52 },
  { day: "Fri", count: 61 }, { day: "Sat", count: 28 },
  { day: "Sun", count: 19 },
];

const trendData = [
  { month: "Sep", prescriptions: 120, dispensed: 110 },
  { month: "Oct", prescriptions: 145, dispensed: 138 },
  { month: "Nov", prescriptions: 160, dispensed: 152 },
  { month: "Dec", prescriptions: 135, dispensed: 130 },
  { month: "Jan", prescriptions: 175, dispensed: 168 },
  { month: "Feb", prescriptions: 190, dispensed: 185 },
];

const recentLogs = [
  { id: "D-501", medicine: "Amoxicillin 500mg", patient: "John Smith", time: "2 min ago", status: "approved" as const },
  { id: "D-502", medicine: "Metformin 850mg", patient: "Maria Garcia", time: "15 min ago", status: "approved" as const },
  { id: "D-503", medicine: "Lisinopril 10mg", patient: "Alex Johnson", time: "1 hr ago", status: "pending" as const },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <FadeIn>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Monitor inventory, machines, and dispensing operations.</p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StaggerItem><StatCard title="Total Inventory" value="1,247" icon={<Package className="w-5 h-5" />} /></StaggerItem>
        <StaggerItem><StatCard title="Low Stock Alerts" value={3} icon={<AlertTriangle className="w-5 h-5" />} trend={{ value: "+1 today", positive: false }} /></StaggerItem>
        <StaggerItem><StatCard title="Machines Online" value="2/3" icon={<Monitor className="w-5 h-5" />} /></StaggerItem>
        <StaggerItem><StatCard title="Dispensed Today" value={42} icon={<TrendingUp className="w-5 h-5" />} trend={{ value: "+18%", positive: true }} /></StaggerItem>
      </StaggerContainer>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Chart */}
        <FadeIn delay={0.2}>
          <div className="glass-card p-6">
            <h2 className="font-semibold text-lg mb-4">Weekly Dispensing</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={dispensingData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" className="text-xs" tick={{ fill: "hsl(215 16% 47%)" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(215 16% 47%)" }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(214 32% 91%)", background: "hsl(0 0% 100%)" }} />
                <Bar dataKey="count" fill="hsl(217, 91%, 60%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </FadeIn>

        {/* Trend */}
        <FadeIn delay={0.3}>
          <div className="glass-card p-6">
            <h2 className="font-semibold text-lg mb-4">Monthly Trend</h2>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fill: "hsl(215 16% 47%)" }} />
                <YAxis tick={{ fill: "hsl(215 16% 47%)" }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(214 32% 91%)", background: "hsl(0 0% 100%)" }} />
                <Line type="monotone" dataKey="prescriptions" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="dispensed" stroke="hsl(160, 84%, 39%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </FadeIn>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Inventory */}
        <FadeIn delay={0.3} className="lg:col-span-2">
          <div className="glass-card p-6">
            <h2 className="font-semibold text-lg mb-4">Inventory Status</h2>
            <div className="space-y-4">
              {inventoryItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Pill className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium truncate">{item.name}</span>
                      <span className={`text-xs font-semibold ${item.low ? "text-destructive" : "text-muted-foreground"}`}>
                        {item.stock}/{item.max} {item.unit}
                        {item.low && " ⚠️"}
                      </span>
                    </div>
                    <Progress
                      value={(item.stock / item.max) * 100}
                      className={`h-2 ${item.low ? "[&>div]:bg-destructive" : ""}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Machines */}
        <FadeIn delay={0.4}>
          <div className="glass-card p-6">
            <h2 className="font-semibold text-lg mb-4">Machine Status</h2>
            <div className="space-y-3">
              {machines.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className={`p-4 rounded-xl border transition-all ${
                    m.status === "online"
                      ? "border-accent/20 bg-accent/5"
                      : "border-destructive/20 bg-destructive/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold">{m.id}</span>
                    <StatusBadge status={m.status} />
                  </div>
                  <p className="text-xs text-muted-foreground">{m.location}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Recent Logs */}
      <FadeIn delay={0.5}>
        <div className="glass-card p-6">
          <h2 className="font-semibold text-lg mb-4">Recent Dispense Logs</h2>
          <div className="space-y-3">
            {recentLogs.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-xl bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground">{log.id}</span>
                  <span className="text-sm font-medium">{log.medicine}</span>
                  <span className="text-sm text-muted-foreground">→ {log.patient}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{log.time}</span>
                  <StatusBadge status={log.status} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
