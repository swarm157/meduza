!"use strict"

window.onload = main;

let matrix = [];

let width = 128;
let height = 128;

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
        try {
            switch(this.state) {
                case 0: break;
                case 1: this.energy+=8; break;
                //case 2: this.energy=0; break;
                case 3: this.swap(this.left()); break;
                case 4: this.swap(this.right()); break;
                case 5: this.swap(this.up()); break;
                case 6: this.swap(this.down()); break;
                case 7: this.eat(this.left()); break;
                case 8: this.eat(this.right()); break;
                case 9: this.eat(this.up()); break;
                case 10: this.eat(this.down()); break;
                case 11: this.born(this.down()); break;
                case 12: this.born(this.left()); break;
                case 13: this.born(this.up()); break;
                case 14: this.born(this.right()); break;
                case 15: break;
            }
        } catch (error) {
            
        }
        
        if(this.energy<=0||this.health<=0) {
            this.energy = 0;
            this.alive = false;
        } else if(this.energy>100) {

            this.energy-=3;
            this.health+=3;
        }
        if(this.health>100) {
            this.code[Math.round(Math.random()*this.code.length)]+=Math.round(Math.random()*10)-5;
            this.health-=3;
        }
        if(this.alive)
            this.energy--;
        this.state++;
    }

    left() {
        if(this.x<0) {
            return matrix[width-1][this.y];
        }
        try {
            return matrix[this.x-1][this.y];
        } catch (error) {
            return matrix[this.x-1][this.y+1];
        }
    }
    right() {
        if(this.x>width) {
            return matrix[0][this.y];
        }
        return matrix[this.x+1][this.y];
    }
    up() {
        if(this.y<0) {
            return matrix[this.x][height-1];
        }
        return matrix[this.x][this.y-1];
    }
    down() {
        if(this.y>height) {
            return matrix[this.x][0];
        }
        return matrix[this.x][this.y+1];
    }
    swap(bot) {
        if(this.energy>bot.energy) {
            this.energy-=bot.energy/2;
            bot.energy/=1.5;
            let t = new Bot(0, 0, 0, []);
            bot.copyTo(t);
            this.copyTo(bot);
            t.copyTo(this);
            t.x = bot.x;
            t.y = bot.y;
            bot.x = this.x;
            bot.y = this.y;
            this.x = t.x;
            this.y = t.y;
        } else {
            this.health/=1.75;
            this.energy-=bot.energy/10;
            bot.health/=1.25;
        }
    }
    eat(bot) {
        if(this.energy+this.health>bot.energy+bot.health) {
            this.energy+=bot.energy/1.25;
            this.health+=bot.health/2;
            bot.health=0;
            bot.energy=0;
        } else {
            this.energy+=(bot.energy+bot.health)-(this.energy+this.health);
            this.health+=(bot.energy+bot.health)-(this.energy+this.health);
        }
    }

    copyTo(bot) {
        bot.x = this.x;
        bot.y = this.y;
        bot.health = this.health;
        //bot.code = this.code;
        for(let i = 0; i < this.code.length; i++) {
            bot.code[i] = this.code[i];
        }
        bot.energy = this.energy;
        bot.state = this.state;
        bot.alive = this.alive;
    }

    born(bot) {
        if(!bot.alive) {
            let x = bot.x;
            let y = bot.y;
            this.copyTo(bot);
            bot.code[Math.round(Math.random()*bot.code.length)]+=Math.round(Math.random()*10)-5;
            bot.energy/=2;
            this.energy/=3;
            bot.x = x;
            bot.y = y;
        } else {
            this.energy/=2;
            this.health-=bot.health/1.45;
        }
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
                let s = 820/width
                ctx.fillRect(i*s, o*s, s, s);
                
            }
        }
        if(deadWorld) {
            //for (let i = 0; i < width; i++)
                //for (let o = 0; o < height; o++)
                    //console.log(matrix[i][o]);
            regenerateWorld();
        }

    }, 1000/40);
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
    for(let i = 0; i < 64; i++) {
        t.push(Math.round(Math.random()*16));
    }
    return t;
}