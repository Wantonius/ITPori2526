import {useState,useEffect} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import {useNavigate} from 'react-router-dom';
interface State {
	list:ShoppingItem[];
}

interface UrlRequest {
	request:Request;
	action:string;
}

const useAction = () => {
		
	const [state,setState] = useState<State>({
		list:[]
	})
	
	const navigate = useNavigate();
	
	const [urlRequest,setUrlRequest] = useState<UrlRequest>({
		request:new Request("",{}),
		action:""
	})
	
	useEffect(() => {
		getList();
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

	return {state,add,remove,edit}
}

export default useAction;