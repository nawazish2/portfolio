"use client";

import Navbar from "@/components/Navbar";
import { motion, type Variants } from "framer-motion";
import TiltedCard from "@/components/TiltedCard.jsx";
import { Space_Grotesk, Bebas_Neue } from "next/font/google";
import {
  GitHub,
  LinkedIn,
  Mail,
  X,
  ArrowDown,
  Code,
} from "@deemlol/next-icons";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Hero = () => {
  const socialLinks = [
    {
      href: "https://github.com/nawazish2",
      label: "GitHub",
      icon: GitHub,
      hoverColor:
        "hover:bg-[#333] hover:border-[#333] hover:text-white dark:hover:bg-white dark:hover:border-white dark:hover:text-black",
    },
    {
      href: "https://x.com/nawazish_khan1",
      label: "X",
      icon: X,
      hoverColor:
        "hover:bg-black hover:border-black hover:text-white dark:hover:bg-white dark:hover:border-white dark:hover:text-black",
    },
    {
      href: "https://www.linkedin.com/in/nawazishkhan8/",
      label: "LinkedIn",
      icon: LinkedIn,
      hoverColor: "hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white",
    },
    {
      href: "mailto:Knawazish153@gmail.com",
      label: "Email",
      icon: Mail,
      hoverColor: "hover:bg-sky-500 hover:border-sky-500 hover:text-white",
    },
  ];

  return (
    <div
      className={`${spaceGrotesk.className} relative min-h-screen bg-gray-100 dark:bg-[#131313] dark:text-[#EDE1DF] overflow-visible`}
      id="home"
    >
      <Navbar />

      {/* MAIN HERO */}
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-start gap-3 px-4 pb-16 pt-20 sm:px-6 md:pb-14 md:pt-18 lg:px-20 lg:justify-center lg:pb-10 lg:pt-20">
        <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* LEFT SIDE - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex w-full flex-col gap-4 lg:w-1/2"
          >
            {/* Status Badge */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 w-fit rounded-full border border-neutral-300 bg-white/50 px-3 py-1.5 text-xs font-medium text-neutral-600 backdrop-blur-md dark:border-white/10 dark:bg-black/20 dark:text-neutral-300 sm:text-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
              </span>
              Available for new opportunities
            </motion.div>

            <div>
              <motion.h1
                variants={itemVariants}
                className="mb-1 text-lg font-light text-neutral-700 dark:text-neutral-400 sm:text-xl"
              >
                Hi, I&apos;m{" "}
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Nawazish Khan
                </span>
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className={`text-4xl leading-[1.1] font-bold sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl ${bebasNeue.className} bg-linear-to-br from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-300 dark:to-neutral-600 bg-clip-text text-transparent`}
              >
                FULL STACK <br className="hidden sm:block" /> WEB DEVELOPER
              </motion.div>
            </div>

            <motion.p
              variants={itemVariants}
              className="max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base md:text-lg"
            >
              I craft digital experiences that combine stunning design with
              robust engineering. Specialized in building scalable, modern web
              applications using cutting-edge technologies.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={
                      social.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      social.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={social.label}
                    className={`group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white/50 text-neutral-600 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 sm:h-11 sm:w-11 ${social.hoverColor}`}
                  >
                    {Icon && <Icon size={18} />}
                  </a>
                );
              })}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="group relative flex w-fit items-center gap-2 overflow-hidden rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:scale-105 hover:shadow-xl dark:bg-white dark:text-neutral-900 sm:px-7 sm:py-3 sm:text-base"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <ArrowDown
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-y-1"
                  />
                </span>
                <div className="absolute inset-0 z-0 bg-linear-to-r from-neutral-800 to-neutral-950 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-neutral-200 dark:to-white"></div>
              </a>

              <a
                href="https://x.com/nawazish_khan1"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex w-fit items-center gap-2 overflow-hidden rounded-full border border-neutral-300 bg-white/50 px-5 py-2.5 text-sm font-medium text-neutral-700 backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl dark:border-white/20 dark:bg-black/30 dark:text-neutral-300 sm:px-7 sm:py-3 sm:text-base"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Connect on X
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - React Bits style tilted card */}
          <div className="relative flex w-full min-w-0 items-center justify-center lg:w-1/2 lg:justify-end">
            {/* Background Glow */}
            <div className="absolute h-[min(82vw,30rem)] w-[min(82vw,30rem)] rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/20" />

            {/* Main Glass Card */}
            <div className="relative w-full max-w-[min(92vw,520px)] overflow-hidden rounded-[28px] border border-black/10 bg-white/40 p-3 shadow-[0_10px_50px_rgba(0,0,0,0.08)] backdrop-blur-2xl transition-transform duration-300 dark:border-white/10 dark:bg-black/30 dark:shadow-[0_0_80px_rgba(255,255,255,0.03)] sm:rounded-[36px] sm:p-5 lg:p-6">
              {/* Center Glow Circle */}
              <div className="absolute left-1/2 top-1/2 h-[min(70vw,27rem)] w-[min(70vw,27rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-2xl dark:bg-blue-500/30" />

              {/* Decorative Dots */}
              <div className="absolute right-8 top-8 grid grid-cols-4 gap-2 opacity-30">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-1 w-1 rounded-full bg-black dark:bg-white"
                  />
                ))}
              </div>

              {/* Futuristic Circle Glow */}
              <div className="absolute left-1/2 top-1/2 h-[min(76vw,31rem)] w-[min(76vw,31rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/20 bg-blue-500/10 blur-3xl dark:border-blue-500/20 dark:bg-blue-500/20" />

              {/* Main Ring */}
              <div className="absolute left-1/2 top-1/2 h-[min(68vw,27rem)] w-[min(68vw,27rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/20 dark:border-blue-500/20" />

              {/* Inner Glow Ring */}
              <div className="absolute left-1/2 top-1/2 h-[min(56vw,23rem)] w-[min(56vw,23rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 dark:border-white/5" />

              {/* Light Beam */}
              <div className="absolute left-1/2 top-1/2 h-[min(76vw,31rem)] w-[min(76vw,31rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-b from-blue-500/10 via-transparent to-transparent blur-2xl dark:from-blue-500/20" />

              {/* Tilted Card */}
              <TiltedCard
                imageSrc="/profile.png"
                altText="Portfolio Preview"
                containerHeight="clamp(280px, 76vw, 500px)"
                containerWidth="min(100%, 500px)"
                imageHeight="clamp(240px, 65vw, 420px)"
                imageWidth="clamp(240px, 65vw, 420px)"
                rotateAmplitude={10}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent
                overlayContent={
                  <div className="relative h-full w-full">
                    {/* Top Badge */}
                    <div className="absolute md:left-4 left-7 top-[-20] z-20 rounded-full border border-black/10 bg-white/40 px-3 py-1.5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/40 sm:left-4 sm:top-4">
                      <p className="text-[11px] font-medium text-neutral-800 dark:text-white sm:text-xs">
                        Full Stack Developer
                      </p>
                    </div>

                    {/* Floating Skill Pills */}
                    <div className="absolute left-[6%] top-[56%] hidden rounded-full border border-black/10 bg-white/30 px-3 py-1.5 backdrop-blur-xl dark:border-white/10 dark:bg-black/40 sm:block lg:top-[40%]">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                        <span className="text-[10px] text-neutral-800 dark:text-white sm:text-xs">
                          React
                        </span>
                      </div>
                    </div>

                    <div className="absolute right-[7%] top-[62%] hidden rounded-full border border-black/10 bg-white/30 px-3 py-1.5 backdrop-blur-xl dark:border-white/10 dark:bg-black/40 sm:block lg:top-[60%]">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        <span className="text-[10px] text-neutral-800 dark:text-white sm:text-xs">
                          Node.js
                        </span>
                      </div>
                    </div>

                    <div className="absolute right-[5%] top-[32%] hidden rounded-full border border-black/10 bg-white/30 px-3 py-1.5 backdrop-blur-xl dark:border-white/10 dark:bg-black/40 sm:block lg:right-[1%] lg:top-[25%]">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        <span className="text-[10px] text-neutral-800 dark:text-white sm:text-xs">
                          TypeScript
                        </span>
                      </div>
                    </div>

                    {/* Bottom Skills Bar */}
                    {/* <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-4 rounded-full border border-black/10 bg-white/30 px-5 py-2 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        <span className="text-xs text-neutral-800 dark:text-white">
                          React
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-xs text-neutral-800 dark:text-white">
                          Node.js
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-purple-500" />
                        <span className="text-xs text-neutral-800 dark:text-white">
                          TypeScript
                        </span>
                      </div>
                    </div> */}
                  </div>
                }
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown
              size={16}
              className="text-neutral-500 dark:text-neutral-400"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
