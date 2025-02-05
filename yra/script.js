!"use strict"

window.onload = main;

let matrix = [];

let width = 25;
let height = 25;

class Bot {
    constructor(x, y, energy, code) {
        this.health = 100;
        this.x = x;
        this.y = y;
        this.energy = energy;
        this.code = code;
        this.state = 0;
        this.alive = true;
    }
    next() {
        if(this.state>this.code.length)
            this.state = 0;
        switch(this.state) {
            case 0: break;
            case 1: this.energy+=8; break;
            case 2: this.energy=0; break;
            case 3: {
                if()
            } break;
        }
        if(this.energy<=0||this.health<=0) {
            this.energy = 0;
            this.alive = false;
        } else if(this.energy>100) {
            let d = 100-this.energy;
            this.energy  = 100;
            this.health -= d;
        }
        if(this.alive)
            this.energy--;
        this.state++;
    }

    left() {
        if(x<0) {
            return matrix[width-1][y];
        }
        return matrix[x-1][y];
    }
    right() {
        if(x>width) {
            return matrix[0][y];
        }
        return matrix[x+1][y];
    }
    up() {
        if(y<0) {
            return matrix[x][height-1];
        }
        return matrix[x][y-1];
    }
    down() {
        if(x>width) {
            return matrix[0][y];
        }
        return matrix[x][y+1];
    }
    swap(bot) {
        if(this.energy>bot.energy) {
            this.energy-=bot.energy/2;
            bot.energy/=1.5;
            let t = new Bot(0, 0, 0, []);
            bot.copyTo(t);
            this.copyTo(bot);
            t.copyTo(this);
        }
    }
    eat(bot) {

    }

    copyTo(bot) {

    }
}

function main() {
    
    let cvs = document.getElementById("canvas");
    let ctx = cvs.getContext("2d");

    regenerateWorld();

    console.log("initialized successful");
    setInterval(function() {
        let deadWorld = true;
        for (let i = 0; i < width; i++) {
            for (let o = 0; o < height; o++) {
                //console.log("i = "+i+" o = "+o);
                if(matrix[i][o].alive) {
                    deadWorld = false;
                    matrix[i][o].next();
                    ctx.fillStyle = "rgb("+matrix[i][o].energy+" "+matrix[i][o].health+" "+matrix[i][o].state+")";
                } else {
                    ctx.fillStyle = "rgb(3 3 3)";
                }
                ctx.fillRect(i*12, o*12, 11, 11);
                
            }
        }
        if(deadWorld)
            regenerateWorld();

    }, 200);
}


function regenerateWorld() {
    matrix = [];
    for(let i = 0; i < width; i++) {
        matrix.push([]);
        for(let o = 0; o < height; o++) {
            matrix[i][o] = new Bot(i, o, Math.round(Math.random()*200), randomGen());
            //console.log(matrix[i][o]);
        }
    }
}

function randomGen() {
    let t = [];
    for(let i = 0; i < 10; i++) {
        t.push(Math.round(Math.random()*40));
    }
    return t;
}