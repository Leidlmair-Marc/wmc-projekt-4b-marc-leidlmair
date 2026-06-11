import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';

import db from './database.js';
import './initDatabase.js';
import { Server } from 'socket.io';
import http from 'http';

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:5173'
	}
});

server.listen(3000, () => {
	console.log('Server läuft');
});

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
					return res.status(500).json({ message: 'Benutzer existiert bereits' });
				}

				res.json({ message: 'Registrierung erfolgreich' });
			}
		);
	} catch (error) {
		res.status(500).json({ message: 'Serverfehler' });
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
				return res.status(500).json({ message: 'Serverfehler' });
			}

			if (!user) {
				return res.status(401).json({ message: 'Benutzer nicht gefunden' });
			}

			const validPassword = await bcrypt.compare(
				password,
				user.password
			);

			if (!validPassword) {
				return res.status(401).json({ message: 'Falsches Passwort' });
			}

			res.json({
				message: 'Login erfolgreich',
				user: {
				id: user.id,
				username: user.username,
				email: user.email,
				language: user.language
			}
		});
		}
	);
});

app.post('/teams', (req, res) => {

	const {
		userId,
		teamName,
		characters
	} = req.body;

	db.run(
		`
		INSERT INTO teams
		(user_id, team_name)
		VALUES (?, ?)
		`,
		[userId, teamName],

		function (err) {

			if (err) {
				return res.status(500).json({ message: 'Fehler' });
			}

			const teamId = this.lastID;

			for (
				let i = 0;
				i < characters.length;
				i++
			) {

				db.run(
					`
					INSERT INTO
					team_characters
					(team_id,
					character_id,
					slot)
					VALUES
					(?, ?, ?)
					`,
					[
						teamId,
						characters[i],
						i + 1
					]
				);
			}
			res.json({ message: 'Team gespeichert' });
		}
	);
});

app.get('/teams/:userId', (req, res) => {

	db.all(
		`
		SELECT *
		FROM teams
		WHERE user_id = ?
		`,
		[req.params.userId],

		(err, teams) => {

			if (err) {
				return res.status(500).json({message: 'Fehler'});
			}

			const promises = teams.map((team) => {

				return new Promise((resolve) => {

					db.all(
						`
						SELECT c.*
						FROM team_characters tc
						JOIN characters c
						ON tc.character_id = c.id
						WHERE tc.team_id = ?
						ORDER BY tc.slot
						`,
						[team.id],

						(err, characters) => {

							resolve({
								...team,
								characters
							});
						}
					);
				});
			});

			Promise.all(promises)
				.then((result) => {
					res.json(result);
				});
		}
	);
});

app.put('/teams/:id', (req, res) => {

	const { teamName } = req.body;

	db.run(
		`
		UPDATE teams	
		SET team_name = ?
		WHERE id = ?
		`,
		[
			teamName,
			req.params.id
		],
		(err) => {

			if (err) {
				return res.status(500).json({message: 'Fehler'});
			}

			res.json({message: 'Team umbenannt'});
		}
	);
});

app.put('/teams/:id/full', (req, res) => {

	const {
		teamName,
		characters
	} = req.body;

	db.run(
		`
		UPDATE teams
		SET team_name = ?
		WHERE id = ?
		`,
		[
			teamName,
			req.params.id
		],
		(err) => {

			if (err) {
				return res.status(500).json({
					message: 'Fehler'
				});
			}

			db.run(
				`
				DELETE FROM team_characters
				WHERE team_id = ?
				`,
				[req.params.id],
				(err) => {

					if (err) {
						return res.status(500).json({
							message: 'Fehler'
						});
					}

					for (
						let i = 0;
						i < characters.length;
						i++
					) {

						db.run(
							`
							INSERT INTO team_characters
							(
								team_id,
								character_id,
								slot
							)
							VALUES (?, ?, ?)
							`,
							[
								req.params.id,
								characters[i],
								i + 1
							]
						);
					}

					res.json({
						message:
							'Team aktualisiert'
					});
				}
			);
		}
	);
});

app.delete('/teams/:id', (req, res) => {

		db.run(
			`
			DELETE FROM teams
			WHERE id = ?
			`,
			[req.params.id]
		);

		db.run(
			`
			DELETE FROM
			team_characters
			WHERE team_id = ?
			`,
			[req.params.id]
		);

		res.json({ message: 'Gelöscht' });
	}
);

app.delete('/users/:id', (req, res) => {

	const userId = req.params.id;

	db.run(
		`
		DELETE FROM team_characters

		WHERE team_id IN (

			SELECT id
			FROM teams

			WHERE user_id = ?
		)
		`,
		[userId],
		(err) => {

			if (err) {
				return res.status(500).json({
					message: 'Fehler beim Löschen der Team-Charaktere'
				});
			}

			db.run(
				`
				DELETE FROM teams

				WHERE user_id = ?
				`,
				[userId],

				(err) => {

					if (err) {
						return res.status(500).json({
							message: 'Fehler beim Löschen der Teams'
						});
					}

					db.run(
						`
						DELETE FROM users

						WHERE id = ?
						`,
						[userId],

						(err) => {

							if (err) {
								return res.status(500).json({
									message: 'Fehler beim Löschen des Accounts'
								});
							}

							res.json({
								message: 'Account gelöscht'
							});
						}
					);
				}
			);
		}
	);
});

app.put('/users/:id/language', (req, res) => {

	const { language } = req.body;

	db.run(
		`
		UPDATE users
		SET language = ?
		WHERE id = ?
		`,
		[language, req.params.id],
		(err) => {

			if (err) {
				return res.status(500).json({
					message: 'Fehler beim Speichern'
				});
			}

			res.json({
				message: 'Sprache gespeichert'
			});
		}
	);
});

io.on('connection', (socket) => {

	console.log(
		'Benutzer verbunden:',
		socket.id
	);

	socket.on(
		'teamUpdated',
		(team) => {

			socket.broadcast.emit(
				'teamUpdated',
				team
			);
		}
	);

	socket.on(
		'disconnect',
		() => {

			console.log(
				'Benutzer getrennt:',
				socket.id
			);
		}
	);
});
