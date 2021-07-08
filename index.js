
   //canvas settings
   let canvas = document.querySelector('canvas');
    let c = canvas.getContext('2d');
    canvas.width = window.innerWidth - 5
    canvas.height = window.innerHeight - 5
    
    const catWidth = 120
    const catHeight = 120
    const catY = innerHeight - catHeight - 5
    let catX = (innerWidth / 2)
    let catchingRangeMax = catX + catWidth
    let catchingRangeMin = catX
    
    
    const speed = [1, 1.4, 1.8, 2.2, 2.5, 2.8,]
    let cucumberSpeed = speed[Math.floor(Math.random() * speed.length)];
    let waterdropSpeed = speed[Math.floor(Math.random() * speed.length)];
    let mouseSpeed = speed[Math.floor(Math.random() * speed.length)];
    let snaxSpeed = speed[Math.floor(Math.random() * speed.length)];

    const startingHeight = 0
    let randomX = Math.random() * innerWidth;
    
    waterdropY = startingHeight;
        waterdropX = Math.random() * (innerWidth-60);
        cucumberY = startingHeight;
        cucumberX =  Math.random() * (innerWidth-60);
        mouseY = startingHeight;
        mouseX =  Math.random() * (innerWidth-60);
        snaxY = startingHeight;
        snaxX =  Math.random() * (innerWidth-60);
    
    let gameisRunning = false;
    let didYouLost = false;
    let exit = false;
    let goLeft = false;
    let goRight = false;
    
    let livesleft = 9;
    let bonuses = 0;
    let scores = 0;
    let times = 30;
    let levels = 0;

    
    let player;
    let cat;
    
    // LISTENER ON LEFT 
    window.addEventListener('keydown', function (event) {
        if ((event.keyCode === 37 || event.keyCode === 65) && gameisRunning) {
            goLeft = true;
        }
    });
    
    window.addEventListener('click', function(){location.reload()});
    
    // LISTENER ON RIGHT MOVE
    window.addEventListener('keydown', function (event) {
        if ((event.keyCode === 39 || event.keyCode === 68) && gameisRunning) {
            goRight = true;
        }
    });
    
    
    //CATS
    const szarutka = new Image();
    szarutka.src = "./images/szar.png";
    const szarutkagreen = new Image();
    szarutkagreen.src = "./images/szarutkagreen.png";
    const kropula = new Image();
    kropula.src = "./images/kro.png";
    const kropulkagreen = new Image();
    kropulkagreen.src = "./images/kropulkagreen.jpg";
    
    //BAD ITEMS
    const cucumber = new Image();
    cucumber.src = './images/cucumber.png';
    const waterdrop = new Image();
    waterdrop.src = "./images/water.png";
    
    //GOOD ITEMS
    const mouse = new Image();
    mouse.src = "./images/mouse.png";
    const snax = new Image();
    snax.src = "./images/snax.png";
    
    
    // scores ICONS 
    const logo = new Image()
    logo.src = "./images/logo_200x200.png"
    const bonus = new Image()
    bonus.src = "./images/bonus.png"
    const lives = new Image()
    lives.src = "./images/lives.png"
    const score = new Image()
    score.src = "./images/score.png"
    const time = new Image()
    time.src = "./images/time.png"
    const level = new Image()
    level.src = "./images/lvl.png"
    
    
    function showLostMenu() {
        c.clearRect(0, 0, innerWidth, innerHeight);
        c.font = "bold 30pt Courier";
        c.textAlign = "center"
        c.fillText("GOOD GAME!", innerWidth * 1 / 2, 80);
        c.font = "bold 10pt Courier";
        c.fillText(`Score: ${scores}   Bonus: ${bonuses}`, innerWidth * 1 / 2, 120);
        c.font = "bold 20pt Courier";
        c.fillText(`${scores + bonuses} points`, innerWidth * 1 / 2, 200);
        c.font = "bold 15pt Courier";
        c.fillText("press 'M' to return to Menu", innerWidth * 1 / 2, 300);
        livesleft = 9;
        bonuses = 0;
        scores = 0;
        times = 30;
        levels = 0;
        gameisRunning = false;
        didYouLost = true;
    }
    
    window.addEventListener('keydown', function (event) {
        if (event.keyCode === 77 && !gameisRunning && didYouLost) {
            player = null;
            didYouLost = false;
            instructions();
        }
    });
    
    
    function showStats() {
        c.font = "bold 15pt Courier";
        c.drawImage(logo, 0, 10, 100, 100);
        c.drawImage(bonus, 0, 120, 100, 100)
        c.fillText(`${bonuses}`, 50, 160)
        c.drawImage(lives, 0, 220, 100, 100)
        c.font = "bold 15pt Courier";
        c.fillText(`${livesleft}`, 50, 260)
        c.drawImage(score, 0, 320, 100, 100)
        c.font = "bold 15pt Courier";
        c.fillText(`${scores}`, 50, 360)
        c.drawImage(time, 0, 420, 100, 100)
        c.font = "bold 15pt Courier";
        c.fillText(`${Math.round(times)}s`, 50, 460)
        c.drawImage(level, -30, 520, 160, 160)
        c.font = "bold 25pt Courier";
        c.fillText(`${levels}`, 50, 585)
        c.font = "bold 15pt Courier";
        c.fillText("press ESC to exit", innerWidth-120, 20)
        c.stroke();
    }
    
    
    function itemsFalling() {
        c.clearRect(0, 0, innerWidth, innerHeight);
        c.beginPath();
        c.drawImage(cucumber, cucumberX, cucumberY, 60, 70)
        c.drawImage(waterdrop, waterdropX, waterdropY, 60, 70)
        c.drawImage(snax, snaxX, snaxY, 60, 70)
        c.drawImage(mouse, mouseX, mouseY, 60, 70)
        c.drawImage(cat, catX, catY, catWidth, catHeight);
    }
    
    
    function gameStart() {
        itemsFalling();
        showStats();
        times -= 0.008

        if (livesleft === 0) {
            showLostMenu();
            return;
        }
    
    
        if (times <= 0) {
            levels += 1
            bonuses += 10
            times = 29
        }
    
        gameisRunning = true;
        didYouLost = false;
        if (exit) {
            instructions();
            gameStarted = false;
            exit = false;
            player = null;
            return;
        }


        if (goLeft) {
            if (catX > 5) {
                catchingRangeMin -= 20
                catchingRangeMax -= 20
                catX -= 20
            }
            goLeft = false;
        }
    
        if (goRight) {
            if (catX < innerWidth - catWidth - 10) {
                catchingRangeMin += 20
                catchingRangeMax += 20
                catX += 20;
            }
            goRight = false;
        }
    
    
        //CHECK IF CATCH 
        if (
            Math.round(mouseY) === catY && (mouseX < catchingRangeMax && mouseX > catchingRangeMin)
        ) {
            scores += 5
            mouseY = startingHeight;
            mouseX = Math.random() * innerWidth;
        }
    
    
        if (mouseY > innerHeight) {
            mouseY = startingHeight;
            mouseX = Math.random() * innerWidth;
        }
    
    
        if (
            Math.round(snaxY) === catY && (snaxX < catchingRangeMax && snaxX > catchingRangeMin)
        ) {
            scores += 5
            snaxY = startingHeight;
            snaxX = Math.random() * innerWidth;
        }
    
    
        if (snaxY > innerHeight) {
            snaxY = startingHeight;
            snaxX = Math.random() * innerWidth;
        }
    
    
        //CHECK IF HIT
    
        if (
            Math.round(cucumberY) === catY && (cucumberX < catchingRangeMax && cucumberX > catchingRangeMin)
        ) {
            livesleft -= 1
            cucumberY = startingHeight;
            cucumberX = Math.random() * innerWidth;
        }
    
        if (cucumberY > innerHeight) {
            cucumberY = startingHeight;
            cucumberX = Math.random() * innerWidth;
        }
    
        if (
            Math.round(waterdropY) === catY && (waterdropX < catchingRangeMax && waterdropX > catchingRangeMin)
        ) {
            livesleft -= 1
            waterdropY = startingHeight;
            waterdropX = Math.random() * innerWidth;
        }
    
        if (waterdropY > innerHeight) {
            waterdropY = startingHeight;
            waterdropX = Math.random() * innerWidth;
        }
    
    
        cucumberY += cucumberSpeed
        waterdropY += waterdropSpeed
        mouseY += mouseSpeed
        snaxY += snaxSpeed
        requestAnimationFrame(gameStart);
    }
    
    function instructions() {
        c.clearRect(0, 0, innerWidth, innerHeight);
    
        goLeft = false;
        goRight = false;
    
    
        kropula.src = "./images/kro.png";
        szarutka.src = "./images/szar.png";
        c.font = "bold 2rem Courier";
    
        c.textAlign = "center"
        c.fillText("CHOOSE YOUR CAT", innerWidth * 1 / 2, 80);
    
        if (player === "kropulka") {
            c.drawImage(kropulkagreen, innerWidth * 1 / 2 - 150, 150, catWidth, catHeight)
        } else {
            kropula.onload = () => {
                c.drawImage(kropula, innerWidth * 1 / 2 - 150, 150, catWidth, catHeight)
            }
        }
        c.font = "bold 0.8rem Courier";
        c.fillText(`for KROPKA press K`, innerWidth * 1 / 2 - catWidth / 1.5, 350)
    
        if (player === "szarutka") {
            c.drawImage(szarutkagreen, innerWidth * 1 / 2, 150, catWidth, catHeight)
        } else {
            szarutka.onload = () => {
                c.drawImage(szarutka, innerWidth * 1 / 2, 150, catWidth, catHeight)
            }
        }
        c.font = "bold 0.8rem Courier";
        c.fillText(`for SZARA press S`, innerWidth * 1 / 2 + catWidth / 1.5, 350, catY, 200)
    
        c.font = "bold 1.5rem Courier";
        c.fillText(`press SPACE to START`, canvas.width / 2, 520);
    }
    
    instructions()
    
    window.addEventListener('keydown', function (event) {
        if (event.keyCode === 75 && !gameisRunning && !didYouLost) {
            player = "kropulka"
            cat = kropula;
            instructions();
            szarutka.src = "./images/szar.png";
        }
    });
    
    
    window.addEventListener('keydown', function (event) {
        if (event.keyCode === 83 && !gameisRunning && !didYouLost) {
            player = "szarutka"
            cat = szarutka;
            instructions();
            kropula.src = "./images/kro.png";
        }
    });
    
    window.addEventListener('keydown', function (event) {
        if (event.keyCode === 32 && player && !gameisRunning && !didYouLost) {
            gameStart();
        }
    });
    
    
    window.addEventListener('keydown', function (event) {
        if (event.keyCode === 27 && gameisRunning) {
            exit = true;
        }
    });
    
