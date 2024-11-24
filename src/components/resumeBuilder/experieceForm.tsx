import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, ChevronDown, Trash2, Plus, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Experience {
  id: string;
  jobTitle: string;
  employer: string;
  startDate: string;
  endDate: string;
  city: string;
  employmentType: string;
  currentlyWork: boolean;
  description: string;
  highlights: string[];
  isValid: boolean;
}

interface ExperienceFormProps {
  experiences: Experience[];
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
}

// const employmentTypes = ["Full-time", "Part-time", "Contract", "Internship"];

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experiences,
  setExperiences,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // const [currentHighlight, setCurrentHighlight] = useState<string>("");

  const validateExperience = (exp: Experience): boolean => {
    return !!(
      exp.jobTitle &&
      exp.employer &&
      exp.startDate &&
      (exp.currentlyWork || exp.endDate) &&
      exp.description
    );
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      jobTitle: "",
      employer: "",
      startDate: "",
      endDate: "",
      city: "",
      employmentType: "Full-time",
      currentlyWork: false,
      description: "",
      highlights: [],
      isValid: false,
    };
    setExperiences([newExperience, ...experiences]);
    setExpandedId(newExperience.id);
  };

  const updateExperience = <T extends keyof Experience>(
    id: string,
    field: T,
    value: Experience[T]
  ) => {
    setExperiences(
      experiences.map((exp) => {
        if (exp.id === id) {
          const updatedExp = { ...exp, [field]: value };
          updatedExp.isValid = validateExperience(updatedExp);
          return updatedExp;
        }
        return exp;
      })
    );
  };

  const ExperienceCard = ({ experience }: { experience: Experience }) => {
    const isExpanded = expandedId === experience.id;

    return (
      <Card className="bg-neutral-900 border border-neutral-800">
        <div
          className="p-4 cursor-pointer"
          onClick={() => setExpandedId(isExpanded ? null : experience.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-neutral-100">
                  {experience.jobTitle || "(Not specified)"}
                </h3>
                {experience.isValid && (
                  <Badge className="bg-green-500/10 text-green-500">
                    <Check className="w-3 h-3 mr-1" />
                    Complete
                  </Badge>
                )}
              </div>
              <p className="text-sm text-neutral-400">
                {[experience.employer, experience.city]
                  .filter(Boolean)
                  .join(" • ")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExperiences(
                    experiences.filter((e) => e.id !== experience.id)
                  );
                }}
                className="p-2 text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-neutral-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-neutral-400" />
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      value={experience.jobTitle}
                      onChange={(e) =>
                        updateExperience(
                          experience.id,
                          "jobTitle",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100"
                      placeholder="e.g. Senior Software Engineer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Employer *
                    </label>
                    <input
                      type="text"
                      value={experience.employer}
                      onChange={(e) =>
                        updateExperience(
                          experience.id,
                          "employer",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100"
                      placeholder="e.g. Google"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={experience.startDate}
                      onChange={(e) =>
                        updateExperience(
                          experience.id,
                          "startDate",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100"
                    />
                  </div>

                  {!experience.currentlyWork && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        End Date *
                      </label>
                      <input
                        type="date"
                        value={experience.endDate}
                        onChange={(e) =>
                          updateExperience(
                            experience.id,
                            "endDate",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id={`currentWork-${experience.id}`}
                    checked={experience.currentlyWork}
                    onChange={(e) =>
                      updateExperience(
                        experience.id,
                        "currentlyWork",
                        e.target.checked
                      )
                    }
                    className="rounded border-neutral-600 bg-neutral-800 text-lime-500"
                  />
                  <label className="text-sm text-neutral-300">
                    I currently work here
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={experience.description}
                    onChange={(e) =>
                      updateExperience(
                        experience.id,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Describe your role, responsibilities, and achievements..."
                    className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100 min-h-[150px] resize-y"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    );
  };

  return (
    <div className="w-full my-10 shadow-lg rounded-lg max-sm:px-4 max-sm:py-2.5 bg-neutral-800/50 border border-neutral-700 p-6 mx-auto space-y-6">
      <div>
        <h2 className="text-3xl md:text-3xl lg:text-5xl text-white font-bold">
          <span className="text-lime-400">Professional</span> Experience
        </h2>
        <p className="text-neutral-400 mt-1">
          Add your most recent work experience first
        </p>
      </div>

      <div className="space-y-4">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>

      <button
        onClick={addExperience}
        className="flex items-center gap-2 text-lime-400 px-4 py-2 bg-neutral-800 rounded-md border border-neutral-700"
      >
        <Plus className="w-4 h-4" />
        Add Experience
      </button>
    </div>
  );
};

export default ExperienceForm;
