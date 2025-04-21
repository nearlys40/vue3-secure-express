# 🛡️ Secure Auth Full-Stack App (Monorepo)

ระบบล็อกอิน/ลงทะเบียน พร้อม Role-based access control (RBAC)  
Frontend ด้วย Vue 3 + TailwindCSS + Pinia  
Backend ด้วย Express.js + Prisma + MongoDB + JWT

---

## 📦 Tech Stack

| Layer    | Stack                                              |
| -------- | -------------------------------------------------- |
| Frontend | Vue 3, Vite, Pinia, TypeScript, TailwindCSS        |
| Backend  | Node.js, Express.js, Prisma ORM, MongoDB           |
| Auth     | JWT (access & refresh token), httpOnly cookies     |
| Security | Helmet, CORS whitelist, Joi validation, Rate Limit |

---

## 🧱 Project Structure

```
secure-auth-app/
├── backend/                 # Express + Prisma + MongoDB
│   ├── app.js               # Main app file
│   ├── routes/              # /auth, /me
│   ├── middlewares/         # RBAC, auth, error handling
│   ├── prisma/schema.prisma
│   ├── .env
├── frontend/                # Vue 3 + TailwindCSS + Pinia
│   ├── src/
│   │   ├── views/           # Login, Register, Dashboard
│   │   ├── stores/          # auth.ts (Pinia)
│   │   ├── api/             # Axios requests
│   │   ├── router/          # Vue Router + guards
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.cjs
│   ├── .env
└── README.md
```

---

## 🚀 Features

### ✅ Backend (Express)

- JWT Auth (Access & Refresh Token)
- httpOnly cookie for token storage
- Refresh token endpoint
- RBAC Middleware (admin vs employee)
- Secure: Helmet, CORS (whitelist), Joi validation
- Prisma ORM with MongoDB

### ✅ Frontend (Vue)

- Login & Register pages
- Auth store with Pinia
- Navigation Guard with auto-refresh
- Responsive design with TailwindCSS
- Dashboard page with role & logout
- Axios setup with `withCredentials: true`

---

## ⚙️ Setup Instructions

### 🔧 Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

---

### 💻 Frontend

```bash
cd frontend
npm install
npm run dev
```

📄 `frontend/.env` example:

```
VITE_API_BASE=http://localhost:5000/api
```

---

## 🌐 Auth Flow

1. User logs in → backend sets `httpOnly` cookie
2. Frontend calls `/api/me` to get current user
3. Navigation Guard checks session
4. If needed, refresh token from `/api/auth/refresh`
5. Logout clears session

---

## 🙈 .gitignore (sample)

```gitignore
# shared
node_modules/
dist/
*.log

# env
.env
.env.local
.env.development
.env.production

# IDE
.vscode/
```

---

## 📸 UI Screens

- ✅ Login + Register
- ✅ Dashboard (User info + role)
- ✅ Responsive design (mobile/desktop)

---

## ✨ Credit

Built with ❤️ by Oat + ChatGPT  
Feel free to fork, extend, and use for any secure full-stack application.
