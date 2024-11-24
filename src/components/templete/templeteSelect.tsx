"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Template {
  id: string;
  name: string;
  imageUrl: string;
  label?: string;
  isPremium?: boolean;
}

const templates: Template[] = [
  {
    id: "sydney",
    name: "Sydney",
    imageUrl: "/api/placeholder/400/600",
  },
  {
    id: "rotterdam",
    name: "Rotterdam",
    imageUrl: "/api/placeholder/400/600",
    isPremium: true,
  },
  {
    id: "budapest",
    name: "Budapest",
    imageUrl: "/api/placeholder/400/600",
    label: "Most Selected",
  },
  {
    id: "chicago",
    name: "Chicago",
    imageUrl: "/api/placeholder/400/600",
    isPremium: true,
  },
  {
    id: "riga",
    name: "Riga",
    imageUrl: "/api/placeholder/400/600",
  },
];

const TemplateSelect: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 3;

  const handlePrevious = () => {
    setStartIndex(Math.max(0, startIndex - 1));
  };

  const handleNext = () => {
    setStartIndex(Math.min(templates.length - itemsToShow, startIndex + 1));
  };

  const handleSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    localStorage.setItem("selectedTemplate", templateId);
  };

  const handleSkip = () => {
    const defaultTemplate = "budapest";
    setSelectedTemplate(defaultTemplate);
    localStorage.setItem("selectedTemplate", defaultTemplate);
  };

  useEffect(() => {
    const savedTemplate = localStorage.getItem("selectedTemplate");
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }
  }, []);

  return (
    <div className="w-full my-10 shadow-lg rounded-lg max-sm:px-4 max-sm:py-2.5 bg-neutral-800/50  p-6 mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-3xl lg:text-5xl text-white font-bold mb-4">
          Select Your <span className="text-lime-400">Template</span>
        </h2>
        <p className="text-neutral-400">
          To get started, select a resume template below.
        </p>
        <Button
          variant="link"
          onClick={handleSkip}
          className="text-blue-500 hover:text-blue-400 mt-2"
        >
          Skip this step
        </Button>
      </div>

      <div className="relative">
        <div className="flex justify-center items-center gap-6">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={startIndex === 0}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <div className="flex gap-6 overflow-hidden">
            {templates
              .slice(startIndex, startIndex + itemsToShow)
              .map((template) => (
                <Card
                  key={template.id}
                  className={`relative w-80 cursor-pointer transform transition-all duration-200 ${
                    selectedTemplate === template.id
                      ? "ring-2 ring-lime-400 scale-105"
                      : "hover:scale-105"
                  }`}
                  onClick={() => handleSelect(template.id)}
                >
                  <div className="relative">
                    <img
                      src={template.imageUrl}
                      alt={template.name}
                      className="w-full h-[500px] object-cover rounded-t-lg"
                    />
                    {template.label && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                          {template.label}
                        </span>
                      </div>
                    )}
                    {template.isPremium && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                          Premium
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-neutral-900 rounded-b-lg">
                    <h3 className="text-lg font-semibold text-neutral-100">
                      {template.name}
                    </h3>
                  </div>
                </Card>
              ))}
          </div>

          <Button
            variant="ghost"
            onClick={handleNext}
            disabled={startIndex >= templates.length - itemsToShow}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelect;
