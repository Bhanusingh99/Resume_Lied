"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import {
  Menu,
  X,
  ChevronDown,
  Cpu,
  FileText,
  Github,
  BookOpen,
  Settings,
  HelpCircle,
} from "lucide-react";
import { MobileNav } from "./mobileNavbar";
import { FaBrain } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Cpu className="w-4 h-4" />,
      title: "AI Generation",
      description: "Create ATS-friendly resumes",
    },
    {
      icon: <Github className="w-4 h-4" />,
      title: "GitHub Integration",
      description: "Import your projects",
    },
    {
      icon: <FileText className="w-4 h-4" />,
      title: "Templates",
      description: "Professional designs",
    },
  ];

  const resources = [
    {
      icon: <BookOpen className="w-4 h-4" />,
      title: "Documentation",
      description: "Learn how to use",
    },
    {
      icon: <HelpCircle className="w-4 h-4" />,
      title: "Help Center",
      description: "Get support",
    },
    {
      icon: <Settings className="w-4 h-4" />,
      title: "API Access",
      description: "Developer resources",
    },
  ];

  return (
    <>
      <Head>
        <title>ResumAI - AI-Powered Resume Builder</title>
        <meta
          name="description"
          content="Create professional resumes with AI-powered tools, templates, and GitHub integration."
        />
      </Head>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-800/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex-shrink-0">
              <span className=" font-bold text-lime-500">
                <FaBrain size={32} />
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("features")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-neutral-200 hover:text-lime-500 transition-colors">
                  Features
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {activeDropdown === "features" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-64 rounded-xl bg-neutral-800/50 border border-neutral-700/50 shadow-xl backdrop-blur-sm"
                    >
                      <div className="p-2">
                        {features.map((feature, index) => (
                          <motion.a
                            key={index}
                            href="#"
                            whileHover={{ x: 4 }}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-700/50 transition-colors"
                          >
                            <span className="mt-0.5 text-lime-400">
                              {feature.icon}
                            </span>
                            <div>
                              <div className="text-sm font-medium text-neutral-200">
                                {feature.title}
                              </div>
                              <div className="text-xs text-neutral-400">
                                {feature.description}
                              </div>
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("resources")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-neutral-200 hover:text-lime-500 transition-colors">
                  Resources
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {activeDropdown === "resources" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-64 rounded-xl bg-neutral-800/50 border border-neutral-700/50 shadow-xl backdrop-blur-sm"
                    >
                      <div className="p-2">
                        {resources.map((resource, index) => (
                          <motion.a
                            key={index}
                            href="#"
                            whileHover={{ x: 4 }}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-700/50 transition-colors"
                          >
                            <span className="mt-0.5 text-lime-400">
                              {resource.icon}
                            </span>
                            <div>
                              <div className="text-sm font-medium text-neutral-200">
                                {resource.title}
                              </div>
                              <div className="text-xs text-neutral-400">
                                {resource.description}
                              </div>
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#"
                className="text-neutral-200 hover:text-lime-500 transition-colors"
              >
                Pricing
              </a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="text-neutral-200 hover:text-lime-500 transition-colors">
                Sign in
              </button>
              <button className="px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white rounded-xl font-medium transition-all">
                Get Started
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-neutral-200 hover:text-lime-500 transition-colors"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>{isMobileMenuOpen && <MobileNav />}</AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
