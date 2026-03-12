import express from 'express';
import Game from '../models/Game.js';
import { authMiddleware, autorizeRole } from '../middlewares/auth.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/AppError.js';

const router = express.Router();

router.get('/', catchAsync(async (req, res) => {
    const games = await Game.find().populate('consola', 'nombre').populate('creador', 'nombre');
    res.json(games);
}));

router.get('/:id', authMiddleware, catchAsync(async (req, res) => {
    const { id } = req.params;
    const game = await Game.findById(id);
        if (!game) {
            return res.status(404).json({ mensaje: 'Juego no encontrado' });
        }
        res.json(game);
}));

router.post('/', authMiddleware, catchAsync(async (req, res) => {
    const newGame = new Game(req.body);
    const creadorId = req.user.id; // Obtener el ID del usuario autenticado
    newGame.creador = creadorId; // Asignar el ID del creador al juego

    const gameSaved = await newGame.save();
    console.log("Juego creado: ", gameSaved);
    res.status(201).json(gameSaved);
}));

router.put('/:id', authMiddleware, catchAsync(async (req, res) => {
    const { id } = req.params;
    const game = await Game.findByIdAndUpdate(
        { _id: id, creador: req.user.id }
        ,req.body
        ,{ new: true, runValidators: true }
    );
    if (!game) {
        return res.status(404).json({ mensaje: 'Juego no encontrado o no autorizado' });
    }
    res.json(game);
}));

router.patch('/:id', authMiddleware, catchAsync(async (req, res) => {
    const { id } = req.params;
    const game = await Game.findByIdAndUpdate(
        { _id: id, creador: req.user.id }
        ,req.body
        ,{ new: true, runValidators: true }
    );
    if (!game) {
        return res.status(404).json({ mensaje: 'Juego no encontrado o no autorizado' });
    }
    res.json(game);
}));

router.delete('/:id', authMiddleware, catchAsync(async (req, res) => {
    const { id } = req.params;
    const game = await Game.findOneAndDelete({ 
        _id: id
        ,creador: req.user.id 
    });
    if (!game) {
        return res.status(404).json({ mensaje: 'Juego no encontrado o no autorizado' });
    }
    res.json({ mensaje: 'Juego eliminado correctamente' });
}));

export default router;
