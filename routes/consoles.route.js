import express from 'express';
import Console from '../models/Console.js';
import { authMiddleware, autorizeRole } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
    Console.find({ isDeleted: false })
        .then(consoles => res.json(consoles))
        .catch(err => res.status(500).json({ mensaje: 'Error al obtener consolas', error: err.message }));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    Console.findOne({ _id: id, isDeleted: false })
        .then(console => {
            if (console) {
                res.json(console);
            } else {
                res.status(404).json({ mensaje: 'Consola no encontrada' });
            }
        })
        .catch(err => res.status(500).json({ mensaje: 'Error al obtener la consola', error: err.message }));
});

router.post('/', authMiddleware, autorizeRole('admin'), (req, res) => {
    const newConsole = new Console(req.body);
    newConsole.save()
        .then(console => res.status(201).json(console))
        .catch(err => res.status(500).json({ mensaje: 'Error al crear la consola', error: err.message }));
});

router.put('/:id', authMiddleware, autorizeRole('admin'), (req, res) => {
    const { id } = req.params;
    Console.findByIdAndUpdate(id,req.body, { new: true, runValidators: true })
        .then(console => {
            if (console) {
                res.json(console);
            } else {
                res.status(404).json({ mensaje: 'Consola no encontrada' });
            }
        })
        .catch(err => res.status(500).json({ mensaje: 'Error al actualizar la consola', error: err.message }));
});

router.patch('/:id', authMiddleware, autorizeRole('admin'), (req, res) => {
    const { id } = req.params;
    Console.findByIdAndUpdate(id,req.body, { new: true, runValidators: true })
        .then(console => {
            if (console) {
                res.json(console);
            } else {
                res.status(404).json({ mensaje: 'Consola no encontrada' });
            }
        })
        .catch(err => res.status(500).json({ mensaje: 'Error al actualizar la consola', error: err.message }));
});

router.delete('/:id', authMiddleware, autorizeRole('admin'), (req, res) => {
    const { id } = req.params;
    Console.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true, runValidators: true }
    )
    .then(console => {
        if (console) {
            res.json({ mensaje: 'Consola marcada como eliminada correctamente' });
        } else {
            res.status(404).json({ mensaje: 'Consola no encontrada o ya eliminada' });
        }
    })
    .catch(err =>
        res.status(500).json({
            mensaje: 'Error al eliminar la consola',
            error: err.message
        })
    );
});

export default router;