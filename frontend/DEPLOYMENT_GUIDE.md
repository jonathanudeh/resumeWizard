# Deployment Guide

## 🚀 Deployment Options

The Smart Resume Enhancer frontend can be deployed to various platforms. This guide covers the most popular options.

## 📋 Pre-Deployment Checklist

- [ ] Test application locally: `npm run dev`
- [ ] Build for production: `npm run build`
- [ ] Verify no build errors
- [ ] Test production build locally: `npm run preview`
- [ ] Update `.env` with production backend URL
- [ ] Ensure backend is accessible in production
- [ ] Update CORS configuration on backend
- [ ] Test API endpoints with production URL

## 🏗️ Build for Production

```bash
# Navigate to frontend directory
cd frontend

# Build optimized production bundle
npm run build

# Output: dist/ folder contains production-ready files
```

**Build artifacts:**

- `dist/index.html` - Main HTML file
- `dist/assets/` - JavaScript and CSS bundles
- `dist/assets/images/` - Static assets

## ☁️ Deployment Platforms

### 1. Vercel (Recommended - Easiest)

**Advantages:**

- Free tier available
- Automatic deployments from Git
- Global CDN
- Environment variable management
- Zero-config deployment

**Setup:**

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Deploy:**

   ```bash
   cd frontend
   vercel
   ```

3. **Configure environment variables:**

   - Go to project settings on Vercel
   - Add `VITE_API_URL` environment variable
   - Set value to your production backend URL

4. **Redeploy with new environment:**
   ```bash
   vercel --prod
   ```

**GitHub Integration:**

1. Push code to GitHub
2. Import repository on Vercel
3. Configure build settings (already optimized for Vite)
4. Set environment variables
5. Deploy automatically on push

---

### 2. Netlify

**Advantages:**

- Free tier with generous limits
- Git integration
- Lambda functions support
- Form submissions
- Simple environment management

**Setup:**

1. **Create `netlify.toml` in frontend directory:**

   ```toml
   [build]
   command = "npm run build"
   publish = "dist"

   [[redirects]]
   from = "/*"
   to = "/index.html"
   status = 200

   [build.environment]
   NODE_VERSION = "18"
   ```

2. **Deploy via CLI:**

   ```bash
   npm install -g netlify-cli
   cd frontend
   netlify deploy --prod --dir=dist
   ```

3. **Or connect GitHub:**
   - Go to netlify.com
   - Click "New site from Git"
   - Select your repository
   - Configure build settings
   - Set environment variables
   - Deploy

**Environment Variables (Netlify UI):**

- Go to Site settings → Build & deploy → Environment
- Add `VITE_API_URL` variable
- Redeploy to apply changes

---

### 3. AWS S3 + CloudFront

**Advantages:**

- Scalable
- Low cost for static files
- Global CDN
- Full control

**Setup:**

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Create S3 bucket:**

   ```bash
   # Using AWS CLI
   aws s3 mb s3://your-resume-app-bucket --region us-east-1
   ```

3. **Enable static website hosting:**

   ```bash
   aws s3 website s3://your-resume-app-bucket \
     --index-document index.html \
     --error-document index.html
   ```

4. **Upload files:**

   ```bash
   aws s3 sync dist/ s3://your-resume-app-bucket/ --delete
   ```

5. **Create CloudFront distribution:**

   - Go to AWS CloudFront console
   - Create new distribution
   - Set S3 bucket as origin
   - Configure cache behavior
   - Set index document to index.html
   - Deploy

6. **Update environment variable:**
   - Edit `.env` with production backend URL
   - Rebuild: `npm run build`
   - Upload to S3 again

**Bucket Policy (JSON):**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-resume-app-bucket/*"
    }
  ]
}
```

---

### 4. GitHub Pages

**Advantages:**

- Free with GitHub
- Easy setup
- Good for demos
- No backend required for static hosting

**Setup:**

1. **Update `vite.config.ts`:**

   ```typescript
   export default defineConfig({
     base: "/resumeWizard/", // Your repo name
     plugins: [react(), tailwindcss()],
   });
   ```

2. **Create GitHub Actions workflow** (`.github/workflows/deploy.yml`):

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: "18"
         - run: cd frontend && npm install
         - run: cd frontend && npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./frontend/dist
   ```

3. **Configure repository settings:**
   - Go to Settings → Pages
   - Set source to "Deploy from a branch"
   - Select `gh-pages` branch
   - Save

---

### 5. Docker Deployment

**Advantages:**

- Containerized deployment
- Works with Kubernetes
- Environment consistency
- Easy scaling

**Create `Dockerfile`:**

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 3000

ENV VITE_API_URL=https://api.yourdomain.com/api

CMD ["serve", "-s", "dist", "-l", "3000"]
```

**Build and run:**

```bash
# Build image
docker build -t resume-enhancer:latest .

# Run container
docker run -p 3000:3000 \
  -e VITE_API_URL=https://api.yourdomain.com/api \
  resume-enhancer:latest
```

**Push to registry:**

```bash
# Tag image
docker tag resume-enhancer:latest yourusername/resume-enhancer:latest

# Push to Docker Hub
docker push yourusername/resume-enhancer:latest
```

---

## 🔐 Environment Configuration

### Production Environment Variables

Update `.env` for production:

```env
# Production backend URL
VITE_API_URL=https://api.yourdomain.com/api
```

### Secure Environment Management

**Best Practices:**

1. Never commit `.env` file with sensitive data
2. Use platform-specific environment variable management
3. Use different URLs for dev/staging/prod
4. Rotate credentials regularly
5. Use HTTPS for all connections

**For each platform:**

**Vercel:**

- Settings → Environment Variables

**Netlify:**

- Site settings → Build & deploy → Environment

**AWS:**

- Parameter Store or Secrets Manager

**Docker:**

- Use environment variables at runtime
- Don't hardcode secrets in Dockerfile

---

## 📊 Performance Optimization

The build is already optimized with:

- Vite bundling
- Tree-shaking
- Code splitting
- CSS minification
- JavaScript minification

**Additional optimizations:**

1. **Enable compression** on your server:

   ```nginx
   gzip on;
   gzip_types text/plain text/css text/javascript application/json;
   ```

2. **Set cache headers:**

   ```nginx
   # Cache static assets for 1 year
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
     expires 1y;
     add_header Cache-Control "public, immutable";
   }

   # Don't cache HTML
   location = /index.html {
     expires -1;
     add_header Cache-Control "public, no-cache, no-store, must-revalidate";
   }
   ```

3. **Use CDN** (already included in most platforms)

---

## 🧪 Testing Production Build

Test the production build before deploying:

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Visit http://localhost:4173
```

---

## 🔄 Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: cd frontend && npm install

      - name: Run linter
        run: cd frontend && npm run lint

      - name: Build
        run: cd frontend && npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}

      - name: Deploy to Vercel
        if: github.ref == 'refs/heads/main'
        run: npm install -g vercel && vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
```

---

## 📈 Monitoring & Analytics

### Performance Monitoring

1. **Vercel Analytics:**

   - Automatic performance metrics
   - Error tracking
   - Usage insights

2. **Google Analytics:**

   ```html
   <!-- Add to index.html -->
   <script
     async
     src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
   ></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag() {
       dataLayer.push(arguments);
     }
     gtag("js", new Date());
     gtag("config", "GA_ID");
   </script>
   ```

3. **Sentry (Error Tracking):**
   ```bash
   npm install @sentry/react
   ```

---

## 🆘 Troubleshooting

### Blank Page After Deploy

- Check browser console for errors
- Verify `base` path in `vite.config.ts`
- Check backend API connectivity
- Verify environment variables

### API Requests Failing

- Check backend URL in `.env`
- Verify CORS configuration on backend
- Check network tab for response errors
- Verify backend is running

### Build Fails

- Check Node.js version (18+)
- Clear cache: `npm cache clean --force`
- Delete `node_modules`: `rm -rf node_modules`
- Reinstall: `npm install`
- Check for TypeScript errors: `npx tsc --noEmit`

### Slow Performance

- Check build bundle size: `npm run build -- --stats`
- Enable gzip compression
- Use CDN for static files
- Optimize images
- Check API response times

---

## 📝 Post-Deployment

1. **Test functionality:**

   - Fill out form
   - Submit to backend
   - Verify resume cleaning
   - Generate PDF
   - Download file

2. **Monitor:**

   - Check server logs
   - Monitor error rates
   - Track performance metrics

3. **Maintain:**
   - Keep dependencies updated
   - Monitor security advisories
   - Regular backups if needed
   - Plan for scaling

---

## 🔗 Useful Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/build.html)
- [Vercel Deployment](https://vercel.com/docs)
- [Netlify Deployment](https://docs.netlify.com/)
- [AWS S3 + CloudFront](https://docs.aws.amazon.com/AmazonS3/latest/userguide/)
- [Docker Documentation](https://docs.docker.com/)

---

**Your frontend is ready for deployment!** Choose the platform that best fits your needs and follow the setup instructions above.
