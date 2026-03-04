import ShoppingItem from '../models/ShoppingItem';

interface AppState {
	list:ShoppingItem[];
	token:string;
	isLogged:boolean;
	loading:boolean;
	error:string;
	user:string;
}

export default AppState;