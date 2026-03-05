import { useState } from 'react'
import ThemeContext,{themes} from './context/ThemeContext';
import Paragraph from './components/Paragraph';
import Headline from './components/Headline';
import ThemeButton from './components/ThemeButton';

interface State {
	theme:ThemeType;
}

interface ThemeType {
	color:string;
	backgroundColor:string;
}

function App() {

	const [state,setState] = useState<State>({
		theme:themes.dark
	})		

	const toggleTheme = () => {
		if(state.theme === themes.dark) {
			setState({
				theme:themes.light
			})
		} else {
			setState({
				theme:themes.dark
			})
		}
	}
	
	return (
		<>
			<ThemeContext.Provider value={state.theme}>
				<Headline>
				Passing Data Deeply with Context
				</Headline>
				<Paragraph>
				Usually, you will pass information from a parent component to a child component via props. But passing props can become verbose and inconvenient if you have to pass them through many components in the middle, or if many components in your app need the same information. Context lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.
				</Paragraph>
				<ThemeButton toggleTheme={toggleTheme}/>
			</ThemeContext.Provider>
		</>
	)
}

export default App
