# SkillSage 🎓
**AI-Powered Course Recommendation System**

---

## 📁 Project Structure

```
SkillSage2/
├── frontend/        ← React + Vite + Tailwind (deploy to Vercel / Netlify)
├── backend/         ← Node.js + Express proxy API (deploy to Render / Railway)
└── ml_model/        ← Python Flask + scikit-learn ML service (deploy to Render / Railway)
```

---

## 🚀 Local Development

### 1 – Install dependencies
```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && npm install

# ML Model
cd ml_model && pip install -r requirements.txt
```

### 2 – Start all 3 services (each in its own terminal)

```bash
# Terminal 1 – ML Service (port 5001)
cd ml_model
python app.py

# Terminal 2 – Backend API (port 5000)
cd backend
node index.js

# Terminal 3 – Frontend (port 5173)
cd frontend
npm run dev
```

Open **http://localhost:5173**

---

## 🌐 Deployment Guide

### Frontend → Vercel / Netlify
1. Connect your repo on [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
2. Set **root directory** to `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Set env var: `VITE_API_URL=https://your-backend-url.com`

### Backend → Render / Railway
1. Set **root directory** to `backend`
2. Start command: `node index.js`
3. Set env var: `ML_SERVICE_URL=https://your-ml-url.com`

### ML Model → Render / Railway
1. Set **root directory** to `ml_model`
2. Build command: `pip install -r requirements.txt`
3. Start command: `python app.py`

---

## 🔌 API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /health` | GET | Backend health check |
| `POST /api/recommend` | POST | Get course recommendations |

```json
// POST /api/recommend
{ "user_interest": "machine learning" }

// Response
{ "recommended_courses": [ { "title": "...", "platform": "...", "rating": "4.8", ... } ] }
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite + Tailwind CSS v4 |
| Backend | Node.js + Express.js |
| ML Engine | Python + Flask + scikit-learn (TF-IDF + Cosine Similarity) |
| Dataset | 892 Coursera courses |
