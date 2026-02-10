import React from 'react';

interface Props {
	color:string;
}

const Square = (props:Props) => {
	
	const squareStyle:React.CSSProperties = {
		height:150,
		backgroundColor:props.color
	}
	return (
		<div style={squareStyle}></div>
	)
}

export default Square;