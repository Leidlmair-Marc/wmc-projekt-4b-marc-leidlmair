<script>
	let username = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	async function handleRegister() {
		if (password !== confirmPassword) {
			alert('Passwörter stimmen nicht überein');
			return;
		}

		const response = await fetch('http://localhost:3000/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		});
		const data = await response.json();

		alert(data.message);

		if (response.ok) {
			window.location.href = '/';
		}
	}
</script>

<div class="register-page">
	<div class="background"></div>

	<div class="register-card">
		<div class="logo-section">
			<div class="logo-circle">
				<span>✨</span>
			</div>

			<h1>Teyvat Synergy</h1>

			<p>
				Erstelle dein Konto und<br />
				beginne dein Abenteuer.
			</p>
		</div>

		<!-- Card in der Mitte -->
		<form onsubmit={handleRegister}>
			<div class="input-group">
				<label for="username">Benutzername</label>

				<input
					id="username"
					type="text"
					bind:value={username}
					placeholder="Dein Benutzername"
				/>
			</div>

			<div class="input-group">
				<label for="email">E-Mail-Adresse</label>

				<input
					id="email"
					type="email"
					bind:value={email}
					placeholder="example@mail.com"
				/>
			</div>

			<div class="input-group">
				<label for="password">Passwort</label>

				<input
					id="password"
					type="password"
					bind:value={password}
					placeholder="••••••••"
				/>
			</div>

			<div class="input-group">
				<label for="confirmPassword"> Passwort bestätigen </label>

				<input
					id="confirmPassword"
					type="password"
					bind:value={confirmPassword}
					placeholder="••••••••"
				/>
			</div>

			<button type="submit" class="register-btn">Registrieren</button>
		</form>

		<p class="login-text">
			Bereits ein Konto?
			<a href="/">Anmelden</a>
		</p>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: Arial, sans-serif;
		background: #0b1020;
	}

	.register-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		padding: 20px;
		overflow: hidden;
	}

	.background {
		position: fixed;
		inset: 0;
		background-image: url('/src/lib/images/Register_Background.png');
		background-size: cover;
		background-position: center top;
		opacity: 0.35;
	}

	.register-card {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 450px;
		padding: 40px;
		border-radius: 30px;
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
		color: white;
	}

	.logo-section {
		text-align: center;
		margin-bottom: 30px;
	}

	.logo-circle {
		width: 80px;
		height: 80px;
		margin: 0 auto 20px;
		border-radius: 50%;
		background: rgba(168, 85, 247, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36px;
	}

	h1 {
		margin: 0;
		font-size: 38px;
		font-weight: bold;
	}

	.logo-section p {
		color: #cbd5e1;
		margin-top: 15px;
		line-height: 1.5;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 18px;
	}

	label {
		margin-bottom: 8px;
		font-size: 14px;
		color: #d1d5db;
	}

	input {
		padding: 14px;
		border-radius: 14px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(255, 255, 255, 0.08);
		color: white;
		font-size: 15px;
		outline: none;
	}

	input::placeholder {
		color: #9ca3af;
	}

	input:focus {
		border-color: #a855f7;
		box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.3);
	}

	.register-btn {
		width: 100%;
		padding: 14px;
		margin-top: 10px;
		border: none;
		border-radius: 14px;
		background: #9333ea;
		color: white;
		font-size: 16px;
		font-weight: bold;
		cursor: pointer;
		transition: 0.2s;
	}

	.register-btn:hover {
		background: #a855f7;
	}

	.login-text {
		text-align: center;
		margin-top: 25px;
		color: #9ca3af;
		font-size: 14px;
	}

	.login-text a {
		color: #c084fc;
		text-decoration: none;
		font-weight: bold;
	}

	.login-text a:hover {
		color: #d8b4fe;
	}

	@media (max-width: 500px) {
		.register-card {
			padding: 30px 20px;
		}

		h1 {
			font-size: 30px;
		}
	}
</style>