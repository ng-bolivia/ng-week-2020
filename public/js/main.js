if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js');
}

(function ($) {
  "use strict";
  // TOP Menu Sticky
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll < 400) {
      $("#sticky-header").removeClass("sticky");
      $('#back-top').fadeIn(500);
    } else {
      $("#sticky-header").addClass("sticky");
      $('#back-top').fadeIn(500);
    }
  });


  $(document).ready(function () {

    // mobile_menu
    var menu = $('ul#navigation');
    if (menu.length) {
      menu.slicknav({
        prependTo: ".mobile_menu",
        closedSymbol: '+',
        openedSymbol: '-'
      });
    };

    // count_dwon
    $('#clock').countdown('2020/05/21', function (event) {
      $(this).html(event.strftime('<div class="countdown_time"><div class="single_countdown"><h3>%D</h3><span>days</span></div><div class="single_countdown"><h3>%H</h3><span>Hours</span></div><div class="single_countdown"><h3>%M</h3><span>Minutes</span></div><div class="single_countdown"><h3>%S</h3><span>Seconds</span></div></div>'));
    });

  });


})(jQuery);