!"use strict"

window.onload = main;

function main() {
    let cvs = document.getElementById("canvas");
    let ctx = cvs.getContext("2d");
    console.log(123123);
    setInterval(function() {
        console.log(13123);
        ctx.fillStyle = "rgb(200 0 0)";
        ctx.fillRect(10, 10, 50, 50);
    }, 200);
}