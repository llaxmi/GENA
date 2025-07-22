"use client";

import { HeroProps } from "@/components/definations";
import { motion } from "framer-motion";
import Link from "next/link";
import { SparklesText } from "./hero-text";
import { Button } from "./ui/button";

export function HeroSection({ title, description, actions }: HeroProps) {
  return (
    <section className="text-left space-y-8">
      {/* Title and GENA branding with enhanced animations */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative">
          <SparklesText
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            text={title}
            colors={{ first: "#3B82F6", second: "#8B5CF6" }}
            sparklesCount={15}
          />
        </div>

        {/* Enhanced GENA branding with gradient and glow */}
        <motion.div
          className="relative inline-block"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="absolute inset-0 blur-xl opacity-30 rounded-lg" />
          <h2 className="relative text-5xl md:text-6xl lg:text-7xl font-bold  bg-clip-text text-blue-800 font-secondary">
            GENA
          </h2>
        </motion.div>
      </motion.div>

      {/* Enhanced Description with animation */}
      <motion.p
        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {description}
      </motion.p>

      {actions.map((action, index) => (
        <motion.div key={index} className="relative group">
          <Button>
            <Link
              href={action.href}
              className="flex items-center gap-3 text-lg px-8 py-4 font-semibold"
            >
              {action.icon}
              {action.text}
            </Link>
          </Button>
        </motion.div>
      ))}
    </section>
  );
}
