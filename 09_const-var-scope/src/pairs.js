document.addEventListener('DOMContentLoaded', () => {
	
	let pair = {one:null,two:null};

	function generatePairs(numCols){
		let amountOfPairs = numCols * numCols;
		let arrPairs = [amountOfPairs];
		let n = 1;
		for(let i = 0 ; i < amountOfPairs; i = i + 2) {
			arrPairs[i] = n;
			arrPairs[i + 1] = n; 
			n++;
		}
		return shuffle(arrPairs);
	}

	function shuffle(arr){
		let j, temp;
		for(let i = arr.length - 1; i > 0; i--){
			j = Math.floor(Math.random()*(i + 1));
			temp = arr[j];
			arr[j] = arr[i];
			arr[i] = temp;
		}
		return arr;
	}

	function check(pair) {
		return pair.one.innerText === pair.two.innerText;
	}

	function createCard(num) {
		let card = document.createElement('div');
		card.classList.add('card', 'close');
		card.textContent = num;
		card.onclick = () => {			
			if(pair.one !== null && pair.two === null) {
				pair.two = card;
				card.classList.toggle('close');
			}
			else if(pair.one === null && pair.two === null){
				pair.one = card;
				card.classList.toggle('close');
			}
			else if(pair.one !== null && pair.two !== null) {
				if(!check(pair)) {
					pair.one.classList.toggle('close');
					pair.two.classList.toggle('close');
					pair.one = card;
					pair.two = null;
				}
				else {
					pair = {one:null, two:null, };
				}
				card.classList.toggle('close');
			}
		};
		return card;
	}

	let container = document.querySelector('.container');

	function createPairsApp(container, pairs) {
		for(const i of pairs) {
			container.append(createCard(i));
		}
	}

	createPairsApp(container, generatePairs(4));	
});