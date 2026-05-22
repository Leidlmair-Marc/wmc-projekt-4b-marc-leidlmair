import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';

import db from './database.js';
import './initDatabase.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		return res.status(400).json({
			message: 'Bitte alle Felder ausfüllen'
		});
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		db.run(
			`
            INSERT INTO users (username, email, password)
            VALUES (?, ?, ?)
        `,
			[username, email, hashedPassword],
			function (err) {
				if (err) {
					return res.status(500).json({
						message: 'Benutzer existiert bereits'
					});
				}

				res.json({
					message: 'Registrierung erfolgreich'
				});
			}
		);
	} catch (error) {
		res.status(500).json({
			message: 'Serverfehler'
		});
	}
});

app.post('/login', (req, res) => {
	const { login, password } = req.body;

	db.get(
		`
        SELECT * FROM users WHERE email = ? OR username = ?
    `,
		[login, login],
		async (err, user) => {
			if (err) {
				return res.status(500).json({
					message: 'Serverfehler'
				});
			}

			if (!user) {
				return res.status(401).json({
					message: 'Benutzer nicht gefunden'
				});
			}

			const validPassword = await bcrypt.compare(
				password,
				user.password
			);

			if (!validPassword) {
				return res.status(401).json({
					message: 'Falsches Passwort'
				});
			}

			res.json({
				message: 'Login erfolgreich',
				user: {
					id: user.id,
					username: user.username,
					email: user.email
				}
			});
		}
	);
});

app.listen(3000, () => {
	console.log('Server läuft auf Port 3000');
});