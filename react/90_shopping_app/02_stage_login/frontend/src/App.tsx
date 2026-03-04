import useAction from './hooks/useAction';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Routes,Route,Navigate} from 'react-router-dom';
function App() {

	const {state,add,remove,edit,login,register,logout,setError} = useAction();
	
	let messageArea = <h4 style={{"height":20,"textAlign":"center"}}></h4>
	if(state.loading) {
		messageArea = <h4 style={{"height":20,"textAlign":"center"}}>Loading ...</h4>
	}
	if(state.error) {
		messageArea = <h4 style={{"height":20,"textAlign":"center"}}>{state.error}</h4>
	}
	if(state.isLogged) {
		return (
		<>
			<Navbar isLogged={state.isLogged} user={state.user} logout={logout}/>
			{messageArea}
			<Routes>
				<Route path="/list" element={<ShoppingList list={state.list} remove={remove} edit={edit}/>}/>
				<Route path="/form" element={<ShoppingForm add={add}/>}/>
				<Route path="*" element={<Navigate to="/list"/>}/>
			</Routes>
		</>
		)
	} else {
		return(
			<>
				<Navbar isLogged={state.isLogged} user={state.user} logout={logout}/>
				{messageArea}
				<Routes>
					<Route path="/" element={<LoginPage register={register}
					login={login} setError={setError}/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</>
		)
	}
}

export default App
