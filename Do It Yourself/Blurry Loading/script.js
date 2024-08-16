const bg = document.querySelector('.bg')
const loadNum = document.querySelector('.loading')
function loading() {
    load++;
    console.log(load)

    if (load > 99) {
        clearInterval(int)
    }

    loadNum.innerText = `${load}%`;
    loadNum.style.opacity = load * (-1 / 100) + 1;
    bg.style.filter = `blur(${(load * (-30/100)) + 30}px)`
}

let load = 0
let int = setInterval(loading, 30)

