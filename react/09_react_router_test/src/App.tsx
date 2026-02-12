import About from './components/About';
import Home from './components/Home';
import Secret from './components/Secret';
import {Link,Route,Routes,Navigate} from 'react-router-dom';

function App() {
 
  return (
    <>
		<ul style={{listStyleType:"none"}}>
			<li><Link to="/">Home Page</Link></li>
			<li><Link to="/about">About</Link></li>
		</ul>
		<hr/>
		<Routes>
			<Route path="/" element={<Home/>}/>
			<Route path="/about" element={<About/>}/>
			<Route path="/secret" element={<Secret/>}/>
			<Route path="*" element={<Navigate to="/"/>}/>
		</Routes>
    </>
  )
}

export default App
