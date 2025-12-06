# Smart Resume Enhancer - Frontend

A modern React frontend for the Smart Resume Enhancer application that integrates with a Java backend to clean, enhance, and generate professional resumes as PDFs.

## 🎯 Features

- **Resume Input Form**: Clean, user-friendly form to enter resume details
- **AI-Powered Cleaning**: Sends resume data to backend for cleaning and enhancement
- **Resume Preview**: Display cleaned resume with formatted layout
- **Template Selection**: Choose from multiple professional resume templates
- **PDF Generation**: Generate and download professional PDF resumes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Validation**: Form validation with helpful error messages
- **Toast Notifications**: User-friendly notifications for actions and errors
- **Loading States**: Beautiful loading indicators during API calls

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **React Router** - Navigation between pages
- **React Query (TanStack Query)** - API state management
- **Axios** - HTTP client
- **Tailwind CSS v4** - Modern styling
- **React Hot Toast** - Toast notifications
- **Vite** - Fast build tool

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm/yarn
- Java backend running (see Backend Setup below)

### Setup

1. **Navigate to the frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure backend API URL** (optional):
   Create or update `.env` file:

   ```env
   VITE_API_URL=http://localhost:8080/api
   ```

   Default is already set to `http://localhost:8080/api`

4. **Start the development server**:

   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:5173`

## 🚀 Usage

### Page Flow

1. **Resume Input Page** (`/`)

   - Enter your resume details in the form
   - Validates all required fields
   - Click "Clean Resume" to send to backend
   - Backend processes and returns cleaned resume data

2. **Resume Preview Page** (`/preview`)

   - Review the cleaned resume
   - Select your preferred template (Classic, Modern, Minimal)
   - Click "Generate PDF" to create the final PDF

3. **PDF Result Page** (`/result`)
   - View PDF preview (if available)
   - Download the PDF file
   - Option to create another resume

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── TextInput.tsx         # Reusable text input component
│   │   ├── Textarea.tsx          # Reusable textarea component
│   │   ├── SectionCard.tsx       # Card wrapper for form sections
│   │   ├── LoadingSpinner.tsx    # Loading indicator
│   │   ├── PdfViewer.tsx         # PDF preview component
│   │   └── index.ts              # Component exports
│   ├── pages/
│   │   ├── ResumeInputPage.tsx   # Main input form page
│   │   ├── ResumePreviewPage.tsx # Preview and template selection
│   │   ├── PdfResultPage.tsx     # Final PDF download page
│   │   └── index.ts              # Page exports
│   ├── hooks/
│   │   ├── useCleanResume.ts     # React Query mutation for cleaning
│   │   └── useGeneratePdf.ts     # React Query mutation for PDF generation
│   ├── services/
│   │   └── api.ts                # Axios API client and service functions
│   ├── context/
│   │   └── ResumeContext.tsx     # Global resume state management
│   ├── App.tsx                   # Main app with routing
│   ├── main.tsx                  # Entry point
│   ├── index.css                 # Global styles
│   └── assets/                   # Static assets
├── .env                          # Environment variables
├── .env.example                  # Example environment variables
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## 🔌 API Integration

The frontend communicates with the Java backend using the following endpoints:

### Clean Resume

- **Endpoint**: `POST /api/clean-resume`
- **Request Body**:
  ```json
  {
    "name": "string",
    "summary": "string",
    "experience": "string",
    "education": "string",
    "skills": "string"
  }
  ```
- **Response**:
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

### Generate PDF

- **Endpoint**: `POST /api/generate-pdf`
- **Request Body**:
  ```json
  {
    "cleanedResume": {
      "name": "string",
      "summary": "string",
      "experience": ["string"],
      "education": ["string"],
      "skills": ["string"]
    },
    "template": "string" // template1, template2, or template3
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "string",
    "pdfData": "base64_encoded_pdf",
    "downloadUrl": "string (optional)"
  }
  ```

## 🎨 Customization

### Styling

The project uses Tailwind CSS v4 for styling. To customize:

1. **Global styles**: Edit `src/index.css`
2. **Component styles**: Use Tailwind classes directly in JSX
3. **Tailwind config**: Modify `tailwind.config.js` if needed

### Templates

To add new resume templates, modify the `TEMPLATES` array in `src/pages/ResumePreviewPage.tsx`:

```typescript
const TEMPLATES = [
  { id: "template1", name: "Classic", description: "..." },
  { id: "template2", name: "Modern", description: "..." },
  { id: "template3", name: "Minimal", description: "..." },
  // Add new templates here
];
```

### API Base URL

Change the backend API URL by modifying the `.env` file or the `API_BASE_URL` in `src/services/api.ts`.

## 🧪 Development

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Preview Production Build

```bash
npm run preview
```

## 🔧 Environment Setup

### Backend Prerequisites

Ensure your Java backend is running and accessible at:

```
http://localhost:8080
```

Configure the `VITE_API_URL` in `.env` to match your backend server.

## 📝 Form Validation

The form includes client-side validation for:

- Required fields (Name, Summary, Experience, Education, Skills)
- Field length constraints
- Real-time error clearing

## 🎯 State Management

- **Global Resume State**: Managed via React Context (`ResumeContext`)
- **API State**: Managed via React Query with mutations
- **Component State**: Local state for form inputs

## 🔐 Security Considerations

- All API calls use HTTPS in production
- Environment variables are not exposed to the browser (except `VITE_*` prefixed)
- CORS should be configured properly on the backend

## 🐛 Troubleshooting

### Backend Not Connecting

- Verify backend is running on `http://localhost:8080`
- Check `VITE_API_URL` in `.env`
- Check browser console for CORS errors
- Ensure backend has CORS enabled

### Form Submission Fails

- Check network tab in browser DevTools
- Verify all required fields are filled
- Check backend logs for errors

### PDF Download Not Working

- Ensure backend returns valid PDF data
- Check browser's download settings
- Try using a different browser

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Router Documentation](https://reactrouter.com)
- [React Query Documentation](https://tanstack.com/query)
- [TypeScript Documentation](https://www.typescriptlang.org)

## 📄 License

This project is part of the resumeWizard application.

## 👨‍💻 Development Notes

### Adding New Features

1. Create components in `src/components/`
2. Create pages in `src/pages/` if needed
3. Create hooks in `src/hooks/` for API calls
4. Update routing in `App.tsx`
5. Add context if global state is needed

### Code Style

- Use TypeScript for type safety
- Use functional components with hooks
- Follow ESLint configuration
- Use Tailwind CSS classes for styling
- Keep components small and focused

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy

The `dist` folder contains the production-ready application. Deploy it to:

- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

Ensure the `VITE_API_URL` environment variable is set correctly in your production environment.

---

**Happy coding! 🎉**
