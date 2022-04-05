import styled from 'styled-components'
import MypageImg from './21631.jpg'
import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
@font-face {
	font-family: mypagefont;
	src: url('./mypagefont.ttf');
}
`

export const My = {
	MypageContainer: styled.div`
		padding: 10px;
		font-size: 14px;
		word-break: keep-all;
		min-height: 81vh;
		/* background-image: url('https://www.freepik.com/free-vector/fast-food-isometric-set_5972199.htm');
		background-repeat: repeat-x; */

		@media (min-width: 758px) and (max-width: 1023px) {
			margin: 70px 0 20px 0;
			font-size: 20px;
		}
		@media (min-width: 1024px) {
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			margin-top: 60px;
			min-height: 79.6vh;
			font-size: 23px;
		}
	`,
	MypageLeftContainer: styled.div`
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		width: 50%;
		margin-right: 50px;
	`,
	MypageTitle: styled.div`
		margin-bottom: 5px;
		font-size: 100%;
		font-weight: bolder;
		font-family: mypagefont;

		@media (min-width: 758px) and (max-width: 1023px) {
			font-size: 30px;
			margin-bottom: 10px;
		}
		@media (min-width: 1024px) {
			font-size: 28px;
			margin-bottom: 10px;
		}
	`,
	MypageMyinfoContainer: styled.div`
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		border: 3px solid rgb(39, 51, 67);
		border-radius: 10px;
		padding: 5px;
		margin-bottom: 15px;
		overflow: auto;
		background-image: url('${MypageImg}');
		background-position: 80px 50px;

		@media (min-width: 1024px) {
			height: 650px;
			padding-left: 25px;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-ms-flex-direction: column;
			flex-direction: column;
		}
	`,
	MypageMyinfoNickname: styled.div`
		z-index: 10;
		font-size: 2rem;
		font-weight: bolder;
		margin-top: 20px;
		margin-bottom: 5px;
		font-family: mypagefont;
		@media (min-width: 758px) and (max-width: 1023px) {
			font-size: 2rem;
			@media (min-width: 1024px) {
				margin-top: 2rem;
				font-size: 2rem;
			}
		}
	`,
	MypageFixMyinfoToggleButton: styled.span`
		margin: 5px 0 5px 0;
		opacity: 0.5;
		cursor: pointer;
		width: -webkit-fit-content;
		width: -moz-fit-content;
		width: fit-content;
		@media (min-width: 758px) and (max-width: 1023px) {
			font-size: 18px;
		}
	`,
	MypageFixToggleContainer: styled.form`
		padding: 5px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: start;
		-ms-flex-pack: start;
		justify-content: flex-start;

		@media (min-width: 300px) and (max-width: 757px) {
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-ms-flex-direction: column;
			flex-direction: column;
		}
	`,
	MypageFixMyinfoToggleButton: styled.span`
		margin: 5px 0 5px 0;
		opacity: 0.5;
		cursor: pointer;
		width: -webkit-fit-content;
		width: -moz-fit-content;
		width: fit-content;
		@media (min-width: 758px) and (max-width: 1023px) {
			font-size: 18px;
		}
	`,
	MypageSignoutButton: styled.button`
		padding-top: 3px;
		width: 100px;
		margin-top: 4px;
		-webkit-box-shadow: gray 4px 4px 4px;
		box-shadow: gray 4px 4px 4px;
		border-radius: 7px;
		-webkit-transition: 120ms ease;
		transition: 120ms ease;
		background-color: white;
		cursor: pointer;
		&:hover {
			-webkit-box-shadow: gray 6px 6px 6px;
			box-shadow: gray 6px 6px 6px;
		}
		MypageSignoutButton:hover:before,
		MypageSignoutButtons:hover:after {
			width: 100%;
			-webkit-transition: ease all;
			transition: ease all;
		}
		MypageSignoutButtons:active {
			-webkit-box-shadow: none;
			box-shadow: none;
		}

		&:hover:before,
		&:hover:after {
			width: 100%;
			-webkit-transition: ease all;
			transition: ease all;
		}
		@media (min-width: 758px) and (max-width: 1023px) {
			width: 130px;
			height: 35px;
		}
		@media (min-width: 1024px) {
			width: 150px;
			height: 35px;
			font-size: 22px;
		}
	`,
	MypageRightContainer: styled.div`
		width: 50%;
	`,
	MypageReviewContainer: styled.div`
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		border: 3px solid white;
		border-radius: 10px;
		padding: 5px;
		overflow: auto;

		@media (min-width: 300px) and (max-width: 757px) {
			margin-bottom: 60px;
		}
		@media (min-width: 1024px) {
			height: 670px;
			overflow: auto;
		}
	`,
}
