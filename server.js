import express from 'express';
import consolesRouter from './routes/consoles.route.js';
import usersRouter from './routes/users.route.js';
import gamesRouter from './routes/games.route.js';
import connectDB from './config/database.js';

const app = express();
app.use(express.json());

await connectDB();

app.use('/api/consoles', consolesRouter);
app.use('/api/auth', usersRouter);
app.use('/api/games', gamesRouter);

app.get('/', (req, res) => {
    res.send('Hola mundo!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});

