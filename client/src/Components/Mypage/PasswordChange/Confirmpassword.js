function ConfirmPasswordInputField({
	handleValidation,
	handlePasswordChange,
	confirmPasswordValue,
	confirmPasswordError,
}) {
	return (
		<>
			<div className="Fix-toggle-container">
				<input
					type="password"
					value={confirmPasswordValue}
					onChange={handlePasswordChange}
					onKeyUp={handleValidation}
					name="confirmPassword"
					placeholder="Password"
					className="Fix-toggle-input"
				/>
				<p className="text-danger">{confirmPasswordError}</p>
			</div>
		</>
	)
}
export default ConfirmPasswordInputField
