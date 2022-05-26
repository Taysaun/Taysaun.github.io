
var open = true

function openNav(){
  if (open) {
      console.log("I am the close menu")
      var menuBox = document.getElementById("menu")
      menuBox.style.display = 'none';
      open = false

  }
  else {
      console.log("I open the menu")
      var menuBox = document.getElementById("menu")
      menuBox.style.display = 'flex';
      open = true
  }
var x = document.getElementById('hamburgerMenu')
x.classList.toggle("change")
}
