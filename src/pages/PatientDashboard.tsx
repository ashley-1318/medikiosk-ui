import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  Clock,
  Pill,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/layout/Animations";
import { useState } from "react";

const recentPrescriptions = [
  { id: "RX-001", doctor: "Dr. Sarah Chen", date: "Feb 28, 2026", status: "approved" as const, medicine: "Amoxicillin 500mg" },
  { id: "RX-002", doctor: "Dr. James Wilson", date: "Feb 27, 2026", status: "processing" as const, medicine: "Metformin 850mg" },
  { id: "RX-003", doctor: "Dr. Emily Park", date: "Feb 25, 2026", status: "pending" as const, medicine: "Lisinopril 10mg" },
];

const processingSteps = [
  { label: "Reading Prescription", icon: FileText },
  { label: "Extracting Data", icon: Clock },
  { label: "Validating", icon: CheckCircle2 },
];

export default function PatientDashboard() {
  const [uploadActive, setUploadActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const simulateProcessing = () => {
    setProcessing(true);
    setProcessingStep(0);
    const interval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev >= 2) {
          clearInterval(interval);
          setTimeout(() => setProcessing(false), 1500);
          return 2;
        }
        return prev + 1;
      });
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <FadeIn>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Patient Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Upload prescriptions and track your dispensing status.</p>
        </div>
      </FadeIn>

      {/* Stats */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StaggerItem>
          <StatCard title="Total Prescriptions" value={12} icon={<FileText className="w-5 h-5" />} trend={{ value: "+3 this month", positive: true }} />
        </StaggerItem>
        <StaggerItem>
          <StatCard title="Active Medicines" value={4} icon={<Pill className="w-5 h-5" />} />
        </StaggerItem>
        <StaggerItem>
          <StatCard title="Dispensed Today" value={2} icon={<CheckCircle2 className="w-5 h-5" />} />
        </StaggerItem>
        <StaggerItem>
          <StatCard title="Pending" value={1} icon={<Clock className="w-5 h-5" />} />
        </StaggerItem>
      </StaggerContainer>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Upload */}
        <FadeIn delay={0.2} className="lg:col-span-2">
          <div className="glass-card p-6 h-full">
            <h2 className="font-semibold text-lg mb-4">Upload Prescription</h2>

            {!processing ? (
              <motion.div
                onDragOver={(e) => { e.preventDefault(); setUploadActive(true); }}
                onDragLeave={() => setUploadActive(false)}
                onDrop={(e) => { e.preventDefault(); setUploadActive(false); simulateProcessing(); }}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                  uploadActive
                    ? "border-primary bg-primary/5 glow-primary"
                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
                onClick={simulateProcessing}
                whileHover={{ scale: 1.01 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-7 h-7 text-primary" />
                </div>
                <p className="font-medium mb-1">Drag & drop your prescription</p>
                <p className="text-sm text-muted-foreground">or click to browse files</p>
                <p className="text-xs text-muted-foreground mt-2">PNG, JPG, PDF up to 10MB</p>
              </motion.div>
            ) : (
              <div className="space-y-6 py-4">
                {processingSteps.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        i <= processingStep
                          ? i < processingStep
                            ? "bg-accent/10 text-accent"
                            : "bg-primary/10 text-primary animate-pulse"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {i < processingStep ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <s.icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{s.label}</p>
                      {i <= processingStep && (
                        <Progress
                          value={i < processingStep ? 100 : 60}
                          className="h-1.5 mt-1"
                        />
                      )}
                    </div>
                  </motion.div>
                ))}

                {processingStep >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-accent/10 text-accent"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Prescription processed successfully!</span>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </FadeIn>

        {/* Recent Prescriptions */}
        <FadeIn delay={0.3} className="lg:col-span-3">
          <div className="glass-card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Recent Prescriptions</h2>
              <Button variant="ghost" size="sm" className="rounded-xl text-primary text-xs">
                View All <ArrowRight className="ml-1 w-3 h-3" />
              </Button>
            </div>

            <div className="space-y-3">
              {recentPrescriptions.map((rx, i) => (
                <motion.div
                  key={rx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/60 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{rx.medicine}</p>
                      <p className="text-xs text-muted-foreground">{rx.doctor} · {rx.date}</p>
                    </div>
                  </div>
                  <StatusBadge status={rx.status} />
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
