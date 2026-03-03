import ShoppingItem from '../models/ShoppingItem';

interface Props {
	item:ShoppingItem;
	removeItem(id:number):void;
	changeMode(mode:string,index:number):void;
}

const RemoveRow = (props:Props) => {
	
	return(
		<tr>
			<td>{props.item.type}</td>
			<td>{props.item.count}</td>
			<td>{props.item.price}</td>
			<td><button className="btn btn-danger" onClick={() => props.changeMode("cancel",props.index)}>
			Cancel</button></td>
			<td><button className="btn btn-successs" onClick={() => props.removeItem(props.item.id)}>
			Confirm</button></td>
		</tr>
	)
}

export default RemoveRow;