import styled from 'styled-components'

export const Out = {
	ModalBackdrop: styled.div`
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.4);
	`,
	Container: styled.div`
		margin: 0 auto;
		width: 550px;
		font-weight: 700;
		text-align: left;
		transform: translateY(20%);
		border: 2px solid #ffba34;
		background-color: white;
		border-radius: 20px;
	`,
	Title: styled.div`
		font-size: 20px;
		font-weight: bolder;
		margin-bottom: 5px;
		text-align: center;
	`,
	ContentContainer: styled.div`
		padding: 10px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		text-align: center;
	`,

	ContentText: styled.div`
		font-size: 15px;
		line-height: 25px;
	`,

	CheckboxContainer: styled.div`
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		width: 70%;
		margin: 20px;
		margin-bottom: 10px;
		.checkbox-input-check {
			margin-right: 15px;
		}
		.checkbox-agree-text {
			font-size: 12px;
			color: #fd5d5d;
		}
	`,
	MiddleContainer: styled.div`
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		.fillin-text {
			margin-bottom: 10px;
			color: #fd5d5d;
		}
		.fillin-input {
			border: 2px solid white;
			-webkit-box-shadow: gray 3px 3px 3px 3px;
			box-shadow: gray 3px 3px 3px 3px;
			border-radius: 5px;
			-webkit-transition: 120ms ease all;
			transition: 120ms ease all;
		}

		.fillin-input:focus {
			outline: none;
			-webkit-box-shadow: gray 2px 2px 2px 2px;
			box-shadow: gray 2px 2px 2px 2px;
			border: black solid 2px;
		}
	`,
	SubmitButtonDiv: styled.div`
		margin-top: 30px;
		width: 100%;
		height: 100px;
		margin-right: 10px;
		display: flex;

		& > button {
			padding: 6px 6px;
			background-color: #ffba34;
			border-radius: 4px;
			border: none;
			color: white;
			cursor: pointer;
			height: 50px;
		}
		.cancel {
			margin-left: auto;
			margin-right: 5px;
		}
		.submit {
		}
	`,
}
