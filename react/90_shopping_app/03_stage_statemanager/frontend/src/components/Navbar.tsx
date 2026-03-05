import {Link} from 'react-router-dom';
import useAppState from '../hooks/useAppState';
import useAction from '../hooks/useAction';


const Navbar = () => {
	
	const {isLogged,user} = useAppState();
	const {logout} = useAction();
	
	if(isLogged) {
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<p className="navbar-brand" style={{marginLeft:10}}>Shopping App</p>
				<ul className="navbar-nav">
					<li className="nav-item" style={{marginLeft:10}}>
						<Link to="/list" className="nav-link">Shopping List</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<Link to="/form" className="nav-link">Add new item</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<p style={{color:"blue"}} className="nav-link">Logged in as {user}</p>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<Link to="/" onClick={logout} className="nav-link">Logout</Link>
					</li>
				</ul>
			</nav>		
		)
	} else {
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<p className="navbar-brand" style={{marginLeft:10}}>Shopping App</p>
			</nav>	
		)
	}
}

export default Navbar;