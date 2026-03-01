import { motion, AnimatePresence } from "framer-motion";
import { FileText, CheckCircle2, XCircle, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/layout/Animations";
import { useState } from "react";

const prescriptions = [
  { id: "RX-101", patient: "John Smith", medicine: "Amoxicillin 500mg", date: "Feb 28, 2026", status: "pending" as const },
  { id: "RX-102", patient: "Maria Garcia", medicine: "Metformin 850mg", date: "Feb 28, 2026", status: "approved" as const },
  { id: "RX-103", patient: "Alex Johnson", medicine: "Lisinopril 10mg", date: "Feb 27, 2026", status: "pending" as const },
  { id: "RX-104", patient: "Sarah Williams", medicine: "Atorvastatin 20mg", date: "Feb 27, 2026", status: "rejected" as const },
  { id: "RX-105", patient: "David Brown", medicine: "Omeprazole 20mg", date: "Feb 26, 2026", status: "approved" as const },
];

export default function DoctorDashboard() {
  const [selectedRx, setSelectedRx] = useState<typeof prescriptions[0] | null>(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <FadeIn>
        <h1 className="text-2xl font-bold tracking-tight">Doctor Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Review and approve patient prescriptions.</p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StaggerItem>
          <StatCard title="Pending Review" value={8} icon={<FileText className="w-5 h-5" />} />
        </StaggerItem>
        <StaggerItem>
          <StatCard title="Approved Today" value={15} icon={<CheckCircle2 className="w-5 h-5" />} trend={{ value: "+12%", positive: true }} />
        </StaggerItem>
        <StaggerItem>
          <StatCard title="Rejected" value={2} icon={<XCircle className="w-5 h-5" />} />
        </StaggerItem>
      </StaggerContainer>

      <FadeIn delay={0.2}>
        <div className="glass-card overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="font-semibold text-lg">Prescription Queue</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
                  <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Patient</th>
                  <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Medicine</th>
                  <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((rx, i) => (
                  <motion.tr
                    key={rx.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-5 py-4 text-sm font-mono text-muted-foreground">{rx.id}</td>
                    <td className="px-5 py-4 text-sm font-medium">{rx.patient}</td>
                    <td className="px-5 py-4 text-sm">{rx.medicine}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{rx.date}</td>
                    <td className="px-5 py-4"><StatusBadge status={rx.status} /></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <motion.div whileTap={{ scale: 0.9 }}>
                          <Button size="sm" variant="ghost" className="rounded-lg h-8 w-8 p-0" onClick={() => setSelectedRx(rx)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </motion.div>
                        {rx.status === "pending" && (
                          <>
                            <motion.div whileTap={{ scale: 0.9 }}>
                              <Button size="sm" className="rounded-lg h-8 px-3 text-xs bg-accent hover:bg-accent/90">
                                <CheckCircle2 className="w-3 h-3 mr-1" /> Approve
                              </Button>
                            </motion.div>
                            <motion.div whileTap={{ scale: 0.9 }}>
                              <Button size="sm" variant="outline" className="rounded-lg h-8 px-3 text-xs text-destructive border-destructive/30 hover:bg-destructive/10">
                                <XCircle className="w-3 h-3 mr-1" /> Reject
                              </Button>
                            </motion.div>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>

      {/* Slide-in detail panel */}
      <AnimatePresence>
        {selectedRx && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
              onClick={() => setSelectedRx(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border z-50 p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Prescription Detail</h2>
                <Button size="icon" variant="ghost" className="rounded-xl" onClick={() => setSelectedRx(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="glass-card p-4 space-y-3">
                  <div className="flex justify-between"><span className="text-sm text-muted-foreground">ID</span><span className="text-sm font-mono">{selectedRx.id}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-muted-foreground">Patient</span><span className="text-sm font-medium">{selectedRx.patient}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-muted-foreground">Medicine</span><span className="text-sm">{selectedRx.medicine}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-muted-foreground">Date</span><span className="text-sm">{selectedRx.date}</span></div>
                  <div className="flex justify-between items-center"><span className="text-sm text-muted-foreground">Status</span><StatusBadge status={selectedRx.status} /></div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
