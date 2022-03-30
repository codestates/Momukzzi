import React from 'react'
const Myreviewlist = ({ comment, shop_name, createdAt }) => {
	return (
		<div className="row-header">
			<div className="column">{shop_name}</div>
			<div className="column">{comment}</div>
			<div className="column">{createdAt}</div>
		</div>
	)
}
export default Myreviewlist
