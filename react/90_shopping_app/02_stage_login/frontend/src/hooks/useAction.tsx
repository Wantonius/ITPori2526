import {useState,useEffect} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import {useNavigate} from 'react-router-dom';
import AppState from '../types/states';
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
		setState((state) => {
			let tempState:AppState = {
				list:[],
				token:"",
				isLogged:false,
				loading:false,
				error:error,
				user:""
			}
			saveToStorage(tempState);
			return tempState;
		})
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
			const response = await fetch(urlRequest.request);
			if(!response) {
				console.log("Server did not respond");
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist": {
						const temp = await response.json();
						if(!temp) {
							console.log("Failed to parse response");
							return;
						}
						const list = temp as ShoppingList[];
						setState({
							"list":list
						})
						return;
					}
					case "additem":
						getList();
						navigate("/");
						return;
					case "removeitem":
					case "edititem": {
						getList();
						return;
					}
					default:
						return;
				}
			} else {
				console.log("Server responded with a status "+response.status+" "+response.statusText);
			}
		}
		
		fetchData();
		
	},[urlRequest]);

	const getList = () => {
		setUrlRequest({
			request:new Request("/api/shopping",{
				method:"GET"
			}),
			action:"getlist"
		})
	}
	
	const add = (item:ShoppingItem) => {
		setUrlRequest({
			request:new Request("/api/shopping",{
				method:"POST",
				headers:{
					"Content-type":"application/json"
				},
				body:JSON.stringify(item)
			}),
			action:"additem"
		})
	}
	
	const remove = (id:string) => {
		setUrlRequest({
			request:new Request("/api/shopping/"+id,{
				method:"DELETE"
			}),
			action:"removeitem"
		})
	}
	
	const edit = (item:ShoppingItem) => {
		setUrlRequest({
			request:new Request("/api/shopping/"+item.id,{
				method:"PUT",
				headers:{
					"Content-type":"application/json"
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

	return {state,add,remove,edit,register,login,logout}
}

export default useAction;