// Enemies our player must avoid
class Enemy {
    constructor(x,y,speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update (dt) {
        // Multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x < 505) {
            this.x += (this.speed * dt);
        } else {
            this.x = 0;
        }
    }

    // Draw the Enemy on the screen
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Main Player
class Player {
    constructor() {
        this.x = 200;
        this.y = 405;
        this.sprite = 'images/char-boy.png';
    }

    // Draw the Player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Move Player in 4 directions, one move per tile.
    handleInput(moveKey) {
        switch (moveKey) {
            case 'up':
                if (this.y > -10) {
                    this.y -= 83;
                }
                break;
            case 'down':
                if (this.y < 405) {
                    this.y += 83;
                }
                break;
            case 'left':
                if (this.x > -2) {
                    this.x -= 101;
                }
                break;
            case 'right':
                if (this.x < 402) {
                    this.x += 101;
                }
        }
    }

    // Player returns to start position when there is a collision with an Enemy
   checkCollisions() {
        allEnemies.forEach(function(enemy) {
            if ( Math.abs(player.x - enemy.x) <= 80 &&
                 Math.abs(player.y - enemy.y) <= 30  ) {
                player.x=200;
                player.y=405;
            }
        });
    }

    // The game is over when the Player reached the water at position -10
    gameWon() {
        return this.y == -10;
    }
}

// Instantiate objects
const allEnemies = [new Enemy(10,60,170), new Enemy(100,60,120),
                        new Enemy(200,220,140), new Enemy(300,143,120)];
const player = new Player();

// This listens for key presses and calls method handleInput()
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
