# LOFA — Logic Focus in Code

Full-stack marketing website with a real backend + admin panel.
React + Vite + Tailwind + Framer Motion (frontend), Node + Express +
MongoDB + Cloudinary (backend).

## Structure
```
lofa-website/
├── frontend/   React site + admin panel UI
└── backend/    Node/Express API + MongoDB models + Cloudinary uploads
```

## Setup

### 1. Backend
```bash
cd backend
cp .env.example .env
# set MONGO_URI, JWT_SECRET, ADMIN_EMAIL/PASSWORD, Cloudinary keys
npm install
npm run seed     # populates starter Services/Products/Banner/Portfolio/Partners/Careers
npm run dev       # http://localhost:5000
```

You need:
- A MongoDB database (free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster works)
- A free [Cloudinary](https://cloudinary.com) account — needed for **image
  uploads** (Portfolio project images, Partner logos, Product images,
  Banner image). Without Cloudinary keys, uploads will fail — everything
  else still works.

### 2. Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev       # http://localhost:5173
```

## Admin Panel
Go to `/admin` (there's a link in the footer), sign in with the
`ADMIN_EMAIL` / `ADMIN_PASSWORD` from `backend/.env`.

Six tabs:
| Tab | What it manages |
|---|---|
| **Launch Banner** | The "Product Launch Bar" shown on Home & Products — heading, description, image, countdown date, button |
| **Services** | The services grid + Services page + Contact page's "enquiring about" dropdown |
| **Products** | The Products grid |
| **Portfolio** | Case studies shown in "Our Work" — with real image upload, add/edit/delete |
| **Partners** | Logos in the "Trusted by growing businesses" scrolling marquee on the homepage — upload a logo image per company |
| **Careers** | Open positions shown on the Careers page |

All edits go straight to MongoDB and show for every visitor immediately —
unlike the earlier localStorage-only version, this is now a real shared
backend.

## How Contact & Careers submissions work
Both forms still open the visitor's email app via `mailto:` (no email
service required). The Contact form's "What are you enquiring about?"
dropdown is now built live from whatever Services exist in MongoDB.

## Deploy
- Backend → Render / Railway / any Node host, with your MongoDB Atlas +
  Cloudinary env vars set
- Frontend → `npm run build`, deploy `dist/` to Vercel/Netlify, with
  `VITE_API_URL` pointing at your deployed backend
