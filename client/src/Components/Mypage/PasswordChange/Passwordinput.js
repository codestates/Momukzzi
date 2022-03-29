function PasswordInputField({
	handleValidation,
	handlePasswordChange,
	passwordValue,
	passwordError,
}) {
	return (
		<>
			<div className="form-group my-3">
				<input
					type="password"
					value={passwordValue}
					onChange={handlePasswordChange}
					onKeyUp={handleValidation}
					name="password"
					placeholder="Password"
					className="form-control"
				/>
				<p className="text-danger">{passwordError}</p>
			</div>
		</>
	)
}
export default PasswordInputField
