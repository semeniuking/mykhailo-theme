
// build scene
let animateElem = document.querySelector('.timeline');
let animateImage = document.querySelector('.timeline__image');
let revealElements = document.querySelectorAll('.timeline__item');
let revealList = document.querySelector('.timeline__list');
function animate() {
  let controller = new ScrollMagic.Controller();

  new ScrollMagic.Scene({
    triggerElement: revealElements[0],
    offset: 0,
    triggerHook: 0.55, // show, when scrolled 10%// into view
    duration: revealList.getBoundingClientRect().height // hide 10% before exiting view (80% + 10% from bottom)
  })
    .on("add", function (event) {
      let top = ((document.documentElement.clientHeight - animateImage.getBoundingClientRect().height) / 2)
      animateImage.style.top =`${top}px`
    })
    .on('progress', function(e) {
      var progressvalue = Math.floor(100 * e.progress);
      animateElem.querySelector('.timeline__line').style.height = progressvalue + '%';
    })
    .on('end', function(e) {
      animateElem.querySelector('.timeline__bullet').classList.toggle('visible')
    })
    .addTo(controller);

  revealElements.forEach((revealElement) => {
    revealElement.style.opacity = '0'

    new ScrollMagic.Scene({
      triggerElement: revealElement, // y value not modified, so we can use element as trigger as well
      offset: 0,
      triggerHook: 0.55 // show, when scrolled 10%// into view
    })
      .on("start", function (event) {
        revealElement.style.opacity = '1'
      })
      .on("leave", function (event) {
        revealElement.style.opacity = '0'
      })
      .setClassToggle(revealElement, 'visible') // add class toggle
      .addTo(controller);
  })
}

animate()

window.addEventListener('resize', animate, false)