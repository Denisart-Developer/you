/*===================SPOILER===================*/
var spoilers = document.querySelectorAll('.spoiler-services__title');
var spoilerBodys = document.querySelectorAll('.spoiler-services__body');


if(spoilers.length > 0) {
  for (let index = 0; index < spoilers.length; index++) {
    const spoiler = spoilers[index];
    spoiler.addEventListener("click", function (e){
      const spoilerBody = spoilerBodys[index];
      
      spoilerBody.classList.toggle("active");
      
      spoiler.classList.toggle("active");
      e.preventDefault();
      
    });
  }
}

var burgerBtn = document.querySelector('.header__burger');
var close = document.querySelector('.burger__close');
var burger = document.querySelector('.burger');
burgerBtn.addEventListener("click", function(){
    burger.classList.add("active");
});
close.addEventListener("click", function(){
    burger.classList.remove("active");
})



const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    //freeMode: true,
    //loop: true,
    //slidesPerGroup: 1,
    slidesPerView: 1,
    //freeModeMomentum: true,
    //loopedSlides: 4,
    spaceBetween: 0,
    //centerSlidesBounds: true,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: '.slide-feedback__arrows-r',
      prevEl: '.slide-feedback__arrows-l',
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    breakpoints: {
      
      
      991:{
        slidesPerView: 4,
        spaceBetween: 40
        
      },
      768:{
        slidesPerView: 3,
        spaceBetween: 0
        
      },
      600:{
        slidesPerView: 2,
        spaceBetween: 0
      },
      400:{
        slidesPerView: 1,
        spaceBetween: 0
        
      },
      320:{
        slidesPerView: 1,
        spaceBetween: -80
        
      },
      
    }
  });
