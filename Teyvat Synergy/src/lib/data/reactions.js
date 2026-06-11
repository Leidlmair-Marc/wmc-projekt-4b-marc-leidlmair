export const allReactions = [
	{
		elements: ['Hydro', 'Cryo'],
		name: {
			de: 'Gefroren',
			en: 'Frozen'
		},
		description: {
			de: 'Friert Gegner ein und macht sie bewegungsunfähig.',
			en: 'Freezes enemies and prevents them from moving.'
		}
	},

	{
		elements: ['Pyro', 'Hydro'],
		name: {
			de: 'Vaporisieren',
			en: 'Vaporize'
		},
		description: {
			de: 'Verstärkt den Schaden von Hydro- oder Pyro-Angriffen.',
			en: 'Increases the damage of Hydro or Pyro attacks.'
		}
	},

	{
		elements: ['Pyro', 'Cryo'],
		name: {
			de: 'Schmelzen',
			en: 'Melt'
		},
		description: {
			de: 'Verursacht sehr hohen zusätzlichen Schaden.',
			en: 'Deals significantly increased damage.'
		}
	},

	{
		elements: ['Hydro', 'Electro'],
		name: {
			de: 'Elektrogeladen',
			en: 'Electro-Charged'
		},
		description: {
			de: 'Verursacht fortlaufenden Electro-Schaden.',
			en: 'Deals continuous Electro damage.'
		}
	},

	{
		elements: ['Pyro', 'Electro'],
		name: {
			de: 'Überladen',
			en: 'Overloaded'
		},
		description: {
			de: 'Erzeugt eine Explosion mit Flächenschaden.',
			en: 'Creates an explosion that deals AoE damage.'
		}
	},

	{
		elements: ['Cryo', 'Electro'],
		name: {
			de: 'Supraleiter',
			en: 'Superconduct'
		},
		description: {
			de: 'Verringert die physische Resistenz von Gegnern.',
			en: 'Reduces enemies physical resistance.'
		}
	},

	{
		elements: ['Dendro', 'Hydro'],
		name: {
			de: 'Blühen',
			en: 'Bloom'
		},
		description: {
			de: 'Erzeugt Dendrokerne.',
			en: 'Creates Dendro Cores.'
		}
	},

	{
		elements: ['Dendro', 'Pyro'],
		name: {
			de: 'Brennen',
			en: 'Burning'
		},
		description: {
			de: 'Verursacht fortlaufenden Pyro-Schaden.',
			en: 'Deals continuous Pyro damage.'
		}
	},

	{
		name: {
			de: 'Verwirbelung',
			en: 'Swirl'
		},
		required: ['Anemo'],
		oneOf: ['Pyro', 'Hydro', 'Cryo', 'Electro'],
		description: {
			de: 'Verbreitet Elemente auf mehrere Gegner.',
			en: 'Spreads elements to nearby enemies.'
		}
	},

	{
		name: {
			de: 'Kristallisation',
			en: 'Crystallize'
		},
		required: ['Geo'],
		oneOf: ['Pyro', 'Hydro', 'Cryo', 'Electro'],
		description: {
			de: 'Erzeugt einen Kristallschild abhängig vom Element.',
			en: 'Creates an elemental crystal shield.'
		}
	},

	{
		name: {
			de: 'Beschleunigen',
			en: 'Quicken'
		},
		required: ['Dendro', 'Electro'],
		description: {
			de: 'Erzeugt den Beschleunigen-Zustand.',
			en: 'Creates the Quicken state.'
		}
	},

	{
		name: {
			de: 'Ausbreitung',
			en: 'Spread'
		},
		required: ['Dendro', 'Electro'],
		description: {
			de: 'Erhöht den Dendro-Schaden erheblich.',
			en: 'Greatly increases Dendro damage.'
		}
	},

	{
		name: {
			de: 'Verschärfung',
			en: 'Aggravate'
		},
		required: ['Dendro', 'Electro'],
		description: {
			de: 'Erhöht den Electro-Schaden erheblich.',
			en: 'Greatly increases Electro damage.'
		}
	},

	{
		name: {
			de: 'Hyperblüte',
			en: 'Hyperbloom'
		},
		required: ['Dendro', 'Hydro', 'Electro'],
		description: {
			de: 'Dendrokerne greifen Gegner automatisch an.',
			en: 'Dendro Cores automatically attack enemies.'
		}
	},

	{
		name: {
			de: 'Üppiges Wachstum',
			en: 'Burgeon'
		},
		required: ['Dendro', 'Hydro', 'Pyro'],
		description: {
			de: 'Dendrokerne explodieren mit größerem Schaden.',
			en: 'Dendro Cores explode with increased damage.'
		}
	}
];