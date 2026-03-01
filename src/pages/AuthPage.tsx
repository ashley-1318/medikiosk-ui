import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Pill, ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/layout/Animations";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function AuthPage() {
  const [step, setStep] = useState<"login" | "otp">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("otp");
  };

  const handleOtpComplete = (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      setTimeout(() => navigate("/dashboard/patient"), 600);
    }
  };

  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      {/* Left panel - branding */}
      <div className="hidden lg:flex flex-1 relative gradient-bg-hero items-center justify-center p-12">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-accent/10 blur-3xl"
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <FadeIn className="relative z-10 max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl gradient-bg-primary flex items-center justify-center">
              <Pill className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-xl">MEDIKIOSK</h2>
              <p className="text-sm text-muted-foreground">AI Drug Dispensing</p>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 leading-tight">
            Smart Healthcare <span className="gradient-text">Simplified</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Access your prescriptions, track dispensing status, and manage your healthcare journey
            — all from one intelligent platform.
          </p>
        </FadeIn>
      </div>

      {/* Right panel - auth form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <FadeIn className="w-full max-w-md">
          <div className="glass-card p-8">
            {step === "login" ? (
              <>
                <div className="text-center mb-8">
                  <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl gradient-bg-primary flex items-center justify-center">
                      <Pill className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-lg">MEDIKIOSK</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
                  <p className="text-sm text-muted-foreground">Sign in to your account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        placeholder="doctor@medikiosk.com"
                        defaultValue="admin@medikiosk.com"
                        className="w-full h-11 rounded-xl bg-muted/50 border border-border pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        defaultValue="password123"
                        className="w-full h-11 rounded-xl bg-muted/50 border border-border pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" className="w-full h-11 rounded-xl glow-primary text-base">
                      Sign In <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Enter OTP</h2>
                <p className="text-sm text-muted-foreground mb-8">
                  We sent a 6-digit code to your email
                </p>

                <div className="flex justify-center mb-8">
                  <InputOTP maxLength={6} value={otp} onChange={handleOtpComplete}>
                    <InputOTPGroup>
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className="w-12 h-14 text-xl rounded-xl border-border"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => navigate("/dashboard/patient")}
                    className="w-full h-11 rounded-xl glow-primary text-base"
                  >
                    Verify & Continue
                  </Button>
                </motion.div>

                <button
                  onClick={() => setStep("login")}
                  className="text-sm text-muted-foreground hover:text-foreground mt-4 transition-colors"
                >
                  ← Back to login
                </button>
              </motion.div>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
