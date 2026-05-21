import express from 'express';
import cors from 'cors';

import './initDatabase.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Backend läuft');
});

app.listen(3000, () => {
	console.log('Server läuft auf Port 3000');
});