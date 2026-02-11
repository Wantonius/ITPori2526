import useCount from './hooks/useCount';

function App() {

	const [value,add,subtract] = useCount(10);
	return (
		<>
			<h2>Current value:{value}</h2>
			<button onClick={add}>+</button>
			<button onClick={subtract}>-</button>
		</>
	)
}

export default App
