const circles = document.querySelectorAll('.circle')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const progress = document.getElementById('progress')

var active = 1

next.addEventListener('click', () => {
    active++;

    if (active > circles.length) {
        active = circles.length
    }
    console.log(active)
    update()
})

prev.addEventListener('click', () => {
    active--;

    if (active < 1) {
        active = 1
    }
    console.log(active)
    update()
})

function update() {
    circles.forEach((circle, index) => {
        if (index < active) {
            circle.classList.add('active')
        } else {
            circle.classList.remove('active')
        }
    })

    if (active > 1) {
        prev.disabled = false
    } else if (active === 1) {
        prev.disabled = true
    }
    if (active === circles.length) {
        next.disabled = true
    } else if (active < circles.length) {
        next.disabled = false
    }

    var actives = document.querySelectorAll('.active')

    progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + "%"

    // if (active === 1) {
    //     prev.disabled = true
    // } else if (active === circles.length) {
    //     next.disabled = true
    // } else {
    //     prev.disabled = false
    //     next.disabled = false
    // }
}