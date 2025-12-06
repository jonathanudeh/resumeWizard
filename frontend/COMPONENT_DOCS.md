# Smart Resume Enhancer - Component & Hook Documentation

## 📚 Components

### TextInput Component

**File:** `src/components/TextInput.tsx`

A reusable text input field with validation support.

**Props:**

```typescript
interface TextInputProps {
  label: string; // Input label text
  name: string; // Input name attribute
  value: string; // Current input value
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; // Placeholder text
  error?: string; // Error message to display
  required?: boolean; // Show required indicator
  disabled?: boolean; // Disable input
}
```

**Usage:**

```tsx
<TextInput
  label="Full Name"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="John Doe"
  error={errors.name}
  required
/>
```

---

### Textarea Component

**File:** `src/components/Textarea.tsx`

A reusable textarea field for longer text input.

**Props:**

```typescript
interface TextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number; // Number of visible rows (default: 4)
}
```

**Usage:**

```tsx
<Textarea
  label="Work Experience"
  name="experience"
  value={formData.experience}
  onChange={handleChange}
  placeholder="Enter your experience..."
  rows={5}
/>
```

---

### SectionCard Component

**File:** `src/components/SectionCard.tsx`

A card wrapper component for organizing form sections.

**Props:**

```typescript
interface SectionCardProps {
  title: string; // Card title
  children: React.ReactNode;
}
```

**Usage:**

```tsx
<SectionCard title="Personal Information">
  <TextInput ... />
</SectionCard>
```

---

### LoadingSpinner Component

**File:** `src/components/LoadingSpinner.tsx`

An animated loading spinner with optional message.

**Props:**

```typescript
interface LoadingSpinnerProps {
  message?: string; // Optional loading message
}
```

**Usage:**

```tsx
<LoadingSpinner message="Processing your resume..." />
```

---

### PdfViewer Component

**File:** `src/components/PdfViewer.tsx`

An iframe-based PDF viewer for preview.

**Props:**

```typescript
interface PdfViewerProps {
  pdfUrl: string; // URL or data URL of PDF
  title?: string; // Component title (default: "PDF Preview")
}
```

**Usage:**

```tsx
<PdfViewer pdfUrl="data:application/pdf;base64,..." title="Your Resume" />
```

---

## 🎣 Custom Hooks

### useCleanResume Hook

**File:** `src/hooks/useCleanResume.ts`

React Query mutation hook for cleaning resumes via backend API.

**Returns:**

```typescript
UseMutationResult<CleanResumeResponse, Error, ResumeInputData>;
```

**Properties:**

- `mutate(data)`: Function to trigger the mutation
- `isPending`: Boolean indicating if request is in progress
- `isError`: Boolean indicating if request failed
- `error`: Error object if request failed
- `data`: Response data from successful request

**Usage:**

```tsx
const { mutate: cleanResume, isPending } = useCleanResume();

const handleSubmit = (formData: ResumeInputData) => {
  cleanResume(formData, {
    onSuccess: (response) => {
      setCleanedResume(response.cleanedResume);
      navigate("/preview");
    },
  });
};
```

**Features:**

- Automatic error handling with toast notifications
- Success notifications on completion
- Automatic retry logic
- Request caching via React Query

---

### useGeneratePdf Hook

**File:** `src/hooks/useGeneratePdf.ts`

React Query mutation hook for generating PDF resumes.

**Returns:**

```typescript
UseMutationResult<GeneratePdfResponse, Error, GeneratePdfRequest>;
```

**Properties:**

- `mutate(data)`: Function to trigger PDF generation
- `isPending`: Boolean indicating if request is in progress
- `isError`: Boolean indicating if request failed
- `error`: Error object if request failed
- `data`: Response data with PDF information

**Usage:**

```tsx
const { mutate: generatePdf, isPending } = useGeneratePdf();

const handleGeneratePdf = () => {
  generatePdf(
    { cleanedResume, template: selectedTemplate },
    {
      onSuccess: (response) => {
        navigate("/result", { state: { pdfData: response.pdfData } });
      },
    }
  );
};
```

---

### useResumeContext Hook

**File:** `src/context/useResumeContext.ts`

Hook for accessing global resume context.

**Returns:**

```typescript
{
  cleanedResume: CleanedResume | null;
  setCleanedResume: (resume: CleanedResume | null) => void;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  pdfUrl: string | null;
  setPdfUrl: (url: string | null) => void;
}
```

**Usage:**

```tsx
import { useResumeContext } from "../context/useResumeContext";

export const MyComponent = () => {
  const { cleanedResume, selectedTemplate, setSelectedTemplate } =
    useResumeContext();

  return (
    <div>
      <h1>{cleanedResume?.name}</h1>
      <p>Selected: {selectedTemplate}</p>
    </div>
  );
};
```

---

## 📄 Pages

### ResumeInputPage

**File:** `src/pages/ResumeInputPage.tsx`
**Route:** `/`

Main form page for resume input.

**Features:**

- Form validation for all fields
- Real-time error clearing
- Loading state with spinner
- Sends data to backend for cleaning
- Navigates to preview page on success

**State Management:**

- Local form state for inputs
- Error state for validation messages
- Uses `useCleanResume` hook for API calls
- Uses `useResumeContext` to store cleaned resume

---

### ResumePreviewPage

**File:** `src/pages/ResumePreviewPage.tsx`
**Route:** `/preview`

Display cleaned resume and template selection.

**Features:**

- Display formatted cleaned resume data
- Template selector with 3 options (Classic, Modern, Minimal)
- Generate PDF button
- Back button to return to input
- Displays cleaned data as formatted sections

**State Management:**

- Uses `useResumeContext` to access cleaned resume
- Uses `useGeneratePdf` hook for PDF generation
- Manages template selection

---

### PdfResultPage

**File:** `src/pages/PdfResultPage.tsx`
**Route:** `/result`

Final page with PDF download.

**Features:**

- Display PDF preview in iframe
- Download button for PDF file
- Success message
- Option to start over
- Uses location state to receive PDF data

**State Management:**

- Local state for PDF data and download URL
- Effects to process PDF data from router state
- Uses `useResumeContext` to store PDF URL

---

## 🔗 API Services

### apiService

**File:** `src/services/api.ts`

Centralized API client and service functions.

**Functions:**

#### cleanResume(data: ResumeInputData)

Sends resume input to backend for cleaning.

```typescript
const response = await apiService.cleanResume({
  name: "John Doe",
  summary: "...",
  experience: "...",
  education: "...",
  skills: "...",
});
```

#### generatePdf(data: GeneratePdfRequest)

Generates PDF with specified template.

```typescript
const response = await apiService.generatePdf({
  cleanedResume: {...},
  template: "template1"
});
```

#### downloadPdf(url: string)

Downloads PDF file from URL.

```typescript
const blob = await apiService.downloadPdf(downloadUrl);
```

**Configuration:**

- Base URL: `http://localhost:8080/api` (configurable via `.env`)
- Content-Type: `application/json`
- Automatically handles response parsing

---

## 🌍 Global State (Context)

### ResumeContext

**File:** `src/context/ResumeContext.type.ts` & `src/context/ResumeContext.tsx`

Global state management for resume data across pages.

**Provider:**

```tsx
import { ResumeProvider } from "./context/ResumeContext";

<ResumeProvider>
  <App />
</ResumeProvider>;
```

**State Properties:**

- `cleanedResume`: Cleaned resume data from backend
- `selectedTemplate`: Currently selected template ID
- `pdfUrl`: URL/path to generated PDF

**Usage:**

```tsx
const { cleanedResume, setCleanedResume } = useResumeContext();
```

---

## 📊 Data Types

### ResumeInputData

Input form data structure:

```typescript
{
  name: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
}
```

### CleanedResume

Cleaned resume data from backend:

```typescript
{
  name: string;
  summary: string;
  experience: string[];
  education: string[];
  skills: string[];
}
```

### CleanResumeResponse

Backend response for cleaning:

```typescript
{
  cleanedResume: CleanedResume;
}
```

### GeneratePdfRequest

Request data for PDF generation:

```typescript
{
  cleanedResume: CleanedResume;
  template: string; // "template1" | "template2" | "template3"
}
```

### GeneratePdfResponse

Backend response for PDF generation:

```typescript
{
  success: boolean;
  message: string;
  downloadUrl?: string;
  pdfData?: string; // base64 encoded PDF
}
```

---

## 🎯 Component Composition Example

```tsx
import React, { useState } from "react";
import { TextInput, Textarea, SectionCard } from "../components";
import { useCleanResume } from "../hooks/useCleanResume";
import { useResumeContext } from "../context/useResumeContext";

export const ExampleForm = () => {
  const { setCleanedResume } = useResumeContext();
  const { mutate: cleanResume, isPending } = useCleanResume();

  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    // ... other fields
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    cleanResume(formData, {
      onSuccess: (response) => {
        setCleanedResume(response.cleanedResume);
        // Navigate or show success
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <SectionCard title="Personal Info">
        <TextInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </SectionCard>
      <button type="submit" disabled={isPending}>
        {isPending ? "Processing..." : "Submit"}
      </button>
    </form>
  );
};
```

---

## 🧪 Testing Components

### Testing Hooks

```tsx
import { renderHook, act } from "@testing-library/react";
import { useCleanResume } from "../hooks/useCleanResume";

test("useCleanResume mutation", async () => {
  const { result } = renderHook(() => useCleanResume());

  act(() => {
    result.current.mutate({
      /* form data */
    });
  });

  await waitFor(() => {
    expect(result.current.data).toBeDefined();
  });
});
```

---

## 📝 Best Practices

1. **Use Context for Global State**: Store resume data in context to access across pages
2. **Handle Loading States**: Always show loading indicators during API calls
3. **Error Handling**: Use toast notifications for user feedback
4. **Type Safety**: Always use TypeScript types for component props
5. **Component Composition**: Break down complex UIs into smaller components
6. **Reusable Components**: Create generic components that work across pages

---

For more information, see the main `FRONTEND_README.md` and `QUICK_START.md` files.
