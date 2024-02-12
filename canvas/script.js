var canvas = document.getElementById('mycan')
var c = canvas.getContext('2d')

canvas.width = window.innerWidth - 2;
canvas.height = window.innerHeight - 2;

// c.fillRect(100, 100, 100, 100)
// c.fillRect(200, 200, 100, 100)
// c.fillRect(300, 300, 100, 100)
// c.fillRect(624, 500, 100, 100)

// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(250, 350);
// c.stroke();

// for (var i = 0; i < 10; i++) {
//     var x = Math.random() * canvas.width;
//     var y = Math.random() * canvas.height;
//     c.beginPath();
//     c.arc(x, y, 100, 0, 3.14 * 2, false);
//     c.stroke();
// }

function animate() {
    requestAnimationFrame(animate);
    c.beginPath();
    c.arc(200, 200, 100, 0, 3.14 * 2, false);
    c.stroke();
}

animate();

// function resize() {
//     canvas.width = window.innerWidth - 2;
//     canvas.height = window.innerHeight - 2;
// }
// resize()

// window.onresize = () => {
//     resize()
// }
console.log(canvas.width, canvas.height)

