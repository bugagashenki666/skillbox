document.addEventListener('DOMContentLoaded', () => {

    let pair = { one: null, two: null };

    function generatePairs(numCols) {
        let amountOfPairs = numCols * numCols;
        let arrPairs = [amountOfPairs];
        let n = 1;
        for (let i = 0; i < amountOfPairs; i = i + 2) {
            arrPairs[i] = n;
            arrPairs[i + 1] = n;
            n++;
        }
        return shuffle(arrPairs);
    }

    function shuffle(arr) {
        let j, temp;
        for (let i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }

    function check(pair) {
        return pair.one.innerText === pair.two.innerText;
    }

    function checkGameOver() {
        let cards = document.querySelectorAll('.card');
        let amountClosed = 0;
        for (const card of cards) {
            if (!card.classList.contains('matched')) {
                amountClosed++;
            }
            if (amountClosed > 2) return false;
        }
        for (const card of cards) {
            card.classList.add('matched');
            card.classList.remove('close');
        }
        return true;
    }

    function createButtonNewGame(n) {
        if (document.querySelector('button') !== null) return;
        let btnContainer = document.querySelector('.btn-container');
        let btn = document.createElement('button');
        btn.textContent = 'Сыграть ещё раз';
        btn.classList.add('btn');
        btnContainer.append(btn);
        btn.onclick = () => {
            document.querySelector('.container').innerHTML = '';
            createPairsApp(document.querySelector('.container'), generatePairs(n), n);
            document.querySelector('.btn-container').innerHTML = '';
        };
    }

    function createCard(num, n) {
        let card = document.createElement('div');
        card.classList.add('card', 'close');
        card.textContent = num;
        card.onclick = () => {
            if (card.classList.contains('matched')) return;

            if (pair.one !== null && pair.two === null) {
                if (pair.one === card) return;
                pair.two = card;
                card.classList.toggle('close');
            } else if (pair.one === null && pair.two === null) {
                pair.one = card;
                card.classList.toggle('close');
            } else if (pair.one !== null && pair.two !== null) {
                if (pair.one === card || pair.two === card) return;
                if (!check(pair)) {
                    pair.one.classList.toggle('close');
                    pair.two.classList.toggle('close');
                } else {
                    pair.one.classList.add('matched');
                    pair.two.classList.add('matched');
                }
                pair = { one: card, two: null, };
                card.classList.toggle('close');
            }
            if (checkGameOver()) {
                createButtonNewGame(n);
                pair = { one: null, two: null };
                return;
            }
        };

        return card;
    }

    function showAll() {
        let cards = document.querySelectorAll('.card');
        for (const card of cards) {
            card.classList.remove('close');
        }
    }

    let container = document.querySelector('.container');

    function createPairsApp(container, pairs, n) {
        let timer = document.querySelector('.timer');
        timer.innerText = '60';
        let timeintervalId = setInterval(function() {
            if (timer.innerText === '0') {
                timer.innerText = 'GAME OVER';
                showAll();
                createButtonNewGame(n);
                clearInterval(timeintervalId);
                pair = { one: null, two: null };
                return;
            }
            if (checkGameOver()) {
                timer.innerText = 'YOU HAVE JUST WON';
                createButtonNewGame(n);
                pair = { one: null, two: null };
                clearInterval(timeintervalId);
                return;
            }
            timer.innerText = parseInt(timer.innerText) - 1;
        }, 1000);
        for (const i of pairs) {
            container.append(createCard(i, n));
        }
    }

    function createFormSettings() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        input.type = 'number';
        input.value = 4;
        let btn = document.createElement('button');
        btn.textContent = 'Начать игру';
        form.append(input);
        form.append(btn);
        document.querySelector('.container').append(form);
        input.onchange = function() {
            setTimeout(() => {
                if (input.value < 2 || input.value > 10 || input.value % 2 === 1) input.value = 4;
            }, 600);
        };
        btn.onclick = () => {
            let n = input.value;
            document.querySelector('.container').innerHTML = '';
            let root = document.querySelector(':root');
            root.style.setProperty('--amount-of-cols', n);
            createPairsApp(document.querySelector('.container'), generatePairs(n), n);
        };
    }

    function setUp() {
        createFormSettings();
    }

    setUp();
});