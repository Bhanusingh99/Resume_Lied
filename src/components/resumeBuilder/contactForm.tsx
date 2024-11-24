import React from "react";
import { motion } from "framer-motion";
import InputField from "./inputField";

interface ContactFormData {
  firstName: string;
  lastName: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
}

interface ContactFormProps {
  formData: ContactFormData;
  setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>;
  onNext: () => void;
  currentStep: number;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  setFormData,
  onNext,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const inputFields = [
    {
      label: "First Name",
      name: "firstName",
      placeholder: "Bhanu",
      required: true,
    },
    {
      label: "Last Name",
      name: "lastName",
      placeholder: "Johnson",
      required: true,
    },
    {
      label: "City",
      name: "city",
      placeholder: "San Francisco",
      required: true,
    },
    {
      label: "Postal Code",
      name: "postalCode",
      placeholder: "94120",
      required: true,
    },
    {
      label: "Phone",
      name: "phone",
      type: "tel",
      placeholder: "+91",
      showCheckmark: true,
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "bhanusngh12345@gmail.com",
      showCheckmark: true,
      required: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-7xl mx-auto mt-10"
    >
      <div className="mb-8">
        <h2 className="text-3xl md:text-3xl lg:text-5xl mb-2">
          <span className="text-white font-bold">Please enter your </span>
          <span className="text-lime-500 font-bold">contact</span>
          <span className="text-white font-bold"> info</span>
        </h2>
        <p className="text-neutral-600 text-sm md:text-base">
          It allows employers to see how they can contact you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {inputFields.map((field) => (
            <InputField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              value={formData[field.name as keyof ContactFormData]}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              showCheckmark={field.showCheckmark}
              required={field.required}
            />
          ))}
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
