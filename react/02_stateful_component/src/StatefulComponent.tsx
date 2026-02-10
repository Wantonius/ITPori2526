import React,{useState,useEffect} from 'react';

interface State {
	count:number;
}

const StatefulComponent = () => {
	
	const [state,setState] = useState<State>({
		count:0
	});
	
	const tick = () => {
		setState((state) => {
			return {
				count:state.count+1
			}
		})
	}

	useEffect(() => {
		
		const interval = setInterval(tick,1000)
		
		return () => clearInterval(interval)
		
	},[])
	
	return(
		<>
			<h2>{state.count} seconds since you entered the page</h2>
		</>
	)
}

export default StatefulComponent;