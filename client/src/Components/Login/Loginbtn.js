import React, { useState } from 'react'
import Loginmodal from './Loginmodal'

function Loginbtn() {
	const [modalOpen, setModalOpen] = useState(false)

	return (
		<div className="Loginbtn">
			<h1>로그인</h1>
			<button
				className="openModalBtn"
				onClick={() => {
					setModalOpen(true)
				}}
			>
				Open
			</button>
			{modalOpen && <Loginmodal setOpenModal={setModalOpen} />}
		</div>
	)
}

export default Loginbtn
