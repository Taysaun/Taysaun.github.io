let boxes = document.querySelectorAll('.box')

function checkpos() {
    boxes.forEach((box) => {
        let position = box.getBoundingClientRect().bottom
        if (position < window.innerHeight) {
            box.classList.add('appear')
        } else {
            box.classList.remove('appear')
        }
        window.onbeforeunload = () => {
            window.scrollTo(0, 0)
        }  
    })
}

checkpos()
window.addEventListener('scroll', () => {
    checkpos()
})

