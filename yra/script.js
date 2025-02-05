!"use strict"

window.onload = main;

let matrix = [];


class Bot {
    Bot(x, y, energy, code) {
        this.health = 100;
        this.x = x;
        this.y = y;
        this.energy = energy;
        this.code = code;
        this.state = 0;
    }
    next() {

    }
}

function main() {
    
    let cvs = document.getElementById("canvas");
    let ctx = cvs.getContext("2d");

    for(let i = 0; i < 25; i++) {
        matrix.push([]);
    }
    ctx.fillStyle = "rgb(200 0 0)";
    ctx.fillRect(12, 12, 11, 11);
    setInterval(function() {
        for (let i = 0; i < 25; i++) {
            for (let o = 0; o < 25; o++) {
                //console.log("i = "+i+" o = "+o);
                ctx.fillStyle = "rgb(200 0 0)";
                ctx.fillRect(i*12, o*12, 11, 11);
            }
        }

    }, 1000);
}