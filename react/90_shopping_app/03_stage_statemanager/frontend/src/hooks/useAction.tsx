import {useState,useEffect} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import {useNavigate} from 'react-router-dom';
import type {AppState} from '../types/states';
import User from '../models/User';

interface UrlRequest {
	request:Request;
	action:string;
}

interface Token {
	token:string;
}

const useAction = () => {
		
	const [state,setState] = useState<AppState>({
		list:[],
		token:"",
		isLogged:false,
		loading:false,
		error:"",
		user:""
	});
	
	const navigate = useNavigate();
	
	const [urlRequest,setUrlRequest] = useState<UrlRequest>({
		request:new Request("",{}),
		action:""
	})
	
	//HELPERS AND STORAGE
	
	const saveToStorage = (state:AppState) => {
		sessionStorage.setItem("state",JSON.stringify(state));
	}
	
	const setError = (error:string) => {
		setState((state) => {
			let tempState:AppState = {
				...state,
				error:error
			}
			saveToStorage(tempState);
			return tempState;
		})
	}
	
	const setLoading = (loading:boolean) => {
		setState((state) => {
			return {
				...state,
				loading:loading,
				error:""
			}
		})
	}
	
	const clearState = (error:string) => {
		let tempState:AppState = {
			list:[],
			token:"",
			isLogged:false,
			loading:false,
			error:error,
			user:""
		}
		saveToStorage(tempState);
		setState(tempState);

	}
	
	const setUser = (user:string) => {
		setState((state) => {
			let tempState:AppState= {
				...state,
				user:user
			}
			saveToStorage(tempState);
			return tempState;
		})
	}
	
	useEffect(() => {
		let temp = sessionStorage.getItem("state");
		if(temp) {
			let state = JSON.parse(temp) as AppState;
			setState(state);
			if(state.isLogged) {
				getList(state.token);
			}
		}
	},[]);
	
	useEffect(() => {
		
		const fetchData = async () => {
			setLoading(true);
			const response = await fetch(urlRequest.request);
			setLoading(false);
			if(!response) {
				console.log("Server did not respond");
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist": {
						const data = await response.json();
						if(!data) {
							setError("Failed to parse json. Try again later");
							return;
						}
						setState((state) => {
							let tempState:AppState = {
								...state,
								list:data
							}
							saveToStorage(tempState);
							return tempState;
						})
						return;
					}
					case "additem":{
						getList(state.token);
						navigate("/");
						return;
					}
					case "removeitem":
					case "edititem": {
						getList(state.token);
						return;
					}
					case "register":{
						setError("Register Success");
						return;
					}
					case "login":{
						let temp = await response.json() as Token;
						setState((state) => {
							let tempState:AppState = {
								...state,
								token:temp.token,
								isLogged:true
							}
							saveToStorage(tempState);							
							return tempState;
						})
						getList(temp.token);
						return;
					}
					case "logout":{
						clearState("");
						return;
					}
					default:
						return;
				}
			} else {
				if(response.status === 403) {
					clearState("Your session has expired. Logging you out.");
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
					case "additem":
					case "removeitem":
					case "edititem":
					case "login":{  
						setError(errorMessage);
						return;
					}
					case "logout":{
						clearState("Server responded with an error. Logging you out.");
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
					"token":state.token
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
					"token":state.token
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
					"token":state.token
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
		setUser(user.username);
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
					"token":state.token
				}
			}),
			action:"logout"
		})
	}

	return {state,add,remove,edit,register,login,logout,setError}
}

export default useAction;