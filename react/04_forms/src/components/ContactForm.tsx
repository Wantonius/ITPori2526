import React,{useState} from 'react';
import Person from '../models/Person';

interface State {
	firstname:string;
	lastname:string;
}

interface Props {
	setGreeting(person:Person):void;
}

const ContactForm = (props:Props) => {
	
	const [state,setState] = useState<State>({
		firstname:"",
		lastname:""
	})
	
	const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const onSubmit = (event:React.SyntheticEvent) => {
		event.preventDefault();
		const person = new Person(state.firstname,state.lastname);
		props.setGreeting(person);
		setState({
			firstname:"",
			lastname:""
		})
	}
	
	return(
		<form onSubmit={onSubmit}>
			<label htmlFor="firstname">Firstname</label>
			<input type="text"
					name="firstname"
					id="firstname"
					onChange={onChange}
					value={state.firstname}/>
			<br/>
			<label htmlFor="lastname">Lastname</label>
			<input type="text"
					name="lastname"
					id="lastname"
					onChange={onChange}
					value={state.lastname}/>
			<br/>
			<input type="submit" value="Greet"/>
		</form>
	)
}

export default ContactForm;