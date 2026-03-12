import mongoose from "mongoose";

const consoleSchema = new mongoose.Schema({
    nombre: {
        type: String,   
        required:  [true, 'El nombre es obligatorio'],
        trim: true,
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
    },
    fabricante: {
        type: String,
        required: [true, 'El fabricante es obligatorio'],   
        trim: true,
        maxlength: [50, 'El fabricante no puede exceder los 50 caracteres'],
        enum: {
            values: ['Sony', 'Microsoft', 'Nintendo', 'Sega', 'Atari', 'Other'],
            message: 'El fabricante debe ser uno de los siguientes: Sony, Microsoft, Nintendo, Sega, Atari, Other'
        }
    },
    añoLanzamiento: {
        type: Number,
        required: [true, 'El año es obligatorio'],
        min: [1970, 'El año no puede ser anterior a 1970'],
        max: [2024, 'El año no puede ser posterior a 2024']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false,
    softDelete: true
});
    const Console = mongoose.model('Console', consoleSchema);

export default Console;