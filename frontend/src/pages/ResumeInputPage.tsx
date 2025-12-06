// src/pages/ResumeInputPage.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Ensure you update your imports to reflect the revised components
import {
  TextInput,
  Textarea, // Assuming you have a Textarea component now
  SectionCard,
  LoadingSpinner, // Assuming you have a LoadingSpinner component
} from "../components";
import { useCleanResume } from "../hooks/useCleanResume";
import { useResumeContext } from "../context/useResumeContext";
import type { ResumeInputData } from "../services/api";

export const ResumeInputPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCleanedResume } = useResumeContext();
  const { mutate: cleanResume, isPending } = useCleanResume();

  const [formData, setFormData] = useState<ResumeInputData>({
    name: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Basic validation remains the same
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.summary.trim())
      newErrors.summary = "Professional Summary is required";
    if (!formData.experience.trim())
      newErrors.experience = "Work Experience is required";
    if (!formData.education.trim())
      newErrors.education = "Education is required";
    if (!formData.skills.trim()) newErrors.skills = "Skills are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    cleanResume(formData, {
      onSuccess: (response) => {
        setCleanedResume(response.cleanedResume);
        navigate("/preview");
      },
      // You might want to add onError handling here
    });
  };

  return (
    // Light gray background for a clean, professional look
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header - Mimicking BetterCV style with a blue accent */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Build your{" "}
            <span className="text-blue-600">professional resume</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Fill out the fields below and let our AI clean and enhance your
            resume.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <SectionCard title="Personal Information">
            <TextInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              error={errors.name}
              required
              disabled={isPending}
            />
            {/* You can add more personal fields here like Email, Phone, LinkedIn */}
          </SectionCard>

          <SectionCard title="Professional Summary">
            <Textarea
              label="Summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Write a brief professional summary..."
              error={errors.summary}
              required
              disabled={isPending}
              rows={4}
            />
          </SectionCard>

          <SectionCard title="Experience">
            <Textarea
              label="Work Experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="List your work experience with job titles, companies, and dates..."
              error={errors.experience}
              required
              disabled={isPending}
              rows={6}
            />
          </SectionCard>

          <SectionCard title="Education">
            <Textarea
              label="Education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="List your educational background, degrees, and institutions..."
              error={errors.education}
              required
              disabled={isPending}
              rows={5}
            />
          </SectionCard>

          <SectionCard title="Skills">
            <Textarea
              label="Skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="List your skills separated by commas or newlines..."
              error={errors.skills}
              required
              disabled={isPending}
              rows={4}
            />
          </SectionCard>

          {/* Submit Button - Using the primary blue color */}
          <div className="flex pt-4 justify-center">
            <button
              type="submit"
              disabled={isPending}
              className={`w-full sm:w-1/2 md:w-1/3 py-3 px-6 rounded-lg font-bold text-white transition-all duration-200 shadow-md ${
                isPending
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-300"
              }`}
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Cleaning Resume...
                </div>
              ) : (
                "Clean and Enhance Resume"
              )}
            </button>
          </div>
        </form>

        {/* Loading State - Replaced the fixed overlay with a more central spinner (assuming LoadingSpinner is provided) */}
        {isPending && (
          <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
            <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-2xl border border-blue-200">
              <LoadingSpinner message="Processing your resume..." />
              <p className="mt-4 text-lg font-medium text-gray-700">
                Enhancing your details with AI...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Note: Ensure your LoadingSpinner component accepts a 'message' prop and renders a visible spinner.
// I have assumed the Textarea and LoadingSpinner components exist in your components directory.
