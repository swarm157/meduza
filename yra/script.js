!"use strict"

window.onload = main;

function main() {
    let ctx = canvas.getContext("2d");
    setInterval(200, function() {
        ctx.drawRect(0,0,200,200);
    })
}