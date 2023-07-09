import { useState } from 'react';
import styles from './app.module.css';

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordСheck, setPasswordСheck] = useState('');
	const [passwordShow, setPasswordShow] = useState('password');

	const [loginError, setLoginError] = useState(null);

	const showPassword = () => {
		if (passwordShow === 'password') {
			setPasswordShow('text');
		} else {
			setPasswordShow('password');
		}
	};

	const resetForm = () => {
		setEmail('');
		setPassword('');
		setPasswordСheck('');
		setLoginError(null);
	};

	const onEmailCheck = ({ target }) => {
		setEmail(target.value);

		if (!/^[\w_@.]*$/.test(target.value)) {
			setLoginError(
				'Неверный логин. Допустимые символы: буквы, цифры, нижнее подчёркивание, точка и @',
			);
		}
	};

	const onPasswordСheck = ({ target }) => {
		if (target.id === 'input_1') {
			setPassword(target.value);
		} else {
			setPasswordСheck(target.value);
		}

		let newError = null;

		if (!/^[\w_]*$/.test(target.value)) {
			newError = 'Неверный пароль. Допустимые символы: буквы, цифры и нижнее подчёркивание';
		} else if (target.value.length > 20) {
			newError = 'Неверный пароль. Должно быть не больше 20 символов';
		}

		setLoginError(newError);
	};

	const onSubmit = (event) => {
		let newError = null;
		event.preventDefault();
		if (email.length === 0) {
			setLoginError('Ошибка: заполните форму');
			return;
		} else if (password === passwordСheck && password.length > 3) {
			console.log(email, password, passwordСheck);
			resetForm();
		} else if (password !== passwordСheck) {
			newError = 'Не соответствующие пароли';
			setPassword('');
			setPasswordСheck('');
		} else if (password.length <= 3) {
			newError = 'Длинна пароля должна быть более 3-х символов';
		}
		setLoginError(newError);
	};

	const onLoginBlur = () => {
		if (password.length <= 3) {
			setLoginError('Длинна пароля должна быть более 3-х символов');
		}
	};

	return (
		<div className={styles.app}>
			<form onSubmit={onSubmit}>
				<label>E-mail </label>
				<input
					name="email"
					type="email"
					placeholder="Почта"
					value={email}
					onChange={onEmailCheck}
				/>
				<br />
				<label>Ввод пароля: </label>
				<input
					id="input_1"
					name="password"
					type={passwordShow}
					placeholder="Пароль"
					value={password}
					onChange={onPasswordСheck}
					onBlur={onLoginBlur}
				/>
				<br />
				<label>Подтверждение пароля: </label>
				<input
					id="input_2"
					name="password"
					type={passwordShow}
					placeholder="Пароль"
					value={passwordСheck}
					onChange={onPasswordСheck}
					onBlur={onLoginBlur}
				/>
				<br />
				<button type="button" onClick={showPassword}>
					{passwordShow === 'password' ? 'Показать пароль' : 'Скрыть пароль'}
				</button>
				<button type="submit" disabled={!!loginError}>
					Отправить
				</button>
				<button type="button" onClick={resetForm}>
					Очистить форму
				</button>
				{loginError && <div className={styles.errorLabel}>{loginError}</div>}
			</form>
		</div>
	);
};
