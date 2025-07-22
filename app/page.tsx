"use client";

import { HeroSection } from "@/components/hero-section";
import { Icons } from "@/components/icons";
import AuthModal from "@/components/sign-up";
import { Button } from "@/components/ui/button";
import FooterSection from "@/features/footer-section";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const handleGetStartedClick = () => {
    setShowModal(true);
  };

  const handleSignInClick = () => {
    setShowModal(true);
  };

  return (
    <>
      {/* Main hero section with split layout */}
      <div className="min-h-screen flex relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-white" />

        {/* Left side - Hero content */}
        <motion.div
          className="flex-1 flex items-center justify-center relative z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-2xl px-8">
            <HeroSection
              title="Your AI Study Assistant"
              description="Enhance your learning experience with AI-driven insights and personalized content. GENA helps you master topics faster with personalized content and smart insights."
              actions={[
                {
                  text: "GitHub",
                  href: "https://github.com/llaxmi/gena",
                  icon: <Icons.gitHub className="h-5 w-5" />,
                },
              ]}
            />
          </div>
        </motion.div>

        <motion.div
          className="flex-1 flex items-center justify-center relative z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="w-full max-w-md mx-8 p-8 backdrop-blur-xl bg-white/70 border border-white/20 rounded-3xl shadow-2xl ">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.h2
                className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Welcome to GENA
              </motion.h2>
              <motion.p
                className="text-gray-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Join thousands of learners improving their studies
              </motion.p>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {/* Enhanced primary button */}
              <Button
                onClick={handleGetStartedClick}
                className="relative w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 shadow-lg "
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  ✨ Sign up for free
                </motion.span>
              </Button>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleSignInClick}
                  variant="outline"
                  className="w-full h-14 text-lg font-semibold border-2 border-blue-200 text-blue-700 hover:text-blue-800 hover:bg-blue-50 hover:border-blue-300 rounded-xl transition-all duration-300 backdrop-blur-sm"
                >
                  Sign in
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced features highlight */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 rounded-full border border-green-200 ">
                <span className="text-green-600  text-sm font-medium">
                  ✨ Free forever plan available
                </span>
              </div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="mt-6 flex justify-center space-x-6 opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <span>🔒</span>
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <span>⚡</span>
                <span>Fast</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <span>🚀</span>
                <span>Modern</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Modal for authentication */}
      {showModal && (
        <AuthModal showModal={showModal} onClose={() => setShowModal(false)} />
      )}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <FooterSection />
      </motion.div>
    </>
  );
}
