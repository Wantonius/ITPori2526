import useAction from './hooks/useAction';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import {Routes,Route,Navigate} from 'react-router-dom';
function App() {

	const {state,add,remove,edit} = useAction();
	return (
    <>
		<Navbar/>
		<Routes>
			<Route path="/" element={<ShoppingList list={state.list} remove={remove} edit={edit}/>}/>
			<Route path="/form" element={<ShoppingForm add={add}/>}/>
			<Route path="*" element={<Navigate to="/"/>}/>
		</Routes>
	</>
	)
}

export default App
