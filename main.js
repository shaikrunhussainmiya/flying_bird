const numb = document.querySelector('#number');
const startScreen = document.querySelector('.startScreen');
const gameMsg = document.querySelector('.gameMsg');
const gameArea = document.querySelector('.gameArea');

let keys = {
    
};

let player = {
    speed: 3,
    score: 0
};


gameMsg.addEventListener('click',start);
startScreen.addEventListener('click',start);

document.addEventListener('keydown',pressOn);
document.addEventListener('keyup',pressOff);

function start(){
    gameMsg.classList.add('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";
    player.inplay = true;
    player.score = 0;
    let bird = document.createElement('div');
    bird.setAttribute('class','bird');
    let eye = document.createElement('span');
    eye.className = 'eye';
    bird.appendChild(eye);
    let wing = document.createElement('span');
    wing.className = 'wing';
    bird.appendChild(wing);
    wing.pos = 16;
    wing.style.top = wing.pos + 'px';
    gameArea.appendChild(bird);
    player.x= bird.offsetLeft;
    player.y = bird.offsetTop;

    player.pipe = 0;
    let spacing = 550;
    let howMany = Math.floor( (gameArea.offsetWidth)/spacing);
        // console.log(howMany);
    for(let i=0;i<howMany;++i){
        buildPipes(player.pipe * spacing);
    }
    window.requestAnimationFrame(playGame);
}

function movePipes(bird){
    let lines = document.querySelectorAll('.pipe');
    let cnt = 0;
    lines.forEach( item => {
        // console.log(item);
        item.x -= player.speed;
        item.style.left = item.x + 'px';
        if(item.x < 0){
            item.parentElement.removeChild(item);
            cnt++;
        }
        if(isCollide(item,bird)){
            playGameOver(bird);
        }
    });
    cnt /= 2;
    for(let i=0;i<cnt;++i){
        buildPipes(0);
    }
}

function isCollide(a,b){
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom < bRect.top) ||
        (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) ||
        (aRect.left > bRect.right)
    )
}

function playGame() {
    if(player.inplay){
        let bird = document.querySelector('.bird');
        let wing = document.querySelector('.wing');
        movePipes(bird);
        let move = false;
        if(keys.ArrowLeft && player.x>30){
            player.x -= player.speed;
            move = true;
        }
        if(keys.ArrowRight && player.x < gameArea.offsetWidth-60){  
        player.x += player.speed;
        move = true;
        }
        if( (keys.ArrowUp || keys.Space)&&player.y>80){
            player.y -= (player.speed*5);
            move = true;
        }
        if(keys.ArrowDown && player.y < 880){
            player.y += player.speed;
            move = true;
        }

        if(move) {
            wing.pos = wing.pos == 16 ? 25:16;
            wing.style.top = wing.pos + 'px';
        }

        if(player.y < 1000)  player.y += (player.speed*2)
        if(player.y > 910){
            playGameOver(bird);
        }
        
        bird.style.left = player.x + 'px';
        bird.style.top = player.y + 'px';
 
        player.score += 0.5;
        numb.innerHTML = Math.floor(player.score);
        if(!(player.score%1000))  player.speed+=0.5;
        window.requestAnimationFrame(playGame);
    }
}

function playGameOver(bird){
    player.inplay=false;
    player.speed = 3;
    gameMsg.classList.remove('hide');
    bird.setAttribute('style','transform:rotate(180deg)');
    gameMsg.innerHTML = "GameOver. Click to here start again";
}

function buildPipes(startPos){
    let totalH = gameArea.offsetHeight;
    let totalW = gameArea.offsetWidth;
    player.pipe++;
    let clr = randamColor();
    let newPipe1 = document.createElement('div');
    newPipe1.start = startPos + totalW;
    newPipe1.classList.add('pipe');
    newPipe1.innerHTML = player.pipe;
    newPipe1.height = Math.floor(Math.random()*350);
    newPipe1.style.height = newPipe1.height + 'px';
    newPipe1.style.left = newPipe1.start + 'px';
    newPipe1.style.top = '8px';
    newPipe1.x = newPipe1.start;
    newPipe1.id = player.pipe;
    newPipe1.style.backgroundColor = clr;
    gameArea.appendChild(newPipe1);

    let pipeSpace = Math.floor(Math.random()*250) + 180;
    let newPipe2 = document.createElement('div');
    newPipe2.start = newPipe1.start;
    newPipe2.classList.add('pipe');
    newPipe2.innerHTML = player.pipe;
    newPipe2.style.height = totalH-newPipe1.height-pipeSpace + 'px';
    newPipe2.style.left = newPipe1.start + 'px';
    newPipe2.style.bottom = '12px';
    newPipe2.x = newPipe1.start;
    newPipe2.id = player.pipe;
    newPipe2.style.backgroundColor = clr;
    gameArea.appendChild(newPipe2);

}

function randamColor(){
    return '#'+Math.random().toString(16).substr(-6);
}

function pressOn(e){
    e.preventDefault();
    keys[e.code] = true;
}

function pressOff(e) {
    e.preventDefault();
    keys[e.code] = false;
}



