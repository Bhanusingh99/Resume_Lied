import { motion } from "framer-motion";
import { BookOpen, Cpu, FileText, Github, HelpCircle } from "lucide-react";

interface MobileNavItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

const MobileNavItem = ({ icon, title, description }: MobileNavItemProps) => (
  <a
    href="#"
    className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800 text-neutral-200 transition-all"
  >
    <span className="text-purple-400">{icon}</span>
    <div>
      <div className="text-sm font-medium">{title}</div>
      {description && (
        <div className="text-xs text-neutral-400">{description}</div>
      )}
    </div>
  </a>
);

export const MobileNav = () => {
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
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="md:hidden bg-neutral-900 border-t border-neutral-800"
      >
        <div className="px-4 py-6 space-y-6">
          <div className="space-y-4">
            <div className="font-medium text-neutral-400 uppercase text-xs tracking-wider">
              Features
            </div>
            {features.map((feature, index) => (
              <MobileNavItem key={index} {...feature} />
            ))}
          </div>

          <div className="space-y-4">
            <div className="font-medium text-neutral-400 uppercase text-xs tracking-wider">
              Resources
            </div>
            {resources.map((resource, index) => (
              <MobileNavItem key={index} {...resource} />
            ))}
          </div>

          <div className="space-y-3 pt-4">
            <button className="w-full px-4 py-2.5 bg-neutral-800 text-neutral-200 rounded-xl hover:bg-neutral-700 transition-colors text-sm font-medium">
              Sign in
            </button>
            <button className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all text-sm">
              Get Started
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};
