import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        trim: true,
        maxlength: [50, 'El nombre de usuario no puede exceder los 100 caracteres']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un correo electrónico válido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
    }, {
    timestamps: true,
    versionKey: false
});

const User = mongoose.model('User', userSchema);

export default User;