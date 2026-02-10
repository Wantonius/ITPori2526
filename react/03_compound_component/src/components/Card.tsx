import React,{useState} from 'react';
import Square from './Square';
import Label from './Label';

interface State {
	color:string;
}

const Card = () => {
	
	const [state,setState] = useState<State>({
		color:"red"
	})
	
	const onColorChange = () => {
		let color = "#";
		const colorpicker = "ABCDEF0123456789";
		for(let i=0;i<6;i++) {
			let temp = Math.floor(Math.random()*16);
			color = color + colorpicker[temp];
		}
		setState({
			color:color
		})
	}
	
	const cardStyle:React.CSSProperties = {
		height:200,
		width:150,
		backgroundColor:"#fff",
		filter:"drop-shadow(0px 5px 5px #666)"
	}
	return(
		<div style={cardStyle}>
			<Square color={state.color}/>
			<Label color={state.color} onColorChange={onColorChange}/>
		</div>
	)
}

export default Card;