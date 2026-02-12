import {useNavigate} from 'react-router-dom';

const About = () => {
	
	const navigate = useNavigate();
	
	return(
		<>
			<h3>This is the React Router test app</h3>
			<button onClick={() => navigate("/secret")}>Go to secret page</button>
		</>
	)
}

export default About;