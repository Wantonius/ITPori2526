import ShoppingItem from '../models/ShoppingItem';

export interface AppState {
	list:ShoppingItem[];
	token:string;
	isLogged:boolean;
	loading:boolean;
	error:string;
	user:string;
}

