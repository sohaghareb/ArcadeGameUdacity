let posY = [50,140,230];
let posX=[0,-150,-300,-450,-600,-750]
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.xInitial=0;
    this.x=0;
    this.y=0;
    this.width=50;
    this.height=80;
    this.speed=20;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + this.speed * dt) ;
    //handle collision
    if(collides(this,player))
        reloadPage();

    if(this.x >= 400)
        this.x=this.xInitial;

    // setTimeout(() => {
    //     this.update(dt);
    // }, 3000);

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 420;
    this.width=101;
    this.height=171;
    this.stepY = 90;
    this.stepX = 100;
    
    this.validRight = function(){
        if(this.x + this.stepX <= 400){
            return true;
        }
        return false;
    }

    this.validLeft = function(){
        if(this.x - this.stepX >= 0){
            return true;
        }
        return false;
    }

    this.validDown = function(){
        if(this.y + this.stepY <= 420){
            return true;
        }
        return false;
    }

    this.validUp = function(){
        if(this.y - this.stepY >= -35){
            return true;
        }
        return false;
    }

    this.moveRight = function(){
        this.x+=this.stepX;
    }

    this.moveDown = function(){
        this.y+=this.stepY;
    }

    this.moveLeft = function(){
        this.x-=this.stepX;
    }

    this.moveUp = function(){
        this.y-=this.stepY;
        if(this.win()){
            reloadPage();
        }
    }

    this.win = function(){
        if(this.y <= 0){
            return true;
        }
        return false;
    }

};

Player.prototype.update = function() {
    
};

Player.prototype.handleInput= function(keyCode){
    console.log(keyCode);
    switch(keyCode){
        case('left'):
            if(player.validLeft())player.moveLeft();break;
        case('up'):
            if(player.validUp())player.moveUp();break;
        case('right'):
            if(player.validRight())player.moveRight();break;
        case('down'):
            if(player.validDown())player.moveDown();
    }
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies=[];
for(let i = 0; i < 3; ++i) {
    let e = createEnemy(i);
    allEnemies.push(e);
}
let player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//reload the page if win/collision
function reloadPage() {
    location.reload();
}

function collides(a, b) {
        if (a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y) return true;
        return false;
}

function createEnemy(x) {
    let yRandomIndex = Math.floor(Math.random() * 10) % 3;
    let enem = new Enemy();
    enem.x = posX[x];
    enem.xInitial = posX[x];
    enem.y = posY[yRandomIndex];
    return enem; 
}