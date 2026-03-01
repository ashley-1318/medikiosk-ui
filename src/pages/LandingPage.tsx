import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Pill, ArrowRight, Shield, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/layout/Animations";

const features = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "AI-Powered Dispensing",
    description: "Intelligent prescription reading and automated drug dispensing with 99.9% accuracy.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Secure & Compliant",
    description: "HIPAA compliant infrastructure with end-to-end encryption for patient data.",
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Real-time Analytics",
    description: "Monitor inventory, dispensing patterns, and operational efficiency in real-time.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-primary/5 blur-3xl"
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-accent/5 blur-3xl"
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Nav */}
      <FadeIn>
        <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg-primary flex items-center justify-center">
              <Pill className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">MEDIKIOSK</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" className="rounded-xl">
                Login
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="rounded-xl glow-primary">Get Started</Button>
            </Link>
          </div>
        </nav>
      </FadeIn>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-32">
        <div className="text-center max-w-3xl mx-auto">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Zap className="w-3.5 h-3.5" />
              Next-gen Healthcare Technology
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              AI Powered{" "}
              <span className="gradient-text">Intelligent Drug</span>{" "}
              Dispensing
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Transform your pharmacy operations with intelligent prescription processing,
              automated dispensing, and real-time inventory management.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex items-center justify-center gap-4">
              <Link to="/auth">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="rounded-xl glow-primary px-8 h-12 text-base">
                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" variant="outline" className="rounded-xl px-8 h-12 text-base">
                  Learn More
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>

        {/* Features */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </div>
  );
}
