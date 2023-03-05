const minStepLimit = 1;
const maxStepLimit = 2;
const minMoves = 10;
const maxMoves = 35;
const shufflingMovesGeneratorButton = document.querySelector("#generatorButton");
const result = document.querySelector("#shufflingMoves");

function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function getRandomMoveFromListsOfMoves(listOfMoves) {
	let i = Math.floor(Math.random()*listOfMoves.length);
	let j = Math.floor(Math.random()*listOfMoves[i].length);
	return listOfMoves[i][j];
}

function getShuffledFaceMoves() {
	return shuffle(["F","B","F'","B'"]);
}

function getShuffledSideMoves() {
	return shuffle(["R", "L", "R'", "L'"]);
}

function getShuffledEdgeMoves(){
	return shuffle(["D", "U", "D'", "U'"]);
}

function getRandomMove(lastMove) {
	if(lastMove) {
		let faceMoves = getShuffledFaceMoves();
		let sideMoves = getShuffledSideMoves();
		if(faceMoves.includes(lastMove)){
			return getRandomMoveFromListsOfMoves(shuffle([getShuffledSideMoves(), getShuffledEdgeMoves()]));
		} else if(sideMoves.includes(lastMove)){
			return getRandomMoveFromListsOfMoves(shuffle([getShuffledFaceMoves(), getShuffledEdgeMoves()]));
		} else {
			return getRandomMoveFromListsOfMoves(shuffle([getShuffledSideMoves(), getShuffledFaceMoves()]));
		}
	} else {
		return getRandomMoveFromListsOfMoves(shuffle([getShuffledSideMoves(), getShuffledEdgeMoves(), getShuffledFaceMoves()]));
	}
}

function getRandomShuffleMoves(numMoves) {
	let movesString = "";
	let lastMove = null;
	while (numMoves > 0) {
		let currentNumMoves = Math.min(minStepLimit + Math.floor(Math.random()*(maxStepLimit)), numMoves)
		numMoves-=currentNumMoves;
		let currentMove = getRandomMove(lastMove);
		lastMove = currentMove;
		movesString+=currentMove + currentNumMoves + " ";
	}
	return movesString;
}

shufflingMovesGeneratorButton.addEventListener("click", () =>
	result.innerHTML = getRandomShuffleMoves(minMoves + Math.floor(Math.random()*(maxMoves - minMoves + 1))));

document.addEventListener("DOMContentLoaded", () =>
	result.innerHTML = getRandomShuffleMoves(minMoves + Math.floor(Math.random()*(maxMoves - minMoves + 1))));