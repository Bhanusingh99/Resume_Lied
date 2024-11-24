import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, ChevronDown, Trash2, Plus, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Education {
  id: string;
  school: string;
  degree: string;
  graduationDate: string;
  city: string;
  description: string;
  isValid: boolean;
}

interface EducationFormProps {
  educations: Education[];
  setEducations: React.Dispatch<React.SetStateAction<Education[]>>;
}

const DEGREE_OPTIONS = [
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctoral Degree",
  "High School Diploma",
  "Professional Certificate",
  "Other",
];

const EducationForm: React.FC<EducationFormProps> = ({
  educations,
  setEducations,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const validateEducation = (edu: Education): boolean => {
    return !!(
      edu.school &&
      edu.degree &&
      edu.graduationDate &&
      edu.description
    );
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: "",
      degree: "",
      graduationDate: "",
      city: "",
      description: "",
      isValid: false,
    };
    setEducations([newEducation, ...educations]);
    setExpandedId(newEducation.id);
  };

  const updateEducation = <T extends keyof Education>(
    id: string,
    field: T,
    value: Education[T]
  ) => {
    setEducations(
      educations.map((edu) => {
        if (edu.id === id) {
          const updatedEdu = { ...edu, [field]: value };
          updatedEdu.isValid = validateEducation(updatedEdu);
          return updatedEdu;
        }
        return edu;
      })
    );
  };

  const EducationCard = ({ education }: { education: Education }) => {
    const isExpanded = expandedId === education.id;

    return (
      <Card className="bg-neutral-900 border border-neutral-800">
        <div
          className="p-4 cursor-pointer"
          onClick={() => setExpandedId(isExpanded ? null : education.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-neutral-100">
                  {education.school || "(Not specified)"}
                </h3>
                {education.isValid && (
                  <Badge className="bg-green-500/10 text-green-500">
                    <Check className="w-3 h-3 mr-1" />
                    Complete
                  </Badge>
                )}
              </div>
              <p className="text-sm text-neutral-400">
                {[education.degree, education.city].filter(Boolean).join(" • ")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEducations(
                    educations.filter((e) => e.id !== education.id)
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
                      School *
                    </label>
                    <input
                      type="text"
                      value={education.school}
                      onChange={(e) =>
                        updateEducation(education.id, "school", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100"
                      placeholder="e.g. Harvard University"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Degree *
                    </label>
                    <select
                      value={education.degree}
                      onChange={(e) =>
                        updateEducation(education.id, "degree", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100 appearance-none"
                    >
                      <option value="">Select degree</option>
                      {DEGREE_OPTIONS.map((degree) => (
                        <option key={degree} value={degree}>
                          {degree}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Graduation Date *
                    </label>
                    <input
                      type="date"
                      value={education.graduationDate}
                      onChange={(e) =>
                        updateEducation(
                          education.id,
                          "graduationDate",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={education.city}
                      onChange={(e) =>
                        updateEducation(education.id, "city", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-100"
                      placeholder="e.g. Cambridge"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={education.description}
                    onChange={(e) =>
                      updateEducation(
                        education.id,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Describe your educational experience, achievements, and relevant coursework..."
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
          <span className="text-lime-400">Educational</span> Background
        </h2>
        <p className="text-neutral-400 mt-1">
          Add your most recent education first
        </p>
      </div>

      <div className="space-y-4">
        {educations.map((education) => (
          <EducationCard key={education.id} education={education} />
        ))}
      </div>

      <button
        onClick={addEducation}
        className="flex items-center gap-2 text-lime-400 px-4 py-2 bg-neutral-800 rounded-md border border-neutral-700"
      >
        <Plus className="w-4 h-4" />
        Add Education
      </button>
    </div>
  );
};

export default EducationForm;
