# Smart Resume Enhancer Backend

This is the backend for the Smart Resume Enhancer project, built with Spring Boot.

## Features
- **Clean Resume**: API to normalize text, capitalize headers, and clean up formatting.
- **Generate PDF**: API to generate a professional PDF resume from structured data.

## Tech Stack
- Java 17
- Spring Boot 3.2.0
- OpenHTMLToPDF
- Thymeleaf

## Usage

### 1. Build and Run
```bash
mvn spring-boot:run
```
The server will start at `http://localhost:8080`.

### 2. API Endpoints

#### Clean Resume
**POST** `/clean-resume`
```json
{
  "name": "john doe",
  "summary": "experienced java developer...",
  "experience": "software engineer at google\n senior engineer at amazon",
  "education": "bs cs at mit",
  "skills": "java, spring, react"
}
```

#### Generate PDF
**POST** `/generate-pdf`
```json
{
  "template": "template1",
  "resume": {
    "name": "John Doe",
    "summary": "Experienced Java Developer...",
    "experience": ["Software Engineer at Google", "Senior Engineer at Amazon"],
    "education": ["BS CS at MIT"],
    "skills": ["Java", "Spring", "React"]
  }
}
```
*Returns*: A PDF file download.
