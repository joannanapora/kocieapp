let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');


function loadImages(sources, callback) {
    let images = {};
    let loadedImages = 0;
    let numImages = 0;
    for(let src in sources) {
        numImages++;
    }
    for(let src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if(++loadedImages >= numImages ) {
                callback(images)
            }
        };
        images[src].src = sources[src];
    }
}

let sources = {
    kropka: "./kropka.jpg",
    szara: "./szara.jpg"
}

loadImages(sources, function(images){
    c.drawImage(images.kropka, 400, 400,120,260)
    c.drawImage(images.szara, 200, 200,120,260)
});


let x = Math.random() * innerWidth;
let y = 30;
let dx = 5;
let dy = 5;


createKropka = () => {
    const kropka = new Image();
    kropka.src = "./kropka.jpg";

    kropka.onload = () => {
      c.drawImage( kropka, innerWidth/2,  innerHeight-250, 120, 250 );
    }

    return kropka;
  };



const cucumber = new Image();
cucumber.src = './cucumber.png';


function itemFall() {
    requestAnimationFrame(itemFall);
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.beginPath();
    c.drawImage(cucumber, x, y, 50,50);
    c.stroke()

    if (y > innerHeight) {
        // DODAJE MISSED PUNKT
        y = 30;
        x = Math.random() * innerWidth;
        console.log('spadło')
    }

    y += dy
}

itemFall();
