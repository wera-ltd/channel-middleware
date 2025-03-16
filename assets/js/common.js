$(function() {
  const width = $(window).width();
  // $('.js-header .header-menu').on('mouseover', function (){
  //   if(width > 991) {
  //     $('.js-header').addClass('is--show-depth')
  //   }
  // }).on('mouseout', function () {
  //   $('.js-header').removeClass('is--show-depth')
  // })

  $(window).scroll(function (){
    var scroll = $(document).scrollTop();
    if (scroll > 0) {
    }else {
    }
  })

  $('.js-top-button').on('click', function (){
    $('html, body').animate({
      scrollTop: '0'
    }, 800);
  })

});

document.addEventListener('DOMContentLoaded', (event) => {
  const html = document.querySelector('html')
  const header = document.querySelector('.js-header')
  const headerMenuButton = document.querySelector('.js-header-menu-button')

  headerMenuButton.addEventListener('click', (e) => {
    header.classList.toggle('is--opened')
    if (header.classList.contains('is--opened')) {
      html.style.overflowY = 'hidden'
    } else {
      html.style.overflowY = 'auto'
    }
  })
})