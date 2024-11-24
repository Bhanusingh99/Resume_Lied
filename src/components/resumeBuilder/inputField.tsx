import React from "react";
import { Check } from "lucide-react";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  showCheckmark?: boolean;
  required?: boolean;
}

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  showCheckmark = false,
  required = false,
}: InputFieldProps) => {
  return (
    <div className="space-y-2 w-full">
      <label className="block text-sm font-medium text-neutral-600">
        {label.toUpperCase()}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-2.5 rounded-lg border bg-neutral-800 border-neutral-700 
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                   outline-none transition-all text-sm md:text-base
                   placeholder:text-neutral-400"
          placeholder={placeholder}
        />
        {showCheckmark && value && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-500 p-1 rounded-lg">
            <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
