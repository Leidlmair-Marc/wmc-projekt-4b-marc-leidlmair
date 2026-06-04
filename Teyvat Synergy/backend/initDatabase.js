import db from './database.js';
import { characters } from '../src/lib/data/characters.js';

db.serialize(() => {
	db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    `);

	db.run(`
        CREATE TABLE IF NOT EXISTS characters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            element TEXT NOT NULL,
            role TEXT NOT NULL,
            rarity INTEGER NOT NULL,
            image TEXT
        )
    `);

    db.get(
	'SELECT COUNT(*) as count FROM characters',
	(err, row) => {

		if (row.count === 0) {

			for (const character of characters) {

				db.run(
					`
					INSERT INTO characters
					(
						id,
						name,
						element,
						role,
						rarity,
						image
					)
					VALUES
					(?, ?, ?, ?, ?, ?)
					`,
					[
						character.id,
						character.name,
						character.element,
						character.role,
						character.rarity,
						character.image
					]
				);
			}

			console.log(
				'Charaktere importiert'
			);
		}
	}
);

	db.run(`
        CREATE TABLE IF NOT EXISTS teams (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            team_name TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

	db.run(`
        CREATE TABLE IF NOT EXISTS team_characters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            team_id INTEGER NOT NULL,
            character_id INTEGER NOT NULL,
            slot INTEGER NOT NULL
        )
    `);
});