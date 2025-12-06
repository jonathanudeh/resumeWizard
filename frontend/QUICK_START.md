# Smart Resume Enhancer - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites

- Node.js 18+ installed
- Java backend running on `http://localhost:8080`

### Installation & Setup

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies (if not already installed)
npm install

# 3. Start development server
npm run dev
```

The application will open at `http://localhost:5174` (or next available port)

## 📋 Environment Configuration

### Backend API URL

Create/update `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8080/api
```

**Default:** `http://localhost:8080/api`

To use a different backend server, change the `VITE_API_URL` environment variable.

## 🎮 How to Use the Application

### Step 1: Enter Resume Details

1. Navigate to the home page (`/`)
2. Fill in all required fields:
   - **Name**: Your full name
   - **Professional Summary**: A brief overview of your professional background
   - **Experience**: Your work experience and achievements
   - **Education**: Your educational background
   - **Skills**: Your technical and professional skills
3. Click **"Clean Resume"** button

### Step 2: Review & Preview

1. Review your cleaned resume on the preview page
2. The backend has processed and enhanced your resume data
3. Select your preferred resume template:
   - **Classic**: Traditional professional format
   - **Modern**: Contemporary design with modern styling
   - **Minimal**: Clean and simple layout
4. Click **"Generate PDF"** button

### Step 3: Download Your Resume

1. View the generated PDF
2. Click **"Download PDF"** to save the file to your computer
3. Option to **"Start Over"** and create another resume

## 📁 Project Structure

```
frontend/
├── src/
│   ├── App.tsx                 # Main app component with routing
│   ├── main.tsx               # React entry point
│   ├── index.css              # Global styles
│   ├── components/            # Reusable UI components
│   │   ├── TextInput.tsx
│   │   ├── Textarea.tsx
│   │   ├── SectionCard.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── PdfViewer.tsx
│   │   └── index.ts
│   ├── pages/                 # Application pages
│   │   ├── ResumeInputPage.tsx
│   │   ├── ResumePreviewPage.tsx
│   │   ├── PdfResultPage.tsx
│   │   └── index.ts
│   ├── hooks/                 # Custom React Query hooks
│   │   ├── useCleanResume.ts
│   │   └── useGeneratePdf.ts
│   ├── services/              # API services
│   │   └── api.ts
│   ├── context/               # Global state management
│   │   ├── ResumeContext.tsx
│   │   ├── ResumeContext.type.ts
│   │   └── useResumeContext.ts
│   └── assets/
├── .env                       # Environment variables
├── .env.example              # Example environment setup
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies & scripts
└── README.md
```

## 🔧 Available Scripts

### Development

```bash
npm run dev
```

Starts the development server with hot module replacement (HMR)

### Build for Production

```bash
npm run build
```

Creates optimized production build in `dist/` directory

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally

### Lint Code

```bash
npm run lint
```

Checks code for linting errors and style issues

## 🔌 API Integration

The frontend communicates with the backend via REST API:

### Clean Resume Endpoint

```
POST /api/clean-resume
```

**Request:**

```json
{
  "name": "string",
  "summary": "string",
  "experience": "string",
  "education": "string",
  "skills": "string"
}
```

**Response:**

```json
{
  "cleanedResume": {
    "name": "string",
    "summary": "string",
    "experience": ["string"],
    "education": ["string"],
    "skills": ["string"]
  }
}
```

### Generate PDF Endpoint

```
POST /api/generate-pdf
```

**Request:**

```json
{
  "cleanedResume": {
    "name": "string",
    "summary": "string",
    "experience": ["string"],
    "education": ["string"],
    "skills": ["string"]
  },
  "template": "template1|template2|template3"
}
```

**Response:**

```json
{
  "success": true,
  "message": "string",
  "pdfData": "base64_encoded_pdf"
}
```

## 🎨 Customization

### Add New Template

Edit `src/pages/ResumePreviewPage.tsx`:

```typescript
const TEMPLATES = [
  { id: "template1", name: "Classic", description: "..." },
  { id: "template2", name: "Modern", description: "..." },
  { id: "template3", name: "Minimal", description: "..." },
  // Add your new template here
  { id: "template4", name: "Your Template", description: "..." },
];
```

### Change Styling

- Edit `src/index.css` for global styles
- Use Tailwind CSS classes in components
- Modify colors and spacing using Tailwind's configuration

### Change API Base URL

Update the `.env` file:

```env
VITE_API_URL=http://your-backend-url:port/api
```

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is in use, Vite automatically tries the next available port (5174, 5175, etc.)

### Backend Connection Error

- Verify backend is running: `http://localhost:8080`
- Check `.env` file has correct `VITE_API_URL`
- Check browser console for CORS errors
- Enable CORS on backend if needed

### Form Validation Error

- Ensure all fields are filled
- Check for special characters or formatting issues
- Review backend validation requirements

### PDF Download Not Working

- Verify backend returns valid PDF data
- Check browser download settings
- Try different browser if issues persist

## 📦 Dependencies

- **React 19**: UI framework
- **TypeScript**: Type-safe development
- **React Router**: Client-side routing
- **React Query (TanStack)**: API state management
- **Axios**: HTTP client
- **Tailwind CSS v4**: Utility-first CSS framework
- **React Hot Toast**: Toast notifications
- **Vite**: Fast build tool and dev server

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
# Using Vercel CLI
vercel deploy
```

### Deploy to Netlify

```bash
# Using Netlify CLI
netlify deploy --prod --dir=dist
```

### Deploy to AWS S3 + CloudFront

1. Build the project: `npm run build`
2. Upload `dist/` folder to S3 bucket
3. Configure CloudFront distribution
4. Update backend CORS settings

## 📝 Notes

- The application uses React Context for global state management
- React Query handles all API calls with automatic caching
- Form validation is done client-side before sending to backend
- Toast notifications provide user feedback for all actions
- The app is fully responsive and works on mobile devices

## 💡 Tips

- Use browser DevTools Network tab to debug API calls
- Check console for error messages
- Use React DevTools browser extension to inspect components
- Monitor backend logs for server-side errors

---

**Questions or Issues?** Check the main `FRONTEND_README.md` for more detailed documentation.
