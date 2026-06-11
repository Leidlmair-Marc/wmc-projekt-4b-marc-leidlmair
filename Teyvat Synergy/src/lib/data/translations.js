import { writable } from 'svelte/store';

export const language = writable('de');

export const translations = {
	de: {
		login: 'Anmelden',
		register: 'Registrieren',
		characters: 'Charaktere',
		teamBuilder: 'Team Builder',
		savedTeams: 'Gespeicherte Teams',
		settings: 'Einstellungen',
		username: 'Benutzername',
        username_email: 'Benutzername oder E-Mail',
		email: 'E-Mail',
		password: 'Passwort',
		deleteAccount: 'Account löschen',
		save: 'Speichern',
		language: 'Sprache'
	},

	en: {
		login: 'Login',
		register: 'Register',
		characters: 'Characters',
		teamBuilder: 'Team Builder',
		savedTeams: 'Saved Teams',
		settings: 'Settings',
		username: 'Username',
		username_email: 'Username or Email',
		email: 'Email',
		password: 'Password',
		deleteAccount: 'Delete Account',
		save: 'Save',
		language: 'Language'
	}
};