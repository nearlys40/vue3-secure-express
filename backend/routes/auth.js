// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const { loginSchema, registerSchema } = require('../utils/validate');

const generateTokens = (user) => {
    const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};

router.post('/register', async (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { username, password, role } = req.body;
    const existingUser = await req.prisma.user.findUnique({ where: { username } });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await req.prisma.user.create({
        data: { username, password: hashedPassword, role },
    });

    res.status(201).json({ message: 'User registered' });
});

router.post('/login', async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { username, password } = req.body;
    const user = await req.prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const { accessToken, refreshToken } = generateTokens(user);
    res.cookie('token', accessToken, { httpOnly: true, secure: false });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false });
    res.json({ message: 'Login successful' });
});

router.post('/refresh', require('../middlewares/auth').verifyRefreshToken, async (req, res) => {
    const { accessToken, refreshToken } = generateTokens(req.user);
    res.cookie('token', accessToken, { httpOnly: true, secure: false });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false });
    res.json({ message: 'Token refreshed' });
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
});

module.exports = router;