# Backend Integration Guide

## 🔌 Overview

The Smart Resume Enhancer frontend integrates with a Java backend to process and enhance resume data. This guide explains the API contracts and integration requirements.

## 🔐 API Configuration

### Base URL

```
http://localhost:8080/api
```

**To change the backend URL**, update the `.env` file:

```env
VITE_API_URL=http://your-backend-url:port/api
```

## 📡 API Endpoints

### 1. Clean Resume Endpoint

**Endpoint:** `POST /api/clean-resume`

**Purpose:** Sends raw resume data to backend for cleaning and enhancement.

**Request Headers:**

```
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "John Doe",
  "summary": "Experienced software engineer with 5 years in full-stack development",
  "experience": "Senior Developer at TechCorp 2020-2024, Frontend Engineer at StartupXYZ 2018-2020",
  "education": "B.S. Computer Science from State University 2018",
  "skills": "JavaScript, React, Node.js, TypeScript, PostgreSQL, Docker"
}
```

**Response (Success - 200):**

```json
{
  "cleanedResume": {
    "name": "John Doe",
    "summary": "Experienced software engineer with 5 years in full-stack development",
    "experience": [
      "Senior Developer at TechCorp (2020-2024)",
      "Frontend Engineer at StartupXYZ (2018-2020)"
    ],
    "education": ["B.S. Computer Science from State University (2018)"],
    "skills": [
      "JavaScript",
      "React",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Docker"
    ]
  }
}
```

**Response (Error - 400/500):**

```json
{
  "error": "Invalid resume data",
  "message": "Name field is required"
}
```

**Implementation Notes:**

- Backend should validate all required fields
- Process and format the text data
- Split experience, education, and skills into arrays
- Return cleaned and formatted data

### 2. Generate PDF Endpoint

**Endpoint:** `POST /api/generate-pdf`

**Purpose:** Generates a PDF resume with the specified template.

**Request Headers:**

```
Content-Type: application/json
```

**Request Body:**

```json
{
  "cleanedResume": {
    "name": "John Doe",
    "summary": "Experienced software engineer...",
    "experience": [
      "Senior Developer at TechCorp (2020-2024)",
      "Frontend Engineer at StartupXYZ (2018-2020)"
    ],
    "education": ["B.S. Computer Science from State University (2018)"],
    "skills": ["JavaScript", "React", "Node.js"]
  },
  "template": "template1"
}
```

**Available Templates:**

- `template1`: Classic - Traditional professional format
- `template2`: Modern - Contemporary design
- `template3`: Minimal - Clean and simple

**Response (Success - 200):**

**Option A - Base64 Encoded PDF:**

```json
{
  "success": true,
  "message": "PDF generated successfully",
  "pdfData": "JVBERi0xLjQKJeLj..."
}
```

**Option B - Download URL:**

```json
{
  "success": true,
  "message": "PDF generated successfully",
  "downloadUrl": "http://localhost:8080/files/resume_12345.pdf"
}
```

**Response (Error - 400/500):**

```json
{
  "success": false,
  "message": "Failed to generate PDF",
  "error": "Invalid template specified"
}
```

**Implementation Notes:**

- Accept cleaned resume and template choice
- Generate PDF using the specified template
- Return either base64-encoded PDF or URL to downloadable file
- Ensure PDF generation is compatible with selected template

## 🛠️ Integration Checklist

### Backend Developer Checklist

- [ ] Implement `/api/clean-resume` endpoint
  - [ ] Validate input data
  - [ ] Process resume text
  - [ ] Format and structure response
  - [ ] Handle errors with appropriate status codes
- [ ] Implement `/api/generate-pdf` endpoint
  - [ ] Accept cleaned resume and template
  - [ ] Generate PDF with selected template
  - [ ] Return PDF (base64 or downloadable URL)
  - [ ] Handle template validation
- [ ] Configure CORS
  - [ ] Allow requests from `http://localhost:5174` (development)
  - [ ] Allow requests from your production domain
- [ ] Error Handling
  - [ ] Return appropriate HTTP status codes
  - [ ] Include error messages in response
  - [ ] Log errors for debugging

### Frontend Already Configured

The frontend is pre-configured to:

- [x] Send POST requests to `/api/clean-resume`
- [x] Send POST requests to `/api/generate-pdf`
- [x] Handle response data and display results
- [x] Display loading states during requests
- [x] Show error notifications
- [x] Manage state across pages
- [x] Download generated PDFs

## 🔄 Data Flow

```
User Input Form
       ↓
   Validation
       ↓
  useCleanResume Hook
       ↓
  POST /api/clean-resume
       ↓
Backend Processing
       ↓
Cleaned Resume Response
       ↓
Store in Context
       ↓
Display Preview
       ↓
Template Selection
       ↓
useGeneratePdf Hook
       ↓
  POST /api/generate-pdf
       ↓
Backend PDF Generation
       ↓
PDF Response (base64 or URL)
       ↓
Display & Download
```

## 🧪 Testing the Integration

### Using cURL (for testing endpoints)

**Test Clean Resume:**

```bash
curl -X POST http://localhost:8080/api/clean-resume \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "summary": "Test summary",
    "experience": "Work experience here",
    "education": "Education here",
    "skills": "Skill1, Skill2, Skill3"
  }'
```

**Test Generate PDF:**

```bash
curl -X POST http://localhost:8080/api/generate-pdf \
  -H "Content-Type: application/json" \
  -d '{
    "cleanedResume": {
      "name": "John Doe",
      "summary": "Test",
      "experience": ["Job 1", "Job 2"],
      "education": ["Degree 1"],
      "skills": ["Skill1"]
    },
    "template": "template1"
  }'
```

### Using Frontend Application

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:5174`
3. Fill in the form and click "Clean Resume"
4. Verify data is processed correctly
5. Select a template and click "Generate PDF"
6. Verify PDF is generated and downloadable

## 📋 CORS Configuration

The frontend runs on `http://localhost:5174` during development. Ensure your backend allows CORS requests:

**Java Spring Boot Example:**

```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:5174");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
```

## 🚀 Production Deployment

### Update Backend URL

Before deploying to production, update the backend URL in your deployment environment:

```env
VITE_API_URL=https://api.yourdomain.com/api
```

### CORS for Production

Update your backend CORS configuration to allow requests from your production domain:

```java
config.addAllowedOrigin("https://yourdomain.com");
```

## 🔍 Debugging

### Frontend Debugging

1. **Open Browser DevTools**: Press `F12`
2. **Go to Network Tab**: Monitor API requests
3. **Check Console Tab**: Look for error messages
4. **Inspect Request**: Click on API request to see details

### Backend Debugging

1. Check backend logs for error messages
2. Verify database connectivity if applicable
3. Test endpoints with cURL or Postman
4. Verify file permissions for PDF generation

## 📊 Expected Response Times

- Clean Resume: 1-3 seconds (depends on processing complexity)
- Generate PDF: 2-5 seconds (depends on template complexity)
- Total Process: 5-10 seconds

## 🔗 API Testing Tools

Recommended tools for testing API endpoints:

- **Postman**: Full-featured API testing
- **Thunder Client**: VS Code extension
- **cURL**: Command-line tool
- **Insomnia**: API client and testing

## 📝 Error Handling

### Common HTTP Status Codes

- `200`: Success - Response processed correctly
- `201`: Created - Resource created successfully
- `400`: Bad Request - Invalid input data
- `401`: Unauthorized - Authentication required
- `403`: Forbidden - Access denied
- `404`: Not Found - Endpoint not found
- `500`: Internal Server Error - Backend error
- `502`: Bad Gateway - Backend unavailable
- `503`: Service Unavailable - Temporary issue

### Frontend Error Display

All errors are displayed to users via toast notifications with appropriate messaging.

## 🔐 Security Considerations

1. **Input Validation**: Backend should validate all input
2. **Output Encoding**: Properly encode data in responses
3. **Rate Limiting**: Consider limiting API requests
4. **HTTPS**: Use HTTPS in production
5. **CORS**: Configure CORS properly for your domain
6. **File Security**: Secure PDF file storage and delivery

## 📞 Support

If you encounter integration issues:

1. Check this documentation
2. Review the `FRONTEND_README.md` and `QUICK_START.md`
3. Check backend logs for errors
4. Verify API endpoints are accessible
5. Test endpoints with cURL or Postman

---

**Backend Integration Complete!** Your Java backend is ready to power the frontend application.
