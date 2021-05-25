window.addEventListener("scroll", function () {
  //Efecto del navbar
  var navbar = this.document.querySelector(".navbar");
  var burgers = this.document.querySelectorAll(".navbar__burger__line");
  navbar.classList.toggle("navbar__active", window.scrollY > 0);
  for (var i = 0; i < burgers.length; i++) {
    burgers[i].classList.toggle("line__active", window.scrollY > 0);
  }

  //Efecto de la sección about me
  var aboutme = this.document.querySelector(".effect");

  var windowheight = window.innerHeight;
  var currentPosition = aboutme.getBoundingClientRect().top;
  var puntoDeAparicion = 50;

  if(currentPosition < (windowheight - puntoDeAparicion)) {
      aboutme.classList.add('show');
  } else {
      aboutme.classList.remove('show');
  }
});
