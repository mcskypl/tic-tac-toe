const initGameBlock = `<div class="main__line main__l1">
                    <button class="box" value="0"></button>
                    <button class="box" value="1"></button
                    ><button class="box" value="2"></button>
                </div>
                <div class="main__line main__l2">
                    <button class="box" value="3"></button
                    ><button class="box" value="4"></button
                    ><button class="box" value="5"></button>
                </div>
                <div class="main__line main__l3">
                    <button class="box" value="6"></button
                    ><button class="box" value="7"></button
                    ><button class="box" value="8"></button>
                </div>`;

const settingsButton = document.querySelector('.settings');
const restartButton = document.querySelector('.restart');
const containerElement = document.querySelector('.container');
const oWinsEl = document.querySelector('.o-wins');
const xWinsEl = document.querySelector('.x-wins');

settingsButton.addEventListener('click', () => {
    containerElement.classList.toggle('dark');
});

const turnEl = document.querySelector('.next__text');

const iconEl = document.querySelector('.next__icon');
const turn_x = document.querySelector('.x');
const turn_o = document.querySelector('.o');

let turn = 0; // 0 = O      1 = X
let game = true;
let tabX = [];
let tabO = [];
let buttons = document.querySelectorAll('.box');

let oWin = 0;
let xWin = 0;

const init = () => {
    document.querySelector('.main').innerHTML = initGameBlock;
    buttons = document.querySelectorAll('.box');
    turn = 0;
    game = true;
    tabX = [];
    tabO = [];

    newGame();
};

const newGame = () => {
    const new_O = () => {
        const newO = document.createElement('img');
        newO.src = 'img/o.png';
        return newO;
    };

    const new_X = () => {
        const newX = document.createElement('img');
        newX.src = 'img/x.png';
        return newX;
    };

    const checkArray = (value) => {
        return tabO.includes(value) || tabX.includes(value);
    };

    const win = (tab) => {
        if (
            (tab.includes('0') && tab.includes('1') && tab.includes('2')) ||
            (tab.includes('3') && tab.includes('4') && tab.includes('5')) ||
            (tab.includes('6') && tab.includes('7') && tab.includes('8')) ||
            (tab.includes('0') && tab.includes('3') && tab.includes('6')) ||
            (tab.includes('1') && tab.includes('4') && tab.includes('7')) ||
            (tab.includes('2') && tab.includes('5') && tab.includes('8')) ||
            (tab.includes('0') && tab.includes('4') && tab.includes('8')) ||
            (tab.includes('2') && tab.includes('4') && tab.includes('6'))
        ) {
            iconEl.classList.add('hidden');
            turnEl.innerHTML = `${turn} win!`;
            turn ? xWin++ : oWin++;
            game = false;
        }
    };

    for (const a of buttons) {
        a.addEventListener('click', () => {
            if (!checkArray(a.value) && game) {
                if (turn) {
                    tabX.push(a.value);
                    a.appendChild(new_X());
                    win(tabX);
                    turn = 0;
                } else {
                    tabO.push(a.value);
                    a.appendChild(new_O());
                    win(tabO);
                    turn = 1;
                }

                turn_o.classList.toggle('hidden');
                turn_x.classList.toggle('hidden');
                oWinsEl.innerHTML = oWin;
                xWinsEl.innerHTML = xWin;
                console.log(tabX, tabO);
            }
        });
    }
};

restartButton.addEventListener('click', () => {
    init();
});

window.onload = () => {
    init();
};
