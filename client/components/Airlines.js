import React from 'react'
import { connect } from "react-redux";

export const Airlines = (props) => {
	const { products } = props
	return (
		<div>
			
			<hr/>
		</div>
	)
}

const mapState = (state) => {
	return {
		products: state.products
	}
}

export default connect(mapState)(Airlines)