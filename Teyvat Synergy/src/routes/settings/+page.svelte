<script>
	let language = $state(
		localStorage.getItem('language') || 'de'
	);

    const user = JSON.parse(
	    localStorage.getItem('user')
    );

    let username = $state(
	    user?.username ?? ''
    );

    let email = $state(
	    user?.email ?? ''
);

	function saveLanguage() {

		localStorage.setItem(
			'language',
			language
		);

		alert(
			'Sprache gespeichert'
		);
	}

	async function deleteAccount() {

	const confirmDelete = confirm(
		'Möchtest du deinen Account wirklich löschen?'
	);

	if (!confirmDelete) return;

	const user = JSON.parse(
		localStorage.getItem('user')
	);

	const response = await fetch(
		`http://localhost:3000/users/${user.id}`,
		{
			method: 'DELETE'
		}
	);

	const data = await response.json();

	alert(data.message);

	if (response.ok) {

		localStorage.removeItem(
			'user'
		);

		window.location.href = '/';
	}
}
</script>

<div class="page">

	<h1>
		Einstellungen
	</h1>

	<div class="settings-grid">

		<div class="card">

			<h2>
				Konto
			</h2>

			<div class="info">

				<p>
					<strong>
						Benutzername:
					</strong>

					{username}
				</p>

				<p>
					<strong>
						E-Mail:
					</strong>

					{email}
				</p>

			</div>

			<button
				class="danger-btn"
				onclick={deleteAccount}
			>
				Account löschen
			</button>

		</div>

		<div class="card">

			<h2>
				Sprache
			</h2>

			<p>
				Wähle die Sprache
				der Anwendung.
			</p>

			<select
				bind:value={language}
			>

				<option value="de">
					Deutsch
				</option>

				<option value="en">
					English
				</option>

			</select>

			<button
				class="save-btn"
				onclick={saveLanguage}
			>
				Speichern
			</button>

		</div>

		<div class="card">

			<h2>
				Statistiken
			</h2>

			<div class="stats">

				<div>
					Gespeicherte Teams:
					<span>0</span>
				</div>

				<div>
					Lieblings-Element:
					<span>Hydro</span>
				</div>

				<div>
					Meistgenutzte Rolle:
					<span>DPS</span>
				</div>

			</div>
		</div>
	</div>
</div>

<style>

	.page {

		padding: 30px;

		color: white;
	}

	h1 {

		margin-bottom: 25px;

		font-size: 38px;
	}

	.settings-grid {

		display: grid;

		grid-template-columns:
			repeat(
				auto-fit,
				minmax(
					350px,
					1fr
				)
			);

		gap: 20px;
	}

	.card {

		background:
			rgba(
				20,
				20,
				40,
				0.9
			);

		border-radius: 20px;

		padding: 25px;

		border:
			1px solid
			rgba(
				255,
				255,
				255,
				0.08
			);
	}

	.card h2 {

		margin-top: 0;

		margin-bottom: 15px;

		color: white;
	}

	.info p {

		color: #cbd5e1;
	}

	select {

		width: 100%;

		padding: 12px;

		border-radius: 12px;

		border: none;

		background:
			rgba(
				255,
				255,
				255,
				0.08
			);

		color: white;

		margin-top: 10px;

		margin-bottom: 15px;
	}

	.save-btn {

		width: 100%;

		padding: 12px;

		border: none;

		border-radius: 12px;

		background: #9333ea;

		color: white;

		font-weight: bold;

		cursor: pointer;
	}

	.save-btn:hover {

		background: #a855f7;
	}

	.danger-btn {

		width: 100%;

		padding: 12px;

		border: none;

		border-radius: 12px;

		background: #ef4444;

		color: white;

		font-weight: bold;

		cursor: pointer;

		margin-top: 15px;
	}

	.danger-btn:hover {

		background: #dc2626;
	}

	.stats {

		display: flex;

		flex-direction: column;

		gap: 15px;
	}

	.stats div {

		background:
			rgba(
				255,
				255,
				255,
				0.05
			);

		padding: 12px;

		border-radius: 12px;
	}

	.stats span {

		float: right;

		color: #c084fc;

		font-weight: bold;
	}

	@media (
		max-width: 768px
	) {

		.settings-grid {

			grid-template-columns:
				1fr;
		}
	}

</style>