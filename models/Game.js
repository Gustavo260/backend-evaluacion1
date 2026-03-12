import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true
    },
    genero: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true
    },
    precioEstimado: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo'],
    },
    consola: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Console',
        required: [true, 'La categoría es obligatoria']
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El creador es obligatorio']
    }
}, {
    timestamps: true,
    versionKey: false
});

const Game = mongoose.model('Game', gameSchema);

export default Game;