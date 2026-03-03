import useAction from './hooks/useAction';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
function App() {

	const {state,add,remove,edit} = useAction();
	return (
    <>
		<ShoppingForm add={add}/>
		<ShoppingList list={state.list} remove={remove} edit={edit}/>
	</>
	)
}

export default App
