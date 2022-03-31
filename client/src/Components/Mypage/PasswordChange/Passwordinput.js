function PasswordInputField({
	handleValidation,
	handlePasswordChange,
	passwordValue,
	passwordError,
}) {
	return (
		<>
			<div className="Fix-toggle-container">
				<input
					type="password"
					value={passwordValue}
					onChange={handlePasswordChange}
					onKeyUp={handleValidation}
					name="password"
					placeholder="Password"
					className="Fix-toggle-input"
				/>
				<p>{passwordError}</p>
			</div>
		</>
	)
}
export default PasswordInputField
