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

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite + Tailwind CSS v4 |
| Backend | Node.js + Express.js |
| ML Engine | Python + Flask + scikit-learn (TF-IDF + Cosine Similarity) |
| Dataset | 892 Coursera courses |
