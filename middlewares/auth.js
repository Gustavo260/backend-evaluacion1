import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (authHeader){
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ mensaje: 'Token de autenticación inválido' });
        }
    } else {
        res.status(401).json({ mensaje: 'Acceso no autorizado' });
    }
};

export const autorizeRole = (grantedRole) => {
    return (req, res, next) => {
        if (req.user?.role === grantedRole) {
            next();
        } else {
            res.status(403).json({ mensaje: 'Acceso denegado: permisos insuficientes' });
        }
    };
};        
