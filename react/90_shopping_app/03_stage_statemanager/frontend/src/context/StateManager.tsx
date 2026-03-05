import React,{useReducer} from 'react';
import ActionContext from './ActionContext';
import AppStateContext from './AppStateContext';
import type {AppState} from '../types/states';
import type Action from '../types/Action';
import * as actionConstants from '../types/actionConstants';
import ShoppingItem from '../models/ShoppingItem';

interface Props {
	children:React.ReactNode;
}

const getInitialState = ():AppState => {
	let state = sessionStorage.getItem("state");
	if(state) {
		return JSON.parse(state);
	} else {
		return {
			list:[],
			isLogged:false,
			loading:false,
			token:"",
			error:"",
			user:""
		}
	}
}

const initialState = getInitialState();

const saveToStorage = (state:AppState) => {
	sessionStorage.setItem("state",JSON.stringify(state));
}

const listReducer = (state:AppState,action:Action):AppState => {
	return state;
}

const StateManager = (props:Props) => {
	
	const [state,dispatch] = useReducer(listReducer,initialState);
	
	return(
		<AppStateContext.Provider value={state}>
			<ActionContext.Provider value={{dispatch:dispatch}}>
				{props.children}
			</ActionContext.Provider>
		</AppStateContext.Provider>
	)
}

export default StateManager;