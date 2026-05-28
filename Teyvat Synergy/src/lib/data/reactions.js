export const allReactions = [
	{
		elements: ['Hydro', 'Cryo'],
		name: 'Gefroren',
		description: 'Friert Gegner ein und macht sie bewegungsunfähig.'
	},

	{
		elements: ['Pyro', 'Hydro'],
		name: 'Vaporisieren',
		description: 'Verstärkt den Schaden von Hydro- oder Pyro-Angriffen.'
	},

	{
		elements: ['Pyro', 'Cryo'],
		name: 'Schmelzen',
		description: 'Verursacht sehr hohen zusätzlichen Schaden.'
	},

	{
		elements: ['Hydro', 'Electro'],
		name: 'Elektrogeladen',
		description: 'Verursacht fortlaufenden Electro-Schaden.'
	},

	{
		elements: ['Pyro', 'Electro'],
		name: 'Überladen',
		description: 'Erzeugt eine Explosion mit Flächenschaden.'
	},

	{
		elements: ['Cryo', 'Electro'],
		name: 'Supraleiter',
		description: 'Verringert die physische Resistenz von Gegnern.'
	},

	{
		elements: ['Dendro', 'Hydro'],
		name: 'Blühen',
		description: 'Erzeugt Dendrokerne.'
	},

	{
		elements: ['Dendro', 'Pyro'],
		name: 'Brennen',
		description: 'Verursacht fortlaufenden Pyro-Schaden.'
	},

	{
		name: 'Verwirbelung',
		required: ['Anemo'],
		oneOf: ['Pyro', 'Hydro', 'Cryo', 'Electro'],
		description: 'Verbreitet Elemente auf mehrere Gegner.',
	},

	{
		name: 'Kristallisation',
		required: ['Geo'],
		oneOf: ['Pyro', 'Hydro', 'Cryo', 'Electro'],
		description: 'Erzeugt einen Kristallschild abhängig vom Element.',
	},

	{
		name: 'Beschleunigen',
		required: ['Dendro', 'Electro'],
		description: 'Erzeugt den Beschleunigen-Zustand.',
	},

	{
		name: 'Ausbreitung',
		required: ['Dendro', 'Electro'],
		description: 'Erhöht den Dendro-Schaden erheblich.',
	},

	{
		name: 'Verschärfung',
		required: ['Dendro', 'Electro'],
		description: 'Erhöht den Electro-Schaden erheblich.',
	},

	{
		name: 'Hyperblüte',
		required: ['Dendro', 'Hydro', 'Electro'],
		description: 'Dendrokerne greifen Gegner automatisch an.',
	},
	
	{
		name: 'Üppiges Wachstum',
		required: ['Dendro', 'Hydro', 'Pyro'],
		description: 'Dendrokerne explodieren mit größerem Schaden.',
	}
];