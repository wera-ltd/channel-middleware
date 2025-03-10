// function checkDevice () {
//   var pathName = location.pathname
//   if (navigator.userAgent.match(/iPhone|iPad|Mobile|UP.Browser|Android|BlackBerry|Windows CE|Nokia|webOS|Opera Mini|SonyEricsson|opera mobi|Windows Phone|IEMobile|POLARIS/) != null){
//     location.href = "/m" + pathName;
//   }
// }
// checkDevice()

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

  $('.js-header-menu-button').on('click', function () {
    $(this).parents('.js-header').toggleClass('is--open');
  })
  $('.js-header-menu-close-button').on('click', function (){
    $(this).parents('.js-header').removeClass('is--open');
  })

});
