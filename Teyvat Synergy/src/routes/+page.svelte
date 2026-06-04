<script>
	let login = $state('');
	let password = $state('');

	async function handleLogin() {
		const response = await fetch('http://localhost:3000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				login,
				password,
			}),
		});

		const data = await response.json();

		if (!response.ok) {
		alert(data.message);
		return;
	}

	localStorage.setItem('user',JSON.stringify(data.user));

	window.location.href = '/charakter';
}
</script>

<div class="login-page">
	<div class="background"></div>

	<div class="login-card">
		<div class="logo-section">
			<div class="logo-circle">
				<span>✨</span>
			</div>

			<h1>Teyvat Synergy</h1>

			<p>Baue das perfekte Team.<br /></p>
		</div>

		<!-- Card in der Mitte -->
		<form onsubmit={handleLogin}>
			<div class="input-group">
				<label for="login">Benutzername oder E-Mail</label>

				<input
					id="login"
					type="text"
					bind:value={login}
					placeholder="Benutzername oder E-Mail"
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
			<button type="submit" class="login-btn">Anmelden</button>
		</form>

		<p class="register-text">
			Noch kein Konto?
			<a href="/register">Registrieren</a>
		</p>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: Arial, sans-serif;
		background: #0b1020;
	}

	.login-page {
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
		background-image: url('/src/lib/images/Login_Background.png');
		background-size: cover;
		background-position: center;
		opacity: 0.35;
	}

	.login-card {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 430px;
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
		margin-bottom: 35px;
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
		margin-bottom: 20px;
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

	.login-btn {
		width: 100%;
		padding: 14px;
		border: none;
		border-radius: 14px;
		background: #9333ea;
		color: white;
		font-size: 16px;
		font-weight: bold;
		cursor: pointer;
		transition: 0.2s;
	}

	.login-btn:hover {
		background: #a855f7;
	}

	.register-text {
		text-align: center;
		margin-top: 25px;
		color: #9ca3af;
		font-size: 14px;
	}

	.register-text a {
		color: #c084fc;
		text-decoration: none;
		font-weight: bold;
	}

	.register-text a {
		color: #c084fc;
		text-decoration: none;
		font-weight: bold;
	}

	.register-text a:hover {
		color: #d8b4fe;
	}

	@media (max-width: 500px) {
		.login-card {
			padding: 30px 20px;
		}

		h1 {
			font-size: 30px;
		}
	}
</style>