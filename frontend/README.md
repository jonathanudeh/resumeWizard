# 🚀 Smart Resume Enhancer - Frontend

A modern, production-ready React frontend for the Smart Resume Enhancer application.

## ✨ Features

- 📝 Beautiful resume input form
- 🧹 AI-powered resume cleaning via backend API
- 👁️ Professional resume preview
- 🎨 3 selectable resume templates
- 📄 PDF generation and download
- ⚡ Lightning-fast UI with Tailwind CSS
- 🔔 User-friendly notifications
- 📱 Fully responsive design

## 🚀 Quick Start

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5174 in your browser.

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get started in 5 minutes
- **[FRONTEND_README.md](./FRONTEND_README.md)** - Complete documentation
- **[COMPONENT_DOCS.md](./COMPONENT_DOCS.md)** - Component & hook reference
- **[BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)** - Backend API integration
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Deployment instructions

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **React Router** - Navigation
- **React Query** - API state management
- **Tailwind CSS v4** - Styling
- **Axios** - HTTP client
- **Vite** - Build tool

## 📝 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Check code quality
```

## 🔌 Backend Integration

The frontend requires a Java backend with these endpoints:

- `POST /api/clean-resume` - Clean and enhance resume data
- `POST /api/generate-pdf` - Generate resume PDF

See [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for details.

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Application pages
├── hooks/         # Custom React hooks
├── services/      # API services
├── context/       # Global state
└── App.tsx        # Main app component
```

## ✅ Status

- ✅ Development: Complete
- ✅ Documentation: Complete
- ✅ Dev Server: Running on http://localhost:5174
- ⏳ Backend Integration: Ready for implementation

## 📖 Getting Help

1. Start with [QUICK_START.md](./QUICK_START.md)
2. Check [COMPONENT_DOCS.md](./COMPONENT_DOCS.md) for API reference
3. See [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for integration details
4. Review [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment

---

**Happy coding! 🎉**

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
