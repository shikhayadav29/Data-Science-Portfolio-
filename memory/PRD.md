# Shikha Yadav — Data Science Portfolio

## Problem Statement
Premium personal portfolio website for Shikha Yadav (Aspiring Data Scientist, BCA — Data Science & AI, BBDU, 3rd Year). Sections: Home, About, Education, Skills, Projects, Services, Experience, Resume, Contact. Profile photo upload, resume upload/download, contact form. Theme: premium blue/white/light-gray glassmorphism + gradients.

## Personas
- Recruiters / Hiring managers (internships & placements)
- Faculty and academic mentors
- Peers / LinkedIn visitors

## Architecture
- Backend: FastAPI + Motor (MongoDB). Routes under `/api`.
  - GET/POST `/api/profile` + `/api/profile/photo`, `/api/profile/resume` (multipart upload), `/api/profile/photo/file`, `/api/profile/resume/file`, POST/GET `/api/contact`.
  - File storage on disk at `/app/backend/uploads/`.
- Frontend: React + Tailwind + shadcn/ui + sonner + lucide-react. Single-page portfolio with sticky nav, smooth scroll, glassmorphism cards, animated skill bars, hero with photo upload, SY gold logo.

## Implemented (2026-06-30)
- 9-section portfolio with sticky glass navbar and mobile menu
- Hero with profile photo upload (seeded with provided image) + glow ring
- About, Education (BBDU, BCA DS&AI, 3rd year), Skills (13 items with progress bars)
- Projects (5 cards: Temperature Prediction, Quantity Analysis, Time Series, COVID-19 India, House Price Prediction)
- Services (6 cards), Experience (InAmigos Foundation — AI Web Dev Intern)
- Resume section with download + replace upload (seeded with provided PDF)
- Contact section: email, phone +91 63942 76341 (tel: +916394276341), location, LinkedIn, GitHub, contact form (POST /api/contact)
- Footer with SY gold logo, quick links, social, phone, © 2026 copyright

## Test Status
- iteration_1.json: backend 100%, frontend 100%. No blockers.

## Backlog
- P1: Admin auth-gated upload panel (so visitors can't replace photo/resume).
- P2: Per-project case-study pages with images and outcomes.
- P2: Blog/Articles section.
- P2: Analytics + view counter.
