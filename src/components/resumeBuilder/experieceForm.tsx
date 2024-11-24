import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Trash2, Plus } from "lucide-react";
import InputField from "./inputField";

interface Experience {
  id: string;
  jobTitle: string;
  employer: string;
  startDate: string;
  endDate: string;
  city: string;
  currentlyWork: boolean;
  description: string;
}

interface ExperienceFormProps {
  experiences: Experience[];
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experiences,
  setExperiences,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      jobTitle: "",
      employer: "",
      startDate: "",
      endDate: "",
      city: "",
      currentlyWork: false,
      description: "",
    };
    setExperiences([newExperience, ...experiences]);
    setExpandedId(newExperience.id);
  };

  const deleteExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const updateExperience = <T extends keyof Experience>(
    id: string,
    field: T,
    value: Experience[T]
  ) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const ExperienceCard = ({ experience }: { experience: Experience }) => {
    const isExpanded = expandedId === experience.id;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full bg-neutral-800/80 rounded-xl shadow-sm border border-neutral-700 overflow-hidden"
      >
        <div
          className="flex items-center justify-between p-4 cursor-pointer "
          onClick={() => toggleExpanded(experience.id)}
        >
          <div className="flex-1">
            <h3 className="font-medium text-neutral-400">
              {experience.jobTitle || "(Not specified)"}
            </h3>
            <p className="text-sm text-neutral-600">
              {experience.employer
                ? `${experience.employer}${
                    experience.city ? `, ${experience.city}` : ""
                  }`
                : "Unknown - Unknown"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteExperience(experience.id);
              }}
              className="p-2  rounded-lg text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-neutral-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-neutral-500" />
            )}
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
              <div className="p-4 pt-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Job Title"
                    name="jobTitle"
                    value={experience.jobTitle}
                    onChange={(e) =>
                      updateExperience(
                        experience.id,
                        "jobTitle",
                        e.target.value
                      )
                    }
                    placeholder="e.g. Software Engineer"
                    required
                  />
                  <InputField
                    label="Employer"
                    name="employer"
                    value={experience.employer}
                    onChange={(e) =>
                      updateExperience(
                        experience.id,
                        "employer",
                        e.target.value
                      )
                    }
                    placeholder="e.g. Google"
                    required
                  />
                  <InputField
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={experience.startDate}
                    onChange={(e) =>
                      updateExperience(
                        experience.id,
                        "startDate",
                        e.target.value
                      )
                    }
                    required
                  />
                  {!experience.currentlyWork && (
                    <InputField
                      label="End Date"
                      name="endDate"
                      type="date"
                      value={experience.endDate}
                      onChange={(e) =>
                        updateExperience(
                          experience.id,
                          "endDate",
                          e.target.value
                        )
                      }
                      required
                    />
                  )}
                  <InputField
                    label="City"
                    name="city"
                    value={experience.city}
                    onChange={(e) =>
                      updateExperience(experience.id, "city", e.target.value)
                    }
                    placeholder="e.g. San Francisco"
                  />
                </div>

                <div className="flex items-center gap-2">
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
                    className="rounded border-neutral-300 text-lime-500 focus:ring-blue-500/20"
                  />
                  <label
                    htmlFor={`currentWork-${experience.id}`}
                    className="text-sm text-neutral-700"
                  >
                    I currently work here
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700">
                    DESCRIPTION
                  </label>
                  <div className="border border-neutral-200 rounded-xl overflow-hidden">
                    <div className="border-b border-neutral-200 p-2 flex gap-2">
                      <button className="p-1.5 hover:bg-neutral-100 rounded">
                        <span className="font-bold">B</span>
                      </button>
                      <button className="p-1.5 hover:bg-neutral-100 rounded">
                        <span className="italic">I</span>
                      </button>
                      <button className="p-1.5 hover:bg-neutral-100 rounded">
                        <span className="underline">U</span>
                      </button>
                    </div>
                    <textarea
                      value={experience.description}
                      onChange={(e) =>
                        updateExperience(
                          experience.id,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Write your work experience..."
                      className="w-full p-4 min-h-[200px] outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-white md:text-3xl lg:text-5xl font-bold">
            <span className="text-lime-400">Tell us</span> about your experience
          </h2>
          <p className="text-neutral-600 text-sm md:text-base mt-1">
            Start with your recent job
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </AnimatePresence>
      </div>

      <button
        onClick={addExperience}
        className="flex items-center gap-2 text-lime-400 px-4 py-2 bg-neutral-800 rounded-md border border-neutral-700"
      >
        <Plus className="w-4 h-4" />
        Add Employment
      </button>

      <p className="text-sm text-neutral-600">
        In this section, list related employment experience in your last 10
        years along with the dates. Mention the most recent employment first.
      </p>
    </div>
  );
};

export default ExperienceForm;
