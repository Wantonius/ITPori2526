import { useState,useMemo } from 'react'


function App() {

	const [count,setCount] = useState(0);
	const [currentWord,setCurrentWord] = useState(0);
	const words = ["banaani","jäätelö","loma","lumi"];
	const word = words[currentWord];
	
	const computeWordLength = (word:string) => {
		let i=0;
		while(i<10000000000) {
			i++;
		}
		return word.length;
	}
	//const wordLength = computeWordLength(word);
	const wordLength = useMemo(() => computeWordLength(word),[word]);
	
	return (
		<>
			<h2>Compute length of word {word}</h2>
			<h2>{word} has {wordLength} letters</h2>
			<button onClick={() => {
				const next = currentWord + 1 === words.length ? 0 : currentWord +1;
				setCurrentWord(next);
			}}>Next Word</button>
		
			<h2>Increment Counter</h2>
			<h2>Current Value:{count}</h2>
			<button onClick={() => setCount(count => count +1)}>Increment</button>
		</>
	)
}

export default App
