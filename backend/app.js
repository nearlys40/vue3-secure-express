require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const { verifyToken } = require('./middlewares/auth');

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// CORS
const whitelist = [process.env.CORS_ORIGIN];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);

// Routes
app.use((req, res, next) => { req.prisma = prisma; next(); });
app.use('/api/auth', authRoutes);
app.use('/api/me', verifyToken, userRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));