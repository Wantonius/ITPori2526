import React,{useState} from 'react';
import User from '../models/User';

interface Props {
	register(user:User):void;
	login(user:User):void;
	setError(error:string):void;
}

interface State {
	username:string;
	password:string;
}

const LoginPage = (props:Props) => {
	
	const [state,setState] = useState<State>({
		username:"",
		password:""
	})
	
	const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const onRegister =(event:React.SyntheticEvent) => {
		event.preventDefault();
		if(state.username.length <4 || state.password.length < 8) {
			props.setError("Username must atleast 4 and password atleast 8 characters long");
			return;
		}
		const user = new User(state.username,state.password);
		props.register(user);
	}

	const onLogin =(event:React.SyntheticEvent) => {
		event.preventDefault();
		if(state.username.length <4 || state.password.length < 8) {
			props.setError("Username must atleast 4 andreut password atleast 8 characters long");
			return;
		}
		const user = new User(state.username,state.password);
		props.login(user);
	}	
	return(
		<div style={{"width":"40%","backgroundColor":"lightblue","margin":"auto","textAlign":"center"}}>
			<form className="m-3">
				<label htmlFor="username" className="form-label">Username</label>
				<input type="text"
						name="username"
						id="username"
						className="form-control"
						onChange={onChange}
						value={state.username}/>
				<label htmlFor="password" className="form-label">Password</label>
				<input type="password"
						name="password"
						id="password"
						className="form-control"
						onChange={onChange}
						value={state.password}/>
				<button onClick={onRegister} style={{"marginRight":5}} className="btn btn-primary">Register</button>
				<button onClick={onLogin} style={{"marginLeft":5}} className="btn btn-secondary">Login</button>
			</form>
		</div>
	)
}

export default LoginPage;