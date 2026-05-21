<script>
	let email = $state('');
	let password = $state('');

	function handleLogin() {
		console.log({
			email,
			password
		});
	}
</script>

<div class="login-page">
	<div class="background"></div>
	<div class="overlay"></div>

	<div class="login-card">
		<!-- Logo -->
		<div class="logo-section">
			<div class="logo-circle">
				<span>✨</span>
			</div>

			<h1>Teyvat Synergy</h1>

			<p>
				Baue das perfekte Team.<br />
			</p>
		</div>

		<!-- Form -->
		<form onsubmit={handleLogin}>
			<!-- Email -->
			<div class="input-group">
				<label for="email">E-Mail-Adresse</label>

				<input
					id="email"
					type="email"
					bind:value={email}
					placeholder="example@mail.com"
				/>
			</div>

			<!-- Password -->
			<div class="input-group">
				<label for="password">Passwort</label>

				<input
					id="password"
					type="password"
					bind:value={password}
					placeholder="••••••••"
				/>
			</div>

			<!-- Remember -->
			<div class="options">
				<label class="checkbox">
					<input type="checkbox" />
					Angemeldet bleiben
				</label>

				<button type="button" class="forgot-btn">
					Passwort vergessen?
				</button>
			</div>

			<!-- Login Button -->
			<button type="submit" class="login-btn">
				Anmelden
			</button>
		</form>

		<!-- Register -->
		<p class="register-text">
			Noch kein Konto?
			<span>Registrieren</span>
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
	position: absolute;
	inset: 0;
	background-image: url('/src/lib/images/Login_Background.png');
	background-size: cover;
	background-position: center;
}

	.overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			rgba(11, 16, 32, 0.7),
			rgba(11, 16, 32, 1)
		);
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

	.options {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 25px;
		font-size: 14px;
	}

	.checkbox {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #d1d5db;
	}

	.forgot-btn {
		background: none;
		border: none;
		color: #c084fc;
		cursor: pointer;
		font-size: 14px;
	}

	.forgot-btn:hover {
		color: #d8b4fe;
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

	.register-text span {
		color: #c084fc;
		cursor: pointer;
	}

	.register-text span:hover {
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