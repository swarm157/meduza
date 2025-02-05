!"use strict"

window.onload = main;

let matrix = [];


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
            case 1: break;
            case 2: break;
            case 3: break;
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
}

function main() {
    
    let cvs = document.getElementById("canvas");
    let ctx = cvs.getContext("2d");

    for(let i = 0; i < 25; i++) {
        matrix.push([]);
        for(let o = 0; o < 25; o++) {
            matrix[i][o] = new Bot(i, o, Math.round(Math.random()*200), randomGen());
            //console.log(matrix[i][o]);
        }
    }
    ctx.fillStyle = "rgb(200 0 0)";
    ctx.fillRect(12, 12, 11, 11);
    console.log("initialized successful");
    setInterval(function() {
        for (let i = 0; i < 25; i++) {
            for (let o = 0; o < 25; o++) {
                //console.log("i = "+i+" o = "+o);
                if(matrix[i][o].alive) {
                    matrix[i][o].next();
                    ctx.fillStyle = "rgb("+matrix[i][o].energy+" "+matrix[i][o].health+" "+matrix[i][o].state+")";
                } else {
                    ctx.fillStyle = "rgb(3 3 3)";
                }
                ctx.fillRect(i*12, o*12, 11, 11);
                
            }
        }

    }, 200);
}


function randomGen() {
    let t = [];
    for(let i = 0; i < 10; i++) {
        t.push(Math.round(Math.random()*4));
    }
    return t;
}