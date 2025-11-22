# Music Terms Quiz App

A web application for learning and testing music terminology for ABRSM Theory Exams. Features bilingual support (English/Chinese) with browse and quiz modes.

## Features

- 📚 **Browse Terms**: Browse music terms by grade with search functionality
- 🧠 **Quiz Mode**: Test your knowledge with interactive quizzes
- 🌐 **Bilingual Support**: Switch between English and Chinese explanations
- 📊 **Grade Filtering**: Filter terms by ABRSM grade levels (1-5)
- 🔍 **Smart Search**: Search in both English and Chinese

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Testing

Run end-to-end tests with Playwright:

```bash
# Run all tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# Run tests in headed mode
npm run test:e2e:headed
```

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect the Vite framework and deploy

The `vercel.json` configuration file is included for optimal routing and build settings.

## Project Structure

```
src/
├── components/     # React components
├── data/          # Music terms data and translations
├── contexts/      # React contexts
└── styles/        # Global styles
```

## Data Management

- Music terms are stored in `/src/data/musicTermsDataProd.json`
- See `EDITING_GUIDE.md` for instructions on updating terms
- See `ABRSM_GRADES.md` for grade categorization details
  