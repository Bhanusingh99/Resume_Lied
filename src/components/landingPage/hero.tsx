"use client";
import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import {
  ArrowRight,
  Github,
  FileText,
  Cpu,
  Globe,
  Sparkles,
  ChevronRight,
  Star,
  Award,
  Users,
  Zap,
} from "lucide-react";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const features = [
    {
      icon: <Cpu className="w-4 h-4 md:w-5 md:h-5" />,
      text: "AI-Powered Generation",
      description: "Smart resume creation using GPT technology",
    },
    {
      icon: <Github className="w-4 h-4 md:w-5 md:h-5" />,
      text: "GitHub Integration",
      description: "Sync projects directly from your repositories",
    },
    {
      icon: <FileText className="w-4 h-4 md:w-5 md:h-5" />,
      text: "ATS-Friendly Format",
      description: "95% success rate with ATS systems",
    },
    {
      icon: <Globe className="w-4 h-4 md:w-5 md:h-5" />,
      text: "Multi-Language Support",
      description: "Available in 30+ languages",
    },
  ];

  const statistics = [
    {
      icon: <Users className="w-5 h-5 text-lime-500" />,
      value: "100K+",
      label: "Happy Users",
    },
    {
      icon: <Star className="w-5 h-5 text-lime-500" />,
      value: "4.9/5",
      label: "User Rating",
    },
    {
      icon: <Award className="w-5 h-5 text-lime-500" />,
      value: "95%",
      label: "Success Rate",
    },
    {
      icon: <Zap className="w-5 h-5 text-lime-500" />,
      value: "2M+",
      label: "Resumes Created",
    },
  ];

  return (
    <>
      <Head>
        <title>
          AI Resume Builder | Create Professional ATS-Friendly Resumes
        </title>
        <meta
          name="description"
          content="Transform your career with our AI-powered resume builder. Create professional, ATS-friendly resumes tailored to your dream job using advanced GPT technology."
        />
      </Head>

      <div className="relative min-h-screen bg-neutral-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 w-64 md:w-96 h-64 md:h-96 bg-lime-500/10 rounded-full blur-3xl"
        />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-16 md:pb-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col items-center text-center space-y-6 md:space-y-10">
              <motion.div variants={itemVariants} className="relative">
                <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-neutral-800/80 border border-neutral-700/50 backdrop-blur-xl">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-lime-400" />
                    <span className="text-lime-400 text-xs md:text-sm font-semibold">
                      New
                    </span>
                  </span>
                  <span className="text-neutral-300 text-xs md:text-sm">
                    GPT-Powered Resume Generation
                  </span>
                  <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-neutral-400" />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight">
                  Craft Your Perfect Resume
                  <br />
                  <span className="text-lime-500">Powered by AI</span>
                </h1>
                <p className="max-w-2xl mx-auto text-neutral-300 text-base sm:text-lg md:text-xl leading-relaxed">
                  Create professional, ATS-friendly resumes tailored to your
                  dream job using advanced GPT technology. Stand out with
                  LaTeX-formatted perfection.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto"
              >
                <motion.button className="px-6 sm:px-8 py-3 sm:py-4 bg-lime-600  text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg w-full sm:w-auto">
                  <span className="text-sm sm:text-base">
                    Start Building Free
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>

                <button className="px-6 sm:px-8 py-3 sm:py-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-semibold transition-all border border-neutral-700 text-sm sm:text-base w-full sm:w-auto">
                  View Templates
                </button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-8"
              >
                {statistics.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 bg-neutral-800/30 rounded-xl border border-neutral-700/30 backdrop-blur-sm"
                  >
                    {stat.icon}
                    <span className="text-2xl font-bold text-white mt-2">
                      {stat.value}
                    </span>
                    <span className="text-sm text-neutral-400">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full max-w-4xl"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col gap-2 bg-neutral-800/50 hover:bg-neutral-800/70 rounded-xl p-4 border border-neutral-700/50 backdrop-blur-sm transition-all"
                  >
                    <span className="text-lime-400">{feature.icon}</span>
                    <span className="text-neutral-200 font-medium">
                      {feature.text}
                    </span>
                    <span className="text-neutral-400 text-sm">
                      {feature.description}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
