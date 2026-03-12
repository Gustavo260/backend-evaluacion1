import express from 'express';
import User from '../models/User.js';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authMiddleware, autorizeRole } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, isDeleted: false });
        console.log("ROL DE USUARIO: ", user.role);
        if (!user) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }
        const token = jwt.sign(
        { 
            id: user._id,
            nombre: user.nombre,
            email: user.email,
            role: user.role
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        res.json({ token });
    } catch (err) {
        res.status(500).json({ 
            mensaje: 'Error al iniciar sesión', error: err.message 
        });
    }   
});

router.post('/register', authMiddleware, autorizeRole('admin'), async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const hashedPassword = await bycrypt.hash(password, 10);
        const nuevoUsuario = new User({ nombre, email, password: hashedPassword });
        const usuarioGuardado = await nuevoUsuario.save();
        res.status(201).json(usuarioGuardado);
    } catch (err) {
        res.status(400).json({ mensaje: 'Error al crear el usuario', error: err.message });
    }
});

router.get('/users', authMiddleware, autorizeRole('admin'), async (req, res) => {
    try {
        const users = await User.find({ isDeleted: false });
        res.json(users);
    } catch (err) {
        res.status(500).json({ mensaje: 'Error al obtener usuarios', error: err.message });
    }
});

router.get('/:id', authMiddleware, autorizeRole('admin'), async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ _id: id, isDeleted: false });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ mensaje: 'Error al obtener el usuario', error: err.message });
    }
});

router.delete('/:id', authMiddleware, autorizeRole('admin'), async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (user) {
            res.json({ mensaje: 'Usuario eliminado' });
        } else {
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ mensaje: 'Error al eliminar el usuario', error: err.message });
    }
});

export default router;