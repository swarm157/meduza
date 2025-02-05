!"use strict"

window.onload = main;

function main() {
    let cvs = document.getElementById("canvas");
    let ctx = cvs.getContext("2d");
    setInterval(200, function() {
        ctx.drawRect(0,0,200,200);
    })
}