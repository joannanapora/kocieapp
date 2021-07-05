let canvas = document.querySelector('canvas');


let c = canvas.getContext('2d');


canvas.width = (window.innerWidth - 8);
canvas.height = (window.innerHeight - 8)


const DEFAULT_HEIGHT = 10;
const DEFAULT_PLAYER_Y = innerHeight - 170
const DEFAULT_PLAYER_X = innerWidth / 2
let x = Math.random() * innerWidth;
let y = DEFAULT_HEIGHT
let j = Math.random() * innerWidth;
let k = DEFAULT_HEIGHT
let l = Math.random() * innerWidth;
let m = DEFAULT_HEIGHT
let dy = Math.random() * 3;
let dk = Math.random() * 3;
let dm = Math.random() * 3;
let goLeft = false;
let goRight = false;
let changeableX = innerWidth / 2;
let points = 0;
let player;
let cat;
let gameStarted = false;
let exit = false;



// LISTENER ON LEFT MOVE
window.addEventListener('keydown', function (event) {
    if (event.keyCode === 37 || event.keyCode === 65) {
        goLeft = true;
    }
});

// LISTENER ON RIGHT MOVE
window.addEventListener('keydown', function (event) {
    if (event.keyCode === 39 || event.keyCode === 68) {
        goRight = true;
    }
});

//CATS
const szarutka = new Image();
szarutka.src = "./szarutka.png";
const szarutkagreen = new Image();
szarutkagreen.src = "./szarutkagreen.png";
const kropula = new Image();
kropula.src = "./kropula.jpg";
const kropulkagreen = new Image();
kropulkagreen.src = "./kropulkagreen.jpg";

//BAD ITEMS
const cucumber = new Image();
cucumber.src = './cucumber.png';
const waterdrop = new Image();
waterdrop.src = "./water.png";

//GOOD ITEMS
const mouse = new Image();
mouse.src = "./mouse.png";


// SCORE ICONS 
const logo = new Image()
logo.src = "./logo_200x200.png"

const bonus = new Image()
bonus.src = "./bonus.png"

const lives = new Image()
lives.src = "./lives.png"

const score = new Image()
score.src = "./score.png"

function gameRunning() {
    gameStarted = true;
    if (exit) {
        kropula.src = "./kropula.jpg";
        szarutka.src = "./szarutka.png";
        c.clearRect(0, 0, innerWidth, innerHeight);
        instructions();
        gameStarted = false;
        exit = false;
        player = null;
        return;
    }
    requestAnimationFrame(gameRunning);
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.beginPath();
    c.drawImage(cucumber, x, y, 60, 60);
    c.drawImage(waterdrop, j, k, 40, 70);
    c.drawImage(mouse, l, m, 60, 70);
    c.drawImage(cat, changeableX, DEFAULT_PLAYER_Y, 150, 170);
    c.drawImage(logo, 0, 10, 100, 100);
    c.drawImage(bonus, 0, 120, 100, 100)
    c.font = '30px Arial'
    c.fillText(`${0}`, 43, 163)
    c.drawImage(lives, 0, 220, 100, 100)
    c.font = '30px Arial'
    c.fillText(`${0}`, 43, 263)
    c.drawImage(score, 0, 320, 100, 100)
    c.font = '30px Arial'
    c.fillText(`${0}`, 43, 363)

    c.stroke();

    if (goLeft) {
        changeableX -= 30
        goLeft = false;
    }

    if (goRight) {
        if (x !== innerWidth / 2 + 280) {
            changeableX += 30;
        }
        goRight = false;
    }

    if (y > innerHeight) {
        // DODAJE MISSED PUNKT
        y = DEFAULT_HEIGHT
        x = Math.random() * innerWidth;
    }

    if (k > innerHeight) {
        // DODAJE MISSED PUNKT
        k = DEFAULT_HEIGHT
        j = Math.random() * innerWidth;
    }

    if (m > innerHeight) {
        // DODAJE MISSED PUNKT
        m = DEFAULT_HEIGHT
        l = Math.random() * innerWidth;
    }

    y += dy
    k += dk
    m += dm

}


function instructions() {

    c.font = "bold 40pt Courier";
    c.textAlign = "center"
    c.fillText("CHOOSE YOUR CAT", innerWidth * 1 / 2, 80);

    if (player === "kropulka") {
        c.drawImage(kropulkagreen, innerWidth * 1 / 2 - 150, 150, 150, 170)
    } else {
        kropula.onload = () => {
            c.drawImage(kropula, innerWidth * 1 / 2 - 150, 150, 150, 170)
        }
    }
    c.font = "bold 15pt Courier";
    c.fillText(`for KROPKA press K`, innerWidth * 1 / 2 - 120, 350, 200, 200)

    if (player === "szarutka") {
        c.drawImage(szarutkagreen, innerWidth * 1 / 2, 150, 160, 180)
    } else {
        szarutka.onload = () => {
            c.drawImage(szarutka, innerWidth * 1 / 2, 150, 160, 180)
        }
    }
    c.font = "bold 15pt Courier";
    c.fillText(`for SZARA press S`, innerWidth * 1 / 2 + 120, 350, 200, 200)

    c.font = "bold 30pt Courier";
    c.fillText(`press SPACE to START`, canvas.width / 2, 520);
}

instructions()

window.addEventListener('keydown', function (event) {
    if (event.keyCode === 75) {
        player = "kropulka"
        cat = kropula;
        instructions();
        szarutka.src = "./szarutka.png";
    }
});


window.addEventListener('keydown', function (event) {
    if (event.keyCode === 83) {
        player = "szarutka"
        cat = szarutka;
        instructions();
        kropula.src = "./kropula.jpg";
    }
});

window.addEventListener('keydown', function (event) {
    if (event.keyCode === 32 && player && !gameStarted) {
        gameRunning();
    }
});


window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27 && gameStarted) {
        exit = true;
    }
});


