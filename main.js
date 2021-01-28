// 100vh in safari--------------
const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()
// -----------------------------

const settingsButton = document.querySelector('.settings')

settingsButton.addEventListener('click', () => {
    document.body.style.backgroundColor = '#242424'
})

const turnEl = document.querySelector('.next__text')

const buttons = document.querySelectorAll('.box')
const iconEl = document.querySelector('.next__icon')
const turn_x = document.querySelector('.x')
const turn_o = document.querySelector('.o')

let turn = 0 // 0 = O      1 = X
let game = true
let tabX = []
let tabO = []

const new_O = () => {
    const newO = document.createElement('img')
    newO.src = 'img/o.png'
    return newO
}

const new_X = () => {
    const newX = document.createElement('img')
    newX.src = 'img/x.png'
    return newX
}

const checkArray = (value) => {
    if (tabO.includes(value) || tabX.includes(value)) {
        return true
    } else return false
}

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
        iconEl.classList.add('hidden')
        turnEl.innerHTML = `${turn} win!`
        game = false
    }
}

for (const a of buttons) {
    a.addEventListener('click', () => {
        if (!checkArray(a.value) && game) {
            if (turn) {
                tabX.push(a.value)
                a.appendChild(new_X())
                win(tabX)
                turn = 0
            } else {
                tabO.push(a.value)
                a.appendChild(new_O())
                win(tabO)
                turn = 1
            }

            turn_o.classList.toggle('hidden')
            turn_x.classList.toggle('hidden')
            console.log(tabX, tabO)
        }
    })
}
