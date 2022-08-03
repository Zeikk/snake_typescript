import { useEffect, useState } from 'react';
import './App.css';

function getRandomInt(max: number) {
	return Math.floor(Math.random() * max);
}

enum Direction {
	Haut,
	Bas,
	Gauche,
	Droite
};

function moveAccordingDirection(direction: Direction, box: number, numberOfColumns: number) {
	switch (direction) {
		case Direction.Bas: return box + numberOfColumns;
		case Direction.Haut: return box - numberOfColumns;
		case Direction.Gauche: return box - 1;
		case Direction.Droite: return box + 1;

	}
}


function App() {

	const numberOfRows: number = 12;
	const numberOfColumns: number = 12;

	const [snakeBoxes, setSnakeBoxes] = useState<Array<number>>([getRandomInt(numberOfRows * numberOfColumns)]);
	const [direction, setDirection] = useState<Direction>(getRandomInt(4));
	const [boxes, setBoxes] = useState<Array<JSX.Element>>([]);


	useEffect(() => {

		const tmpBoxes = [];
		for (let i = 0; i < numberOfRows * numberOfColumns; i++) {
			let bg = ""
			if (snakeBoxes[snakeBoxes.length - 1] === i)
				bg = "bg-red-500"
			else if (snakeBoxes.includes(i))
				bg = "bg-sky-300"
			else
				bg = 'bg-sky-600'

			tmpBoxes.push(
				<div key={i} className={`${bg} w-full h-10 m-auto rounded shadow-lg shadow-blue-500/50`}></div>
			)
		}
		setBoxes(tmpBoxes);

		const intervalId = setInterval(() => {
			const tmp = [...snakeBoxes];
			tmp.push(moveAccordingDirection(direction, snakeBoxes[snakeBoxes.length - 1], numberOfColumns));
			setSnakeBoxes(tmp);
		}, 500);

		return () => clearInterval(intervalId);
	}, [snakeBoxes])


	const handleEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {

		console.log(event)
		if (event.key === 'ArrowUp')
			setDirection(Direction.Haut);
		else if (event.key === 'ArrowDown')
			setDirection(Direction.Bas);
		else if (event.key === 'ArrowLeft')
			setDirection(Direction.Gauche);
		else if (event.key === 'ArrowRight')
			setDirection(Direction.Droite);

	}


	return (
		<div className="App" tabIndex={0} onKeyDown={handleEvent}>
			<h2 className='flex content-center justify-center h-40 items-center text-5xl font-semibold text-slate-50 tracking-wider'>Snake</h2>
			<div className={`m-auto content-center w-2/5 h-full grid grid-cols-${numberOfColumns} gap-2`}>
				{boxes}
			</div>

		</div>
	);
}

export default App;
