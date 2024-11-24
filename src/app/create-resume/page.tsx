"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import ContactForm from "@/components/resumeBuilder/contactForm";
import ExperienceForm from "@/components/resumeBuilder/experieceForm";

interface Step {
  id: string;
  label: string;
  isCompleted: boolean;
  isActive: boolean;
  component: React.ReactNode;
}

interface ContactFormData {
  firstName: string;
  lastName: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
}

const ResumeBuilder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [contactData, setContactData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",
  });
  const [experiences, setExperiences] = useState([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  function handleNext() {
    if (currentStep < steps.length - 1) {
      // Mark current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep((prev) => prev + 1);
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  const steps: Step[] = [
    {
      id: "contact",
      label: "Contact",
      isCompleted: completedSteps.includes(0),
      isActive: currentStep === 0,
      component: (
        <ContactForm
          formData={contactData}
          setFormData={setContactData}
          onNext={handleNext}
          currentStep={currentStep}
        />
      ),
    },
    {
      id: "experience",
      label: "Experience",
      isCompleted: completedSteps.includes(1),
      isActive: currentStep === 1,
      component: (
        <ExperienceForm
          experiences={experiences}
          //   @ts-expect-error dcdn
          setExperiences={setExperiences}
          onNext={handleNext}
          currentStep={currentStep}
        />
      ),
    },
    {
      id: "education",
      label: "Education",
      isCompleted: completedSteps.includes(2),
      isActive: currentStep === 2,
      component: <div className="text-white">Education Component</div>,
    },
    {
      id: "skills",
      label: "Skills",
      isCompleted: completedSteps.includes(3),
      isActive: currentStep === 3,
      component: <div className="text-white">Skills Component</div>,
    },
    {
      id: "about",
      label: "About",
      isCompleted: completedSteps.includes(4),
      isActive: currentStep === 4,
      component: <div className="text-white">About Component</div>,
    },
    {
      id: "finish",
      label: "Preview",
      isCompleted: completedSteps.includes(5),
      isActive: currentStep === 5,
      component: <div className="text-white">Final Resume Preview</div>,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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

  const getStepColor = (index: number) => {
    if (completedSteps.includes(index)) return "text-lime-500";
    if (index === currentStep) return "text-lime-500";
    return "text-neutral-500";
  };

  const getStepBgColor = (index: number) => {
    if (completedSteps.includes(index)) return "bg-lime-500";
    if (index === currentStep) return "bg-lime-500";
    return "bg-neutral-800 border border-neutral-700";
  };

  return (
    <div className="w-full pt-24 mx-auto px-4 relative h-screen overflow-y-scroll bg-neutral-900">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mb-6 max-w-7xl mx-auto"
      >
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="flex flex-col items-center"
              onClick={() =>
                completedSteps.includes(index) && setCurrentStep(index)
              }
              style={{
                cursor: completedSteps.includes(index) ? "pointer" : "default",
              }}
            >
              <div
                className={`w-4 h-4 max-sm:size-3 rounded-full relative z-10 ${getStepBgColor(
                  index
                )}`}
              >
                {completedSteps.includes(index) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </div>

              <span
                className={`text-sm max-sm:text-[10px] mt-2 font-medium ${getStepColor(
                  index
                )}`}
              >
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="w-full mx-auto">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            {steps[currentStep].component}
          </motion.div>

          <div className="flex justify-between mt-6 max-w-7xl mx-auto">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`px-4 py-2 text-white rounded transition-colors ${
                currentStep === 0
                  ? "bg-neutral-700 cursor-not-allowed"
                  : "bg-lime-500 hover:bg-lime-600"
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className={`px-4 py-2 text-white rounded transition-colors ${
                currentStep === steps.length - 1
                  ? "bg-neutral-700 cursor-not-allowed"
                  : "bg-lime-500 hover:bg-lime-600"
              }`}
            >
              Next to{" "}
              {currentStep < steps.length - 1
                ? steps[currentStep + 1].label
                : "Finish"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumeBuilder;
