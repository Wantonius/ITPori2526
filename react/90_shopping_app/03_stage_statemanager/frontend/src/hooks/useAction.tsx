import {useState,useEffect,useContext} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import {useNavigate} from 'react-router-dom';
import type {AppState} from '../types/states';
import User from '../models/User';
import useAppState from './useAppState';
import ActionContext from '../context/ActionContext';
import * as actionConstants from '../types/actionConstants';

interface UrlRequest {
	request:Request;
	action:string;
}

interface Token {
	token:string;
}

const useAction = () => {
		
	const navigate = useNavigate();
	
	const [urlRequest,setUrlRequest] = useState<UrlRequest>({
		request:new Request("",{}),
		action:""
	})
	
	const {dispatch} = useContext(ActionContext);
	const {token} = useAppState();
	
	//HELPERS AND STORAGE
	
	const setError = (error:string) => {
		dispatch({
			type:actionConstants.REGISTER_FAILED,
			payload:error
		})
	}
	
	
	useEffect(() => {
		
		const fetchData = async () => {
			dispatch({
				type:actionConstants.LOADING
			})
			const response = await fetch(urlRequest.request);
			dispatch({
				type:actionConstants.STOP_LOADING
			})
			if(!response) {
				dispatch({
					type:actionConstants.LOGOUT_FAILED,
					payload:"Server never responded. Logging you out"
				})
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist": {
						const data = await response.json();
						if(!data) {
							dispatch({
								type:actionConstants.FETCH_LIST_FAILED,
								payload:"Failed to parse shopping information. Try again later."
							})
							return;
						}
						dispatch({
							type:actionConstants.FETCH_LIST_SUCCESS,
							payload:data as ShoppingItem[]
						})
						return;
					}
					case "additem":{
						dispatch({
							type:actionConstants.ADD_ITEM_SUCCESS
						})
						getList(token);
						navigate("/list");
						return;
					}
					case "removeitem":
						dispatch({
							type:actionConstants.REMOVE_ITEM_SUCCESS
						})
						getList(token);
						return;
					case "edititem": {
						dispatch({
							type:actionConstants.EDIT_ITEM_SUCCESS
						})
						getList(token);
						return;
					}
					case "register":{
						dispatch({
							type:actionConstants.REGISTER_SUCCESS
						})
						return;
					}
					case "login":{
						let data = await response.json();
						if(!data) {
							dispatch({
								type:actionConstants.LOGIN_FAILED,
								payload:"Failed to parse login information. Try again later"
							})
							return;
						}
						let token = data as Token;
						dispatch({
							type:actionConstants.LOGIN_SUCCESS,
							payload:token.token
						})
			
						return;
					}
					case "logout":{
						dispatch({
							type:actionConstants.LOGOUT_SUCCESS
						})
						return;
					}
					default:
						return;
				}
			} else {
				if(response.status === 403) {
					dispatch({
						type:actionConstants.LOGOUT_FAILED,
						payload:"Your session has expired."
					})
					return;
				}
				let errorMessage = "Server responded with a status "+response.status+" "+response.statusText;
				switch(UrlRequest.action) {
					case "register":{
						if(response.status === 409){
							errorMessage = "Username already in use"
						}
						setError(errorMessage);
						return;
					}
					case "getlist":
						dispatch({
							type:FETCH_LIST_FAILED,
							payload:errorMessage
						})
						return;
					case "additem":
						dispatch({
							type:ADD_ITEM_FAILED,
							payload:errorMessage
						})
						return;
					case "removeitem":
						dispatch({
							type:REMOVE_ITEM_FAILED,
							payload:errorMessage
						})
						return;
					case "edititem":
						dispatch({
							type:EDIT_ITEM_FAILED,
							payload:errorMessage
						})
						return;
					case "login":{  
						dispatch({
							type:LOGIN_FAILED,
							payload:errorMessage
						})
						return;
					}
					case "logout":{
						dispatch({
							type:LOGOUT_FAILED,
							payload:"Server responded with an error. Logging you out"
						})
						return;
					}
					default:
						return;
				}
			}
		}
		fetchData();
		
	},[urlRequest]);

	const getList = (token:string) => {
		setUrlRequest({
			request:new Request("/api/shopping",{
				method:"GET",
				headers:{
					"token":token
				}
			}),
			action:"getlist"
		})
	}
	
	const add = (item:ShoppingItem) => {
		setUrlRequest({
			request:new Request("/api/shopping",{
				method:"POST",
				headers:{
					"Content-type":"application/json",
					"token":token
				},
				body:JSON.stringify(item)
			}),
			action:"additem"
		})
	}
	
	const remove = (id:string) => {
		setUrlRequest({
			request:new Request("/api/shopping/"+id,{
				method:"DELETE",
				headers:{
					"token":token
				}
			}),
			action:"removeitem"
		})
	}
	
	const edit = (item:ShoppingItem) => {
		setUrlRequest({
			request:new Request("/api/shopping/"+item.id,{
				method:"PUT",
				headers:{
					"Content-type":"application/json",
					"token":token
				},
				body:JSON.stringify(item)
			}),
			action:"edititem"
		})
	}
	
	const register = (user:User) => {
		setUrlRequest({
			request: new Request("/register",{
				method:"POST",
				headers:{
					"Content-type":"application/json"
				},
				body:JSON.stringify(user)
			}),
			action:"register"
		})
	}

	const login = (user:User) => {
		dispatch({
			type:actionConstants.SET_USER,
			payload:user.username
		})
		setUrlRequest({
			request: new Request("/login",{
				method:"POST",
				headers:{
					"Content-type":"application/json"
				},
				body:JSON.stringify(user)
			}),
			action:"login"
		})
	}
	
	const logout = () => {
		setUrlRequest({
			request:new Request("/logout",{
				method:"POST",
				headers:{
					"token":token
				}
			}),
			action:"logout"
		})
	}

	return {getList,add,remove,edit,register,login,logout,setError}
}

export default useAction;