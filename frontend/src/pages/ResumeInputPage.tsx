import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  Textarea,
  SectionCard,
  LoadingSpinner,
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.summary.trim()) {
      newErrors.summary = "Professional summary is required";
    }
    if (!formData.experience.trim()) {
      newErrors.experience = "Experience is required";
    }
    if (!formData.education.trim()) {
      newErrors.education = "Education is required";
    }
    if (!formData.skills.trim()) {
      newErrors.skills = "Skills are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    cleanResume(formData, {
      onSuccess: (response) => {
        setCleanedResume(response.cleanedResume);
        navigate("/preview");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Smart Resume Enhancer
          </h1>
          <p className="text-lg text-gray-600">
            Enter your resume details and let our AI clean and enhance them
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
          </SectionCard>

          <SectionCard title="Professional Summary">
            <Textarea
              label="Summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Write a brief professional summary about yourself..."
              error={errors.summary}
              required
              disabled={isPending}
              rows={3}
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
              rows={5}
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
              rows={4}
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
              rows={3}
            />
          </SectionCard>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isPending}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-95"
              }`}
            >
              {isPending ? "Cleaning Resume..." : "Clean Resume"}
            </button>
          </div>
        </form>

        {/* Loading State */}
        {isPending && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8">
              <LoadingSpinner message="Processing your resume..." />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
